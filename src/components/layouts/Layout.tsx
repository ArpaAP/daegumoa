'use client';

import { useEffect } from 'react';

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
      w="min(100%, 800px)"
      mx="auto"
      shadow="xl"
      bg="var(--background)"
      css={css`
        height: 100vh;

        @supports (height: 100dvh) {
          height: 100dvh;
        }
      `}
    >
      {children}
    </Box>
  );
}
