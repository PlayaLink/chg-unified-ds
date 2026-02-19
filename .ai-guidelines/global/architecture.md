---
---

# Architecture

## Dual Theming Approach

The system uses different strategies for Storybook vs production:

**Storybook (runtime switching):**
- Uses `tailwind.config.storybook.cjs` with CSS variables (`var(--color-brand-*)`)
- Brand themes defined in `.storybook/themes/*.css` set variable values
- Theme applied via `data-theme` attribute on DOM elements
- Switching happens via Storybook toolbar dropdown

**Production (build-time):**
- Uses brand-specific configs: `tailwind.config.weatherby.cjs`, etc.
- Colors are hardcoded values, not CSS variables
- Smaller bundle, no runtime overhead
- Build with: `BRAND=weatherby npm run build:lib` (when implemented)

## Design Token Flow

```
Figma Variables → Export Plugin → tokens/*.tokens.json → build-tokens.cjs → src/styles/tokens.css
                                                       → generate-tailwind-configs.cjs → tailwind.config.*.cjs
```

Token files in `tokens/`:
- `Core.default.tokens.json` - Spacing, radius, animation
- `Primitives.Default.tokens.json` - Color primitives (all 6 brands)
- `Design System.Light.tokens.json` - Semantic tokens (light mode)
- `Design System.Dark.tokens.json` - Semantic tokens (dark mode)

## When Tokens Change in Figma

1. Export via Plugins → Development → Variables Export
2. Save JSON to `tokens/`
3. Run `npm run validate:tokens` to check for issues
4. Run `npm run build:tokens` and `npm run build:tailwind`
5. Log any new issues in `tokens/TOKEN-ISSUES.md`

See `known-issues.mdc` for current token workarounds.

## Utilities

Two utility modules in `src/utils/`:

- **`cx.ts`** - Class merging with `tailwind-merge`. Use `cx()` to merge classes, `sortCx()` to wrap style objects for Tailwind IntelliSense
- **`is-react-component.ts`** - Type guards for distinguishing FC components from ReactNode elements (used for icon props)
