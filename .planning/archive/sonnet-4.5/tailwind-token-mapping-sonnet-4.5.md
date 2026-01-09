# Tailwind Token Mapping Summary

## ✅ Completed

Successfully mapped Figma design tokens to Tailwind CSS configs for multi-brand support.

## Generated Files

### Base Config
**`tailwind.config.js`** - Shared utilities for all brands
- **Colors**: Gray scale, error, destructive, warning, success (from system tokens)
- **Spacing**: 0px, 2px, 4px, 6px, 8px, 10px, 12px, 14px, 16px, 18px, 24px, 32px, 48px, 64px, 80px
- **Border Radius**: 0, 2, 4, 6, 8, 12, 16, 20, 24, 9999
- **Typography**: Font sizes (xs-7xl), weights (regular, medium, semibold, bold)
- **Box Shadows**: xs, sm, md, lg, xl, 2xl, 3xl

### Brand-Specific Configs
Each brand extends the base config with brand-specific `primary` and `brand` colors:

1. **`tailwind.config.weatherby.js`**
   - Brand color: `#8f0a39` (maroon/burgundy)
   - Secondary: `#00a385` (teal)

2. **`tailwind.config.comphealth.js`**
   - Brand color: `#4e154b` (deep purple)
   - Secondary: `#009cba` (cyan)

3. **`tailwind.config.modio.js`**
   - Brand color: `#5828a8` (purple)
   - Secondary: `#01c7d2` (bright cyan)

4. **`tailwind.config.connect.js`**
   - Brand color: `#2368a2` (blue)
   - Secondary: `#00b383` (emerald)

5. **`tailwind.config.locumsmart.js`**
   - Brand color: `#009add` (bright blue)
   - Secondary: `#ea5910` (orange)

6. **`tailwind.config.wireframe.js`**
   - Brand color: `#3a6ea5` (steel blue)
   - Secondary: `#ff990a` (amber)

## Usage

### Run Storybook (with runtime theme switching):

```bash
# Start Storybook with all brand themes available
npm run dev
```

Storybook now includes a **Brand** dropdown in the toolbar that lets you switch between themes in real-time:
- Weatherby (maroon)
- CompHealth (purple)
- Modio (cyan)
- Connect (blue)
- LocumSmart (bright blue)
- Wireframe (grayscale)

### Production builds (brand-specific):

For production deployments, you can still build with a specific brand config:

```bash
# Build with specific brand Tailwind config
TAILWIND_CONFIG=weatherby npm run build
TAILWIND_CONFIG=comphealth npm run build
# etc.
```

### In components, use brand colors:

```tsx
// Brand primary color - changes per deployment
<button className="bg-brand-600 hover:bg-brand-700 text-white">
  Click me
</button>

// Can also use 'primary' alias
<div className="text-primary-600 border-primary-300">
  Primary brand content
</div>

// Secondary brand color
<div className="bg-secondary-500 text-white">
  Secondary brand
</div>

// System colors (same across all brands)
<div className="bg-error-500 text-white">Error message</div>
<div className="bg-warning-500">Warning message</div>
<div className="bg-success-500">Success message</div>
```

## Color Scales

Each brand provides a full color scale:
- **25**: Lightest tint
- **50-100**: Very light shades
- **200-400**: Light to medium shades
- **500**: Base brand color
- **600-700**: Darker shades (good for hover states)
- **800-900**: Darkest shades

Example usage:
```tsx
<button className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700">
```

## Build Process

### Generate/Update Tailwind Configs

When Figma tokens change:

```bash
# 1. Export tokens from Figma
curl -H "X-Figma-Token: YOUR_TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY/variables/local" \
  > tokens/figma-api-response.json

# 2. Transform tokens
node scripts/transform-figma-tokens.cjs

# 3. Build CSS variables
npm run build:tokens

# 4. Generate Tailwind configs
npm run build:tailwind
```

## Configuration Details

### Base Config Structure

```javascript
{
  theme: {
    colors: {
      base: { white, black, transparent },
      gray: { 25, 50, ..., 1000 },
      error: { 25, 50, ..., 1000 },
      destructive: { ... }, // alias for error
      warning: { ... },
      success: { ... }
    },
    spacing: { 0, 2, 4, ..., 80 },
    borderRadius: { 0, 2, 4, ..., 9999 },
    fontSize: { xs, sm, md, ..., 7xl },
    fontWeight: { regular, medium, semibold, bold }
  }
}
```

### Brand Config Pattern

```javascript
{
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    colors: {
      ...baseConfig.theme.colors,
      brand: { 25, 50, ..., 900 },
      primary: { ... }, // alias for brand
      secondary: { ... }
    }
  }
}
```

## Storybook Runtime Theme Switching

Storybook uses CSS variables for brand colors to enable real-time theme switching via a toolbar dropdown.

### How It Works

1. **Storybook-specific Tailwind config** (`tailwind.config.storybook.js`)
   - Uses CSS variables instead of hardcoded colors
   - Example: `brand-600: 'var(--color-brand-600)'`

2. **Brand theme CSS files** (`.storybook/themes/*.css`)
   - Each brand has its own CSS file with scoped variables
   - Variables are scoped by `data-theme` attribute
   ```css
   [data-theme="weatherby"] {
     --color-brand-600: #a9174a;
   }
   ```

3. **Storybook decorator** (`.storybook/preview.tsx`)
   - Watches the global `theme` toolbar value
   - Updates `data-theme` attribute on document root
   - All components re-render with new brand colors

4. **Component code stays the same**
   ```tsx
   <button className="bg-brand-600 hover:bg-brand-700">
   ```
   - `bg-brand-600` resolves to `var(--color-brand-600)`
   - The CSS variable value changes based on `data-theme`

### Files Created for Theme Switching

```
.storybook/
  ├── preview.tsx                 # Toolbar & decorator setup
  ├── main.ts                     # Uses storybook.config
  └── themes/
      ├── weatherby.css           # Weatherby brand variables
      ├── comphealth.css          # CompHealth brand variables
      ├── modio.css               # Modio brand variables
      ├── connect.css             # Connect brand variables
      ├── locumsmart.css          # LocumSmart brand variables
      └── wireframe.css           # Wireframe brand variables

tailwind.config.storybook.js      # CSS variable-based config
```

## Multi-Tenant Deployment Strategy

You now have **two deployment modes**:

### 1. Storybook (Documentation) - Runtime Theme Switching

For component documentation and previewing all brands:

```bash
npm run dev
```

- Uses `tailwind.config.storybook.js` (CSS variables)
- All 6 brand themes loaded via CSS
- Toolbar dropdown to switch between brands in real-time
- Perfect for design reviews and documentation

### 2. Production Deployments - Build-time Brand Selection

For actual product deployments, each brand gets its own build:

```bash
# Weatherby deployment
TAILWIND_CONFIG=weatherby npm run build
# → Uses tailwind.config.weatherby.js
# → Builds with Weatherby colors hardcoded

# CompHealth deployment
TAILWIND_CONFIG=comphealth npm run build
# → Uses tailwind.config.comphealth.js
# → Builds with CompHealth colors hardcoded
```

**Benefits of build-time selection for production:**
- Smallest possible bundle size (only one brand's colors included)
- No CSS variable overhead
- Optimal performance

### Component Code

Your components use the same code across **both** Storybook and production:

```tsx
export function Button({ children }) {
  return (
    <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg">
      {children}
    </button>
  )
}
```

**In Storybook:**
- `bg-brand-600` → `var(--color-brand-600)` → changes with toolbar dropdown

**In production:**
- `weatherby.app.com`: `bg-brand-600` → `#a9174a` (hardcoded maroon)
- `comphealth.app.com`: `bg-brand-600` → `#5e4775` (hardcoded purple)
- `modio.app.com`: `bg-brand-600` → `#2c91b6` (hardcoded cyan)

## Next Steps

1. ✅ **Tokens mapped** - All Figma tokens converted to Tailwind configs
2. ✅ **Brand configs created** - 6 brand-specific configs generated
3. ✅ **Scripts updated** - `npm run dev:BRAND` commands available
4. ✅ **Storybook configured** - Supports brand selection via env var
5. ⏭️ **Build first component** - Ready to start component development
6. ⏭️ **Test brand switching** - Verify components work with all brands

## Files Created

```
/chg-unified-ds/
├── tailwind.config.js                  # Base config (shared utilities)
├── tailwind.config.storybook.js        # Storybook config (CSS variables)
├── tailwind.config.weatherby.js        # Weatherby brand (production)
├── tailwind.config.comphealth.js       # CompHealth brand (production)
├── tailwind.config.modio.js            # Modio brand (production)
├── tailwind.config.connect.js          # Connect brand (production)
├── tailwind.config.locumsmart.js       # Locumsmart brand (production)
├── tailwind.config.wireframe.js        # Wireframe brand (production)
├── .storybook/
│   ├── main.ts                         # Storybook config (loads storybook.config)
│   ├── preview.tsx                     # Theme toolbar & decorator
│   └── themes/
│       ├── weatherby.css               # Weatherby CSS variables
│       ├── comphealth.css              # CompHealth CSS variables
│       ├── modio.css                   # Modio CSS variables
│       ├── connect.css                 # Connect CSS variables
│       ├── locumsmart.css              # LocumSmart CSS variables
│       └── wireframe.css               # Wireframe CSS variables
└── scripts/
    └── generate-tailwind-configs.cjs   # Config generator script
```

## Tips

- Use `brand-*` or `primary-*` for brand-specific colors
- Use `gray-*` for neutral UI elements
- Use `error-*`, `warning-*`, `success-*` for semantic colors
- Test components with multiple brands to ensure they work everywhere
- The base config has all shared utilities (spacing, typography, etc.)
