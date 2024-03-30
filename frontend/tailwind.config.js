/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#FEF2F2',
        'dull-pink': '#f6dddd',
        'light-pink': '#e4c2c1',
        'dark-pink': '#b6666f',
        'pink': '#f53163',
        'brownish-yellow': '#d1a080',
        'dark-yellow': '#db844b',
        'brown': '#440313',
      }
    },
  },
  plugins: [],
}