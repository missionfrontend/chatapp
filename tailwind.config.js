/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
       "sm":"640px",
       "md":"768px",
       "lg":"1024px"
      },
      fontFamily:{
        "poppins":["Poppins","sans-serif"]
      }
    },
  },
  plugins: [],
}

