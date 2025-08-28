/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'policypal-gray': '#343541',
        'policypal-dark': '#202123',
        'policypal-light': '#40414f',
        'policypal-border': '#565869',
        'policypal-text': '#ececf1',
        'policypal-blue': '#3b82f6',
        'policypal-indigo': '#6366f1',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
