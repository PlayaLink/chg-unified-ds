/** @type {import('tailwindcss').Config} */
const baseConfig = require('./tailwind.config.cjs');

/**
 * Storybook-specific Tailwind config
 * Uses CSS variables for brand colors to enable runtime theme switching
 */
module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    colors: {
      ...baseConfig.theme.colors,
      // Brand colors use CSS variables for runtime switching
      brand: {
        25: 'var(--color-brand-25)',
        50: 'var(--color-brand-50)',
        100: 'var(--color-brand-100)',
        200: 'var(--color-brand-200)',
        300: 'var(--color-brand-300)',
        400: 'var(--color-brand-400)',
        500: 'var(--color-brand-500)',
        600: 'var(--color-brand-600)',
        700: 'var(--color-brand-700)',
        800: 'var(--color-brand-800)',
        900: 'var(--color-brand-900)',
      },
      primary: {
        25: 'var(--color-primary-25)',
        50: 'var(--color-primary-50)',
        100: 'var(--color-primary-100)',
        200: 'var(--color-primary-200)',
        300: 'var(--color-primary-300)',
        400: 'var(--color-primary-400)',
        500: 'var(--color-primary-500)',
        600: 'var(--color-primary-600)',
        700: 'var(--color-primary-700)',
        800: 'var(--color-primary-800)',
        900: 'var(--color-primary-900)',
      },
      secondary: {
        25: 'var(--color-secondary-25)',
        50: 'var(--color-secondary-50)',
        100: 'var(--color-secondary-100)',
        200: 'var(--color-secondary-200)',
        300: 'var(--color-secondary-300)',
        400: 'var(--color-secondary-400)',
        500: 'var(--color-secondary-500)',
        600: 'var(--color-secondary-600)',
        700: 'var(--color-secondary-700)',
        800: 'var(--color-secondary-800)',
        900: 'var(--color-secondary-900)',
      },
    },
  },
};
