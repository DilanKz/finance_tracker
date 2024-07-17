/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./App.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        customPurple: '#7F3DFF',
        customPurpleLight: '#EEE5FF',
      },
    },
  },
  plugins: [],
}

