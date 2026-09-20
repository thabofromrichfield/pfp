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
          900: '#0B0C0E', // True Rich Obsidian Black
          850: '#111317', // Clean Structural Surface
          800: '#171920', // Element Surface
          750: '#20232B', // Crisp Border
          700: '#2C303B',
          600: '#474D5E',
        },
        gold: {
          300: '#E8D4A2',
          400: '#D8B46E',
          500: '#C5A059', // Classic Royal Gold
          600: '#A38038',
          700: '#806225',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
