/** @type {import('tailwindcss').Config} */
const baseConfig = require('./tailwind.config.cjs');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    colors: {
      ...baseConfig.theme.colors,
      // Wireframe brand colors
      brand: {
        25: "#fafafa",
        50: "#f5f5f5",
        100: "#ebebeb",
        200: "#d1d1d1",
        300: "#bebebe",
        400: "#aaaaaa",
        500: "#969696",
        600: "#818181",
        700: "#6a6a6a",
        800: "#585858",
        900: "#333333"
},
      primary: {
        25: "#fafafa",
        50: "#f5f5f5",
        100: "#ebebeb",
        200: "#d1d1d1",
        300: "#bebebe",
        400: "#aaaaaa",
        500: "#969696",
        600: "#818181",
        700: "#6a6a6a",
        800: "#585858",
        900: "#333333"
},
      secondary: {
        25: "#fafdff",
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e"
},
    },
  },
};
