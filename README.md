# CHG Unified Design System

A multi-brand design system built with React, React Aria Components, and Tailwind CSS 4.

## Installation

### Option 1: npm (Public Registry)

```bash
npm install @oxymormon/chg-unified-ds
```

### Option 2: GitHub Packages (Private)

If using the private GitHub Packages version, first configure npm:

Create or update `.npmrc` in your project root:

```
@playalink:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Your GitHub token needs the `read:packages` scope.

Then install:

```bash
npm install @playalink/chg-unified-ds
```

> **Note:** Replace `@oxymormon` with `@playalink` in all import paths if using GitHub Packages.

## Setup

### 1. Configure CSS

Import the design system styles in your main CSS file:

```css
@import "tailwindcss";
@config "@oxymormon/chg-unified-ds/tailwind.config.storybook";

/* Import design system tokens */
@import "@oxymormon/chg-unified-ds/styles/tokens";

/* Import brand themes */
@import "@oxymormon/chg-unified-ds/themes/weatherby";
@import "@oxymormon/chg-unified-ds/themes/comphealth";
@import "@oxymormon/chg-unified-ds/themes/connect";
@import "@oxymormon/chg-unified-ds/themes/locumsmart";
@import "@oxymormon/chg-unified-ds/themes/modio";
@import "@oxymormon/chg-unified-ds/themes/wireframe";

/* Scan design system for Tailwind classes */
@source "node_modules/@oxymormon/chg-unified-ds/dist/**/*.js";
```

### 2. Add theme attribute

Add the `data-theme` attribute to your app's root element:

```tsx
<div data-theme="weatherby">
  <App />
</div>
```

Available themes: `weatherby`, `comphealth`, `connect`, `locumsmart`, `modio`, `wireframe`

## Usage

```tsx
import { Button, Avatar, Tag } from '@oxymormon/chg-unified-ds'

function App() {
  return (
    <div data-theme="weatherby">
      <Button variant="primary" size="md">Click me</Button>
      <Avatar size="md" name="John Doe" initials="JD" />
      <Tag color="blue">Status</Tag>
    </div>
  )
}
```

## Available Components

- Accordion
- ActionMenu
- Avatar
- Button
- Checkbox
- Chip
- CounterBadge
- Divider
- DotStatus
- Field (Input, Select, Textarea)
- ProgressBar
- Radio / RadioGroup
- Status
- StepIndicator
- Tabs
- Tag
- Toast
- Toggle
- Tooltip

## Package Exports

```
@oxymormon/chg-unified-ds           # Main components
@oxymormon/chg-unified-ds/styles/tokens    # CSS design tokens
@oxymormon/chg-unified-ds/styles/globals   # Global styles
@oxymormon/chg-unified-ds/themes/*         # Brand theme files
@oxymormon/chg-unified-ds/tailwind.config  # Base Tailwind config
@oxymormon/chg-unified-ds/tailwind.config.storybook  # Storybook Tailwind config (with CSS variable colors)
```

---

## Contributing

### Getting Started

```bash
npm install
npm run dev
```

Opens Storybook on http://localhost:6006

### Building

```bash
# Build Storybook
npm run build

# Build library for publishing
npm run build:lib

# Build design tokens
npm run build:tokens
```

### Token Workflow

1. Export design tokens from Figma:
   - Open Figma file
   - Plugins → Development → Variables Export
   - Save as `tokens/[source-name].tokens.json`

2. Generate CSS:
   ```bash
   npm run build:tokens
   ```

3. Rebuild the library:
   ```bash
   npm run build:lib
   ```

### Figma Code Connect

Publish component connections to Figma:

```bash
npm run figma:publish
```

Requires `FIGMA_ACCESS_TOKEN` in `.env` file.

### Project Structure

```
src/
  components/       # All components
  foundations/      # Design foundation docs
  styles/           # Global styles and tokens
  utils/            # Utility functions
tokens/             # Figma token exports
```

### Adding Components

See [CLAUDE.md](./CLAUDE.md) for detailed component development workflow.
