const { borderRadius } = require('@mui/system')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9c27b0"
        }
      }
    },
  },
  plugins:[
    function({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          fontWeight: '600',
          backgroundColor: '#9c27b0', // Màu mặc định của button
          color: '#ffffff',
          rounder: '99px',
          '&:hover': {
            backgroundColor: '#9c27b0', // Màu khi hover
          },
          '&:focus': {
            outline: '2px solid #9c27b0', // Viền khi focus
          },
        },
      })
    }
  ],
}
