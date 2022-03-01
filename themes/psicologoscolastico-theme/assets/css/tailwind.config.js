const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    screens: {
      xm: '450px',
      ...defaultTheme.screens,
    },
    extend: {
      inset: {
        '1.8': '-0.45rem',
        34: '8.5rem'
      },
      lineHeight: {
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem'
      },
      borderWidth: {
        1: '1px',
      },
      zIndex: {
        '60': 60
      },
      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))'
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
      },
      spacing: {
        '13': '3.25rem',
        '1.5': '0.375rem',
        '79.2': '19.8rem',
        '92': '23rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '110': '27.5rem',
        '112': '28rem',
      },
      colors: {
        "g1": "#1EB3FB",
        "g2": "#D3AEFE",
        "g3": "#313062",
        "g4": "#304D89",
        "light-gray": "#C2C2C2",
        "white2": "#F6F7FA",
        "white3": "#F9F9F9",
        "white4": "#F5F8FF",
        "ice-blue": "#E3E7EC",
        "ice-blue2": "#DAE0E7",
        "purple2": "#6926C5",
        "deep-purple": "#732C7D",
        "dark-purple": "#7C3A85",
        "indigo": "#242464",
        "lavender": "#9B8ABD",
        "gray2": "#7B7F89",
        "g5-f": "#DCB7FE",
        "g5-t": "#3EBCFC",
        "g8-f": "#E73DFF",
        "g8-t": "#4939FF",
        "blue-gray": "#304659"
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        playfairDisplay: ["PlayfairDisplay", "sans-serif"],
      },
      padding: {
        '1_5': '0.375rem',
        '2_5': '0.625rem',
      },
      fontSize: {
        "3.75": "0.9375rem",
        "4.8": "1.2rem",
        "36": "9rem",
        "40": "10rem",
        "56": "14rem",
      },
      translate: {
        '3/25': '12%',
        '7/50': '-14%',
        '9/50': '18%',
      },
      boxShadow: {
        circle: "0px 2px 15px 2px rgba(21, 0, 119, 0.3)"
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#313062",
            strong: {
              color: "#313062",
            }
          },
        },
      },
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
      gradientColorStops: ['group-hover']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};
