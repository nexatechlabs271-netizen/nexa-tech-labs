/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.{html,js}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'nexa-navy': '#02060C',
        'nexa-navy-light': '#0A1526',
        'nexa-teal': '#239B94',
        'nexa-teal-glow': '#38E4DA',
        'nexa-gray': '#8892B0',
        'nexa-danger': '#FF2E63',
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['Plus Jakarta Sans', 'sans-serif'],
        'mono': ['Space Grotesk', 'monospace'],
      },
      animation: {
        'grid-flow': 'grid-flow 25s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'sync': 'pulse-sync 2s ease-in-out infinite',
      },
      keyframes: {
        'grid-flow': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '0 50px' } },
        'scanline': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        'marquee': { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-100%)' } },
        'pulse-sync': { '0%, 100%': { opacity: 0.4, transform: 'scale(1)' }, '50%': { opacity: 1, transform: 'scale(1.2)' } }
      }
    },
  },
  plugins: [],
}