/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
        secondary: 'var(--color-secondary)',
        'secondary-dark': 'var(--color-secondary-dark)',
        'secondary-light': 'var(--color-secondary-light)',
        success: 'var(--color-success)',
        'success-dark': 'var(--color-success-dark)',
        'success-light': 'var(--color-success-light)',
        error: 'var(--color-error)',
        'error-dark': 'var(--color-error-dark)',
        'error-light': 'var(--color-error-light)',
        info: 'var(--color-info)',
        'info-dark': 'var(--color-info-dark)',
        'info-light': 'var(--color-info-light)',
        warning: 'var(--color-warning)',
        'warning-dark': 'var(--color-warning-dark)',
        'warning-light': 'var(--color-warning-light)',
        inherit: 'var(--color-inherit)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',
      },
      fontSize: {
        sm: 'var(--font-size-small)',
        base: 'var(--font-size-medium)',
        lg: 'var(--font-size-large)',
      },
      minHeight: {
        sm: 'var(--min-height-small)',
        md: 'var(--min-height-medium)',
        lg: 'var(--min-height-large)',
      },
      padding: {
        sm: 'var(--padding-small)',
        md: 'var(--padding-medium)',
        lg: 'var(--padding-large)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
