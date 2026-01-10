/** @type {import('tailwindcss').Config} */
const baseConfig = require('./tailwind.config.cjs');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    colors: {
      ...baseConfig.theme.colors,
      // Connect brand colors
      brand: {
        25: "#fafdff",
        50: "#effaff",
        100: "#def4ff",
        200: "#b6ebff",
        300: "#75ddff",
        400: "#2ccdff",
        500: "#00a8e2",
        600: "#0093d4",
        700: "#0075ab",
        800: "#00638d",
        900: "#065274"
},
      primary: {
        25: "#fafdff",
        50: "#effaff",
        100: "#def4ff",
        200: "#b6ebff",
        300: "#75ddff",
        400: "#2ccdff",
        500: "#00a8e2",
        600: "#0093d4",
        700: "#0075ab",
        800: "#00638d",
        900: "#065274"
},
      secondary: {
        25: "#fff9f5",
        50: "#fef4ed",
        100: "#fde6d5",
        200: "#fbcda9",
        300: "#f8ad74",
        400: "#f68c3b",
        500: "#f47615",
        600: "#f5822a",
        700: "#c55b09",
        800: "#a44c08",
        900: "#883e06"
},
    },
  },
};
