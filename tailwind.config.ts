// https://m3.material.io/theme-builder#/custom
// Primary #136ED1
// Secondary #E34860
// Tertiary #FDF1E7

import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src-ui/**/*.{js,ts,jsx,tsx}"
  ],
  // Figma はダークモードにした時に class="figma-dark" を付ける。
  // Tailwind CSS のダークモード判定を変更する
  darkMode: ['selector', '.figma-dark'],
  theme: {
    extend: {
      colors: {
        // primary
        primary: {
          light: '#005db6',
          dark: '#A9C7FF'
        },
        // secondary
        secondary: {
          light: '#B42340',
          dark: '#FFB2B7'
        },
        // surface
        background: {
          light: '#FDFBFF',
          dark: '#1A1B1E'
        },
        content: {
          light: '#000000',
          dark: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
} satisfies Config

