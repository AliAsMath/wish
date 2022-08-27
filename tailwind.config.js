/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "sans", "serif"],
      },
      colors: {
        "gray-bg": "#A3A3A3",
        "light-gray-bg": "#E2E2E2",
        "green-bg": "#C0E7E3",
        "orange-text": "#FFBB00",
        "blue-text": "#444E6C",
        "green-text": "#60C4B2",
        "gray-text": "#757575",
      },
    },
  },
  plugins: [],
  important: true,
};
