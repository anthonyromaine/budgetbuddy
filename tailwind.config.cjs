/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          main: {
            green: '#3f8600',
            red: '#cf1322'
          },
          ant: {
            red: {
              1: "#fff1f0",
              2: "#ffccc7",
              3: "#ffa39e",
              4: "#ff7875",
              5: "#ff4d4f",
              6: "#f5222d",
              7: "#cf1322",
              8: "#a8071a",
              9: "#820014",
              10: "#5c0011",
            }
          }
        }
      },
    },
    plugins: [],
  }