'use client';

import RankingCard from '@/components/display/RankingCard';

import { Box, Text, VStack } from '@chakra-ui/react';

export default function RankingPageContent() {
  const data_1 = [
    { nickname: 'W.Developer7773', badges: 6, profileImage: 'https://github.com/whitedev7773.png' },
    { nickname: 'ArpaAP', badges: 5, profileImage: 'https://github.com/ArpaAP.png' },
    { nickname: 'Jamie2779', badges: 3, profileImage: 'https://github.com/jamie2779.png' },
  ];

  const data_2 = [
    { nickname: 'Jamie2779', badges: 3, profileImage: 'https://github.com/jamie2779.png' },
    { nickname: 'W.Developer7773', badges: 6, profileImage: 'https://github.com/whitedev7773.png' },
    { nickname: 'ArpaAP', badges: 5, profileImage: 'https://github.com/ArpaAP.png' },
  ];

  const data_3 = [
    { nickname: 'ArpaAP', badges: 5, profileImage: 'https://github.com/ArpaAP.png' },
    { nickname: 'Jamie2779', badges: 3, profileImage: 'https://github.com/jamie2779.png' },
    { nickname: 'W.Developer7773', badges: 6, profileImage: 'https://github.com/whitedev7773.png' },
  ];

  return (
    <Box>
      {/* 헤더 */}
      <VStack align="start" p="60px 20px 30px 30px" spacing="0">
        <Text fontSize="xl" fontWeight="bold" color="primary">
          미션 및 이벤트 랭킹
        </Text>
        <Text fontSize="m" fontWeight="regular" color="grey">
          과연 대구를 더 사랑하는 사람은?
        </Text>
      </VStack>
      {/* 콘텐츠 */}
      <VStack align="start" p="20px" pb="80px" spacing="30px">
        <RankingCard href="/ranking/market" name="시장을 좋아하는 Mania" data={data_1} />
        <RankingCard href="/ranking/event" name="축제를 즐기는 Player" data={data_2} />
        <RankingCard href="/ranking/lecture" name="강연을 즐겨 듣는 Listener" data={data_3} />
      </VStack>
    </Box>
  );
}
