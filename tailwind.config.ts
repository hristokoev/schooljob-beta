import type { Config } from 'tailwindcss'

const config: Config = {
  important: true,
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'royal-blue': {
          '50': '#f0f4fe',
          '100': '#dce6fd',
          '200': '#c1d3fc',
          '300': '#96b8fa',
          '400': '#6594f5',
          '500': '#3463ef',
          '600': '#2b4de5',
          '700': '#233bd2',
          '800': '#2331aa',
          '900': '#212f87',
          '950': '#191f52',
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 60s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  blocklist: ['table'],
}

export default config
