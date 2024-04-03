/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#0A65CC',
        mainHover: '#094DAB',
        mainUpper: '#326bed',
        mainLower: '#E7F0FA',
        mainBorder: '#cbdff5',
        primaryLower: '#f1f5f9',
        primaryMinLower: '#f8fafc',
        primaryUpper: '#1e293b',
      },
      backgroundImage: {
        'background-footer': "url('/src/assets/images/footer-background1.png')",
        'search-footer': "url('/src/assets/images/footer-search.png')",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
