/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Orbitron"', 'sans-serif'],
        'mono': ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        'background': '#0a0a0a',
        'foreground': '#f5f5f5',
        'primary': '#00f5d4',
        'secondary': '#f72585',
        'accent': '#7209b7',
        'card': '#1a1a1a',
        'border': '#2a2a2a',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(0, 245, 212, 0.5)',
        'glow-secondary': '0 0 15px rgba(247, 37, 133, 0.5)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 1 },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}