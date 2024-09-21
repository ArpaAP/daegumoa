import { createIcon } from '@chakra-ui/react';

export const IconPhone = createIcon({
  displayName: 'IconPhone',
  viewBox: '0 0 14 14',
  defaultProps: {
    fill: 'none',
  },
  path: (
    <>
      <path
        d="M9 2H5C4.44772 2 4 2.44772 4 3V11C4 11.5523 4.44772 12 5 12H9C9.55228 12 10 11.5523 10 11V3C10 2.44772 9.55228 2 9 2Z"
        stroke="currentColor"
      />
      <path d="M4 9H10" stroke="currentColor" />
      <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
    </>
  ),
});
