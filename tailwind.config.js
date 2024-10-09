/** @type {import('tailwindcss').Config} */
export default {
  content:["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  darkMode:'class' , // Utilisation de la classe 'dark' pour activer le mode sombre
  theme: {
    extend: {
      colors: {
        primary: {
          brightBlue: 'hsl(220, 98%, 61%)',
          checkBackground: 'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
        },
        light: {
            veryLightGray: 'hsl(0, 0%, 98%)',
            veryLightGrayishBlue: 'hsl(236, 33%, 92%)',
            lightGrayishBlue: 'hsl(233, 11%, 84%)',
            darkGrayishBlue: 'hsl(236, 9%, 61%)',
            veryDarkGrayishBlue: 'hsl(235, 19%, 31%)',
          },
        dark: { 
            veryDarkBlue: 'hsl(235, 21%, 11%)',
            veryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
            darkGrayishBlue: 'hsl(236, 9%, 61%)',
            LightGrayishBlue: 'hsl(234, 39%, 85%)',
            LightGrayishBluehover: 'hsl(236, 39%, 92%)',
            DarkGrayishBlue: 'hsl(234, 11%, 52%)',
            veryDarkGrayishBlue1: 'hsl(233, 14%, 35%)',
            veryDarkGrayishBlue2: 'hsl(237, 14%, 26%)',
          }
        },
      },
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      fontSize: {
        body: '18px',
      }
    },
    plugins: [],
};


