/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Karla', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'accent-1': '#333',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
