/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {},
      lineHeight: {},
      colors: {
        base: {
          200: "#EBEAEA",
          300: "#CBC9C8",
          400: "#B2AFAE",
          500: "#999594",
          600: "#7F7B7A",
          700: "#656261",
          800: "#4B4948",
          900: "#31302F",
          1000: "#171616",
        },

        accent: {
          lighter: "#FAD8D2",
          light: "#F18C79",
          primary: "#ED664B",
          dark: "#E83F1E",
          darker: "#B42C12",
        },
        green: {
          lighter: "#9BFF99",
          light: "#22FF1E",
          primary: "#FD0000",
          dark: "#038A00",
          darker: "#025100",
        },
        orange: {
          lighter: "#FDEDE5",
        },
        red: {
          lighter: "#FF9B9B",
          light: "#FF5555",
          primary: "#FD0000",
          dark: "#B90000",
          darker: "#710000",
        },
      },
      backgroundImage: {},
      minWidth: {},
      maxWidth: {
        88: "352px",
        102: "408px",
      },
      spacing: {},
      borderWidth: {},
      boxShadow: {
        error: "inset 0px 0px 0px 2px #FD0000;",
        card: "0px 20px 120px 15px rgba(0,0,0,0.7)",
      },
      screens: {
        xs: "0px",
        sm: "577px",
        md: "632px",
        lg: "993px",
        gl: "1024px",
        xl: "1201px",
      },
    },
  },
  plugins: [],
};
