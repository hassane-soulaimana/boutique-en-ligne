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
      },
    },
  },
  plugins: [],
};
