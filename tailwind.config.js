/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F8CFF',
        secondary: '#7B61FF',
        accent: '#00E5FF',
        brand: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#4F8CFF',
          500: '#3b72ea',
          600: '#2554d3',
          700: '#1d41ab',
          800: '#1d388b',
          900: '#1c316e',
          950: '#040816',
        },
        ai: {
          bg: '#040816',
          card: 'rgba(10, 16, 35, 0.75)',
          border: 'rgba(79, 140, 255, 0.15)',
          glow: 'rgba(0, 229, 255, 0.25)',
        }
      },
      borderRadius: {
        '3xl': '24px',
        '2xl': '20px',
      },
      boxShadow: {
        'neon-blue': '0 0 25px rgba(79, 140, 255, 0.3)',
        'neon-purple': '0 0 25px rgba(123, 97, 255, 0.3)',
        'neon-cyan': '0 0 25px rgba(0, 229, 255, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'side-rays': 'sideRays 18s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        sideRays: {
          '0%': { transform: 'rotate(-25deg) translateY(-10%) scale(1)', opacity: '0.4' },
          '50%': { transform: 'rotate(-15deg) translateY(0%) scale(1.1)', opacity: '0.7' },
          '100%': { transform: 'rotate(-30deg) translateY(10%) scale(1.05)', opacity: '0.4' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
    },
  },
  plugins: [],
}
