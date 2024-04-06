/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInFromLeft: {
          '0%': {
            transform: 'translateX(-20%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        slideIn: 'slideInFromLeft 300ms ease 0s 1 '
      },
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
  plugins: [
		plugin(function ({addBase}) {
			addBase({
				'[type="search"]::-webkit-search-cancel-button': {display: 'none'},
      
			
			})
		}),
  ],
}