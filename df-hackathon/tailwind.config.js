/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryPurple:'#662671',
        gray: '#A08CB1',
        darkgray:'#717070',
        gray700:'#655A5A',
      },
      boxShadow: {
        'custom': 'rgba(14, 30, 37, 0.12) 0px 4px 6px 0px, rgba(14, 30, 37, 0.32) 2px 4px 18px 2px;'
      },
      fontFamily: {
        'font-poppins': ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

