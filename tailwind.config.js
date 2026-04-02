/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Tells Tailwind to scan all React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}