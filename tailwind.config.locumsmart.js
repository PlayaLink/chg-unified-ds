/** @type {import('tailwindcss').Config} */
const baseConfig = require('./tailwind.config.js');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    colors: {
      ...baseConfig.theme.colors,
      // Locumsmart brand colors
      brand: {
        25: "#f2fafd",
        50: "#e3f5fa",
        100: "#aee0f4",
        200: "#78cbec",
        300: "#41b7e5",
        400: "#00a7e1",
        500: "#009add",
        600: "#008dcf",
        700: "#0c6bb0",
        800: "#006aa8",
        900: "#004b88"
},
      primary: {
        25: "#f2fafd",
        50: "#e3f5fa",
        100: "#aee0f4",
        200: "#78cbec",
        300: "#41b7e5",
        400: "#00a7e1",
        500: "#009add",
        600: "#008dcf",
        700: "#0c6bb0",
        800: "#006aa8",
        900: "#004b88"
},
      secondary: {
        25: "#fefbf5",
        50: "#fef8ee",
        100: "#feefd6",
        200: "#fbdcad",
        300: "#f9c278",
        400: "#f59e42",
        500: "#f2821f",
        600: "#e36613",
        700: "#bc4d12",
        800: "#963e16",
        900: "#793515"
},
    },
  },
};
