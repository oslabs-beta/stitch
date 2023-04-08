/** @type {import('tailwindcss').Config} */
const tailwindcss = require('tailwindcss');
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    fontFamily: {
      display: ['La Belle Aurore', 'cursive'],
    },
    extend: {},
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#f9f9f9',
      desert: {
        bole: '#7F3E30ff',
        rust: '#B6592Fff',
        green: '#608685ff',
        sage: '#A5AE91ff',
        ash: '#C2D2D0ff',
        gray: '#4A4850ff',
      },
      space: {
        black: '#010103ff',
        licorice: '#2C1D1Fff',
        jet: '#2C2924ff',
        ebony: '#5F6962ff',
        gray: '#BEC9CFff',
        lapis: '#245F83ff',
        brown: '#A53C1Cff',
        ochre: '#DA7916ff',
        goldenrod: '#D7A503ff',
      },
      midnight: {
        space: '#1E2848ff',
        space2: '#2B245Dff',
        space3: '#3D3660ff',
        oxford: '#10162Bff',
        rose: '#A05461ff',
        fuchsia: '#BC577Fff',
        goldenrod: '#AE781Aff',
        glaucous: '#737CB3ff',
        seagreen: '#2D8E50ff',
        denim: '#3663B1ff',
      },
      slate: {
        300: '#cbd5e1',
        800: '#1e293b',
      },
      colorHunt: {
        primary: '#525252',
        secondary: '#414141',
        tertiary: '#313131',
        quatrinary: '#EC625F',
      },
    },
  },
  plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')],
};
