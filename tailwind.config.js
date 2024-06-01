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
            input: "#32353c",
            inputHover: "#393c44",
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
        xs: "375px",
        sm: "525px",
        md: "632px",
        lg: "912px",
        gl: "1168px",
        xl: "1360px",
      },
    },
  },
  plugins: [],
};
