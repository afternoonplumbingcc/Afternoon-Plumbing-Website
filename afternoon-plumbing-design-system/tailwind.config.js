/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#b3d7ff',
          200: '#80bdff',
          300: '#4da3ff',
          400: '#1a89ff',
          500: '#0066e6',
          600: '#0052b3',
          700: '#003d80',
          800: '#00294d',
          900: '#00141a'
        },
        secondary: {
          50: '#faf3eb',
          100: '#f5e3d3',
          200: '#efd3b3',
          300: '#eac393',
          400: '#e4b373',
          500: '#dea352',
          600: '#b8843e',
          700: '#93642a',
          800: '#6e441e',
          900: '#492412'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Lato"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        '7xl': ['4.5rem', { lineHeight: '1.2' }],
        '8xl': ['6rem', { lineHeight: '1.2' }],
        '9xl': ['8rem', { lineHeight: '1.2' }]
      },
      spacing: {
        '68': '17rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '128': '32rem'
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(32, 31, 29, 0.05)',
        'md': '0 4px 6px -1px rgba(32, 31, 29, 0.07), 0 2px 4px -2px rgba(32, 31, 29, 0.06)',
        'lg': '0 10px 15px -3px rgba(32, 31, 29, 0.08), 0 4px 6px -2px rgba(32, 31, 29, 0.05)',
        'xl': '0 20px 25px -5px rgba(32, 31, 29, 0.1), 0 10px 10px -5px rgba(32, 31, 29, 0.04)',
        '2xl': '0 25px 50px -12px rgba(32, 31, 29, 0.25)'
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms'
      },
      transitionTimingFunction: {
        'sharp': 'cubic-bezier(0, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    }
  },
  plugins: [],
}