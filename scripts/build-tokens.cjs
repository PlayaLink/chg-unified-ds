#!/usr/bin/env node

/**
 * Design Token Build Script
 *
 * Converts W3C Design Tokens (from Figma export) into CSS custom properties.
 * Supports multiple Figma source files.
 *
 * Usage: node scripts/build-tokens.js
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
 * Flatten nested token object to CSS variable format
 */
function flattenTokens(obj, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object' && !value.$value) {
      Object.assign(result, flattenTokens(value, newKey));
    } else if (value && value.$value) {
      result[newKey] = value.$value;
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
 * Convert tokens to CSS custom properties
 */
function generateCSSVariables(tokens, source = '') {
  const flattened = flattenTokens(tokens);
  let css = `:root {\n  /* Source: ${source} */\n`;

  for (const [key, value] of Object.entries(flattened)) {
    const varName = `--${sanitizeKey(key)}`;
    css += `  ${varName}: ${value};\n`;
  }

  css += '}\n\n';
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
    console.log('Add your Figma token exports as *.tokens.json files.\n');
    return;
  }

  console.log('Found token files:');
  tokenFiles.forEach(f => console.log(`  - ${f}`));
  console.log('');

  let allCss = '/* Generated from Figma tokens via npm run build:tokens */\n';
  allCss += '/* DO NOT EDIT MANUALLY */\n\n';

  // Process each token file
  for (const file of tokenFiles) {
    const filePath = path.join(TOKENS_DIR, file);
    const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const css = generateCSSVariables(tokens, file);
    allCss += css;
  }

  // Write combined CSS
  const cssPath = path.join(OUTPUT_DIR, 'tokens.css');
  fs.writeFileSync(cssPath, allCss);
  console.log(`Generated: ${cssPath}`);

  console.log('\nDone! Your design tokens are ready.');
  console.log('\nNext steps:');
  console.log('1. Update tailwind.config.js with token values if needed');
  console.log('2. Use Tailwind classes in your components');
  console.log('3. When Figma tokens change, re-export and run this script');
}

build().catch(console.error);
