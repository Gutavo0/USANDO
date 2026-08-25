/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        star: {
          bg: "#0B0B12",
          primary: "#7C5CFF",
          gradient: "#A78BFA",
          accent: "#5EEAD4",
          secondary: "#F5F5F7",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
