#!/usr/bin/env node

/**
 * Design Token Build Script
 *
 * Converts W3C Design Tokens (from Figma export) into CSS custom properties.
 * Resolves token references like {token.path} to actual values.
 *
 * Usage: node scripts/build-tokens.cjs
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'styles');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Get value at a dot-notation path in an object
 */
function getValueAtPath(obj, pathStr) {
  const parts = pathStr.split('.');
  let current = obj;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  // If we got a token object with $value, return that
  if (current && typeof current === 'object' && '$value' in current) {
    return current.$value;
  }

  return current;
}

/**
 * Resolve token references in a value
 * References look like: {some.token.path}
 */
function resolveReferences(value, allTokens, maxDepth = 10) {
  if (typeof value !== 'string') return value;

  const refPattern = /\{([^}]+)\}/g;
  let resolved = value;
  let depth = 0;

  while (refPattern.test(resolved) && depth < maxDepth) {
    depth++;
    resolved = resolved.replace(refPattern, (match, tokenPath) => {
      const refValue = getValueAtPath(allTokens, tokenPath);
      if (refValue !== undefined) {
        return refValue;
      }
      // Try with different root prefixes
      for (const prefix of ['uds', 'system', 'design-system']) {
        const altPath = tokenPath.startsWith(prefix + '.') ? tokenPath : `${prefix}.${tokenPath}`;
        const altValue = getValueAtPath(allTokens, altPath);
        if (altValue !== undefined) {
          return altValue;
        }
      }
      // Return original if not found
      console.warn(`  Warning: Could not resolve reference: ${match}`);
      return match;
    });
    refPattern.lastIndex = 0; // Reset regex
  }

  return resolved;
}

/**
 * Flatten nested token object and resolve references
 */
function flattenTokens(obj, allTokens, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object' && !value.$value) {
      Object.assign(result, flattenTokens(value, allTokens, newKey));
    } else if (value && value.$value !== undefined) {
      // Resolve any references in the value
      result[newKey] = resolveReferences(value.$value, allTokens);
    }
  }

  return result;
}

/**
 * Sanitize key for CSS variable name
 */
function sanitizeKey(key) {
  return key
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, '-')  // Remove parenthetical content
    .replace(/[^a-z0-9-]/g, '-')        // Replace invalid chars with dash
    .replace(/-+/g, '-')                // Collapse multiple dashes
    .replace(/^-|-$/g, '');             // Trim leading/trailing dashes
}

/**
 * Deep merge objects
 */
function deepMerge(target, source) {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !source[key].$value) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Convert resolved tokens to CSS custom properties
 */
function generateCSSVariables(flattened) {
  let css = ':root {\n';

  for (const [key, value] of Object.entries(flattened)) {
    const varName = `--${sanitizeKey(key)}`;
    css += `  ${varName}: ${value};\n`;
  }

  css += '}\n';
  return css;
}

/**
 * Main build function
 */
async function build() {
  console.log('Building design tokens...\n');

  // Read all token files
  const tokenFiles = fs.readdirSync(TOKENS_DIR).filter(f => f.endsWith('.tokens.json'));

  if (tokenFiles.length === 0) {
    console.log('No token files found in tokens/ directory.');
    return;
  }

  // Define load order - primitives first, then core, then semantic
  const loadOrder = [
    'Primitives.Default.tokens.json',
    'Core.default.tokens.json',
    'Design System.Light.tokens.json',
  ];

  // Sort files by load order, with unmatched files at the end
  const sortedFiles = tokenFiles.sort((a, b) => {
    const aIndex = loadOrder.indexOf(a);
    const bIndex = loadOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  console.log('Loading token files in order:');
  sortedFiles.forEach(f => console.log(`  - ${f}`));
  console.log('');

  // Merge all tokens into one object for reference resolution
  let allTokens = {};

  for (const file of sortedFiles) {
    // Skip brand-specific files for the main tokens.css
    if (file.includes('.Light.') || file.includes('.Dark.')) {
      if (!file.includes('Design System')) {
        continue; // Skip brand files like Weatherby.Light, etc.
      }
    }

    const filePath = path.join(TOKENS_DIR, file);
    const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allTokens = deepMerge(allTokens, tokens);
  }

  console.log('Resolving token references...');

  // Flatten and resolve all references
  const flattened = flattenTokens(allTokens, allTokens);

  // Generate CSS
  let css = '/* Generated from Figma tokens via npm run build:tokens */\n';
  css += '/* DO NOT EDIT MANUALLY */\n\n';
  css += generateCSSVariables(flattened);

  // Write combined CSS
  const cssPath = path.join(OUTPUT_DIR, 'tokens.css');
  fs.writeFileSync(cssPath, css);
  console.log(`\nGenerated: ${cssPath}`);
  console.log(`  ${Object.keys(flattened).length} CSS variables`);

  console.log('\nDone! Your design tokens are ready.');
}

build().catch(console.error);
