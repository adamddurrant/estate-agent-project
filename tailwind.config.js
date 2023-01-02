/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in": "url('/src/images/sign-in.jpg')",
        "sign-up": "url('/src/images/sign-up.jpg')",
        "forgot-pass": "url('/src/images/forgot-pass.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
