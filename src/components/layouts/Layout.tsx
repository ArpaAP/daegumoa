'use client';

import { useEffect } from 'react';

import BottomMenu from '../navbar/BottomMenu';
import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleLoad = () => {
      window.scrollTo(1, 0);
    };

    window.addEventListener('load', handleLoad, false);

    return () => {
      window.removeEventListener('load', handleLoad, false);
    };
  });

  return (
    <Box
      aspectRatio={9 / 16}
      mx="auto"
      shadow="xl"
      bg="var(--background)"
      borderWidth={1}
      borderColor="gray.200"
      position="relative"
      css={css`
        height: 100vh;
        overflow: scroll;

        @supports (height: 100dvh) {
          height: 100dvh;
        }

        @media (max-aspect-ratio: 9 / 19.5) {
          width: 100%;
        }

        @media (min-aspect-ratio: 9 / 19.5) {
          width: min(100%, 600px);
        }
      `}
    >
      {children}
      <BottomMenu />
    </Box>
  );
}
