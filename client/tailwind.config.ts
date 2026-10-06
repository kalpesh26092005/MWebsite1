import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B8860B', // Luxury Dark Goldenrod
          light: '#D4AF37',   // Metallic Gold
          lighter: '#F3E5AB', // Soft Champagne
          dark: '#8B6508',    // Deep Rich Gold
          hover: '#9E7409',
        },
        accent: {
          DEFAULT: '#9F1239', // Rich Crimson Rose
          light: '#BE123C',
          dark: '#881337',
        },
        background: {
          DEFAULT: '#FAF7F2', // Warm Ivory / Cream
          paper: '#FFFFFF',
          dark: '#121214',    // Luxury Deep Velvet
          'dark-card': '#1C1C21',
        },
        text: {
          primary: '#1C1917', // Rich Charcoal (Stone 900) - Maximum legibility
          secondary: '#44403C', // Deep Stone 700
          light: '#78716C',   // Stone 500
          dark: '#FAF7F5',    // Crisp Cream White
          'dark-muted': '#A8A29E', // Stone 400
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
        accent: ['Great Vibes', 'cursive'],
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184, 134, 11, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(184, 134, 11, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'gold': '0 10px 30px -5px rgba(184, 134, 11, 0.2)',
        'gold-hover': '0 20px 40px -10px rgba(184, 134, 11, 0.35)',
        'card': '0 4px 20px -2px rgba(28, 25, 23, 0.06), 0 2px 6px -1px rgba(28, 25, 23, 0.04)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
