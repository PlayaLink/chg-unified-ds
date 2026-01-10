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

**Requires Node.js 20+**

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

### Custom Token Scales

**IMPORTANT:** This project uses custom token scales from Figma, NOT Tailwind defaults.

**Spacing scale** (pixel values, not 4x multiplier):
- `px-8` = 8px, `py-4` = 4px, `gap-6` = 6px
- Available: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 24, 32, 48, 64, 80

**Border radius scale**:
- `rounded-6` = 6px, `rounded-8` = 8px
- Available: 0, 2, 4, 6, 8, 12, 16, 20, 24, 9999
- Do NOT use `rounded-md`, `rounded-lg` - these don't exist

**Colors**:
- Use `text-base-white` and `bg-base-white` (not `text-white`, `bg-white`)
- Brand colors: `brand-50` through `brand-950`
- Semantic: `error-*`, `warning-*`, `success-*`

## Component Development Workflow

**IMPORTANT: This is a Figma-first design system. Every component MUST have a Figma source.**

### Adding a New Component

1. **Get Figma URL** - Obtain the Figma frame/component URL from the design system file
   - Format: `https://www.figma.com/design/<file-id>?node-id=<node-id>`

2. **Fetch Figma Data** - Use the Figma MCP to inspect the component:
   - Extract variants, properties, and states
   - Note spacing, colors, typography tokens used
   - Identify which React Aria component to use

3. **Create Component Files**:
   ```
   src/components/[ComponentName]/
   ├── [ComponentName].tsx         # Component with React Aria
   ├── [ComponentName].stories.tsx # Storybook stories
   ├── [ComponentName].figma.tsx   # Figma Code Connect
   └── index.ts                    # Public export
   ```

4. **Map Figma to React** - See property mapping below

5. **Create Storybook Stories** - Three stories: Overview, Props, SourceCodeAndDesign

6. **Publish Code Connect** - Run `npm run figma:publish`

### Figma Property Types → React Mapping

| Figma Property | React Equivalent | Style Object | Example |
|----------------|------------------|--------------|---------|
| **Variant** | Union type prop | Key in `styles` object | `variant?: 'primary' \| 'soft'` |
| **Text** | `string` or `ReactNode` | N/A (content) | `children`, `label?: string` |
| **Boolean** | `boolean` prop (`is*`, `has*`) | Conditional in `cx()` | `isDisabled?: boolean` |
| **Instance swap** | `ReactNode` or `FC` prop | N/A (slot) | `iconLeading?: FC \| ReactNode` |

### Universal Component Pattern

ALL components use the style object pattern with `sortCx`:

```tsx
/**
 * ComponentName component
 * @figma https://www.figma.com/design/<file-id>?node-id=<node-id>
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export const styles = sortCx({
  common: {
    root: [
      'base-classes-here',
      'focus-visible:ring-4 focus-visible:ring-brand-100',
      'disabled:cursor-not-allowed',
    ].join(' '),
    icon: 'pointer-events-none shrink-0',
  },
  sizes: {
    xs: { root: 'gap-4 rounded-6 px-8 py-4 text-xs', icon: 'size-[14px]' },
    sm: { root: 'gap-6 rounded-8 px-12 py-8 text-sm', icon: 'size-[16px]' },
    md: { root: 'gap-8 rounded-8 px-14 py-10 text-sm', icon: 'size-[18px]' },
    lg: { root: 'gap-8 rounded-8 px-18 py-12 text-md', icon: 'size-[20px]' },
  },
  variants: {
    primary: {
      root: [
        'bg-brand-600 text-base-white shadow-sm',
        'hover:bg-brand-700',
        'disabled:bg-gray-100 disabled:text-gray-400',
      ].join(' '),
    },
    soft: {
      root: [
        'bg-brand-100 text-brand-700',
        'hover:bg-brand-200',
        'disabled:bg-gray-100 disabled:text-gray-400',
      ].join(' '),
    },
  },
})

export type ComponentSize = keyof typeof styles.sizes
export type ComponentVariant = keyof typeof styles.variants
```

### Icon Props Pattern

Support both FC components and ReactNode elements:

```tsx
interface Props {
  iconLeading?: FC<{ className?: string }> | ReactNode
}

// In render:
{isValidElement(IconLeading) && IconLeading}
{isReactComponent(IconLeading) && <IconLeading className={iconClassName} />}
```

### Path Alias

Use `@/` to import from `src/`:
```tsx
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'
import { Button } from '@/components/Button'
```

## Storybook Stories

Each component has exactly 3 stories:

1. **Overview** - Shows all variants grouped by Figma property (Appearance, Layout, State, Size)
2. **Props** - Single component with all controls enabled (named `Props` in code)
3. **Source Code + Designs** - Links to GitHub source and Figma design (named `SourceCodeAndDesign` in code)

### Addons Panel Control

The addons panel (Controls/Actions) is dynamically shown/hidden based on story tags:

- **Props stories**: Add `tags: ['show-panel']` to show the Controls panel
- **All other stories**: Panel is hidden by default (no tag needed)

```tsx
// Props story - SHOW panel
export const Props: Story = {
  tags: ['show-panel'],  // <-- Required for panel to appear
  args: {
    children: 'Button',
  },
}

// Overview story - panel hidden (no tag needed)
export const Overview: Story = {
  render: () => <div>...</div>,
}
```

This is controlled by the `panel-controller` addon in `.storybook/manager.js`. When adding new components, always add `tags: ['show-panel']` to Props stories.

### ArgTypes Categories

Organize controls by category:
- **Appearance**: variant, size
- **State**: isDisabled, isLoading, isSelected
- **Icons**: iconLeading, iconTrailing
- **Content**: children, label
- **Behavior**: href, onPress
- **Advanced**: className

### Icon Controls

Use mapping for icon select controls:

```tsx
const iconOptions = {
  None: undefined,
  Plus: PlusIcon,
  ArrowRight: ArrowRightIcon,
}

// In argTypes:
iconLeading: {
  control: 'select',
  options: Object.keys(iconOptions),
  mapping: iconOptions,
  table: { category: 'Icons' },
},
```

## Figma Code Connect

Component `.figma.tsx` files connect React components to Figma:

```tsx
import figma from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, 'https://www.figma.com/design/<file-id>?node-id=<node-id>', {
  props: {
    variant: figma.enum('Appearance', {
      'Primary': 'primary',
      'Soft': 'soft',
    }),
    size: figma.enum('Size', {
      'XSmall': 'xs',
      'Small': 'sm',
      'Default': 'md',
      'Large': 'lg',
    }),
    children: figma.string('Label'),
    isDisabled: figma.enum('Appearance', { 'Disabled': true }),
  },
  example: (props) => <Button {...props} />,
})
```

## Utilities

Two utility modules in `src/utils/`:

- **`cx.ts`** - Class merging with `tailwind-merge`. Use `cx()` to merge classes, `sortCx()` to wrap style objects for Tailwind IntelliSense
- **`is-react-component.ts`** - Type guards for distinguishing FC components from ReactNode elements (used for icon props)

## Known Issues

Token issues are tracked in `tokens/TOKEN-ISSUES.md`. Currently:
- Self-referencing radius aliases (workaround in place)
- Empty brand-specific token files (brand colors available in Primitives file)

### Tailwind CSS 4 + Storybook

**New components require a Storybook restart.** Tailwind CSS 4's HMR doesn't always detect utility classes in newly created component files. If a new component appears unstyled (no colors, looks like wireframes), restart Storybook to force a full Tailwind rebuild:

```bash
# Kill and restart
pkill -f "storybook dev"
npm run dev
```

This only affects new files - edits to existing components work fine with HMR.

## Commit Messages

```
<type>(<scope>): <message>

- bullet points
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`

Do not add AI attribution or promotional footers (no "Co-Authored-By", "Generated with", etc.).
