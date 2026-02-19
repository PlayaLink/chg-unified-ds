---
---

# Figma Code Connect

Component `.figma.tsx` files connect React components to Figma Dev Mode.

## File Location

```
src/components/[ComponentName]/
├── [ComponentName].tsx
├── [ComponentName].stories.tsx
├── [ComponentName].figma.tsx    # <-- Code Connect file
└── index.ts
```

## Template

```tsx
import figma from '@figma/code-connect'
import { Button } from './Button'

// Use the component SET node-id (not a variant), with colon format (18:30003)
figma.connect(Button, 'https://www.figma.com/design/<file-id>?node-id=<node-id>', {
  props: {
    // Map Figma property names exactly as they appear in Figma
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
    isLoading: figma.enum('State', { 'Loading': true }),
  },
  example: (props) => <Button {...props} />,
})
```

## Publishing

```bash
FIGMA_ACCESS_TOKEN="<token>" npm run figma:publish
```

**Finding the token:** The Figma access token is in `.mcp.json` under `mcpServers.figma-work.args` (the `--figma-api-key` value).

## Figma Property Types → React Mapping

| Figma Property | React Equivalent | Example |
|----------------|------------------|---------|
| **Variant** | Union type prop | `variant?: 'primary' \| 'soft'` |
| **Text** | `string` or `ReactNode` | `children`, `label?: string` |
| **Boolean** | `boolean` prop (`is*`, `has*`) | `isDisabled?: boolean` |
| **Instance swap** | `ReactNode` or `FC` prop | `iconLeading?: FC \| ReactNode` |
