/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      sm: "600px", // começa o modo "tablet"
      sm671: "671px", // breakpoint customizado solicitado (mostrar navbar a partir de 671px)
      md: "1000px", // a partir daqui vira modo desktop
      lg1200: "1200px", // breakpoint para ajustes em telas maiores que 1200px
    },
  },
  plugins: [],
};
