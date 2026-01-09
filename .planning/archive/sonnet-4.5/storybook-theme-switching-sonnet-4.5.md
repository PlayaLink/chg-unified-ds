# Storybook Runtime Theme Switching

## Overview

Your question about having a dropdown in Storybook to toggle between themes has been implemented! **This does NOT complicate the plan** - in fact, we now have the best of both worlds:

1. **Storybook**: Runtime theme switching via toolbar dropdown (perfect for documentation)
2. **Production**: Build-time brand selection for optimal performance

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         STORYBOOK MODE                          │
│  (Documentation & Development)                                  │
│                                                                 │
│  tailwind.config.storybook.js                                  │
│  ├─ brand-600: var(--color-brand-600)  ← CSS Variable         │
│  └─ primary-600: var(--color-primary-600)                     │
│                                                                 │
│  Toolbar Dropdown (Brand Selector)                             │
│  └─ Changes data-theme="weatherby|comphealth|modio|..."       │
│      └─ CSS variables update automatically                     │
│          └─ Components re-render with new colors               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       PRODUCTION MODE                           │
│  (Actual Deployments)                                          │
│                                                                 │
│  tailwind.config.weatherby.js                                  │
│  ├─ brand-600: #a9174a  ← Hardcoded                           │
│  └─ primary-600: #a9174a                                       │
│                                                                 │
│  Build time: Only one brand's CSS included                     │
│  Runtime: Smallest bundle, no CSS variables                    │
└─────────────────────────────────────────────────────────────────┘
```

### Component Code (Same for Both Modes)

```tsx
export function Button({ children }) {
  return (
    <button className="bg-brand-600 hover:bg-brand-700 text-white">
      {children}
    </button>
  )
}
```

**In Storybook:**
- `bg-brand-600` → `var(--color-brand-600)` → value changes with dropdown

**In Production:**
- `bg-brand-600` → `#a9174a` (weatherby) or `#5e4775` (comphealth), etc.

## Implementation Details

### Files Created

#### 1. `.storybook/preview.tsx`
- Adds "Brand" dropdown to Storybook toolbar
- Decorator that watches dropdown value
- Updates `data-theme` attribute when brand changes

#### 2. `.storybook/themes/*.css` (6 files)
Brand-specific CSS files with scoped variables:

```css
/* weatherby.css */
[data-theme="weatherby"] {
  --color-brand-600: #a9174a;
  --color-primary-600: #a9174a;
  /* ... */
}

/* comphealth.css */
[data-theme="comphealth"] {
  --color-brand-600: #5e4775;
  --color-primary-600: #5e4775;
  /* ... */
}
```

#### 3. `tailwind.config.storybook.js`
Special config that uses CSS variables instead of hardcoded colors:

```javascript
module.exports = {
  theme: {
    colors: {
      brand: {
        600: 'var(--color-brand-600)',  // CSS variable
        700: 'var(--color-brand-700)',
        // ...
      }
    }
  }
}
```

#### 4. `.storybook/main.ts`
Updated to use the storybook config:

```typescript
viteFinal: async (config) => {
  const tailwindConfigPath = resolve(__dirname, '../tailwind.config.storybook.js')
  // ...
}
```

## Usage

### Development (Storybook)

```bash
npm run dev
```

Opens Storybook at http://localhost:6006 with:
- All 6 brand themes available
- Toolbar dropdown to switch between brands
- Components update in real-time

### Production Builds

```bash
# Each brand gets its own optimized build
TAILWIND_CONFIG=weatherby npm run build
TAILWIND_CONFIG=comphealth npm run build
# etc.
```

## Benefits

### ✅ Storybook Benefits
- View all brand variations in one place
- Easy comparison between brands
- Perfect for design reviews
- No need to restart server to switch brands
- All themes loaded once (no performance impact in dev)

### ✅ Production Benefits
- Smallest possible bundle size per brand
- No CSS variable overhead in production
- Each deployment only includes colors for that brand
- Optimal performance

### ✅ Developer Experience
- Write components once
- Test with all brands instantly
- Same component code works everywhere
- No conditional logic needed for brands

## Example Story with Brand Switcher

```tsx
// button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

// This story will automatically work with the brand switcher!
export const Primary: Story = {
  args: {
    children: 'Click me',
  },
}

// Users can toggle the Brand dropdown to see:
// - Weatherby maroon button
// - CompHealth purple button
// - Modio cyan button
// - Connect blue button
// - LocumSmart bright blue button
// - Wireframe gray button
```

## Technical Implementation

### Step-by-Step Flow

1. **User opens Storybook**
   - `npm run dev` starts Storybook
   - Loads `tailwind.config.storybook.js` (CSS variable config)
   - Imports all 6 brand theme CSS files

2. **User views a component**
   - Default brand: Weatherby (`data-theme="weatherby"`)
   - Component uses: `className="bg-brand-600"`
   - Tailwind generates: `background-color: var(--color-brand-600)`
   - CSS resolves: `[data-theme="weatherby"]` → `#a9174a`

3. **User switches to CompHealth**
   - Clicks toolbar dropdown → selects "CompHealth"
   - Decorator updates: `data-theme="comphealth"`
   - Same CSS variable: `var(--color-brand-600)`
   - New CSS scope: `[data-theme="comphealth"]` → `#5e4775`
   - Component re-renders with purple color

4. **Zero JavaScript logic in components**
   - No brand context needed
   - No conditional styling
   - Just use `bg-brand-600` everywhere

## Answer to Your Question

> Does this complicate at all our plan or will we be able to still do this with all the separate tailwind config for each Brand?

**Answer:** No complication! In fact, we now have an even better architecture:

✅ **Separate Tailwind configs still exist** (for production builds)
✅ **Storybook has runtime switching** (via CSS variables)
✅ **Components use the same code** (no changes needed)
✅ **Best of both worlds** (dev flexibility + production performance)

The separate Tailwind configs (`tailwind.config.weatherby.js`, etc.) are used for **production deployments**. Storybook uses a special config (`tailwind.config.storybook.js`) with CSS variables for **documentation and development**.

Your components don't know the difference - they just use `bg-brand-600` and it works everywhere!

## Next Steps

Now that theme switching is set up:

1. ✅ **Theme switching implemented** - Dropdown ready in Storybook
2. ⏭️ **Build first component** - Test the theme switcher
3. ⏭️ **Create component stories** - View across all brands
4. ⏭️ **Set up Figma Code Connect** - Link to Figma designs

Try running `npm run dev` and you'll see the Brand dropdown in the Storybook toolbar!
