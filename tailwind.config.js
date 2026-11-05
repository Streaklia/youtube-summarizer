/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E02440',
          accent: '#E02440',
          hover: '#C81E36',
          dark: '#040200',
          charcoal: '#040200',
          base: '#040200',
          surface: '#0B0704',
          card: '#0D0805',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
