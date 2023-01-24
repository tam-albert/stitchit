/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#396dff",
        "primary-dim": "#6987db",
        secondary: "#41927d",
        "secondary-dim": "#266858",
        tertiary: "#a7d8bc",
        "tertiary-dim": "#90bba4",
        sunflower: "#ffd245",
        "light-pink": "#fbcdc8",
        "darker-pink": "#f79e8c",
        darkgrey: "#d4d4d4",
        medgrey: "#e0e0e0",
        grey: "#f7f7f7",
      },
    },
  },
  plugins: [],
};
