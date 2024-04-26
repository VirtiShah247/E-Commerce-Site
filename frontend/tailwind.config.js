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
            transform: 'translateX(-40%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        
      },
      animation: {
        slideIn: 'slideInFromLeft 300ms ease-in',
      },
      colors: {
        'primary-color': '#6246ea',
        'secondary-color': '#e45858',
        'base-color': '#fffffe',
        'foreground-color': '#2b2c34',
        'active-state-color': '#d1d1e9'
      },
      boxShadow: {
        '3xl': '0 0px 20px 0px rgba(0,0,0,0.3)'
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