/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        rotate: "rotate 30s linear infinite",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"], // Define Syne as a custom font
      },
    },
  },
  plugins: [require('tailwind-scrollbar')], // Correctly load the scrollbar plugin
};
