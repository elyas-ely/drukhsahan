/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aLight: ["Alexandria-Light"],
        aRegular: ["Alexandria-Regular"],
        aMedium: ["Alexandria-Medium"],
        aSemiBold: ["Alexandria-SemiBold"],
        aBold: ["Alexandria-Bold"],
        aBlack: ["Alexandria-Black"],
        rLight: ["Roboto-Light"],
        rRegular: ["Roboto-Regular"],
        rMedium: ["Roboto-Medium"],
        rBlack: ["Roboto-Black"],
        rBold: ["Roboto-Bold"],
      },
    },
  },
  plugins: [],
}
