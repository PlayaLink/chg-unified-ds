/** @type {import('tailwindcss').Config} */
const baseConfig = require('./tailwind.config.cjs');

module.exports = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    colors: {
      ...baseConfig.theme.colors,
      // Weatherby brand colors
      brand: {
        25: "#fcf2f5",
        50: "#f9e5ec",
        100: "#e7becc",
        200: "#db8aa6",
        300: "#c24d76",
        400: "#b02958",
        500: "#8f0a39",
        600: "#7d0931",
        700: "#6b082a",
        800: "#590724",
        900: "#40051a"
},
      primary: {
        25: "#fcf2f5",
        50: "#f9e5ec",
        100: "#e7becc",
        200: "#db8aa6",
        300: "#c24d76",
        400: "#b02958",
        500: "#8f0a39",
        600: "#7d0931",
        700: "#6b082a",
        800: "#590724",
        900: "#40051a"
},
      secondary: {
        25: "#eef8f7",
        50: "#ddf2ee",
        100: "#acdfd6",
        200: "#74c9b9",
        300: "#38b49e",
        400: "#00a385",
        500: "#009277",
        600: "#02846c",
        700: "#01745f",
        800: "#006552",
        900: "#01483b"
},
    },
  },
};
