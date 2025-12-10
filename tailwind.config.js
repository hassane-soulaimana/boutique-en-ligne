export default {
  content: [
    "index.html",
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Tight', 'Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Bodoni Moda', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
