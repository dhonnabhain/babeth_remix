module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,json}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
