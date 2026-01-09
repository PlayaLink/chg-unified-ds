# Token Issues Log

Issues discovered when transforming Figma tokens to Tailwind config.
Report these to the Figma design system maintainer.

**Last Validated:** 2026-01-09
**Validation Script:** `npm run validate:tokens`

---

## Summary

| Category | Count | Severity |
|----------|-------|----------|
| Self-referencing aliases | 8 | 🔴 Error |
| Empty token files | 12 | 🟡 Warning |
| **Total** | **20** | |

---

## Active Issues

### Self-Referencing Aliases (8)

These tokens reference themselves, creating unresolvable circular references.
The Figma variable structure may need adjustment.

| Token Path | Current Value | Issue | Severity |
|------------|---------------|-------|----------|
| uds.radius.2 | `{uds.radius.2}` | Token references itself | 🔴 |
| uds.radius.4 | `{uds.radius.4}` | Token references itself | 🔴 |
| uds.radius.6 | `{uds.radius.6}` | Token references itself | 🔴 |
| uds.radius.8 | `{uds.radius.8}` | Token references itself | 🔴 |
| uds.radius.12 | `{uds.radius.12}` | Token references itself | 🔴 |
| uds.radius.16 | `{uds.radius.16}` | Token references itself | 🔴 |
| uds.radius.20 | `{uds.radius.20}` | Token references itself | 🔴 |
| uds.radius.24 | `{uds.radius.24}` | Token references itself | 🔴 |

**Expected:** These should export as numeric values (e.g., `2`, `4`, `6`...) not self-references.

**Workaround:** ✅ `scripts/generate-tailwind-configs.cjs` detects self-referencing aliases and extracts the numeric value from the token key (e.g., `uds.radius.2` → `2`). The generated `tailwind.config.js` contains correct values.

### Empty Token Files (12)

Brand-specific token files are empty. This suggests brand variables are not being exported from Figma, or the export plugin is not configured to include them.

| File | Issue | Severity |
|------|-------|----------|
| CompHealth.Dark.tokens.json | Empty file | 🟡 |
| CompHealth.Light.tokens.json | Empty file | 🟡 |
| Connect.Dark.tokens.json | Empty file | 🟡 |
| Connect.Light.tokens.json | Empty file | 🟡 |
| Locumsmart.Dark.tokens.json | Empty file | 🟡 |
| Locumsmart.Light.tokens.json | Empty file | 🟡 |
| Modio.Dark.tokens.json | Empty file | 🟡 |
| Modio.Light.tokens.json | Empty file | 🟡 |
| Weatherby.Dark.tokens.json | Empty file | 🟡 |
| Weatherby.Light.tokens.json | Empty file | 🟡 |
| Wireframe.Dark.tokens.json | Empty file | 🟡 |
| Wireframe.Light.tokens.json | Empty file | 🟡 |

**Expected:** Each brand file should contain that brand's color palette and any brand-specific overrides.

**Note:** Brand colors ARE available in `Primitives.Default.tokens.json` under each brand name (weatherby, comphealth, etc.). The separate brand files may be intended for mode-specific overrides but are currently unused.

---

## Resolved Issues

*Move issues here once fixed in Figma.*

| Issue | Token Path | Resolution Date | Notes |
|-------|------------|-----------------|-------|
| (none yet) | | | |

---

## Notes for Figma Maintainer

### Radius Variables
The `uds.radius.*` tokens appear to have circular references. In Figma Variables, these should be set to raw numeric values (not referencing other variables), or should reference a properly defined primitive value.

### Brand Token Files
When exporting from Figma:
1. Ensure brand-specific collections are selected for export
2. Check that Light/Dark modes are properly configured
3. Verify the export plugin is capturing mode-specific variables

### Export Configuration
The current working token files are:
- `Core.default.tokens.json` - Core utilities (spacing, animation, etc.)
- `Primitives.Default.tokens.json` - Color primitives including brand colors
- `Design System.Light.tokens.json` - Semantic tokens (light mode)
- `Design System.Dark.tokens.json` - Semantic tokens (dark mode)

---

## How to Update This Log

1. After exporting new tokens from Figma, run:
   ```bash
   npm run validate:tokens
   ```

2. Review the output for new issues

3. Update this file with any new findings

4. Share changes with the Figma design system maintainer
