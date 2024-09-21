import { Paperlogy } from './font';
import { border, defineStyleConfig, extendTheme, StyleFunctionProps, withDefaultColorScheme } from '@chakra-ui/react';

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
    shadows: {
      card: '0px 4px 30px #0D298C19',
    },
    radii: {
      card: '16px',
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
      danger: 'var(--general-danger)',
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
          fontSize: 'm',
        },
        sizes: {
          md: {
            h: '40px',
            fontSize: 'm',
            py: 6,
          },
        },
        variants: {
          solid: {
            bg: 'primary',
            color: 'white',
            fontSize: 'm',
            fontWeight: 'regular',
            _hover: {
              bg: 'primary.shade1',
            },
          },
        },
        defaultProps: {
          size: 'md',
          variant: 'solid',
          colorScheme: 'primary',
        },
      },
      Input: {
        baseStyle: {},
        sizes: {
          md: {
            field: {
              fontSize: '14px',
            },
          },
        },
        variants: {
          outline: {
            field: {
              borderColor: 'grey',
              color: 'black',
              _hover: {
                borderColor: 'grey',
              },
              _focusVisible: {
                borderColor: 'primary',
              },
              _placeholder: {
                color: 'grey',
              },
            },
          },
        },
        defaultProps: {
          variant: 'outline',
        },
      },
      Card: {
        baseStyle: {
          container: {
            bg: 'white',
            shadow: '0 4px 30px 0 rgba(0, 0, 0, 8%)',
            color: 'black',
          },
        },
        sizes: {
          md: {
            container: {
              borderRadius: '16px',
            },
          },
        },
        variants: {
          elevated: {
            container: {
              bg: 'white',
              shadow: '0 4px 30px 0 rgba(0, 0, 0, 8%)',
            },
          },
        },
      },
      Tabs: {
        baseStyle: {
          tablist: {
            gap: 2,
          },
        },
        sizes: {
          sm: {
            tab: {
              fontSize: 'xs',
            },
          },
        },
        variants: {
          outlined: {
            tab: {
              px: '10px',
              h: '30px',
              borderWidth: '1px',
              borderColor: 'grey',
              borderRadius: '8px',
              color: 'grey',
              _selected: {
                color: 'primary',
                borderColor: 'primary',
              },
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
    components: ['Button'],
  }),
);
