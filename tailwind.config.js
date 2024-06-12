/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      colors: {
        // foreground and background colors
        green: "#153638",
        "dark-green": "#10292B",

        // buttons and more
        blue: "#39629B",
        "dark-blue": "#1E4F96",
        yellow: "#CEA24F",
        "bright-yellow": "#FFBF00",

        // task description colors
        red: "#F0432C",
        "bright-blue": "#3384FC",
        green: "#24AA49",
      },
      backgroundImage: {
        "yellow-gradient":
          "radial-gradient(169.40% 89.55% at 94.76% 6.29%, #FFBF00 0%, #997300 100%)",
      },
    },
  },
  plugins: [],
};
