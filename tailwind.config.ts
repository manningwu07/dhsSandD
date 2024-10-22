/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],

  theme: {
    fontFamily: {
      'cursive': ["Pacifico", 'cursive',],
    },

    extend: {
      screens: {
        // Override the default 'sm' breakpoint to 480px
        sm: "480px",
        "2xl": "1440px",
      },

      colors: {
        blue: "#003366",
        red: "#CC0033"
      }
    },
  },
  plugins: [],
};
