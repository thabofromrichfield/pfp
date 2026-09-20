/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070709',
          900: '#0D0E12',
          850: '#13141A',
          800: '#1A1C23',
          750: '#22252F',
          700: '#2C303D',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FCF8E3',
          200: '#F7EDBA',
          300: '#EFDF88',
          400: '#E5CE57',
          500: '#D4AF37', // Classic Rich Metallic Gold
          600: '#B89222',
          700: '#947214',
          800: '#755810',
          900: '#5A420C',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 35px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 60px rgba(212, 175, 55, 0.35)',
        'dark-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
      },
      letterSpacing: {
        'widest-xl': '0.22em',
        'widest-2xl': '0.3em',
      }
    },
  },
  plugins: [],
}
