/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      overflow: {
        'always-scroll': 'scroll', // Custom overflow class
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
    screens: { // Use "screens" instead of "screen"
      sm: '640px', // Small screen size (mobile)
      md: '768px', // Medium screen size (tablet)
      lg: '1024px', // Large screen size (small desktop)
      xl: '1280px', // Extra large screen size (desktop)
      '2xl': '1536px', // 2x Extra large screen size (large desktop)
    },
  },
  plugins: [],
};
