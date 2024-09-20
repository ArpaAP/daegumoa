import { Paperlogy } from './font';
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export const theme = extendTheme(
  {
    fonts: {
      heading: Paperlogy.style.fontFamily,
      body: Paperlogy.style.fontFamily,
    },
    fontWeights: {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    fontSizes: {
      xs: '12px',
      s: '13px',
      m: '16px',
      l: '20px',
      xl: '24px',
    },
    colors: {
      primary: {
        _default: 'var(--general-primary-color)',
        shade0: 'var(--shade-0)',
        shade1: 'var(--shade-1)',
        shade2: 'var(--shade-2)',
        shade3: 'var(--shade-3)',
        shade4: 'var(--shade-4)',
      },
      secondary: 'var(--general-secondary-color)',
      success: 'var(--general-success)',
      warning: 'var(--general-warning)',
      grey: {
        _default: 'var(--general-grey)',
        shade0: 'var(--grey-0)',
        shade1: 'var(--grey-1)',
        shade2: 'var(--grey-2)',
      },
    },
    semanticTokens: {
      colors: {
        primary: 'primary._default',
        gray: 'grey._default',
      },
    },
    components: {
      Button: {
        baseStyle: {
          backgroundColor: 'primary',
          borderRadius: 'lg',
          colorScheme: 'white',
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
    components: ['Button'],
  }),
);