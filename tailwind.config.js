/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
      },
      colors: {
        sapphire: {
          50: '#E7F0FA',
          100: '#D2E2F5',
          200: '#A5C5EC',
          300: '#7BA4D0',
          400: '#5284B8',
          500: '#2E5E99',
          600: '#244B7B',
          700: '#1B385C',
          800: '#12253E',
          900: '#0D2440',
          950: '#061120',
        },
        brand: {
          dark: '#0A0D14',
          card: '#121620',
          border: '#1E2638',
          accent: '#2E5E99',
          glow: '#7BA4D0',
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      }
    },
  },
  plugins: [],
}
