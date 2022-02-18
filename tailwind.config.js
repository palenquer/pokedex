const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      background: "#F7F7F7",
      mediumgray: "#666666",
      lightgray: "#E0E0E0",
      darkgray: "#212121",
      type: {
        rock: '#B69E31',
        ghost: '#70559B',
        steel: '#B7B9D0',
        water: '#6493EB',
        grass: '#74CB48',
        psychic: '#FB5584',
        ice: '#9AD6DF',
        dark: '#75574C',
        fairy: '#E69EAC',
        normal: '#AAA67F',
        fighting: '#C12239',
        flying: '#A891EC',
        poison: '#A43E9E',
        ground: '#DEC16B',
        bug: '#A7B723',
        fire: '#F57D31',
        electric: '#F9CF30',
        dragon: '#7037FF'
      }
    },
  },
  plugins: [],
};