# CHG Unified Design System

A multi-source design system built with React, React Aria Components, and Tailwind CSS 4.

## Features

- Components from multiple Figma sources
- React Aria Components for accessibility
- Tailwind CSS 4 for styling
- Storybook for documentation
- Figma Code Connect integration
- Design token workflow

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
