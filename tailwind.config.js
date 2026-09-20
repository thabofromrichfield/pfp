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
          100: '#FAF3E1', // Ultra light gold tint
          200: '#F5E5BE', // Light champagne gold
          300: '#ECD395', // Radiant light gold
          400: '#E2C172', // Refined light gold
          500: '#D4AF37', // Signature light metallic gold
          600: '#BFA030', // Deep light gold
          700: '#9C7F20',
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
