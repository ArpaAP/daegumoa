'use client';

import BottomMenu from '@/components/navbar/BottomMenu';
import Badge from '@/components/profile/Badge';

import mainRankIcon from '@/assets/icons/main_rank.svg';
import rankIcon from '@/assets/icons/rank.svg';
import starFilledIcon from '@/assets/icons/star_filled.svg';
import verifiedIcon from '@/assets/icons/verified.svg';

import { Image } from '@chakra-ui/next-js';
import { Box, Card, Flex, HStack, Text, VStack } from '@chakra-ui/react';

interface ProfileViewPageProps {
  userId: string;
}

export default function ProfileViewPage({ userId }: ProfileViewPageProps) {
  // 나중에 백엔드에서 user 불러오세유
  const user = {
    id: 23,
    email: 'w.developer7773@gmail.com',
    name: '장기원',
    nickname: 'w.developer7773',
    profileImgId: null,
    badgeId: 4,
    createdDate: Date.now(),
    modifiedDate: Date.now(),
    // 기존 User필드에 profileImg추가
    profileImg: 'https://github.com/whitedev7773.png',
  };

  const badge_list = [
    { level: 1, name: '초보 탐험가', desc: '시장을 1개 방문하세요.' },
    { level: 2, name: '중수 탐험가', desc: '시장을 3개 방문하세요.' },
    { level: 3, name: '전문적인 탐험가', desc: '시장을 5개 방문하세요.' },
    { level: 4, name: '위대한 탐험가', desc: '시장을 10개 방문하세요.' },
    { level: 5, name: '맛집헌터', desc: '시장 속 숨은 맛집을 찾으세요.' },
    { level: 5, name: '마라톤 완주', desc: '마라톤을 1회 완주하세요.' },
    { level: 1, name: '소심한 방문객', desc: '행사에 1회 참가하세요.' },
    { level: 2, name: '익숙한 방문객', desc: '행사제 3회 참가하세요.' },
    { level: 5, name: '치맥 사랑꾼', desc: '치맥 페스티벌에 참가하세요.' },
    { level: 1, name: '피곤한 리스너', desc: '강의를 1개 청강하세요.' },
    { level: 2, name: '궁금한 리스너', desc: '강의를 3개 청강하세요.' },
    { level: 3, name: '손을 든 리스너', desc: '강의를 5개 청강하세요.' },
    { level: 4, name: '똑똑한 리스너', desc: '강의를 10개 청강하세요.' },
  ];

  return (
    <>
      {/* 전체 콘텐츠 */}
      <Flex direction="column" gap="20px" p="20px 20px 90px 20px" boxSizing="border-box">
        {/* 프로필 기본 정보 (이미지/이름/메인 뱃지) */}
        <VStack p="20px 0px" gap="16px" boxSizing="border-box" boxShadow="card" bgColor="white" borderRadius="card">
          <Flex justifyContent="center" alignItems="center" gap="16px">
            <Image
              width="72"
              height="72"
              boxSize="72px"
              borderRadius="full"
              src={user.profileImg}
              alt={`${user.nickname}님의 프로필 이미지`}
              priority
            />
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              <Badge info={badge_list[4]} />
              <Text fontSize="xl" fontWeight="bold" color="primary.shade4">
                {user.name}
              </Text>
            </Flex>
          </Flex>
          <Image w="65px" h="16px" margin="auto" src={verifiedIcon} alt="대구모아 인증" />
        </VStack>
        {/* 수집한 뱃지 모음 */}
        <Flex
          direction="column"
          gap="20px"
          boxShadow="card"
          p="20px"
          justifyContent="left"
          bgColor="white"
          borderRadius="card"
        >
          {/* 헤더 */}
          <HStack w="100" justifyContent="space-between" alignItems="center">
            <HStack>
              <Image boxSize="24px" src={starFilledIcon} alt="획득한 뱃지" />
              <Text fontSize="m" fontWeight="regular">
                수집한 뱃지들
              </Text>
            </HStack>
            <Text fontSize="s" fontWeight="medium" color="secondary">
              13개
            </Text>
          </HStack>
          {/* 콘텐츠 */}
          <Flex flexWrap="wrap" gap="8px">
            {badge_list.map((info, index) => (
              <Badge key={index} info={info} />
            ))}
          </Flex>
        </Flex>
        {/* 통계 */}
        <Flex
          direction="column"
          gap="20px"
          boxShadow="card"
          p="20px"
          justifyContent="left"
          bgColor="white"
          borderRadius="card"
        >
          {/* 헤더 */}
          <HStack w="100" alignItems="center">
            <Image boxSize="24px" src={rankIcon} alt="통계" />
            <Text fontSize="m" fontWeight="regular">
              통계
            </Text>
          </HStack>
          {/* 콘텐츠 */}
          {/* 1. 주요 랭킹 디스플레이 */}
          <Flex
            width="100%"
            p="20px 20px 16px 20px"
            borderRadius="10px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor="#F3F3F3"
          >
            <Text>시장을 좋아하는 Mania</Text>
            <HStack spacing="8px">
              <Image w="32px" h="48px" src={mainRankIcon} alt="주요 랭크" />
              <Text fontSize="xl" fontWeight="bold" color="primary">
                1위
              </Text>
            </HStack>
          </Flex>
          {/* 2. 4분야 참여 수 디스플레이 */}
          <VStack align="stretch">
            <HStack>
              {/* 2.1.1. 참여한 행사 수 */}
              <Box width="100%" p="16px" borderRadius="10px" backgroundColor="grey.shade2">
                <Text fontSize="s" fontWeight="light" color="white" opacity="0.5">
                  참여한 행사 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="white">
                  17
                </Text>
              </Box>
              {/* 2.1.2. 둘러본 시장 수 */}
              <Box width="100%" p="16px" borderRadius="10px" backgroundColor="primary.shade4">
                <Text fontSize="s" fontWeight="light" color="white" opacity="0.5">
                  둘러본 시장 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="white">
                  4
                </Text>
              </Box>
            </HStack>
            <HStack>
              {/* 2.2.1. 성공한 미션 수 */}
              <Card variant="outline" width="100%" p="16px" borderRadius="10px" borderColor="success">
                <Text fontSize="s" fontWeight="light" color="success">
                  성공한 미션 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="success">
                  5
                </Text>
              </Card>
              {/* 2.2.2. 청강한 강의 수 */}
              <Card variant="outline" width="100%" p="16px" borderRadius="10px" borderColor="primary">
                <Text fontSize="s" fontWeight="light" color="primary">
                  성공한 미션 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="primary">
                  5
                </Text>
              </Card>
            </HStack>
          </VStack>
        </Flex>
      </Flex>

      <BottomMenu />
    </>
  );
}
