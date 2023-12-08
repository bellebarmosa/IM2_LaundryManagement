/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "darkBlue": "#448DB8",
        "lightBlue":'#9ED4E1',
        "brightYellow": '#FFFADD',
        "fadedYellow": "#FFDFA4",
        "warningRed":"#D4092E",
        "screenYellow":"#E6E9CE"
      },
      fontFamily: {
        'alegreya-sans': ['Alegreya Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
};