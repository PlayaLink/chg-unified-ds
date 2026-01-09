#!/usr/bin/env node

/**
 * Transform Figma API response to W3C Design Tokens format
 *
 * Reads figma-api-response.json and generates token files for each collection and mode
 */

const fs = require('fs');
const path = require('path');

const API_RESPONSE_PATH = path.join(__dirname, '..', 'tokens', 'figma-api-response.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'tokens');

// Read Figma API response
const apiResponse = JSON.parse(fs.readFileSync(API_RESPONSE_PATH, 'utf8'));
const { variableCollections, variables } = apiResponse.meta;

// Helper to convert RGB to hex
function rgbToHex({ r, g, b, a }) {
  if (a !== undefined && a !== 1) {
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a.toFixed(4)})`;
  }
  const toHex = (value) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Helper to resolve variable aliases
function resolveAlias(variableId, variables) {
  const variable = variables[variableId];
  if (!variable) return null;
  return `{${variable.name.replace(/\//g, '.')}}`;
}

// Map Figma types to W3C Design Token types
const TYPE_MAP = {
  COLOR: 'color',
  FLOAT: 'number',
  STRING: 'string',
  BOOLEAN: 'boolean'
};

// Transform variables for a specific collection and mode
function transformCollection(collectionId, collection, modeId, modeName, variables) {
  const tokens = {};

  for (const variableId of collection.variableIds) {
    const variable = variables[variableId];
    if (!variable) continue;

    const value = variable.valuesByMode[modeId];
    if (value === undefined) continue;

    // Build nested token structure from variable name (e.g., "color/brand/500")
    const parts = variable.name.split('/');
    let current = tokens;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }

    const lastPart = parts[parts.length - 1];
    current[lastPart] = {
      $type: TYPE_MAP[variable.resolvedType] || variable.resolvedType.toLowerCase()
    };

    // Handle different value types
    if (typeof value === 'object' && value.type === 'VARIABLE_ALIAS') {
      current[lastPart].$value = resolveAlias(value.id, variables);
    } else if (variable.resolvedType === 'COLOR' && typeof value === 'object') {
      current[lastPart].$value = rgbToHex(value);
    } else {
      current[lastPart].$value = value;
    }
  }

  return tokens;
}

// Main transformation
console.log('Transforming Figma variables to W3C Design Tokens...\n');

let fileCount = 0;

Object.entries(variableCollections).forEach(([collectionId, collection]) => {
  console.log(`Processing collection: ${collection.name}`);

  collection.modes.forEach(mode => {
    const fileName = `${collection.name}.${mode.name}.tokens.json`;
    const tokens = transformCollection(collectionId, collection, mode.modeId, mode.name, variables);

    const outputPath = path.join(OUTPUT_DIR, fileName);
    fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));

    console.log(`  ✓ ${fileName}`);
    fileCount++;
  });
});

console.log(`\n✓ Generated ${fileCount} token files`);
console.log('\nNext steps:');
console.log('1. Review the generated token files in tokens/');
console.log('2. Delete figma-api-response.json (no longer needed)');
console.log('3. Run: npm run build:tokens');
console.log('4. Update tailwind.config.js with your token values');
