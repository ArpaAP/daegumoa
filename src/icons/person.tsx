import { createIcon } from '@chakra-ui/react';

export const IconPerson = createIcon({
  displayName: 'IconPerson',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
  },
  path: (
    <>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" />
      <path
        d="M4.5 20C4.5 16.4101 7.41015 13.5 11 13.5H13C16.5899 13.5 19.5 16.4101 19.5 20V20.5H4.5V20Z"
        stroke="currentColor"
      />
    </>
  ),
});
