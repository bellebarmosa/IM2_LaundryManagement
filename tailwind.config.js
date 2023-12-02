/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue:'#0C356A',
        lightBlue:'#0174BE',
        brightYellow: '#FFC436',
        fadedYellow: "#FFF0CE"
      },
    },
  },
  plugins: [],
}