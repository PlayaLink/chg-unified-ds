---
---

# Component Implementation Workflow

When implementing a new component from Figma:

## 1. Fetch Figma Data
Use the Figma MCP to fetch component data from the provided Figma link.

## 2. Create Component Structure
Create the component directory and files:
```
src/components/<name>/
├── <name>.tsx           # Component with doc header
├── <name>.stories.tsx   # Storybook stories
├── <name>.figma.tsx     # Figma Code Connect
└── index.ts             # Barrel exports
```

## 3. Add Documentation Header
Every component file must have a doc comment at the top with links to Figma source and Storybook:
```typescript
/**
 * ComponentName component
 * @figma https://www.figma.com/design/<file-id>?node-id=<node-id>
 * @storybook https://www.chg-unified-design.com/?path=/story/components-componentname--props
 */
```

The Storybook URL follows the pattern:
- Base: `https://www.chg-unified-design.com/`
- Path: `?path=/story/components-{name}--props`
- Component name is lowercase (e.g., `StepIndicator` → `stepindicator`)

## 4. Universal Component Pattern

ALL components use the style object pattern with `sortCx`:

```tsx
/**
 * ComponentName component
 * @figma https://www.figma.com/design/<file-id>?node-id=<node-id>
 * @storybook https://www.chg-unified-design.com/?path=/story/components-componentname--props
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

## 5. Icon Props Pattern

Support both FC components and ReactNode elements:

```tsx
interface Props {
  iconLeading?: FC<{ className?: string }> | ReactNode
}

// In render:
{isValidElement(IconLeading) && IconLeading}
{isReactComponent(IconLeading) && <IconLeading className={iconClassName} />}
```

## 6. Validate Tokens (Figma ↔ Code Sync)
After implementing, check Storybook for visual issues. If styles look wrong:

1. **Identify missing tokens** - Compare Tailwind classes against token files
2. **Update tailwind.config.js** - Add missing values to keep the build working
3. **Log the issue** - Add to `tokens/TOKEN-ISSUES.md` for designer review

## 7. Create Storybook Stories
Create `<component>.stories.tsx` with three required stories:
- `Overview` - Shows all variants grouped by property
- `Props` - Single component with controls (add `tags: ['show-panel']`)
- `SourceCodeAndDesign` - Links to GitHub and Figma

## 8. Export from Index
Update `index.ts` to export the component and its types.

## 9. Set Up Figma Code Connect
Create `<name>.figma.tsx` - see `figma-code-connect.mdc` for template.

Then publish:
```bash
FIGMA_ACCESS_TOKEN="<token>" npm run figma:publish
```
