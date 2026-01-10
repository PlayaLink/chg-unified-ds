/** @type {import('tailwindcss').Config} */
const baseConfig = require('./tailwind.config.cjs');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    colors: {
      ...baseConfig.theme.colors,
      // Modio brand colors
      brand: {
        25: "#f1fbfd",
        50: "#e5f7fc",
        100: "#c8ecf8",
        200: "#a6dff1",
        300: "#84d3eb",
        400: "#5ec3e0",
        500: "#3ba9d2",
        600: "#2c91b6",
        700: "#1e799b",
        800: "#065d86",
        900: "#04425f"
},
      primary: {
        25: "#f1fbfd",
        50: "#e5f7fc",
        100: "#c8ecf8",
        200: "#a6dff1",
        300: "#84d3eb",
        400: "#5ec3e0",
        500: "#3ba9d2",
        600: "#2c91b6",
        700: "#1e799b",
        800: "#065d86",
        900: "#04425f"
},
      secondary: {
        25: "#f3fbf9",
        50: "#ecf9f6",
        100: "#d8f3ec",
        200: "#b1e7d9",
        300: "#8bdac6",
        400: "#64ceb4",
        500: "#3aba9b",
        600: "#319b81",
        700: "#277c67",
        800: "#1d5d4d",
        900: "#16463a"
},
    },
  },
};
