#!/usr/bin/env node

/**
 * Token Validation Script
 * Checks Figma token exports for common issues and generates a report.
 *
 * Usage: node scripts/validate-tokens.cjs
 *
 * Run after exporting tokens from Figma to identify issues that need
 * to be reported back to the Figma design system maintainer.
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const issues = [];
const stats = {
  totalTokens: 0,
  totalFiles: 0,
  emptyFiles: 0,
};

/**
 * Validate a single token value
 */
function validateValue(tokenPath, value, type, allTokenPaths) {
  // Check for unresolved aliases
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const ref = value.slice(1, -1);

    // Check if the referenced path exists
    if (!allTokenPaths.has(ref)) {
      issues.push({
        type: 'UNRESOLVED_ALIAS',
        path: tokenPath,
        value,
        message: `Alias references non-existent token: ${ref}`,
        severity: 'error',
      });
    } else {
      // Check for self-reference
      if (ref === tokenPath) {
        issues.push({
          type: 'SELF_REFERENCE',
          path: tokenPath,
          value,
          message: 'Token references itself',
          severity: 'error',
        });
      }
    }
  }

  // Check for null values
  if (value === null) {
    issues.push({
      type: 'NULL_VALUE',
      path: tokenPath,
      value: 'null',
      message: 'Value is null - should have a default',
      severity: 'warning',
    });
  }

  // Check for empty strings
  if (value === '') {
    issues.push({
      type: 'EMPTY_VALUE',
      path: tokenPath,
      value: '(empty string)',
      message: 'Value is empty string',
      severity: 'warning',
    });
  }

  // Check color format for color types
  if (type === 'color' && typeof value === 'string') {
    const isHex = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(value);
    const isRgba = /^rgba?\(/.test(value);
    const isAlias = value.startsWith('{');

    if (!isHex && !isRgba && !isAlias) {
      issues.push({
        type: 'INVALID_COLOR',
        path: tokenPath,
        value,
        message: 'Color value not in expected format (#RRGGBB, #RRGGBBAA, or rgba())',
        severity: 'warning',
      });
    }
  }

  // Check for unexpected negative numbers in spacing/sizing
  if (type === 'number' && typeof value === 'number') {
    if (value < 0 && (tokenPath.includes('spacing') || tokenPath.includes('radius') || tokenPath.includes('sizing'))) {
      issues.push({
        type: 'NEGATIVE_VALUE',
        path: tokenPath,
        value,
        message: 'Unexpected negative value for spacing/radius/sizing',
        severity: 'warning',
      });
    }
  }
}

/**
 * Walk token object and collect all paths first
 */
function collectTokenPaths(obj, prefix = '') {
  const paths = new Set();

  for (const [key, value] of Object.entries(obj)) {
    const tokenPath = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && value.$value !== undefined) {
      paths.add(tokenPath);
    } else if (value && typeof value === 'object') {
      for (const p of collectTokenPaths(value, tokenPath)) {
        paths.add(p);
      }
    }
  }

  return paths;
}

/**
 * Walk token object and validate values
 */
function walkTokens(obj, prefix = '', allTokenPaths) {
  for (const [key, value] of Object.entries(obj)) {
    const tokenPath = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && value.$value !== undefined) {
      stats.totalTokens++;
      validateValue(tokenPath, value.$value, value.$type, allTokenPaths);
    } else if (value && typeof value === 'object') {
      walkTokens(value, tokenPath, allTokenPaths);
    }
  }
}

/**
 * Format issues as markdown table
 */
function formatIssuesMarkdown(issueList) {
  if (issueList.length === 0) return '| (none) | | | |\n';

  return issueList.map(issue =>
    `| ${issue.path} | \`${issue.value}\` | ${issue.message} | ${issue.severity === 'error' ? '🔴' : '🟡'} |`
  ).join('\n') + '\n';
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Validating Figma tokens...\n');

  // Get all token files
  const tokenFiles = fs.readdirSync(TOKENS_DIR).filter(f => f.endsWith('.tokens.json'));
  stats.totalFiles = tokenFiles.length;

  // Collect all token paths across all files for cross-file alias resolution
  const allTokenPaths = new Set();
  const allTokensContent = {};

  for (const file of tokenFiles) {
    const content = fs.readFileSync(path.join(TOKENS_DIR, file), 'utf8');
    const tokens = JSON.parse(content);
    allTokensContent[file] = tokens;

    // Check for empty files
    if (Object.keys(tokens).length === 0) {
      stats.emptyFiles++;
      issues.push({
        type: 'EMPTY_FILE',
        path: file,
        value: '{}',
        message: 'Token file is empty - brand tokens may not be exported',
        severity: 'warning',
      });
      continue;
    }

    const paths = collectTokenPaths(tokens);
    for (const p of paths) {
      allTokenPaths.add(p);
    }
  }

  // Validate each file
  for (const file of tokenFiles) {
    const tokens = allTokensContent[file];
    if (Object.keys(tokens).length > 0) {
      walkTokens(tokens, '', allTokenPaths);
    }
  }

  // Print summary
  console.log('📊 Summary');
  console.log(`   Files scanned: ${stats.totalFiles}`);
  console.log(`   Empty files: ${stats.emptyFiles}`);
  console.log(`   Total tokens: ${stats.totalTokens}`);
  console.log(`   Issues found: ${issues.length}\n`);

  if (issues.length === 0) {
    console.log('✅ No issues found!\n');
    return;
  }

  // Group by type
  const byType = {};
  for (const issue of issues) {
    if (!byType[issue.type]) byType[issue.type] = [];
    byType[issue.type].push(issue);
  }

  // Print issues grouped by type
  console.log('⚠️  Issues by type:\n');
  for (const [type, typeIssues] of Object.entries(byType)) {
    console.log(`### ${type} (${typeIssues.length})`);
    for (const issue of typeIssues.slice(0, 10)) {
      console.log(`   ${issue.severity === 'error' ? '🔴' : '🟡'} ${issue.path}`);
      console.log(`      Value: ${issue.value}`);
      console.log(`      ${issue.message}`);
    }
    if (typeIssues.length > 10) {
      console.log(`   ... and ${typeIssues.length - 10} more`);
    }
    console.log('');
  }

  // Generate markdown for TOKEN-ISSUES.md
  console.log('─'.repeat(60));
  console.log('\n📋 Markdown for TOKEN-ISSUES.md:\n');

  const unresolvedAliases = issues.filter(i => i.type === 'UNRESOLVED_ALIAS' || i.type === 'SELF_REFERENCE');
  const nullValues = issues.filter(i => i.type === 'NULL_VALUE' || i.type === 'EMPTY_VALUE');
  const emptyFiles = issues.filter(i => i.type === 'EMPTY_FILE');
  const otherIssues = issues.filter(i => !['UNRESOLVED_ALIAS', 'SELF_REFERENCE', 'NULL_VALUE', 'EMPTY_VALUE', 'EMPTY_FILE'].includes(i.type));

  console.log('### Unresolved Aliases');
  console.log('| Token Path | Current Value | Issue | Severity |');
  console.log('|------------|---------------|-------|----------|');
  console.log(formatIssuesMarkdown(unresolvedAliases));

  console.log('### Null/Empty Values');
  console.log('| Token Path | Current Value | Issue | Severity |');
  console.log('|------------|---------------|-------|----------|');
  console.log(formatIssuesMarkdown(nullValues));

  console.log('### Empty Token Files');
  console.log('| File | Current Value | Issue | Severity |');
  console.log('|------|---------------|-------|----------|');
  console.log(formatIssuesMarkdown(emptyFiles));

  if (otherIssues.length > 0) {
    console.log('### Other Issues');
    console.log('| Token Path | Current Value | Issue | Severity |');
    console.log('|------------|---------------|-------|----------|');
    console.log(formatIssuesMarkdown(otherIssues));
  }

  console.log('\n💡 Copy the tables above into tokens/TOKEN-ISSUES.md');
  console.log('   Then share with the Figma design system maintainer.\n');
}

main();
