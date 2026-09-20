/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF8F5',
          100: '#F4F0E8',
          200: '#EAE3D6',
          300: '#DDD4C4',
          400: '#C5B9A4',
          500: '#9E927E',
        },
        obsidian: {
          950: '#0F1012',
          900: '#16171B',
          850: '#1C1E23',
          800: '#262830',
          700: '#383B46',
        },
        gold: {
          50: '#FAF7F0',
          100: '#F4ECD8',
          200: '#E8D6B0',
          300: '#D5BC84',
          400: '#C2A35C',
          500: '#B08E41',
          600: '#9E7B35',
          700: '#7F6024',
          800: '#62491B',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.2em',
        'widest-2xl': '0.28em',
      }
    },
  },
  plugins: [],
}
