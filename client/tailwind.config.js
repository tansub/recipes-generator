/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "chestnut-rose": {
          50: "#fcf4f4",
          100: "#f9ecea",
          200: "#f3d9d8",
          300: "#e8bbb9",
          400: "#db9391",
          500: "#c96868",
          600: "#b34b50",
          700: "#963a41",
          800: "#7e333b",
          900: "#6d2e37",
          950: "#3b161a",
        },

        glacier: {
          50: "#f2f8f9",
          100: "#dfedee",
          200: "#c3dade",
          300: "#99c1c7",
          400: "#7eacb5",
          500: "#4c828e",
          600: "#426b78",
          700: "#3a5a64",
          800: "#364c54",
          900: "#304149",
          950: "#1d292f",
        },
        serenade: {
          50: "#fff4ea",
          100: "#ffead5",
          200: "#fed0aa",
          300: "#fdaf74",
          400: "#fb833c",
          500: "#f96116",
          600: "#ea460c",
          700: "#c2330c",
          800: "#9a2912",
          900: "#7c2512",
          950: "#430f07",
        },
      },
    },
  },
  plugins: [],
};
