/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          subtle: 'var(--color-primary-subtle)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          dark: 'var(--color-accent-dark)',
          light: 'var(--color-accent-light)',
          hover: 'var(--color-accent-hover)',
        },
        paper: {
          DEFAULT: 'var(--color-bg-base)',
          soft: 'var(--color-bg-soft)',
          card: 'var(--color-bg-card)',
          border: 'var(--color-border)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 1px 1px rgba(0, 0, 0, 0.06)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
