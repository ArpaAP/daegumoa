import { createIcon } from '@chakra-ui/react';

export const IconLogout = createIcon({
  displayName: 'IconLogout',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
  },
  path: (
    <>
      <path
        d="M14 3L7 3C5.89543 3 5 3.89543 5 5L5 19C5 20.1046 5.89543 21 7 21L14 21"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M10 12L20 12" stroke="currentColor" strokeLinecap="round" />
      <path d="M20 12L16 8" stroke="currentColor" strokeLinecap="round" />
      <path d="M20 12L16 16" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
});
