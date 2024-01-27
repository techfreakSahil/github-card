/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: ["Roboto Slab", "serif"],
        logo: ["Catamaran", "sans-serif"],
      },
    },
  },
  plugins: [],
};
