module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundImage: theme => ({
        'logo': "url('/static/images/logo.png')"
      }),
      spacing: {
        // '16': '4rem',
        // '20': '5rem',
        // '24': '6rem',
        '28': '7rem',
        // '32': '8rem',
        '36': '9rem',
        // '40': '10rem',
        '44': '11rem',
        // '48': '12rem',
        '52': '13rem',
        // '56': '14rem',
        '60': '15rem',
        // '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem'
      }
    },
    screens: {
      'xs': { 'max': '414px' },
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0rem',
        sm: '2rem',
        lg: '8rem',
        xl: '8rem',
        '2xl': '8rem',
      }
    }
  },
  variants: {},
  plugins: [],
}