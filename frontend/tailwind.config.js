/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E85002',
          darker: '#C10801',
          highlight: '#F16001',
          warm: '#D9C3AB',
        },
        bg: {
          DEFAULT: '#000000',
          surface: '#0A0A0A',
          surfaceAlt: '#111111',
        },
        border: '#333333',
        text: {
          primary: '#F9F9F9',
          secondary: '#646464',
          muted: '#A7A7A7',
        },
        success: '#22C55E',
        error: '#C10801',
        warning: '#F16001',
      },
      boxShadow: {
        soft: '0 16px 40px rgba(0,0,0,0.32)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        brandGradient:
          'linear-gradient(135deg, rgba(0,0,0,0.96) 0%, rgba(193,8,1,0.9) 28%, rgba(241,96,1,0.82) 62%, rgba(217,195,171,0.78) 100%)',
      },
    },
  },
  plugins: [],
}
