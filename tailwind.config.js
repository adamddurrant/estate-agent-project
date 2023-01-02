/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in": "url('/src/assets/sign-in.jpg')",
        "sign-up": "url('/src/assets/sign-up.jpg')",
        "forgot-pass": "url('/src/assets/forgot-pass.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
