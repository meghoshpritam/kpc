const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    screens: {
      // ============= OLD SECTION START ==============
      xm: '450px',
      ...defaultTheme.screens,
      // ============= OLD SECTION END ==============
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
      colors: {
        dark: '#303234',
        dark2: '#626381',
        'light-gray': '#e5e5e5',
        gray2: '#696984',
        primary: '#2300B1',
        secondary: '#F48C06',
        'sky-blue': '#23BDEE',
      },
      fontFamily: {
        nunitoSans: ['NunitoSans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        3.75: '0.9375rem',
        4.8: '1.2rem',
        36: '9rem',
        40: '10rem',
        56: '14rem',
      },
      spacing: {
        1.5: '0.375rem',
        13: '3.25rem',
        17: '4.25rem',
        79.2: '19.8rem',
        92: '23rem',
        100: '25rem',
        104: '26rem',
        108: '27rem',
        110: '27.5rem',
        112: '28rem',
      },
      zIndex: {
        60: 60,
      },
      typography: {
        // ============= OLD SECTION START ==============
        DEFAULT: {
          css: {
            color: '#313062',
            strong: {
              color: '#313062',
            },
          },
        },
        // ============= OLD SECTION END ==============
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
      gradientColorStops: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
