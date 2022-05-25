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
        services: "url('/images/patterns/services-pattern.svg')",
      },
      borderWidth: {
        1: '1px',
      },
      boxShadow: {
        card1: '0px 8.4157px 50.4942px rgba(38, 45, 118, 0.08)',
        card2: '0px 10px 60px rgba(38, 45, 118, 0.08)',
        card3: '0px 12.6235px 37.0291px rgba(13, 15, 28, 0.12)',
        card4: '0px 13.4651px 33.6628px rgba(37, 44, 113, 0.1)',
        button: '0px 0px 5px #C4C4C4',
      },
      colors: {
        black1: '#252641',
        blue1: '#5b72ee',
        'blue-gray': '#69788c',
        'blue-gray2': '#2D3540',
        dark: '#303234',
        dark2: '#626381',
        'light-gray': '#e5e5e5',
        'light-gray2': '#E6E6E6',
        'light-gray3': '#CFDCE5',
        gold: '#FAB31C',
        gray2: '#696984',
        gray3: '#CFDCE5',
        indigo1: '#2f327d',
        indigo2: '#525596',
        indigo3: '#5F5F7E',
        indigo4: '#80819A',
        orange1: '#FC8B59',
        primary: '#2300B1',
        pink1: '#FF6FCA',
        secondary: '#F48C06',
        'sky-blue': '#23BDEE',
        turquoise: '#29B9E7',
        white1: '#f7fafc',
        yellow1: '#F4C467',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        nunitoSans: ['NunitoSans', 'sans-serif'],
        openSans: ['OpenSans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        rockSalt: ['RockSalt', 'cursive', 'sans-serif'],
      },
      fontSize: {
        10: '0.625rem',
        11: '0.6875rem',
        13: '0.8125rem',
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
      },
      lineHeight: {
        1.6: '1.6',
        1.8: '1.8',
        17: '4.25rem',
      },
      scale: {
        60: '0.6',
      },
      spacing: {
        1.25: '0.3125rem',
        1.5: '0.375rem',
        13: '3.25rem',
        17: '4.25rem',
        68: '17rem',
        79.2: '19.8rem',
        92: '23rem',
        100: '25rem',
        104: '26rem',
        108: '27rem',
        110: '27.5rem',
        112: '28rem',
        120: '30rem',
        160: '40rem',
        180: '45rem',
        200: '50rem',
        250: '62.5rem',
        400: '100rem',
        500: '125rem',
      },
      zIndex: {
        60: 60,
        70: 70,
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#696984',
            strong: {
              color: '#696984',
            },
            h1: {
              color: '#696984',
            },
            h2: {
              color: '#696984',
            },
            h3: {
              color: '#696984',
            },
            h4: {
              color: '#696984',
            },
            h5: {
              color: '#696984',
            },
            h6: {
              color: '#696984',
            },
            a: {
              color: '#696984',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
      gradientColorStops: ['group-hover'],
      padding: ['group-hover'],
      margin: ['first', 'last'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
