/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
      },
      colors: {
        primary: {
          500: '#6a5cff',
          600: '#5b4aff',
          700: '#4a39f5',
        },
        surface: {
          900: '#0a0120',
          800: '#0f0327',
          700: '#130a33',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmerY: {
          '0%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
          '100%': { backgroundPosition: '50% 0%' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.4s ease-in-out infinite',
        'shimmer-y': 'shimmerY 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
