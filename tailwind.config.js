/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: false, // or 'media' or 'class'
    extend: {
      colors: {
        primary: '#eed765',
        secondary: '#e6eac8',
      },
    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
    },
    container: {
      padding: '2rem',
    },
  },
  plugins: [],
}

