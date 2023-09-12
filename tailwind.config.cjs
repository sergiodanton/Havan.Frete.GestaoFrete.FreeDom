const {
  colors,
  borders,
  depths,
  fontStyles,
  spacings,
  typographies,
} = require('@freedom/tokens');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors,
    borderRadius: borders.borderRadius,
    borderWidth: borders.borderWidth,
    opacity: depths.opacity,
    boxShadow: depths.elevation,
    fontFamily: fontStyles.fontFamily,
    fontSize: {
      ...fontStyles.fontSize,
      'extra-xl': 64,
    },
    fontWeight: fontStyles.fontWeight,
    letterSpacing: fontStyles.letterSpacing,
    lineHeight: { ...fontStyles.lineHeight, xxl: '3.75rem' },
    padding: {
      ...spacings.innerSpace,
      auto: 'auto',
    },
    margin: {
      ...spacings.outerSpace,
      auto: 'auto',
    },
    gap: spacings.innerSpace,
    space: spacings.outerSpace,
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
    },
    configViewer: {
      baseFontSize: 16,
      typographyExample: 'Hello Labs',
      fonts:
        'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&family=Roboto:wght@300;400;500&display=swap',
      darkMode: false,
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.heading-default': {
          ...typographies.heading.default,
        },
        '.heading-medium': {
          ...typographies.heading.medium,
        },
        '.heading-small': {
          ...typographies.heading.small,
        },
        '.subheading-default': {
          ...typographies.subheading.default,
        },
        '.subheading-small': {
          ...typographies.subheading.small,
        },
        '.body-default': {
          ...typographies.body.default,
        },
        '.body-small': {
          ...typographies.body.small,
        },
        '.button-default': {
          ...typographies.button.default,
        },
        '.link-large': {
          ...typographies.link.large,
        },
        '.link-default': {
          ...typographies.link.default,
        },
        '.link-small': {
          ...typographies.link.small,
        },
        '.label-default': {
          ...typographies.label.default,
        },
        '.caption-default': {
          ...typographies.caption.default,
        },
      });
    }),
  ],
};
