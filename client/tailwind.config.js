/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "400px",
      md: "768px",
      lg: "1200px",
    },
    colors: {
      background: "#FFF9CA",
      secondary: "#FFDEB4",
      fontMain: "black",
      fontSecondary: "white",
      white: "white",
    },
    extend: {
      boxShadow: {
        mainShadow: " 8px 10px 0 black",
      },
      fontFamily: {
        josefin: [`"Josefin Sans"`],
      },
    },
  },
  plugins: [],
};
