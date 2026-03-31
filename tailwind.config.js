/** @type {import('tailwindcss').Config} */
module.exports = {
  // PENTING: Jalur ini harus benar agar Tailwind bisa men-generate CSS
  content: [
    "./index.html",
    "./pages/**/*.{html,js}",
    "./src/**/*.{html,js}",
    "./src/components/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        nexa: {
          teal: '#239B94',   // Warna Pirus Logo
          navy: '#0B2038',   // Warna Navy Logo
          light: '#F8FAFC',  // Background Clean
          gray: '#64748B',
          accent: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'nexa-soft': '0 4px 20px -2px rgba(11, 32, 56, 0.05)',
        'nexa-hover': '0 10px 40px -4px rgba(35, 155, 148, 0.15)',
      }
    },
  },
  plugins: [],
}