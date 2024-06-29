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
          '50': '#f1f4fd',
          '100': '#dfe7fa',
          '200': '#c5d5f8',
          '300': '#9ebbf2',
          '400': '#7097ea',
          '500': '#4169e1',
          '600': '#3957d7',
          '700': '#3044c5',
          '800': '#2d39a0',
          '900': '#29347f',
          '950': '#1d224e',
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
