'use client';

import { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import BottomMenu from '../navbar/BottomMenu';
import '@/transition/fade-slide.css';
import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const noNav = ['/login', 'register']; // 내비바가 없을 경로
  const pathname = usePathname();

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
      <TransitionGroup component={null}>
        <CSSTransition key={pathname} timeout={500} classNames="fade-slide">
          {children}
        </CSSTransition>
      </TransitionGroup>
      {!noNav.includes(pathname) && <BottomMenu pathname={pathname} />}
    </Box>
  );
}
