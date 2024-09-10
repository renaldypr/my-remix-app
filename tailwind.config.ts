import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'], // enable dark mode selector with mantine
  important: true
} satisfies Config
