
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cinema: {
          black: '#050505',
          red: '#E50914',
          white: '#FFFFFF',
          glass: 'rgba(255, 255, 255, 0.06)',
          gray: '#1A1A1A',
          dark: '#0A0A0A',
        }
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-red': 'radial-gradient(circle at center, rgba(229, 9, 20, 0.15) 0%, rgba(5, 5, 5, 0) 70%)',
        'hero-gradient': 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.8) 100%)',
      },
      boxShadow: {
        'neon-red': '0 0 20px rgba(229, 9, 20, 0.3)',
        'neon-red-hover': '0 0 30px rgba(229, 9, 20, 0.6)',
      }
    },
  },
  plugins: [],
}
