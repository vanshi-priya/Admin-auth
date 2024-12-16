/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind applies styles to all your source files
  theme: {
    extend: {
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0)" }, // Start and end at the original position
          "50%": { transform: "translateY(-10px)" }, // Move up slightly
        },
      },
      animation: {
        floating: "floating 3s ease-in-out infinite", // Name, duration, easing, and infinite loop
      },
    },
  },
  plugins: [],
};
