// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed', // purple-600
        secondary: '#ec4899', // pink-500
        tetiary: '#fb923c', // orange-400

        neutral: {
          light: '#fb923c', // slate-50
          light1: '#f8fafc', // slate-50
          DEFAULT: '#64748b', // slate-500/600
          dark: '#1e293b', // slate-800
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #7c3aed, #ec4899, #fb923c)',
        'hero-gradient': 'linear-gradient(to right, #ffffff, #f8fafc, #fdf2f8)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
