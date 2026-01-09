# Implementation Plan: CHG Unified Design System

## Architectural Decision: Styling Approach

**Status:** ✅ DECIDED - Full Tailwind CSS

### Decision Rationale

**Multi-tenant architecture:** Build-time brand selection (Scenario 1)
- Each brand deployed separately (weatherby.app.com, comphealth.app.com, etc.)
- No runtime theme switching required
- Each deployment has its own Tailwind config with brand-specific tokens

**Chosen Approach: Full Tailwind CSS (Option 1)**

**Benefits for this architecture:**
- ✅ Clean syntax: `bg-brand-600 hover:bg-brand-700` (no CSS variables needed)
- ✅ Excellent IntelliSense: full autocomplete for all design tokens
- ✅ Smallest bundles: 20-30KB per brand (tree-shaking removes unused utilities)
- ✅ Type-safe: can generate TypeScript types from config
- ✅ Standard Tailwind: team familiarity, full documentation applies
- ✅ Proven approach: untitled-design-system uses this successfully

**Build strategy:**
```bash
# Per-brand builds with different configs
BRAND=weatherby npm run build    # Uses weatherby colors
BRAND=comphealth npm run build   # Uses comphealth colors
```

**Component example:**
```tsx
// Same component code works for all brands
export function Button({ size = 'md', ...props }) {
  return (
    <button
      className={cx(
        'inline-flex items-center gap-2 rounded-lg font-semibold',
        'bg-brand-600 text-white hover:bg-brand-700',
        'focus-visible:ring-4 focus-visible:ring-brand-100',
        size === 'sm' && 'px-3 py-2 text-sm',
        size === 'md' && 'px-3.5 py-2.5 text-sm',
      )}
      {...props}
    />
  )
}
```

Each brand deployment gets `bg-brand-600` resolved to their specific color at build time.

**Rejected alternatives:**
- ❌ CSS Variables/Modules: Unnecessary complexity for build-time theming
- ❌ Hybrid: Runtime CSS variable switching not needed for Scenario 1

**See detailed analysis in Appendix A (for reference only).**

---

## Overview

Create a new design system at `/Users/jengland/react-prototypes/chg/chg-unified-ds` that:
- Supports **multiple Figma source files** (namespace-based organization)
- Builds components from scratch using **React + React Aria + [STYLING APPROACH TBD]**
- Includes **Storybook** stories for documentation
- Provides **Figma Code Connect** integration
- Excludes CLI/distribution logic

## User Preferences Applied

✓ **Namespace by source** organization (src/components/source-a/, source-b/, etc.)
✓ **React Aria Components** for accessibility
✓ **Design tokens ready** (tokens exported and CSS variables generated)
✓ **Styling approach** - Full Tailwind CSS (build-time brand theming)
✓ **Multi-tenant architecture** - Build-time brand selection (one brand per deployment)
⚠️ **Component list** to be provided after setup

## Phase 1: Project Initialization

### 1.1 Create Project Directory & Initialize

**Directory:** `/Users/jengland/react-prototypes/chg/chg-unified-ds`

Create the following structure:
```
chg-unified-ds/
├── .storybook/
├── scripts/
├── src/
│   ├── components/
│   ├── foundations/
│   ├── styles/
│   └── utils/
└── tokens/
```

### 1.2 Create package.json

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/package.json`

```json
{
  "name": "chg-unified-ds",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build",
    "build:tokens": "node scripts/build-tokens.js",
    "figma:publish": "figma connect publish"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-aria-components": "^1.9.0",
    "tailwind-merge": "^3.0.0"
  },
  "devDependencies": {
    "@figma/code-connect": "^1.2.0",
    "@storybook/addon-essentials": "^8.5.0",
    "@storybook/react": "^8.5.0",
    "@storybook/react-vite": "^8.5.0",
    "@tailwindcss/vite": "^4.1.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "@vitejs/plugin-react": "^4.3.0",
    "storybook": "^8.5.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.8.0",
    "vite": "^6.0.0"
  }
}
```

**Action:** Run `npm install` after creating this file.

## Phase 2: Configuration Files

### 2.1 TypeScript Configuration

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", ".storybook"]
}
```

### 2.2 Tailwind Configuration

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/tailwind.config.js`

Start with a base token structure (user will update with their exported tokens):

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // Base colors
      base: {
        white: '#ffffff',
        black: '#000000',
        transparent: 'transparent',
      },
      // Gray scale (to be updated from Figma tokens)
      gray: {
        25: '#fdfdfd',
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a',
      },
      // Brand colors (placeholder - update from Figma)
      brand: {
        25: '#f5f8ff',
        50: '#eff4ff',
        100: '#d1e0ff',
        200: '#b2ccff',
        300: '#84adff',
        400: '#528bff',
        500: '#2970ff',
        600: '#155eef',
        700: '#004eeb',
        800: '#0040c1',
        900: '#00359e',
        950: '#002266',
      },
      // Semantic aliases
      primary: {
        25: '#f5f8ff',
        50: '#eff4ff',
        100: '#d1e0ff',
        200: '#b2ccff',
        300: '#84adff',
        400: '#528bff',
        500: '#2970ff',
        600: '#155eef',
        700: '#004eeb',
        800: '#0040c1',
        900: '#00359e',
        950: '#002266',
      },
      error: {
        25: '#fffbfa',
        50: '#fef3f2',
        100: '#fee4e2',
        200: '#fecdca',
        300: '#fda29b',
        400: '#f97066',
        500: '#f04438',
        600: '#d92d20',
        700: '#b42318',
        800: '#912018',
        900: '#7a271a',
        950: '#55160c',
      },
      destructive: {
        25: '#fffbfa',
        50: '#fef3f2',
        100: '#fee4e2',
        200: '#fecdca',
        300: '#fda29b',
        400: '#f97066',
        500: '#f04438',
        600: '#d92d20',
        700: '#b42318',
        800: '#912018',
        900: '#7a271a',
        950: '#55160c',
      },
    },
    spacing: {
      0: '0px',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
    borderRadius: {
      none: '0px',
      xxs: '2px',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '10px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '20px',
      '4xl': '24px',
      full: '9999px',
    },
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
```

**Note:** User will replace these tokens with their actual Figma exports.

### 2.3 Figma Code Connect Configuration

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/figma.config.json`

```json
{
  "codeConnect": {
    "include": [
      "src/components/**/*.figma.tsx"
    ],
    "exclude": [
      "src/components/**/*.stories.tsx"
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 2.4 Environment Variables

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/.env.example`

```env
# Figma Personal Access Token
# Get from: https://www.figma.com/settings (Personal Access Tokens section)
# Required for: npm run figma:publish
FIGMA_ACCESS_TOKEN=your_token_here
```

### 2.5 Git Ignore

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/.gitignore`

```
# Dependencies
node_modules/

# Build outputs
storybook-static/
dist/

# Environment
.env
.env.local

# IDE
.DS_Store
.vscode/
.idea/

# Temp
*.log
```

## Phase 3: Storybook Configuration

### 3.1 Storybook Main Config

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../src/foundations/**/*.mdx',
    '../src/components/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import('@tailwindcss/vite')
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
        },
      },
    })
  },
}

export default config
```

### 3.2 Storybook Preview Config

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/.storybook/preview.ts`

```typescript
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
```

## Phase 4: Source Files

### 4.1 Styles

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/src/styles/globals.css`

```css
@import 'tailwindcss';
@config '../../tailwind.config.js';
@import './tokens.css';
```

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/src/styles/tokens.css`

```css
/* Generated from Figma tokens via npm run build:tokens */
/* DO NOT EDIT MANUALLY */
```

### 4.2 Utilities

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/src/utils/cx.ts`

```typescript
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display-xs', 'display-sm', 'display-md', 'display-lg', 'display-xl', 'display-2xl'],
    },
  },
})

/**
 * Merges Tailwind CSS classes with conflict resolution
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return twMerge(classes.filter(Boolean).join(' '))
}

/**
 * Helper for organizing style objects - enables Tailwind IntelliSense sorting
 */
export function sortCx<T extends Record<string, any>>(classes: T): T {
  return classes
}
```

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/src/utils/is-react-component.ts`

```typescript
import type React from 'react'

type ReactComponent = React.FC<any> | React.ComponentClass<any, any>

export const isFunctionComponent = (component: any): component is React.FC<any> => {
  return typeof component === 'function'
}

export const isClassComponent = (component: any): component is React.ComponentClass<any, any> => {
  return typeof component === 'function' && component.prototype && (!!component.prototype.isReactComponent || !!component.prototype.render)
}

export const isForwardRefComponent = (component: any): component is React.ForwardRefExoticComponent<any> => {
  return typeof component === 'object' && component !== null && component.$$typeof?.toString() === 'Symbol(react.forward_ref)'
}

export const isReactComponent = (component: any): component is ReactComponent => {
  return isFunctionComponent(component) || isForwardRefComponent(component) || isClassComponent(component)
}
```

## Phase 5: Build Scripts

### 5.1 Token Build Script

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/scripts/build-tokens.js`

```javascript
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
```

## Phase 6: Documentation

### 6.1 Development Guide

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/CLAUDE.md`

```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with the CHG Unified Design System.

## Project Overview

CHG Unified Design System is a multi-source design system with components built from React Aria and Tailwind CSS 4. Components maintain 1:1 parity with multiple Figma design files.

## Figma Sources

This project references multiple Figma files. Components are organized by source:

```
src/components/
  source-a/          # Components from Figma file A
  source-b/          # Components from Figma file B
  shared/            # Shared/common components
```

## Commands

```bash
npm run dev              # Start Storybook on port 6006
npm run build            # Build Storybook
npm run build:tokens     # Regenerate CSS from Figma tokens
npm run figma:publish    # Publish Figma Code Connect
```

**Note:** `figma:publish` requires `FIGMA_ACCESS_TOKEN` in .env file.

## Architecture

### Design Token Flow
```
Figma Variables → Export Plugin → tokens/*.tokens.json → build-tokens.js → src/styles/tokens.css
                                                                          → tailwind.config.js (manual updates)
```

When tokens change in Figma:
1. Export via Plugins → Development → Variables Export
2. Save JSON to `tokens/[source-name].tokens.json`
3. Run `npm run build:tokens` to regenerate CSS variables
4. Update `tailwind.config.js` if semantic token changes are needed

### Component Structure

Components are organized by Figma source. Each component lives in `src/components/<source>/<name>/` with:
- `<name>.tsx` - React Aria component with doc header
- `<name>.stories.tsx` - Storybook stories (final story must be "Figma")
- `<name>.figma.tsx` - Figma Code Connect file
- `index.ts` - Barrel exports

Use `cx()` from `@/utils/cx` for className merging. Use `sortCx()` for organizing style objects.

### Styling

- Tailwind 4 with `@import 'tailwindcss'` syntax
- Config reference: `@config '../../tailwind.config.js'`
- Semantic aliases: `primary` (brand), `destructive` (error)

## Component Development Workflow

1. **Get Figma Component**: Identify component and its source Figma file
2. **Create Component Structure**:
   - Determine the source (e.g., source-a, source-b, shared)
   - Create: `src/components/<source>/[name]/`
   - Add component file with doc header linking to Figma
3. **Build Component**:
   - Use React Aria primitives for accessibility
   - Style with Tailwind CSS 4
   - Use `sortCx()` for organizing variant styles
4. **Create Stories**:
   - Organize ArgTypes by category (Appearance, State, Icons, Content, Behavior, Advanced)
   - Include comprehensive examples
   - Final story must be "Figma" with link to source
5. **Set up Code Connect**:
   - Create .figma.tsx file
   - Use component SET node-id (colon format: `18:30003`)
   - Map Figma properties to React props

## Storybook Stories

ArgTypes should be organized by category:
- **Appearance**: size, color, variant
- **State**: isDisabled, isLoading, isSelected
- **Icons**: iconLeading, iconTrailing, icon
- **Content**: children, label, title, description
- **Behavior**: href, onChange, onPress
- **Advanced**: className, style

Final story must be titled "Figma" and link back to the source.

## Commit Messages

```
<type>(<scope>): <message>

- bullet points
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`

Do not add AI attribution or promotional footers.
```

### 6.2 Project README

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/README.md`

```markdown
# CHG Unified Design System

A multi-source design system built with React, React Aria Components, and Tailwind CSS 4.

## Features

- ✓ Components from multiple Figma sources
- ✓ React Aria Components for accessibility
- ✓ Tailwind CSS 4 for styling
- ✓ Storybook for documentation
- ✓ Figma Code Connect integration
- ✓ Design token workflow

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens Storybook on http://localhost:6006

### Building

```bash
npm run build
```

## Token Workflow

1. Export design tokens from Figma:
   - Open Figma file
   - Plugins → Development → Variables Export
   - Save as `tokens/[source-name].tokens.json`

2. Generate CSS:
   ```bash
   npm run build:tokens
   ```

3. Update `tailwind.config.js` if semantic changes are needed

## Figma Code Connect

Publish component connections to Figma:

```bash
npm run figma:publish
```

Requires `FIGMA_ACCESS_TOKEN` in `.env` file.

## Project Structure

```
src/
  components/
    source-a/       # Components from Figma source A
    source-b/       # Components from Figma source B
    shared/         # Shared components
  foundations/      # Design foundation docs
  styles/           # Global styles and tokens
  utils/            # Utility functions
```

## Adding Components

See [CLAUDE.md](./CLAUDE.md) for detailed component development workflow.
```

## Phase 7: Token Integration

### 7.1 Add User's Token Files

**Directory:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/tokens/`

User will place their exported Figma token JSON files here:
- Example: `source-a.tokens.json`
- Example: `source-b.tokens.json`

### 7.2 Generate CSS from Tokens

**Action:** Run `npm run build:tokens`

This will:
- Read all `.tokens.json` files from `tokens/` directory
- Generate CSS custom properties
- Output to `src/styles/tokens.css`

### 7.3 Update Tailwind Config with Actual Tokens

**File:** `/Users/jengland/react-prototypes/chg/chg-unified-ds/tailwind.config.js`

User should update the color scales, spacing, typography, and other tokens to match their Figma exports.

## Phase 8: Component Development Setup

### 8.1 Create Component Directory Structure

Create source-specific directories based on user's Figma files:

```
src/components/
  source-a/          # To be created when first component is added
  source-b/          # To be created when first component is added
  shared/            # For shared/common components
```

**Note:** Actual directory names will be based on user's specific Figma file names/sources.

### 8.2 Component Template

When building components, follow this structure:

```
src/components/<source>/<component-name>/
  <component-name>.tsx           # React component
  <component-name>.stories.tsx   # Storybook stories
  <component-name>.figma.tsx     # Figma Code Connect
  index.ts                       # Exports
```

## Critical Files Summary

### Must Create First (Foundation):

1. **package.json** - Dependencies and scripts
2. **tsconfig.json** - TypeScript configuration
3. **tailwind.config.js** - Design token source of truth
4. **.storybook/main.ts** - Storybook config
5. **.storybook/preview.ts** - Storybook preview
6. **src/styles/globals.css** - Tailwind imports
7. **src/utils/cx.ts** - Class merging utility
8. **src/utils/is-react-component.ts** - Component detection utility
9. **scripts/build-tokens.js** - Token generation script
10. **figma.config.json** - Code Connect configuration

### Documentation:

11. **CLAUDE.md** - Development workflow guide
12. **README.md** - Project overview
13. **.env.example** - Environment variable template
14. **.gitignore** - Git ignore rules

### Token Integration (After Setup):

15. **tokens/*.tokens.json** - User-provided Figma token exports
16. **src/styles/tokens.css** - Generated CSS variables (via `npm run build:tokens`)

## Verification Steps

After completing the setup, verify the project works:

### 1. Install Dependencies
```bash
cd /Users/jengland/react-prototypes/chg/chg-unified-ds
npm install
```

### 2. Integrate Token Files
```bash
# User places token files in tokens/ directory
npm run build:tokens
# Verify src/styles/tokens.css is generated
```

### 3. Start Storybook
```bash
npm run dev
# Should open on http://localhost:6006
# Verify Storybook loads without errors
```

### 4. Verify Configuration
- Check that Tailwind CSS is working
- Check that path aliases (@/) resolve correctly
- Check that TypeScript compilation works (no errors in terminal)

### 5. Test Token Integration
- Create a simple test component to verify Tailwind classes work
- Verify colors, spacing, and typography render correctly

## Next Steps After Setup

Once the project is set up and verified:

1. **User provides component list** - Which components to build from Figma
2. **User provides Figma file details** - URLs and source organization
3. **Begin component development** - Follow the workflow in CLAUDE.md
4. **Create Storybook stories** - Document each component
5. **Set up Code Connect** - Link components to Figma

## Key Architectural Decisions

✓ **React Aria Components** - Used for accessibility (keyboard nav, ARIA attributes, focus management)
✓ **Namespace by source** - Components organized by Figma file source
✓ **Tailwind CSS 4** - Modern Tailwind with CSS imports and path config
✓ **Storybook** - Documentation and development environment
✓ **Code Connect** - Figma-to-code synchronization
✓ **Token workflow** - Figma → JSON → CSS → Tailwind config

## Differences from Original untitled-design-system

**Removed:**
- ❌ CLI package (`packages/cli/`)
- ❌ Registry sync script (`scripts/sync-registry.js`)
- ❌ Untitled UI component imports
- ❌ Distribution/build logic

**Added:**
- ✅ Multiple Figma source support (namespace-based organization)
- ✅ Source-specific token files
- ✅ Simplified scripts (only dev, build, build:tokens, figma:publish)

**Kept:**
- ✅ React Aria Components for accessibility
- ✅ Tailwind CSS 4 styling approach (PENDING ARCHITECTURAL DECISION)
- ✅ Storybook documentation
- ✅ Figma Code Connect integration
- ✅ Token generation workflow
- ✅ Component structure pattern
- ✅ Utility functions (cx, sortCx, is-react-component)

---

## Appendix A: Detailed Styling Approach Analysis

### Comparison Matrix

| Aspect | Tailwind CSS | CSS Variables/Modules | Hybrid Approach |
|--------|--------------|----------------------|-----------------|
| **Bundle Size** | 20-30KB (optimized) | 50-70KB (unoptimized) | 25-35KB |
| **Learning Curve** | Steep (utility names) | Gentle (standard CSS) | Moderate |
| **DX - IntelliSense** | Excellent | Good | Excellent |
| **Token Updates** | Manual config update | Automatic | Mostly automatic |
| **Maintenance** | Medium | Low | Medium |
| **Team Onboarding** | Requires Tailwind knowledge | Standard CSS | Mixed |
| **Customization** | Limited to theme | Unlimited | Flexible |
| **Refactoring Risk** | Medium | Low | Low-Medium |
| **Dark Mode Support** | Config-based | CSS variable swap | CSS variable swap |
| **Component Portability** | High (utilities portable) | High (standard CSS) | High |

### Code Examples

#### Option 1: Tailwind CSS Only

```tsx
// button.tsx
export const Button = ({ size = 'md', color = 'primary', ...props }) => {
  return (
    <button
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
        'focus-visible:ring-4 focus-visible:ring-brand-100',
        'disabled:cursor-not-allowed disabled:opacity-60',
        size === 'sm' && 'px-3 py-2 text-sm',
        size === 'md' && 'px-3.5 py-2.5 text-sm',
        size === 'lg' && 'px-4 py-3 text-base',
        color === 'primary' && 'bg-brand-600 text-white hover:bg-brand-700',
        color === 'secondary' && 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50'
      )}
      {...props}
    />
  )
}
```

**Pros:**
- Single file, all styling inline
- IntelliSense works perfectly
- Small bundle (tree-shaken)
- Fast development

**Cons:**
- Long className strings
- Tailwind config must be manually updated when tokens change
- Locked into Tailwind ecosystem

#### Option 2: CSS Variables/Modules Only

```tsx
// button.tsx
import styles from './button.module.css'

export const Button = ({ size = 'md', color = 'primary', ...props }) => {
  return (
    <button
      className={cx(
        styles.root,
        styles[`size-${size}`],
        styles[`color-${color}`]
      )}
      {...props}
    />
  )
}
```

```css
/* button.module.css */
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--uds-spacing-2);
  padding: var(--uds-spacing-4) var(--uds-spacing-8);
  border-radius: var(--uds-radius-lg);
  font-size: var(--uds-text-sm-size);
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.root:focus-visible {
  outline: 2px solid var(--uds-color-brand-600);
  outline-offset: 2px;
}

.root:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.size-sm {
  padding: var(--uds-spacing-2) var(--uds-spacing-4);
  font-size: var(--uds-text-xs-size);
}

.size-md {
  padding: var(--uds-spacing-4) var(--uds-spacing-8);
  font-size: var(--uds-text-sm-size);
}

.size-lg {
  padding: var(--uds-spacing-6) var(--uds-spacing-12);
  font-size: var(--uds-text-base-size);
}

.color-primary {
  background-color: var(--uds-color-brand-600);
  color: white;
}

.color-primary:hover:not(:disabled) {
  background-color: var(--uds-color-brand-700);
}

.color-secondary {
  background-color: white;
  color: var(--uds-color-gray-700);
  border: 1px solid var(--uds-color-gray-300);
}

.color-secondary:hover:not(:disabled) {
  background-color: var(--uds-color-gray-50);
}
```

**Pros:**
- Direct CSS variable usage (tokens auto-update)
- Traditional CSS workflow
- No third-party dependencies
- Full control over styling

**Cons:**
- Larger bundle size
- More files to maintain
- Manual class name construction
- No IntelliSense for variable names

#### Option 3: Hybrid Approach (Recommended)

```tsx
// button.tsx
export const Button = ({ size = 'md', color = 'primary', ...props }) => {
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-3.5 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
  }

  const colorStyles = {
    primary: 'bg-[var(--uds-color-brand-600)] text-white hover:bg-[var(--uds-color-brand-700)]',
    secondary: 'bg-white text-[var(--uds-color-gray-700)] ring-1 ring-[var(--uds-color-gray-300)] hover:bg-[var(--uds-color-gray-50)]',
  }

  return (
    <button
      className={cx(
        // Layout utilities from Tailwind
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
        'focus-visible:ring-4 focus-visible:ring-[var(--uds-color-brand-100)]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        // Size from Tailwind
        sizeStyles[size],
        // Colors from CSS variables
        colorStyles[color]
      )}
      {...props}
    />
  )
}
```

**Pros:**
- Best of both worlds: Tailwind utilities + CSS variable colors
- Colors auto-update from Figma tokens
- Small bundle (Tailwind tree-shaking)
- Easy dark mode (swap CSS variables)
- Flexible (can use either approach as needed)

**Cons:**
- Mixed approach requires understanding both systems
- Slightly more complex syntax for CSS variable colors

### Token Update Workflow Comparison

#### Tailwind Approach

```bash
# 1. Export from Figma
curl -H "X-Figma-Token: ..." "https://api.figma.com/..." > tokens/figma-api-response.json

# 2. Transform to W3C format
node scripts/transform-figma-tokens.cjs

# 3. Build CSS variables
npm run build:tokens

# 4. MANUALLY update tailwind.config.js
# (This is the pain point - requires developer to map new tokens)

# 5. Rebuild components
npm run dev
```

**Pain Point:** Step 4 requires manual updates to `tailwind.config.js` when token structure changes.

#### CSS Variables Approach

```bash
# 1. Export from Figma
curl -H "X-Figma-Token: ..." "https://api.figma.com/..." > tokens/figma-api-response.json

# 2. Transform to W3C format
node scripts/transform-figma-tokens.cjs

# 3. Build CSS variables
npm run build:tokens

# 4. Done! Components automatically pick up new variables
npm run dev
```

**Benefit:** No manual config updates needed. CSS variables cascade automatically.

#### Hybrid Approach

```bash
# 1-3. Same as CSS Variables approach

# 4. OPTIONAL: Update tailwind.config.js for new utilities
# (Only if you want Tailwind classes for new tokens)

# 5. Components work immediately with CSS variables
# Add Tailwind utilities for new tokens as needed
npm run dev
```

**Benefit:** Immediate token updates via CSS variables, opt-in Tailwind utilities.

### Implementation Recommendations

#### Short-term (Months 1-3)
**Recommendation: Hybrid Approach**

Start with the hybrid approach because:
1. Your tokens are already exported as CSS variables
2. Tailwind is already configured (fast component development)
3. Colors can use CSS variables (easy theme switching later)
4. Layout utilities from Tailwind (excellent DX)

**Initial component pattern:**
```tsx
// Use Tailwind for layout, CSS variables for colors
<button className={cx(
  'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold',  // Tailwind
  'bg-[var(--uds-color-primary)] text-white'  // CSS variable
)}>
```

#### Medium-term (Months 4-9)
**Add semantic Tailwind aliases**

Create semantic color aliases in `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': 'var(--uds-color-brand-600)',
        'primary-hover': 'var(--uds-color-brand-700)',
        'secondary': 'var(--uds-color-gray-700)',
      }
    }
  }
}
```

**Updated component pattern:**
```tsx
// Cleaner syntax with semantic aliases
<button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-primary text-white hover:bg-primary-hover">
```

#### Long-term (Months 10+)
**Evaluate based on usage patterns**

If you find:
- **Lots of custom styling needed:** Add CSS Modules for complex components
- **Tailwind working well:** Continue with hybrid approach
- **Team prefers CSS:** Gradually move to CSS Modules + variables

### Migration Safety

Both approaches are reversible:

**Tailwind → CSS Variables:**
```bash
# For each component:
# 1. Create .module.css file
# 2. Extract Tailwind classes to CSS rules
# 3. Replace className with module classes
# 4. Remove Tailwind dependency
```

**CSS Variables → Tailwind:**
```bash
# For each component:
# 1. Map CSS rules to Tailwind utilities
# 2. Update tailwind.config.js with custom values
# 3. Replace className with utility classes
# 4. Remove .module.css files
```

### Decision Factors

**Choose Tailwind if:**
- Bundle size is critical (< 30KB)
- Team is JavaScript/React-focused
- Want fast prototyping with IntelliSense
- Building exportable component library
- Using Next.js/Vite (excellent Tailwind support)

**Choose CSS Variables/Modules if:**
- Full control is priority
- Team has strong CSS expertise
- Need maximum customization
- Building internal tools (not public library)
- Want zero third-party dependencies

**Choose Hybrid if:**
- Want flexibility to use either approach
- Need small bundles + easy theming
- Building design system with multiple themes
- Want fast DX + future-proof architecture
- **This is the recommended default choice**

---

## Implementation Changes Based on Architectural Decision

The following sections of this plan will need to be adjusted based on the chosen approach:

### If Tailwind CSS (Option 1):
- Keep current `package.json` dependencies (tailwind, @tailwindcss/vite)
- Update `tailwind.config.js` with actual token values from Figma
- Components use utility classes with `cx()` helper
- Build script auto-generates `tailwind.config.js` from tokens (optional enhancement)

### If CSS Variables/Modules (Option 2):
- Remove Tailwind dependencies from `package.json`
- Remove `tailwind.config.js`
- Update `.storybook/main.ts` to remove Tailwind Vite plugin
- Create `.module.css` files for each component
- Update component patterns to use CSS module classes

### Actual Implementation: Full Tailwind CSS (Option 1)

**Current Status: Baseline setup complete**
- ✅ Base `tailwind.config.js` exists with placeholder tokens
- ✅ Figma tokens exported to `tokens/` directory
- ✅ CSS variables generated in `src/styles/tokens.css`

**Next Steps for Multi-Brand Setup:**

1. **Create brand-specific Tailwind configs:**
   ```
   tailwind.config.js              # Base config (shared utilities)
   tailwind.config.weatherby.js    # Weatherby brand colors
   tailwind.config.comphealth.js   # CompHealth brand colors
   tailwind.config.modio.js        # Modio brand colors
   ...etc for other brands
   ```

2. **Update build scripts to support brand selection:**
   ```json
   {
     "scripts": {
       "dev": "BRAND=${BRAND:-weatherby} storybook dev",
       "build": "BRAND=${BRAND:-weatherby} storybook build",
       "build:weatherby": "BRAND=weatherby npm run build",
       "build:comphealth": "BRAND=comphealth npm run build"
     }
   }
   ```

3. **Map Figma tokens to Tailwind config:**
   - Extract color tokens from `tokens/Weatherby.Light.tokens.json`
   - Map to Tailwind color scale in brand-specific config
   - Use semantic naming: `brand`, `secondary`, `gray`, etc.

4. **Component development pattern:**
   ```tsx
   // Same code works for all brands
   <button className="bg-brand-600 hover:bg-brand-700">
   ```
   Build-time: `bg-brand-600` resolves to brand-specific color

5. **Testing strategy:**
   - Develop against one brand (e.g., Weatherby)
   - Build other brands to verify portability
   - Storybook can show multiple brand variants

**Implementation will follow the existing untitled-design-system patterns with per-brand config support added.**
