/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {},
      lineHeight: {},
      colors: {
        steam: {
          text: {
            primary: "#afafaf",
            secondary: "#1999ff",
          },
          component: {
            card: "#181A21",
            header: "#171d25",
          },
        },
      },
      backgroundImage: {
        body: 'url("/src/assets/body.png")',
      },
      minWidth: {},
      maxWidth: {},
      spacing: {},
      borderWidth: {},
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
