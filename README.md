# CHG Unified Design System

A multi-brand design system built with React, React Aria Components, and Tailwind CSS 4.

## Installation

### 1. Configure npm for GitHub Packages

Create or update `.npmrc` in your project root:

```
@jordanchghealthcare:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Your GitHub token needs the `read:packages` scope.

### 2. Install the package

```bash
npm install @jordanchghealthcare/chg-unified-ds
```

### 3. Configure Tailwind CSS

The design system requires Tailwind CSS 4. Import the design system's styles in your main CSS file:

```css
@import "tailwindcss";
@import "@jordanchghealthcare/chg-unified-ds/styles";
```

### 4. Add theme attribute

Add the `data-theme` attribute to your app's root element:

```tsx
<div data-theme="weatherby">
  <App />
</div>
```

Available themes: `weatherby`, `comphealth`, `gsi`, `healthcare`

## Usage

```tsx
import { Button, Avatar, Tag } from '@jordanchghealthcare/chg-unified-ds'

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
- Avatar
- Badge
- Breadcrumb
- Button
- Checkbox
- Chip
- Dialog
- Field (Input, Select, Textarea)
- Link
- Menu
- Pagination
- Popover
- Radio
- Slot
- StepIndicator
- Switch
- Table
- Tabs
- Tag
- Textarea
- Toast
- Tooltip

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

3. Update `tailwind.config.js` if semantic changes are needed

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
```

### Adding Components

See [CLAUDE.md](./CLAUDE.md) for detailed component development workflow.
