import { createIcon } from '@chakra-ui/react';

export const IconHome = createIcon({
  displayName: 'IconHome',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
  },
  path: (
    <>
      <mask id="path-1-inside-1_38_98" fill="white">
        <path d="M5 15H19V19C19 20.6569 17.6569 22 16 22H8C6.34315 22 5 20.6569 5 19V15Z" />
      </mask>
      <path
        d="M5 15H19H5ZM20 19C20 21.2091 18.2091 23 16 23H8C5.79086 23 4 21.2091 4 19H6C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19H20ZM8 23C5.79086 23 4 21.2091 4 19V15H6V19C6 20.1046 6.89543 21 8 21V23ZM20 15V19C20 21.2091 18.2091 23 16 23V21C17.1046 21 18 20.1046 18 19V15H20Z"
        fill="currentColor"
        mask="url(#path-1-inside-1_38_98)"
      />
      <path d="M5.5 17V12" stroke="currentColor" stroke-linecap="round" />
      <path d="M18.5 17V12" stroke="currentColor" stroke-linecap="round" />
      <path
        d="M2.5 11.5L10.5858 3.41421C11.3668 2.63316 12.6332 2.63316 13.4142 3.41421L21.5 11.5"
        stroke="currentColor"
        stroke-linecap="round"
      />
      <rect x="9.5" y="15.5" width="5" height="6" rx="0.5" stroke="currentColor" />
    </>
  ),
});
