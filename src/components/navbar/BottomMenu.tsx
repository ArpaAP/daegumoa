'use client';

import { IconCheckbox, IconHome, IconPerson, IconRanking } from '@/icons';
import { Link } from '@chakra-ui/next-js';
import { Box, HStack, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { usePathname } from 'next/navigation';

export default function BottomMenu() {
  const pathname = usePathname();

  // 활성화된 메뉴의 색상
  const activeColor = 'primary';
  const inactiveColor = 'grey';

  return (
    <>
      <Box h="60px" />
      <Box
        width="100%"
        maxWidth="600px"
        position="fixed"
        zIndex={999}
        left="50%"
        transform="translateX(-50%)"
        bottom={0}
        h="60px"
        bg="white"
        shadow="0 0 30px 0 rgba(0, 0, 0, 8%)"
        color="grey"
        css={css`
          @media (max-aspect-ratio: 9 / 19.5) {
            width: 100%;
          }

          @media (min-aspect-ratio: 9 / 19.5) {
            width: min(100%, 600px);
          }
        `}
      >
        <HStack h="full" px={10} justify="space-between" align="center">
          <Link
            href="/"
            variant="ghost"
            display="flex"
            flexDirection="column"
            alignItems="center"
            color={pathname === '/' || pathname.startsWith('/events') ? activeColor : inactiveColor}
          >
            <IconHome boxSize="24px" />
            <Text fontSize="8px">홈</Text>
          </Link>
          <Link
            href="/mission"
            variant="ghost"
            display="flex"
            flexDirection="column"
            alignItems="center"
            color={pathname.startsWith('/mission') ? activeColor : inactiveColor}
          >
            <IconCheckbox boxSize="24px" />
            <Text fontSize="8px">미션</Text>
          </Link>
          <Link
            href="/ranking"
            variant="ghost"
            display="flex"
            flexDirection="column"
            alignItems="center"
            color={pathname.startsWith('/ranking') ? activeColor : inactiveColor}
          >
            <IconRanking boxSize="24px" />
            <Text fontSize="8px">랭킹</Text>
          </Link>
          <Link
            href="/profile"
            variant="ghost"
            display="flex"
            flexDirection="column"
            alignItems="center"
            color={pathname.startsWith('/profile') ? activeColor : inactiveColor}
          >
            <IconPerson boxSize="24px" />
            <Text fontSize="8px">마이페이지</Text>
          </Link>
        </HStack>
      </Box>
    </>
  );
}
