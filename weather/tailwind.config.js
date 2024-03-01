/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066a8',
        secondary: '#0d6788',
      },
    },
    fontFamily: {
      'sans': ['Red Rose', 'serif'],
    },
    container: {
      padding: '2rem',
      center: true,
    },
  },
  plugins: [],
}

