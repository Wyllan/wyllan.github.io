/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        window: '1px 1px 0 1px theme("colors.neutral.700"), 0 0 0 2px theme("colors.neutral.300")',
        button: '1px 1px theme("colors.neutral.700")',
      },
    },
  },
  plugins: [],
};
