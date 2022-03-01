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
      inset: {
        // ============= OLD SECTION START ==============
        1.8: '-0.45rem',
        34: '8.5rem',
        // ============= OLD SECTION END ==============
      },
      lineHeight: {
        // ============= OLD SECTION START ==============
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        // ============= OLD SECTION END ==============
      },
      borderWidth: {
        1: '1px',
      },
      zIndex: {
        // ============= OLD SECTION START ==============
        60: 60,
        // ============= OLD SECTION END ==============
      },
      gridTemplateRows: {
        // ============= OLD SECTION START ==============
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
        // ============= OLD SECTION END ==============
      },
      gridRow: {
        // ============= OLD SECTION START ==============
        'span-7': 'span 7 / span 7',
        // ============= OLD SECTION END ==============
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
      colors: {
        // ============= OLD SECTION START ==============
        g1: '#1EB3FB',
        g2: '#D3AEFE',
        g3: '#313062',
        g4: '#304D89',
        white2: '#F6F7FA',
        white3: '#F9F9F9',
        white4: '#F5F8FF',
        'ice-blue': '#E3E7EC',
        'ice-blue2': '#DAE0E7',
        purple2: '#6926C5',
        'deep-purple': '#732C7D',
        'dark-purple': '#7C3A85',
        indigo: '#242464',
        lavender: '#9B8ABD',
        // gray2: '#7B7F89',
        'g5-f': '#DCB7FE',
        'g5-t': '#3EBCFC',
        'g8-f': '#E73DFF',
        'g8-t': '#4939FF',
        'blue-gray': '#304659',
        // ============= OLD SECTION END ==============
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
      padding: {
        // ============= OLD SECTION START ==============
        '1_5': '0.375rem',
        '2_5': '0.625rem',
        // ============= OLD SECTION END ==============
      },
      fontSize: {
        // ============= OLD SECTION START ==============
        3.75: '0.9375rem',
        4.8: '1.2rem',
        36: '9rem',
        40: '10rem',
        56: '14rem',
        // ============= OLD SECTION END ==============
      },
      translate: {
        // ============= OLD SECTION START ==============
        '3/25': '12%',
        '7/50': '-14%',
        '9/50': '18%',
        // ============= OLD SECTION END ==============
      },
      boxShadow: {
        // ============= OLD SECTION START ==============
        circle: '0px 2px 15px 2px rgba(21, 0, 119, 0.3)',
        // ============= OLD SECTION END ==============
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
