/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF8E7',
          100: '#FFE8B8',
          200: '#FFD689',
          300: '#FFC45A',
          400: '#FFB22B',
          500: '#FFA000',
          600: '#CC8000',
          700: '#996000',
          800: '#664000',
          900: '#332000',
        },
        maroon: {
          50: '#F5E6E6',
          100: '#E6CCCC',
          200: '#D69999',
          300: '#C66666',
          400: '#B73333',
          500: '#800020',
          600: '#66001A',
          700: '#4D0013',
          800: '#33000D',
          900: '#1A0006',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FFF9E6',
          200: '#FFF3CC',
          300: '#FFEDB3',
          400: '#FFE799',
          500: '#B8860B',
          600: '#996F09',
          700: '#7A5807',
          800: '#5C4205',
          900: '#3D2C03',
        },
        light: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#F0F0F0',
          400: '#E5E5E5',
          500: '#D4D4D4',
        },
        dark: {
          50: '#1A1A1A',
          100: '#141414',
          200: '#0F0F0F',
          300: '#0A0A0A',
          400: '#050505',
          500: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        sanskrit: ['Noto Sans Devanagari', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

