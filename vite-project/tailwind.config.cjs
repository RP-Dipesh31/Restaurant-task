/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans all relevant files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
