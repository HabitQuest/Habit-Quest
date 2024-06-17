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
        //primary color
        "dark-green": "#0C1E1F",
        green: "#153638",
        // accent colors
        yellow: "#CEA24F",
        gold: "#FFD15C",
        blue: "#39629B",
        "dark-blue": "#1E4F96",
        // task descriptor colors
        "neon-red": "#F0432C",
        "neon-blue": "#3384FC",
        "neon-green": "#24AA49",
      },
      backgroundImage: {
        "yellow-gradient":
          "radial-gradient(58.03% 58.03% at 41.97% 50%, #FFBF00 43%, #997300 100%)",

        "blue-gradient": "linear-gradient(180deg, #3384FC 0%, #1E4F96 100%);",
      },
    },
  },
  plugins: [],
};
