/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Karla', ...defaultTheme.fontFamily.sans],
        body: ['Karla'],
      },
      colors: {
        'accent-1': '#333',
        'button-blue': '#604E91',
      },
      spacing: {
        160: '40rem',
      },
      container: false,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        '.container': {
          width: '100',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': { maxWidth: '640px' },
          '@screen md': { maxWidth: '768px' },
          '@screen lg': { maxWidth: '975px' },
        },
      });
    },
  ],
};
