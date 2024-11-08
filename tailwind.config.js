const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '390px',
      ...defaultTheme.screens,
      '3xl': '1640px',
    },
    fontSize: {
        'xs':   ['0.75rem', '1rem'],        // 12px on 16px
        'sm':   ['0.84375rem', '1.1875rem'], // 13.5px on 19px [Default: mobile]
        'base': ['0.875rem', '1.25rem'],     // 14px on 20px   [Default: desktop]
        'lg':   ['1rem', '1.25rem'],         // 16px on 20px
        'xl':   ['1.125rem', '1.25rem'],     // 18px on 20px
        '2xl':  ['1.25rem', '1.25rem'],      // 20px on 20px
        '3xl':  ['1.5rem', '1.5rem'],        // 24px on 24px
        '4xl':  ['2rem', '2.5rem'],          // 32px on 40px
        '5xl':  ['2.5rem', '3rem'],          // 40px on 48px
        '6xl':  ['3rem', '3.5rem'],          // 48px on 56px
      },
    extend: {
      colors: {
        primary: {
          200: "#d9f99d",
          300: "#bef264",
          400: "#a3e635",
          500: "#84cc16",
          600: "#65a30d",
          700: "#4d7c0f",
          800: "#3f6212",
          900: "#365314",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        'sans': ['WeThePeople', ...defaultTheme.fontFamily.sans], // Add WeThePeople as primary font
        'mono': ['var(--font-ibm-plex-mono)', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        'rotate-pulse':
          'rotate-pulse 0.75s linear infinite normal both running',
        'hover-drift':
          'hover-drift 8s linear infinite',
        'hover-wobble':
          'hover-wobble 6s linear infinite normal both running',
      },
      keyframes: {
        'rotate-pulse': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(0.8)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'hover-drift': {
          '0%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(1px, -2px)' },
          '40%': { transform: 'translate(1px, 1.5px)' },
          '60%': { transform: 'translate(-1px, 2px)' },
          '80%': { transform: 'translate(-1.5px, -1.75px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'hover-wobble': {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(3.5deg)' },
          '40%': { transform: 'rotate(-2deg)' },
          '60%': { transform: 'rotate(2.5deg)' },
          '80%': { transform: 'rotate(-2.5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'key-turn': {
            '0%': { transform: 'rotate(0deg)' },
            '20%': { transform: 'rotate(-90deg)' },
            '40%': { transform: 'rotate(-180deg)' },
            '60%': { transform: 'rotate(-270deg)' },
            '80%, 100%': { transform: 'rotate(-360deg)' }
          }
      },
      animation: {
        'key-turn': 'key-turn 1.5s ease-in-out forwards'
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
