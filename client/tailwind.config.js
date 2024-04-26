/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#008080',
        'primary-color-light': '#008080be',
      },
    },
  },
  plugins: [],
};
