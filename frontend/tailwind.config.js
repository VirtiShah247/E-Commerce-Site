/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInFromLeft: {
          '0%' : {
            transform: 'translateX(-40%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        slideIn: '1s ease-out 0s 1 slideInFromLeft'
      }
    },
  },
  plugins: [],
}