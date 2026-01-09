# CHG Unified Design System - Implementation Plan

**Plan Version:** 2.0 (Opus 4.5 Review)
**Last Updated:** 2026-01-09
**Status:** Ready for Implementation

---

## Executive Summary

A multi-brand design system built with React, React Aria, and Tailwind CSS 4. Supports 6 CHG brands with:
- **Storybook** for documentation with runtime brand/theme switching
- **npm package** distribution for controlled consumption
- **Figma Code Connect** for design-code synchronization
- **Dark mode** support across all brands

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    CHG UNIFIED DESIGN SYSTEM                    │
├─────────────────────────────────────────────────────────────────┤
│  Source: Single Figma File                                      │
│  Brands: Weatherby, CompHealth, Modio, Connect, LocumSmart,    │
│          Wireframe                                              │
│  Modes: Light + Dark                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │   STORYBOOK     │    │   NPM PACKAGE   │                    │
│  │   (Documentation)│    │   (Distribution) │                   │
│  │                 │    │                 │                    │
│  │ • Runtime theme │    │ • Build-time    │                    │
│  │   switching     │    │   brand builds  │                    │
│  │ • All 6 brands  │    │ • Tree-shaken   │                    │
│  │ • Light/Dark    │    │ • Type-safe     │                    │
│  └─────────────────┘    └─────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Styling | Tailwind CSS 4 | Team familiarity, excellent DX, small bundles |
| Accessibility | React Aria Components | Proven, maintained by Adobe |
| Distribution | npm package | Prevents forks, version control, controlled updates |
| Figma Source | Single file | Simplified - no namespace complexity needed |
| Theming | Dual approach | Runtime in Storybook, build-time for production |
| Dark Mode | Yes | Tokens already exported, user requirement |

---

## Current Status

### ✅ Completed
- Project scaffolding (package.json, tsconfig.json, etc.)
- Token export from Figma via REST API (16 token files)
- Brand-specific Tailwind configs for 6 brands
- Storybook runtime theme switching (brand dropdown)
- Basic documentation (.planning/ files)

### ❌ Issues to Fix (Priority Order)

#### 1. Fix Unresolved Token Aliases
**File:** `tailwind.config.js`
```javascript
// CURRENT (broken):
borderRadius: {
  0: "{uds.radius.none}px",  // ❌ Unresolved alias
  2: "{uds.radius.2}px",
}
spacing: {
  0: null,  // ❌ Invalid value
}

// SHOULD BE:
borderRadius: {
  0: "0px",
  2: "2px",
  4: "4px",
  // ...
}
spacing: {
  0: "0px",
  2: "2px",
  // ...
}
```

**Fix:** Update `scripts/generate-tailwind-configs.cjs` to resolve these aliases.

#### 2. Implement Dark Mode
**Files to create/update:**
- `.storybook/themes/weatherby-dark.css` (and 5 other brands)
- `.storybook/preview.tsx` - add color mode toggle
- `tailwind.config.storybook.js` - add dark mode CSS variables

**Approach:** Use `data-theme` for brand + `data-mode` for light/dark:
```html
<div data-theme="weatherby" data-mode="dark">
```

#### 3. Restore Production Build Capability
**Current problem:** `.storybook/main.ts` always uses storybook config.

**Fix:** Update to support both modes:
```typescript
// For Storybook: runtime theme switching
const tailwindConfig = process.env.STORYBOOK
  ? 'tailwind.config.storybook.js'
  : `tailwind.config.${process.env.BRAND || 'weatherby'}.js`
```

#### 4. Set Up npm Package Distribution
**Files to add:**
- `vite.config.ts` - library build config
- `package.json` - exports, peerDependencies
- `.github/workflows/publish.yml` - automated publishing

---

## Implementation Phases

### Phase 1: Fix Critical Bugs (Required First)

#### 1.1 Fix Token Alias Resolution
**File:** `scripts/generate-tailwind-configs.cjs`

Update the `resolveAlias` function to handle `{uds.radius.X}` format.

#### 1.2 Fix Spacing and BorderRadius
**File:** `tailwind.config.js`

Replace broken values with actual pixel values.

### Phase 2: Dark Mode Implementation

#### 2.1 Create Dark Theme CSS Files
For each brand, create dark mode CSS variables:
```
.storybook/themes/
├── weatherby.css        # Light mode (exists)
├── weatherby-dark.css   # Dark mode (create)
├── comphealth.css       # Light mode (exists)
├── comphealth-dark.css  # Dark mode (create)
└── ... (repeat for all 6 brands)
```

#### 2.2 Update Storybook Preview
Add color mode toggle to toolbar alongside brand selector:
```typescript
globalTypes: {
  theme: { /* brand selector - exists */ },
  colorMode: {
    description: 'Color mode',
    defaultValue: 'light',
    toolbar: {
      title: 'Mode',
      icon: 'moon',
      items: ['light', 'dark'],
    },
  },
}
```

#### 2.3 Update Decorator
Apply both data attributes:
```tsx
<div data-theme={brand} data-mode={colorMode}>
  <Story />
</div>
```

### Phase 3: Production Build Support

#### 3.1 Create Vite Library Config
**File:** `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CHGDesignSystem',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-aria-components'],
    },
  },
})
```

#### 3.2 Update package.json
```json
{
  "name": "@chg/design-system",
  "version": "0.1.0",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js"
    },
    "./styles": "./dist/style.css",
    "./tailwind": "./tailwind.config.js"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build:storybook": "storybook build",
    "build:lib": "vite build",
    "build:lib:weatherby": "BRAND=weatherby vite build",
    "build:lib:comphealth": "BRAND=comphealth vite build"
  }
}
```

### Phase 4: npm Package Publishing

#### 4.1 Registry: GitHub Packages (Decided)
- Free with GitHub organization
- Teams authenticate using their existing GitHub tokens
- Easy CI/CD integration with GitHub Actions

#### 4.2 Create Publish Workflow
**File:** `.github/workflows/publish.yml`
```yaml
name: Publish Package
on:
  push:
    tags: ['v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://npm.pkg.github.com'
      - run: npm ci
      - run: npm run build:lib
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Phase 5: Component Development

#### 5.1 Component Structure
Since there's a single Figma source, simplified structure:
```
src/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   ├── Button.figma.tsx
│   └── index.ts
├── Input/
└── ...
```

#### 5.2 Component Template
```tsx
// Button.tsx
import { Button as AriaButton } from 'react-aria-components'
import { cx } from '@/utils/cx'

export interface ButtonProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
}

export function Button({ size = 'md', variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <AriaButton
      className={cx(
        'inline-flex items-center justify-center rounded-lg font-semibold',
        'focus-visible:ring-4 focus-visible:ring-brand-100',
        'disabled:cursor-not-allowed disabled:opacity-60',
        size === 'sm' && 'px-3 py-2 text-sm',
        size === 'md' && 'px-4 py-2.5 text-sm',
        size === 'lg' && 'px-5 py-3 text-base',
        variant === 'primary' && 'bg-brand-600 text-white hover:bg-brand-700',
        variant === 'secondary' && 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50',
        variant === 'ghost' && 'bg-transparent text-gray-700 hover:bg-gray-100',
      )}
      {...props}
    >
      {children}
    </AriaButton>
  )
}
```

---

## File Structure (Final)

```
chg-unified-ds/
├── .github/
│   └── workflows/
│       └── publish.yml           # npm publish automation
├── .storybook/
│   ├── main.ts                   # Storybook config
│   ├── preview.tsx               # Theme/mode decorators
│   └── themes/
│       ├── weatherby.css         # Light mode
│       ├── weatherby-dark.css    # Dark mode
│       └── ... (12 total files)
├── scripts/
│   ├── build-tokens.cjs
│   ├── transform-figma-tokens.cjs
│   └── generate-tailwind-configs.cjs
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── ...
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   ├── utils/
│   │   └── cx.ts
│   └── index.ts                  # Package entry point
├── tokens/                       # Figma token exports
├── tailwind.config.js            # Base config
├── tailwind.config.storybook.js  # CSS variable config
├── tailwind.config.weatherby.js  # Brand-specific
├── tailwind.config.comphealth.js
├── tailwind.config.modio.js
├── tailwind.config.connect.js
├── tailwind.config.locumsmart.js
├── tailwind.config.wireframe.js
├── vite.config.ts                # Library build
├── package.json
└── tsconfig.json
```

---

## Verification Checklist

### After Phase 1 (Bug Fixes)
- [ ] `npm run dev` starts without CSS errors
- [ ] `borderRadius` classes work (e.g., `rounded-8`)
- [ ] `spacing` classes work (e.g., `p-0`, `m-4`)

### After Phase 2 (Dark Mode)
- [ ] Storybook has "Mode" dropdown (light/dark)
- [ ] All 6 brands switch between light/dark
- [ ] Colors change appropriately in dark mode

### After Phase 3 (Production Build)
- [ ] `npm run build:lib` creates `dist/` folder
- [ ] `dist/index.es.js` and `dist/index.cjs.js` exist
- [ ] `dist/style.css` contains component styles

### After Phase 4 (npm Publishing)
- [ ] Package publishes to registry
- [ ] Can install in test project: `npm install @chg/design-system`
- [ ] Components render correctly in consuming app

### After Phase 5 (Components)
- [ ] First component (Button) works in Storybook
- [ ] Component responds to brand/mode changes
- [ ] Figma Code Connect publishes successfully

---

## Potential Complications

### 1. Tailwind CSS 4 Breaking Changes
Tailwind 4 is relatively new. Watch for:
- Config format changes
- Plugin compatibility
- Vite plugin behavior

**Mitigation:** Pin to specific version, test upgrades carefully.

### 2. Private Registry Access
Teams need auth tokens to install from GitHub Packages.

**Mitigation:** Document setup in README, consider fallback options.

### 3. Dark Mode Token Gaps
Figma dark tokens may not cover all states (hover, focus, etc.).

**Mitigation:** Generate missing shades programmatically or flag for designer review.

### 4. React Aria Styling
React Aria components use data attributes for states, not classes.

**Mitigation:** Use `data-*` selectors in Tailwind config or className callbacks.

### 5. Bundle Size
Design systems can grow large quickly.

**Mitigation:** Tree-shaking (already configured), monitor with bundlephobia.

---

## Questions Resolved

| Question | Answer |
|----------|--------|
| Distribution method | npm package (prevents forks) |
| npm Registry | GitHub Packages (free, GitHub-native auth) |
| Dark mode | Yes, implement |
| Figma sources | Single file (simplified) |
| Production builds | Yes, in addition to Storybook |

---

## Token Quality Tracking

### Purpose
The Figma token file was created by a team member and may have gaps or inconsistencies. Rather than silently fixing issues in code, we should:
1. **Track all token issues** found during development
2. **Report back to Figma maintainer** so the source file improves
3. **Document workarounds** used until Figma is fixed

### Token Issues Log

Create a living document at `tokens/TOKEN-ISSUES.md` (lives alongside the token files it references):

```markdown
# Token Issues Log

Issues discovered when transforming Figma tokens to Tailwind config.
Report these to the Figma design system maintainer.

## Format
| Issue | Token Path | Current Value | Expected | Workaround | Status |
|-------|-----------|---------------|----------|------------|--------|

## Active Issues

### Unresolved Aliases
| Issue | Token Path | Current Value | Expected | Workaround | Status |
|-------|-----------|---------------|----------|------------|--------|
| Alias not resolved | uds.radius.none | `{uds.radius.none}` | `0` | Hardcoded in script | 🔴 Open |
| Alias not resolved | uds.radius.2 | `{uds.radius.2}` | `2` | Hardcoded in script | 🔴 Open |

### Null/Missing Values
| Issue | Token Path | Current Value | Expected | Workaround | Status |
|-------|-----------|---------------|----------|------------|--------|
| Null value | spacing.0 | `null` | `0px` | Hardcoded to "0px" | 🔴 Open |

### Missing Tokens
| Issue | Token Path | Current Value | Expected | Workaround | Status |
|-------|-----------|---------------|----------|------------|--------|
| (None found yet) | | | | | |

## Resolved Issues
(Move issues here once fixed in Figma)
```

### Automated Token Validation Script

Create `scripts/validate-tokens.cjs`:

```javascript
#!/usr/bin/env node
/**
 * Token Validation Script
 * Checks Figma token exports for common issues and generates a report.
 *
 * Usage: node scripts/validate-tokens.cjs
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const issues = [];

function validateValue(path, value) {
  // Check for unresolved aliases
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    issues.push({
      type: 'UNRESOLVED_ALIAS',
      path,
      value,
      message: `Alias "${value}" was not resolved to a final value`
    });
  }

  // Check for null values
  if (value === null) {
    issues.push({
      type: 'NULL_VALUE',
      path,
      value: 'null',
      message: 'Value is null - should have a default'
    });
  }

  // Check for empty strings
  if (value === '') {
    issues.push({
      type: 'EMPTY_VALUE',
      path,
      value: '(empty string)',
      message: 'Value is empty string'
    });
  }

  // Check color format
  if (typeof value === 'string' && path.includes('color')) {
    if (!value.match(/^#[0-9a-fA-F]{6}$/) && !value.match(/^rgba?\(/)) {
      issues.push({
        type: 'INVALID_COLOR',
        path,
        value,
        message: 'Color value is not in expected format (#RRGGBB or rgba())'
      });
    }
  }
}

function walkTokens(obj, prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && value.$value !== undefined) {
      validateValue(path, value.$value);
    } else if (value && typeof value === 'object') {
      walkTokens(value, path);
    }
  }
}

// Run validation
const tokenFiles = fs.readdirSync(TOKENS_DIR).filter(f => f.endsWith('.tokens.json'));

console.log('🔍 Validating tokens...\n');

for (const file of tokenFiles) {
  const tokens = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, file), 'utf8'));
  walkTokens(tokens, file.replace('.tokens.json', ''));
}

// Report
if (issues.length === 0) {
  console.log('✅ No issues found!\n');
} else {
  console.log(`⚠️  Found ${issues.length} issue(s):\n`);

  // Group by type
  const byType = {};
  for (const issue of issues) {
    if (!byType[issue.type]) byType[issue.type] = [];
    byType[issue.type].push(issue);
  }

  for (const [type, typeIssues] of Object.entries(byType)) {
    console.log(`\n### ${type} (${typeIssues.length})`);
    for (const issue of typeIssues) {
      console.log(`  - ${issue.path}: ${issue.message}`);
      console.log(`    Current value: ${issue.value}`);
    }
  }

  console.log('\n📋 Copy these findings to .planning/token-issues.md');
}
```

### Add npm Script
```json
{
  "scripts": {
    "validate:tokens": "node scripts/validate-tokens.cjs"
  }
}
```

### Workflow Integration

1. **After token export**: Run `npm run validate:tokens`
2. **Review report**: Note any new issues
3. **Update issue log**: Add to `.planning/token-issues.md`
4. **Report to designer**: Share issues with Figma maintainer
5. **Apply workarounds**: Document temporary fixes in code comments

### Benefits
- **Visibility**: Designer knows exactly what's wrong
- **Tracking**: Issues don't get lost
- **Accountability**: Clear path from discovery to fix
- **Quality**: Figma file improves over time

---

## Next Steps

1. **Approve this plan** - Review and confirm approach
2. **Run token validation** - Create baseline of known issues
3. **Fix critical bugs** - Apply workarounds with documentation
4. **Implement dark mode** - Create dark theme CSS
5. **Set up library build** - Vite config, exports
6. **Build first component** - Button as proof of concept
7. **Test end-to-end** - Storybook + npm install in test app

---

## Post-Approval Actions

1. **Copy this plan** to `.planning/opus-4.5/implementation-plan.md`
2. **Archive existing docs** in `.planning/` (move to `.planning/archive/`)

---

*Plan reviewed and updated by Claude Opus 4.5*
