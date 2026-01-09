/** @type {import('tailwindcss').Config} */
const baseConfig = require('./tailwind.config.js');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    colors: {
      ...baseConfig.theme.colors,
      // Comphealth brand colors
      brand: {
        25: "#f0ecf3",
        50: "#eae4ee",
        100: "#ccc4d7",
        200: "#aea3bc",
        300: "#8f7fa1",
        400: "#79658d",
        500: "#644d7b",
        600: "#5e4775",
        700: "#553f6c",
        800: "#4b3a62",
        900: "#3c304c"
},
      primary: {
        25: "#f0ecf3",
        50: "#eae4ee",
        100: "#ccc4d7",
        200: "#aea3bc",
        300: "#8f7fa1",
        400: "#79658d",
        500: "#644d7b",
        600: "#5e4775",
        700: "#553f6c",
        800: "#4b3a62",
        900: "#3c304c"
},
      secondary: {
        25: "#fffbfa",
        50: "#fef3f2",
        100: "#fde5e3",
        200: "#fcd0cc",
        300: "#f9afa8",
        400: "#f48075",
        500: "#ea5c4f",
        600: "#d63a2c",
        700: "#b42d21",
        800: "#95291f",
        900: "#7c2820"
},
    },
  },
};
