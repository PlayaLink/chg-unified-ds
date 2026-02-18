# CLAUDE.md

This file provides project runtime context for `chg-unified-ds`.

## Project Overview

`chg-unified-ds` is the CHG multi-brand design system package published as
`@oxymormon/chg-unified-ds`.

## Commands

```bash
npm run dev             # Storybook (localhost:6006)
npm run build           # Build Storybook static output
npm run build:lib       # Build package for distribution
npm run build:tokens    # Generate CSS token outputs
npm run build:tailwind  # Generate Tailwind config variants
npm run validate:tokens # Validate token data
npm run figma:publish   # Publish Figma Code Connect mappings
```

## Key Paths

- `src/components/` design system components
- `src/styles/` base/global style sources
- `tokens/` token JSON inputs
- `scripts/` token and config generation scripts
- `dist/` package build outputs

## Instruction Sources

- Agent behavior/process rules are inherited from `/Users/jengland/claude/chg/AGENTS.md`.
- Keep this file focused on build/runtime context; update rule content in `.ai-rules` sources.
