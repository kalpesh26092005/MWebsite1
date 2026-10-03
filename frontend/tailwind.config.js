/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F1',
        rose: {
          50: '#FDF2F4',
          100: '#FBE7EB',
          200: '#F8D0D9',
          300: '#F2B3C0',
          400: '#E88DA2',
          500: '#C9506B',
          600: '#B03E58',
          700: '#8F3049',
          800: '#6B2438',
          900: '#4A1927'
        },
        marigold: {
          300: '#F7C06D',
          400: '#F0A63C',
          500: '#E2912A',
          600: '#C97A1B'
        },
        ink: '#3A2E2A',
        gold: {
          50: '#FDFBF7',
          100: '#F9F5E8',
          200: '#F2EAD0',
          300: '#E8D7A8',
          400: '#D4BC7A',
          500: '#B89B4D'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        'rose': '0 4px 20px -2px rgba(201, 80, 107, 0.15)',
        'rose-lg': '0 10px 40px -10px rgba(201, 80, 107, 0.25)',
        'gold': '0 4px 20px -2px rgba(240, 166, 60, 0.15)',
      }
    }
  },
  plugins: []
}
