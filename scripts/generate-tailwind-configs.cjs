#!/usr/bin/env node

/**
 * Generate Tailwind Configs from Figma Tokens
 *
 * Creates:
 * 1. Base tailwind.config.cjs with shared utilities (spacing, typography, etc.)
 * 2. Brand-specific configs (tailwind.config.weatherby.js, etc.)
 *
 * Usage: node scripts/generate-tailwind-configs.cjs
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const ROOT_DIR = path.join(__dirname, '..');

// Read token files
const coreTokens = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, 'Core.default.tokens.json'), 'utf8'));
const primitivesTokens = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, 'Primitives.Default.tokens.json'), 'utf8'));
const designSystemTokens = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, 'Design System.Light.tokens.json'), 'utf8'));

// Build a lookup map for resolving token aliases
const tokenLookup = {};

function buildTokenLookup(obj, prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && value.$value !== undefined) {
      tokenLookup[path] = value.$value;
    } else if (value && typeof value === 'object') {
      buildTokenLookup(value, path);
    }
  }
}

// Build lookup from primitives (contains actual system colors)
buildTokenLookup(primitivesTokens);

/**
 * Resolve token alias to actual value
 * @param {string} value - The token value (may be an alias like "{uds.radius.2}")
 * @param {string} tokenPath - The path of the token being resolved (to detect self-references)
 * @param {number} depth - Recursion depth to prevent infinite loops
 */
function resolveAlias(value, tokenPath = '', depth = 0) {
  if (depth > 10) return value; // Prevent infinite loops

  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const ref = value.slice(1, -1); // Remove {}

    // Detect self-reference: if the alias references the same token path
    if (ref === tokenPath) {
      // Extract numeric value from the key (last part of the path)
      // e.g., "uds.radius.2" -> "2", "uds.radius.none" -> "none"
      const keyPart = tokenPath.split('.').pop();
      const numericValue = parseFloat(keyPart);
      if (!isNaN(numericValue)) {
        return numericValue;
      }
      // Handle special cases like "none" -> 0
      if (keyPart === 'none') {
        return 0;
      }
      // Return the key as-is if not numeric
      return keyPart;
    }

    const resolved = tokenLookup[ref];
    if (resolved) {
      return resolveAlias(resolved, tokenPath, depth + 1);
    }

    // If alias couldn't be resolved, try to extract value from the reference path
    // e.g., "{uds.radius.none}" -> try to get "none" -> 0
    const refKeyPart = ref.split('.').pop();
    if (refKeyPart === 'none') {
      return 0;
    }
    const refNumeric = parseFloat(refKeyPart);
    if (!isNaN(refNumeric)) {
      return refNumeric;
    }
  }

  return value;
}

/**
 * Transform token values to Tailwind format
 * @param {object} token - The token object with $value and $type
 * @param {string} tokenPath - The full path of the token (e.g., "uds.radius.2")
 */
function transformTokenValue(token, tokenPath = '') {
  if (!token || token.$value === undefined) return null;

  let value = token.$value;
  const type = token.$type;

  // Resolve aliases (pass tokenPath to detect self-references)
  value = resolveAlias(value, tokenPath);

  if (type === 'number') {
    if (typeof value === 'number') {
      return value === 0 ? '0px' : `${value}px`;
    }
    // If still a string after resolution, it's unresolved - try to extract numeric from it
    if (typeof value === 'string') {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        return num === 0 ? '0px' : `${num}px`;
      }
    }
  }

  return value;
}

/**
 * Extract spacing from Core tokens
 */
function extractSpacing() {
  const spacing = {};
  const spacingTokens = coreTokens.uds?.spacing || {};

  for (const [key, token] of Object.entries(spacingTokens)) {
    spacing[key] = transformTokenValue(token, `uds.spacing.${key}`);
  }

  return spacing;
}

/**
 * Extract border radius from Core tokens
 */
function extractBorderRadius() {
  const radius = {};
  const radiusTokens = coreTokens.uds?.radius || {};

  for (const [key, token] of Object.entries(radiusTokens)) {
    const value = transformTokenValue(token, `uds.radius.${key}`);
    if (value !== null) {
      radius[key] = value;
    }
  }

  return radius;
}

/**
 * Extract gray/neutral colors
 */
function extractGrayColors() {
  const gray = {};
  const neutralsTokens = primitivesTokens.system?.neutrals || {};

  for (const [key, token] of Object.entries(neutralsTokens)) {
    gray[key] = transformTokenValue(token, `system.neutrals.${key}`);
  }

  return gray;
}

/**
 * Extract system semantic colors
 */
function extractSystemColors() {
  // Get white and black from tokens (source of truth)
  const systemWhite = primitivesTokens.system?.white?.$value;
  const systemBlack = primitivesTokens.system?.black?.$value;

  if (!systemWhite) {
    throw new Error('Missing required token: system.white - check Primitives.Default.tokens.json');
  }
  if (!systemBlack) {
    throw new Error('Missing required token: system.black - check Primitives.Default.tokens.json');
  }

  const colors = {
    // Root-level colors (enables bg-white, bg-black, text-white, etc.)
    white: systemWhite,
    black: systemBlack,
    transparent: 'transparent',

    // Namespaced base colors (backwards compatibility with bg-base-white, etc.)
    base: {
      white: systemWhite,
      black: systemBlack,
      transparent: 'transparent',
    },
  };

  // Add gray/neutrals
  colors.gray = extractGrayColors();

  // Extract ALL accent colors from system.accent
  const accentColors = primitivesTokens.system?.accent || {};
  const accentColorNames = ['red', 'orange', 'yellow', 'lime', 'green', 'sky', 'cyan', 'blue', 'indigo', 'purple', 'magenta', 'rose', 'amber'];

  for (const colorName of accentColorNames) {
    if (accentColors[colorName]) {
      colors[colorName] = {};
      for (const [key, token] of Object.entries(accentColors[colorName])) {
        colors[colorName][key] = transformTokenValue(token, `system.accent.${colorName}.${key}`);
      }
    }
  }

  // Keep semantic aliases pointing to the extracted colors
  colors.error = colors.red;
  colors.destructive = colors.red;
  colors.warning = colors.yellow;
  colors.success = colors.green;

  return colors;
}

/**
 * Extract brand-specific colors from Primitives
 */
function extractBrandColors(brandName) {
  const brandTokens = primitivesTokens[brandName];
  if (!brandTokens) return null;

  const colors = {};

  // Extract primary brand color
  if (brandTokens.primary) {
    colors.brand = {};
    for (const [key, token] of Object.entries(brandTokens.primary)) {
      colors.brand[key] = transformTokenValue(token, `${brandName}.primary.${key}`);
    }
    // Alias primary to brand for convenience
    colors.primary = colors.brand;
  }

  // Extract secondary if available
  if (brandTokens.secondary) {
    colors.secondary = {};
    for (const [key, token] of Object.entries(brandTokens.secondary)) {
      colors.secondary[key] = transformTokenValue(token, `${brandName}.secondary.${key}`);
    }
  }

  return colors;
}

/**
 * Generate base Tailwind config (shared utilities)
 */
function generateBaseConfig() {
  const spacing = extractSpacing();
  const borderRadius = extractBorderRadius();
  const systemColors = extractSystemColors();

  const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: ${JSON.stringify(systemColors, null, 6).replace(/"([^"]+)":/g, '$1:')},
    spacing: ${JSON.stringify(spacing, null, 6).replace(/"([^"]+)":/g, '$1:')},
    borderRadius: ${JSON.stringify(borderRadius, null, 6).replace(/"([^"]+)":/g, '$1:')},
    fontSize: {
      xs: ['12px', { lineHeight: '18px' }],
      sm: ['14px', { lineHeight: '20px' }],
      md: ['16px', { lineHeight: '24px' }],
      lg: ['18px', { lineHeight: '28px' }],
      xl: ['20px', { lineHeight: '30px' }],
      '2xl': ['24px', { lineHeight: '32px' }],
      '3xl': ['30px', { lineHeight: '38px' }],
      '4xl': ['36px', { lineHeight: '44px' }],
      '5xl': ['48px', { lineHeight: '60px' }],
      '6xl': ['60px', { lineHeight: '72px' }],
      '7xl': ['72px', { lineHeight: '90px' }],
    },
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    extend: {
      boxShadow: {
        xs: '0px 1px 2px 0px rgba(10, 13, 18, 0.05)',
        sm: '0px 1px 2px 0px rgba(10, 13, 18, 0.06), 0px 1px 3px 0px rgba(10, 13, 18, 0.10)',
        md: '0px 2px 4px -2px rgba(10, 13, 18, 0.06), 0px 4px 8px -2px rgba(10, 13, 18, 0.10)',
        lg: '0px 4px 6px -2px rgba(10, 13, 18, 0.05), 0px 12px 16px -4px rgba(10, 13, 18, 0.10)',
        xl: '0px 8px 8px -4px rgba(10, 13, 18, 0.04), 0px 20px 24px -4px rgba(10, 13, 18, 0.10)',
        '2xl': '0px 24px 48px -12px rgba(10, 13, 18, 0.25)',
        '3xl': '0px 32px 64px -12px rgba(10, 13, 18, 0.20)',
      },
    },
  },
  plugins: [],
};
`;

  return config;
}

/**
 * Generate brand-specific Tailwind config
 */
function generateBrandConfig(brandName) {
  const brandColors = extractBrandColors(brandName);

  if (!brandColors) {
    console.log(`  ⚠️  No colors found for ${brandName}, skipping...`);
    return null;
  }

  const config = `/** @type {import('tailwindcss').Config} */
const baseConfig = require('./tailwind.config.cjs');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    colors: {
      ...baseConfig.theme.colors,
      // ${brandName.charAt(0).toUpperCase() + brandName.slice(1)} brand colors
      ${Object.entries(brandColors).map(([key, value]) =>
        `${key}: ${JSON.stringify(value, null, 8).replace(/"([^"]+)":/g, '$1:')},`
      ).join('\n      ')}
    },
  },
};
`;

  return config;
}

/**
 * Main function
 */
function main() {
  console.log('Generating Tailwind configs from Figma tokens...\n');

  // Generate base config
  console.log('Creating base config (shared utilities)...');
  const baseConfig = generateBaseConfig();
  fs.writeFileSync(path.join(ROOT_DIR, 'tailwind.config.cjs'), baseConfig);
  console.log('  ✓ tailwind.config.cjs');

  // Generate brand-specific configs
  console.log('\nCreating brand-specific configs...');
  const brands = Object.keys(primitivesTokens).filter(key =>
    !['system', 'design-system'].includes(key)
  );

  let successCount = 0;
  for (const brand of brands) {
    const brandConfig = generateBrandConfig(brand);
    if (brandConfig) {
      const filename = `tailwind.config.${brand}.js`;
      fs.writeFileSync(path.join(ROOT_DIR, filename), brandConfig);
      console.log(`  ✓ ${filename}`);
      successCount++;
    }
  }

  console.log(`\n✓ Generated ${successCount} brand configs + base config`);
  console.log('\nAvailable brands:');
  brands.forEach(brand => console.log(`  - ${brand}`));
  console.log('\nTo use a specific brand:');
  console.log('  BRAND=weatherby npm run dev');
  console.log('  BRAND=comphealth npm run build');
  console.log('\nNext steps:');
  console.log('1. Review generated configs');
  console.log('2. Update package.json scripts to support BRAND env var');
  console.log('3. Test with: npm run dev');
}

main();
