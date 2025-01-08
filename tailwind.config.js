/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  theme: {

    extend: {
      fontFamily: {
        "manrope-regular": ["manrope-regular"],
        "manrope-medium": ["manrope-medium"],
        "manrope-semibold": ["manrope-semibold"],
        "manrope-bold": ["manrope-bold"],
        "manrope-extrabold": ["manrope-extrabold"],
        "manrope-extralight": ["manrope-extralight"],
        "manrope-light": ["manrope-light"],
      },
      colors: {
        "grey": {
          50: "#FAFAFA",
          100: "#F5F5F5",
          150: "#EDEDED",
          200: "#E8E8E8",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#5A5A5A",
          750: "#363636",
          900: "#1E1E1E",
          950: "#151515"
        },
        "primary": "#DA99B9",
        "secondary": "#C185A2",
        "accent": "#6962AD",
        "optional": {
          1: "#3B48DC",
          2: "#258EFF",
          3: "#37C9E7",
          4: "#45E4A6"
        }
      },
    },
  },
  plugins: [],
}

