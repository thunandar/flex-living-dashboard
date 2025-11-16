/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'flex': {
          DEFAULT: '#284e4c',
          dark: '#1e3c3a',
          light: '#32605e',
        },
        'policy': {
          DEFAULT: '#F1F3EE',
        },
      },
    },
  },
  plugins: [],
};
