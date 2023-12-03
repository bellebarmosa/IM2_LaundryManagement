/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "darkBlue": "#448DB8",
        "lightBlue":'#9ED4E1',
        "brightYellow": '#FFFADD',
        "fadedYellow": "#FFDFA4"
      },
    },
  },
  plugins: [],
};