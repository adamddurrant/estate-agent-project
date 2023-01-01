/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in": "url('/src/images/house-sign-in.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
