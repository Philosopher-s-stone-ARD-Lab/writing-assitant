/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#1a1a2e',
        'brand-surface': '#2a2d42',
        'brand-primary': '#c9a87c',
        'brand-primary-hover': '#e6bf8f',
        'brand-text': '#e0e0e0',
        'brand-subtle': '#8c8ca0',
      },
      fontFamily: {
        serif: ['Amiri', 'serif'],
        sans: ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
