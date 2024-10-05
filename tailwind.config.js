/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'basegreen': '#006b62',
        'lightgreen': '#6A9C89',
        'darkgreen': '#003733',
        'graygreen': '#C4DAD2',
        'gray1': '#666666',
        'graybg': '#D9D9D9',
        'lightgray': '#B2B2B2',
        'salmon': '#FF7840',
        'darkorange': '#C85B2E',
        'blackorange': '#5B2813',
        'lightorange': '#FFD2BF',
        'redselect': '#C73E2E',
        'almortwhite': '#FFFFFF'
      },
      height: {
        '500': '500px',
        '630': '630px',
        '800': '800px'
      },
      width: {
        '340': '340px',
        '400': '400px',
        '430': '430px',
        '500': '500px',
        'panel': '560px',
        '600': '600px',
        '630': '630px',
        '750': '750px'
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

