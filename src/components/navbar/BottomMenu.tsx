'use client';

import checkbox from '@/assets/icons/checkbox.svg';
import home from '@/assets/icons/home.svg';
import person from '@/assets/icons/person.svg';
import ranking from '@/assets/icons/ranking.svg';

import { Image, Link } from '@chakra-ui/next-js';
import { Box, HStack, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';

export default function BottomMenu({ pathname }: { pathname: string }) {
  // 활성화된 메뉴의 색상
  const activeColor = 'primary';
  const inactiveColor = 'grey';

  return (
    <Box
      width="100%"
      maxWidth="600px"
      position="fixed"
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
        <Link href="/" variant="ghost" display="flex" flexDirection="column" alignItems="center">
          <Image
            alt="Home"
            src={home}
            width={24}
            height={24}
            w="24px"
            h="24px"
            color={pathname === '/' ? activeColor : inactiveColor} // 현재 페이지 체크
          />
          <Text fontSize="8px" color={pathname === '/' ? activeColor : inactiveColor}>
            홈
          </Text>
        </Link>
        <Link href="/mission" variant="ghost" display="flex" flexDirection="column" alignItems="center">
          <Image
            alt="Mission"
            src={checkbox}
            width={24}
            height={24}
            w="24px"
            h="24px"
            color={pathname === '/mission' ? activeColor : inactiveColor}
          />
          <Text fontSize="8px" color={pathname === '/mission' ? activeColor : inactiveColor}>
            미션
          </Text>
        </Link>
        <Link href="/ranking" variant="ghost" display="flex" flexDirection="column" alignItems="center">
          <Image
            alt="Ranking"
            src={ranking}
            width={24}
            height={24}
            w="24px"
            h="24px"
            color={pathname === '/ranking' ? activeColor : inactiveColor}
          />
          <Text fontSize="8px" color={pathname === '/ranking' ? activeColor : inactiveColor}>
            랭킹
          </Text>
        </Link>
        <Link href="/profile" variant="ghost" display="flex" flexDirection="column" alignItems="center">
          <Image
            alt="Profile"
            src={person}
            width={24}
            height={24}
            w="24px"
            h="24px"
            color={pathname === '/profile' ? activeColor : inactiveColor}
          />
          <Text fontSize="8px" color={pathname === '/profile' ? activeColor : inactiveColor}>
            마이페이지
          </Text>
        </Link>
      </HStack>
    </Box>
  );
}
