/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateAreas: {
        'layout': [
          ' header sidebar ',
          ' content sidebar ',
          '  content sidebar ',
        ],
      },
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),  
    require('daisyui'),

  ],
}
