export default {
  content: [
    "index.html",
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter Tight', 'Inter', 'sans-serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
