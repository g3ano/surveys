/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          from: {
            transform: 'translateY(-0.75rem)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0rem)',
            opacity: '1',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 200ms ease-in-out both',
        'fade-in': 'fade-in 200ms ease-in-out both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
