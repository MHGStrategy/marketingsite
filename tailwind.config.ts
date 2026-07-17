import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        tier: '1000px',
      },
      colors: {
        primary: {
          blue: '#239bf6',
          black: '#000000',
          white: '#FFFFFF',
        },
        gray: {
          50: '#f9f9f9',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#999999',
          400: '#666666',
          500: '#333333',
          600: '#1a1a1a',
          700: '#0d0d0d',
        },
        accent: {
          yellowgold: '#FFD700',
        },
      },
    },
  },
  plugins: [],
}
export default config
