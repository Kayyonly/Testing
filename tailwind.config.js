/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './store/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'apple-gray': {
          100: '#f5f5f7',
          500: '#8e8e93',
          900: '#1c1c1e',
        },
        'apple-red': {
          500: '#fa233b',
        },
      },
    },
  },
  plugins: [],
};
