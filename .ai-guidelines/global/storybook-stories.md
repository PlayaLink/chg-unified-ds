---
---

# Storybook Stories Guidelines

When creating stories for components:

## 1. ArgTypes Organization

Organize props to match Figma's properties panel order. Use minimal, meaningful categories:

```typescript
argTypes: {
  // Appearance props first (size, color/variant)
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg', 'xl', '2xl'],
    table: { category: 'Appearance' },
  },
  color: {
    name: 'color (Hierarchy)',  // Reference Figma terminology
    control: 'select',
    table: { category: 'Appearance' },
  },

  // State props (disabled, loading, etc.)
  isDisabled: {
    table: { category: 'State' },
  },

  // Icon props
  iconLeading: {
    control: false,
    table: { category: 'Icons' },
  },

  // Content props (children, label)
  children: {
    name: 'children (Label)',
    control: 'text',
    table: { category: 'Content' },
  },

  // Advanced/technical props last
  className: {
    control: false,
    table: { category: 'Advanced' },
  },
}
```

## 2. Standard Categories

Use these categories consistently across all components:

| Category | Props |
|----------|-------|
| Appearance | size, color, variant |
| State | isDisabled, isLoading, isSelected |
| Icons | iconLeading, iconTrailing, icon |
| Content | children, label, title, description |
| Behavior | href, onChange, onPress |
| Advanced | className, style |

## 3. Required Stories

Every component must include exactly 3 stories:
- `Overview` - shows all variants grouped by property (Appearance, Size, State). Use standardized padding: `px-48 pb-48 pt-32`
- `Props` - with `tags: ['show-panel']` to enable Controls panel
- `SourceCodeAndDesign` - **REQUIRED as final story** with links to GitHub and Figma

## 4. Addons Panel Control

The addons panel is dynamically shown/hidden based on story tags:

- **Props stories**: MUST have `tags: ['show-panel']` to show the Controls panel
- **All other stories**: Panel is hidden by default (no tag needed)

```typescript
// Props story - panel visible
export const Props: Story = {
  tags: ['show-panel'],  // <-- REQUIRED for Controls panel
  args: {
    children: 'Button',
  },
}

// Other stories - panel hidden (no tag needed)
export const Overview: Story = {
  render: () => <div>...</div>,
}
```

**Note:** Foundations stories (Colors, Typography, etc.) do NOT need any panel tags - the panel is hidden by default.

## 5. Story File Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { Component } from './Component'

const meta: Meta<typeof Component> = {
  title: 'Components/ComponentName',
  component: Component,
  parameters: { layout: 'centered' },
  argTypes: {
    // Organized by category (see above)
  },
}

export default meta
type Story = StoryObj<typeof Component>

// =============================================================================
// OVERVIEW (shows all variants)
// =============================================================================
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-48 px-48 pb-48 pt-32">
      {/* Group variants by property */}
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================
export const Props: Story = {
  tags: ['show-panel'],
  args: { /* defaults */ },
}

// =============================================================================
// SOURCE CODE + DESIGNS
// =============================================================================
export const SourceCodeAndDesign: Story = {
  name: 'Source Code + Designs',
  render: () => (
    <div className="flex flex-col items-center gap-24">
      {/* GitHub and Figma buttons */}
    </div>
  ),
}
```
