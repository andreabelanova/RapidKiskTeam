// tailwind.config.cjs
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./client/src/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Táto farba bude mapovať na CSS custom property --border
        border: "hsl(var(--border) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
