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
