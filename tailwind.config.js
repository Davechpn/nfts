/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
       'red-hat-display': ['"Red Hat Display"', 'sans-serif'],
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
};
