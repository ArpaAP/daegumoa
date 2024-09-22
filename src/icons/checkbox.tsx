import { createIcon } from '@chakra-ui/react';

export const IconCheckbox = createIcon({
  displayName: 'IconCheckbox',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
  },
  path: (
    <>
      <path d="M7.5 11.5L11 15" stroke="currentColor" strokeLinecap="round" />
      <path d="M17 9L11 15" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </>
  ),
});
