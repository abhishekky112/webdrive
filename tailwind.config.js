/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary1:'#262626',
        primary2:'#9A9A9A',
        primary3:'#4E4E4E'
      }
    },

  },
  plugins: [],
}

