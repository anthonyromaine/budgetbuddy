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
            },
            "blue-1":"#e6f4ff","blue-2":"#bae0ff","blue-3":"#91caff","blue-4":"#69b1ff","blue-5":"#4096ff","blue-6":"#1677ff","blue-7":"#0958d9","blue-8":"#003eb3","blue-9":"#002c8c","blue-10":"#001d66","geekblue-1":"#f0f5ff","geekblue-2":"#d6e4ff","geekblue-3":"#adc6ff","geekblue-4":"#85a5ff","geekblue-5":"#597ef7","geekblue-6":"#2f54eb","geekblue-7":"#1d39c4","geekblue-8":"#10239e","geekblue-9":"#061178","geekblue-10":"#030852"
          }
        }
      },
    },
    plugins: [],
  }