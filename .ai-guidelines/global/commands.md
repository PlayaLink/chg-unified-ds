---
---

# Commands

**Requires Node.js 20+**

```bash
npm run dev              # Start Storybook on port 6006
npm run build            # Build Storybook (for preview/deploy)
npm run build:lib        # Build library for npm publishing
npm run build:tokens     # Generate CSS from Figma token JSON files
npm run build:tailwind   # Generate brand-specific Tailwind configs from tokens
npm run validate:tokens  # Check token files for issues (aliases, nulls, etc.)
npm run figma:publish    # Publish Figma Code Connect (requires FIGMA_ACCESS_TOKEN)
```

## Restart Storybook (HMR workaround)

New component files may appear unstyled due to Tailwind CSS 4 HMR limitations. Restart Storybook:

```bash
pkill -f "storybook dev" && npm run dev
```

## Figma Access Token

The Figma access token can be found in `.mcp.json` under `mcpServers.figma-work.args` (the `--figma-api-key` value).

## Publishing to npm

To publish a new version to npm:

```bash
# 1. Bump version (patch/minor/major)
npm version patch --no-git-tag-version

# 2. Build the library (NOT `npm run build` which builds Storybook)
npm run build:lib

# 3. Publish (token is in ~/.npmrc)
npm publish --access public

# 4. Commit and push version bump
git add package.json && git commit -m "chore: bump version to X.X.X" && git push
```

**Note:** The npm token in `~/.npmrc` has 2FA bypass enabled. If it expires, create a new Granular Access Token at https://www.npmjs.com/settings/oxymormon/tokens with "Bypass two-factor authentication" enabled. Token should start with `npm_`.

## Path Alias

Use `@/` to import from `src/`:

```tsx
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'
import { Button } from '@/components/Button'
```
