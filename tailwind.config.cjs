/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "30v": "30vh",
        "50v": "50vh",
        "75v": "75vh",
        "80v": "80vh",
        "85v": "85vh",
      },
      minHeight: {
        "30v": "30vh",
        "50v": "50vh",
        "75v": "75vh",
        "80v": "80vh",
        "85v": "85vh",
      },
    },
  },
  plugins: [],
};
