'use client';

import { Avatar, createIcon, Flex, HStack, Link, Spacer, Text, VStack } from '@chakra-ui/react';

function refineName(str: string) {
  const trimmedStr = str.substring(0, 6);
  const maskedStr = trimmedStr.substring(0, 3) + '*'.repeat(trimmedStr.length - 2);

  return maskedStr;
}

const getTitleByRoute = (route: string) => {
  switch (route) {
    case 'market':
      return '시장을 좋아하는 Mania';
    case 'event':
      return '축제를 즐기는 Player';
    case 'lecture':
      return '강연을 즐겨 듣는 Listener';
    default:
      return '알 수 없음';
  }
};

const PrevIcon = createIcon({
  displayName: 'PrevIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'primary',
  },
  path: (
    <>
      <path d="M9 12L15 18" stroke="#A0A0A0" strokeLinecap="round" />
      <path d="M9 12L15 6" stroke="#A0A0A0" strokeLinecap="round" />
    </>
  ),
});

export default function DetailedRankingPageContent({ route }: { route: string }) {
  const data = [
    { nickname: 'W.Developer7773', badges: 6, profileImage: 'https://github.com/whitedev7773.png' },
    { nickname: 'ArpaAP', badges: 5, profileImage: 'https://github.com/ArpaAP.png' },
    { nickname: 'Jamie2779', badges: 3, profileImage: 'https://github.com/jamie2779.png' },
    { nickname: 'Ahapwhs0414', badges: 2, profileImage: 'https://github.com/ahapwhs0414' },
    { nickname: 'Ahapwhs0414', badges: 2, profileImage: 'https://github.com/ahapwhs0414' },
    { nickname: 'Ahapwhs0414', badges: 2, profileImage: 'https://github.com/ahapwhs0414' },
    { nickname: 'Ahapwhs0414', badges: 2, profileImage: 'https://github.com/ahapwhs0414' },
    { nickname: 'Ahapwhs0414', badges: 2, profileImage: 'https://github.com/ahapwhs0414' },
    { nickname: 'Ahapwhs0414', badges: 2, profileImage: 'https://github.com/ahapwhs0414' },
    { nickname: 'Ahapwhs0414', badges: 2, profileImage: 'https://github.com/ahapwhs0414' },
    { nickname: 'Ahapwhs0414', badges: 2, profileImage: 'https://github.com/ahapwhs0414' },
  ];

  return (
    <VStack align="start">
      <HStack mt="20px" padding="20px">
        <Link href="/ranking">
          <PrevIcon />
        </Link>
        <Text fontSize="l" fontWeight="medium" color="primary">
          랭킹
        </Text>
      </HStack>
      <Flex
        width="calc(100% - 40px)"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        boxShadow="card"
        m="20px"
        p="30px"
        bgColor="white"
        borderRadius="card"
        boxSizing="border-box"
      >
        <Text fontSize="l" fontWeight="bold">
          {getTitleByRoute(route)}
        </Text>
        <Flex justifyContent="center" alignItems="end" gap="30px" align="end">
          {/* 2등 */}
          <VStack spacing="10px">
            <Text
              fontSize="s"
              fontWeight="medium"
              padding="4px 7px 3px 7px"
              color="white"
              bgColor="#bbbbbb"
              borderRadius="6px"
            >
              2등
            </Text>
            <Avatar boxSize="60px" src={data[1].profileImage} />
            <VStack spacing="0">
              <Text fontSize="s" fontWeight="bold">
                {refineName(data[1].nickname)}님
              </Text>
              <Text fontSize="xs" fontWeight="medium" color="grey">
                뱃지 {data[1].badges}개
              </Text>
            </VStack>
          </VStack>
          {/* 1등 */}
          <VStack spacing="10px">
            <Text
              fontSize="s"
              fontWeight="medium"
              padding="4px 7px 3px 7px"
              color="white"
              bgColor="#ECC80E"
              borderRadius="6px"
            >
              1등
            </Text>
            <Avatar boxSize="72px" src={data[0].profileImage} />
            <VStack spacing="0">
              <Text fontSize="m" fontWeight="bold">
                {refineName(data[0].nickname)}님
              </Text>
              <Text fontSize="xs" fontWeight="medium" color="grey">
                뱃지 {data[0].badges}개
              </Text>
            </VStack>
          </VStack>
          {/* 3등 */}
          <VStack spacing="10px">
            <Text
              fontSize="s"
              fontWeight="medium"
              padding="4px 7px 3px 7px"
              color="white"
              bgColor="#746202"
              borderRadius="6px"
            >
              3등
            </Text>
            <Avatar boxSize="48px" src={data[2].profileImage} />
            <VStack spacing="0">
              <Text fontSize="xs" fontWeight="bold">
                {refineName(data[2].nickname)}님
              </Text>
              <Text fontSize="xs" fontWeight="medium" color="grey">
                뱃지 {data[2].badges}개
              </Text>
            </VStack>
          </VStack>
        </Flex>
        {/* 그 외 나머지 랭킹 */}
        <Spacer height="30px" />
        {data.slice(3).map((e, i) => (
          <Flex key={i} width="100%" justifyContent="space-around" alignItems="center">
            <HStack>
              <Text width="55px" fontSize="m" fontWeight="bold" color="secondary">
                {i + 4}등
              </Text>
              <Text fontSize="m">{refineName(e.nickname)}님</Text>
            </HStack>
            <Text fontSize="m" fontWeight="regular" color="grey">
              뱃지 {e.badges}개
            </Text>
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
}
