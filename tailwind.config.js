/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flexGrow: {
        2: '2'
      },
      height: {
        'screen-custom': 'calc(100vh - 60px)',
      },
    },
  },
  plugins: [],
}
