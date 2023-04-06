/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  // important: "#root",
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        customBluishSecondary: "#000313",
        customPrimary: '#FFF42C',
        customSecondary: "#050204",
        customBuff: "#E6B785",
        customRosyBrown: "#C9A8AA",
        customMountbattenPink: "#8A7E9D"
      }
    },
  },
  plugins: [],
}