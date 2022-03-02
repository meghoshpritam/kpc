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
      backgroundImage: {
        articles: "url('/images/patterns/articles-pattern.svg')",
        'contact-us': "url('/images/patterns/contact-us-pattern.svg')",
        'home-hero': "url('/images/patterns/homepage-bg-pattern.svg')",
        'single-article': "url('/images/patterns/single-article-pattern.svg')",
      },
      borderWidth: {
        1: '1px',
      },
      boxShadow: {
        card1: '0px 8.4157px 50.4942px rgba(38, 45, 118, 0.08)',
      },
      colors: {
        blue1: '#5b72ee',
        dark: '#303234',
        dark2: '#626381',
        'light-gray': '#e5e5e5',
        'light-gray2': '#E6E6E6',
        gold: '#FAB31C',
        gray2: '#696984',
        primary: '#2300B1',
        secondary: '#F48C06',
        'sky-blue': '#23BDEE',
        turquoise: '#29B9E7'
      },
      fontFamily: {
        nunitoSans: ['NunitoSans', 'sans-serif'],
        openSans: ['OpenSans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        rockSalt: ['RockSalt', 'cursive', 'sans-serif'],
      },
      fontSize: {
        3.75: '0.9375rem',
        4.8: '1.2rem',
        7: '1.75rem',
        36: '9rem',
        40: '10rem',
        56: '14rem',
      },
      spacing: {
        1.25: '0.3125rem',
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
        70: 70,
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
