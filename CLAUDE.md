# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CHG Unified Design System is a multi-brand design system built with React, React Aria Components, and Tailwind CSS 4. It supports 6 CHG brands from a single Figma source file:

- **Weatherby** (default)
- **CompHealth**
- **Modio**
- **Connect**
- **LocumSmart**
- **Wireframe**

## Commands

```bash
npm run dev              # Start Storybook on port 6006
npm run build            # Build Storybook
npm run build:tokens     # Generate CSS from Figma token JSON files
npm run build:tailwind   # Generate brand-specific Tailwind configs from tokens
npm run validate:tokens  # Check token files for issues (aliases, nulls, etc.)
npm run figma:publish    # Publish Figma Code Connect (requires FIGMA_ACCESS_TOKEN)
```

**Note:** The Figma access token can be found in `.mcp.json` under `mcpServers.figma-work.args` (the `--figma-api-key` value).

## Architecture

### Dual Theming Approach

The system uses different strategies for Storybook vs production:

**Storybook (runtime switching):**
- Uses `tailwind.config.storybook.js` with CSS variables (`var(--color-brand-*)`)
- Brand themes defined in `.storybook/themes/*.css` set variable values
- Theme applied via `data-theme` attribute on DOM elements
- Switching happens via Storybook toolbar dropdown

**Production (build-time):**
- Uses brand-specific configs: `tailwind.config.weatherby.js`, etc.
- Colors are hardcoded values, not CSS variables
- Smaller bundle, no runtime overhead
- Build with: `BRAND=weatherby npm run build:lib` (when implemented)

### Design Token Flow

```
Figma Variables → Export Plugin → tokens/*.tokens.json → build-tokens.cjs → src/styles/tokens.css
                                                       → generate-tailwind-configs.cjs → tailwind.config.*.js
```

Token files in `tokens/`:
- `Core.default.tokens.json` - Spacing, radius, animation
- `Primitives.Default.tokens.json` - Color primitives (all 6 brands)
- `Design System.Light.tokens.json` - Semantic tokens (light mode)
- `Design System.Dark.tokens.json` - Semantic tokens (dark mode)

When tokens change in Figma:
1. Export via Plugins → Development → Variables Export
2. Save JSON to `tokens/`
3. Run `npm run validate:tokens` to check for issues
4. Run `npm run build:tokens` and `npm run build:tailwind`
5. Log any new issues in `tokens/TOKEN-ISSUES.md`

### Storybook Theme Switching

Brand switching is implemented in `.storybook/preview.tsx` (note: there's also a simpler `preview.ts` but `preview.tsx` contains the full theme implementation):
- Global type `theme` provides toolbar dropdown
- Decorator applies `data-theme` attribute to story wrapper
- CSS in `.storybook/themes/[brand].css` defines brand color variables

### Component Structure

Components use React Aria for accessibility and Tailwind for styling:

```
src/components/[ComponentName]/
├── [ComponentName].tsx       # Component with React Aria
├── [ComponentName].stories.tsx
├── [ComponentName].figma.tsx # Figma Code Connect
└── index.ts
```

Every component file must have a doc comment linking to Figma source:
```tsx
/**
 * ComponentName component
 * @figma https://www.figma.com/design/<file-id>?node-id=<node-id>
 */
```

## Component Development Workflow

**IMPORTANT: This is a Figma-first design system. Every component MUST have a Figma source.**

### Adding a New Component

1. **Get Figma URL** - Obtain the Figma frame/component URL from the design system file
   - Format: `https://www.figma.com/design/<file-id>?node-id=<node-id>`

2. **Fetch Figma Data** - Use the Figma MCP to inspect the component:
   - Extract variants, properties, and states
   - Note spacing, colors, typography tokens used
   - Identify which React Aria component to use

3. **Create Component Files** - Follow the structure above

4. **Map Figma to React** - See property mapping below

5. **Create Storybook Stories** - One story per variant, final story links to Figma

6. **Publish Code Connect** - Run `npm run figma:publish`

### Figma Property Types → React Mapping

| Figma Property | React Equivalent | Style Object | Example |
|----------------|------------------|--------------|---------|
| **Variant** | Union type prop | Key in `styles` object | `variant?: 'primary' \| 'soft'` |
| **Text** | `string` or `ReactNode` | N/A (content) | `children`, `label?: string` |
| **Boolean** | `boolean` prop (`is*`, `has*`) | Conditional in `cx()` | `isDisabled?: boolean` |
| **Instance swap** | `ReactNode` or `FC` prop | N/A (slot) | `iconLeading?: FC \| ReactNode` |

### Universal Component Pattern

ALL components use the style object pattern with `sortCx`. Only include keys that apply:

```tsx
// Full example (component with variants + sizes)
export const styles = sortCx({
  common: {
    root: [
      'base-styles-here',
      'more-styles',
    ].join(' '),
    icon: 'pointer-events-none size-5 shrink-0',
  },
  sizes: {
    sm: { root: 'px-3 py-2 text-sm' },
    md: { root: 'px-4 py-2.5 text-sm' },
  },
  variants: {
    primary: { root: 'bg-brand-600 text-white hover:bg-brand-700' },
    secondary: { root: 'bg-white text-gray-700 ring-1 ring-gray-300' },
  },
})

// Derived types (only when applicable)
export type ComponentSize = keyof typeof styles.sizes
export type ComponentVariant = keyof typeof styles.variants
```

**Why this pattern:**
- Consistent across all components (simple or complex)
- Mirrors Figma structure (variants, sizes as separate concerns)
- Types derived automatically from style object
- Flexible - only include keys that apply to the component

### Path Alias

Use `@/` to import from `src/`:
```tsx
import { cx } from '@/utils/cx'
import { Button } from '@/components/Button'
```

### Styling Utilities

Use `cx()` from `@/utils/cx` for className merging (extends tailwind-merge):
```tsx
import { cx } from '@/utils/cx'
cx('bg-brand-600', isDisabled && 'opacity-50', className)
```

Use `sortCx()` for organizing style objects to enable Tailwind IntelliSense sorting.

### Tailwind Configuration

- Base config: `tailwind.config.js` - shared utilities (spacing, radius, gray colors)
- Storybook: `tailwind.config.storybook.js` - extends base with CSS variable colors
- Brands: `tailwind.config.[brand].js` - extends base with hardcoded brand colors

Color naming:
- `brand-*` / `primary-*` - Brand primary color
- `secondary-*` - Brand secondary color
- `gray-*` - Neutral colors
- `error-*` / `destructive-*` - Red semantic colors
- `warning-*` - Yellow semantic colors
- `success-*` - Green semantic colors

## Storybook Stories

ArgTypes should be organized by category:
- **Appearance**: size, color, variant
- **State**: isDisabled, isLoading, isSelected
- **Icons**: iconLeading, iconTrailing, icon
- **Content**: children, label, title, description
- **Behavior**: href, onChange, onPress
- **Advanced**: className, style

Final story should be titled "Figma" and link back to the source.

## Figma Code Connect

Component `.figma.tsx` files connect React components to Figma:
- Use component SET node-id in colon format: `18:30003`
- Map Figma properties to React props

## Known Issues

Token issues are tracked in `tokens/TOKEN-ISSUES.md`. Currently:
- Self-referencing radius aliases (workaround in place)

## Commit Messages

```
<type>(<scope>): <message>

- bullet points
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`

Do not add AI attribution or promotional footers.
