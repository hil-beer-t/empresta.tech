/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {

    extend: {
      fontFamily: {
        'sans': ['roboto', 'sans-serif', 'monospace']
      }
    },
  },
  plugins: [],
}
