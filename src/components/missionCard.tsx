import React from 'react';

import checkIcon from '@/assets/icons/check.svg';
import clockIcon from '@/assets/icons/clock.svg';
import positionIcon from '@/assets/icons/position.svg';

import { Image } from '@chakra-ui/next-js';
import { Box, Card, CardHeader, CardBody, VStack, HStack, Tag, TagLeftIcon, TagLabel, Text } from '@chakra-ui/react';

export enum MissionType {
  MARKET = '시장',
  FESTIVAL = '축제',
  PERFORM = '공연/전시',
  ETC = '기타',
}

export enum Difficulty {
  EASY = '쉬움',
  MEDIUM = '보통',
  HARD = '어려움',
}

interface MissionCardProps {
  title: string;
  startDate: string;
  endDate: string;
  missionType: MissionType;
  difficulty: Difficulty;
  imageUrl: string;
  address: string;
  count: number;
}

const MissionCard: React.FC<MissionCardProps> = ({
  title,
  startDate,
  endDate,
  missionType,
  difficulty,
  imageUrl,
  address,
  count,
}) => {
  return (
    <Card w="100%" rounded="20">
      <CardHeader
        position="relative"
        w="100%"
        h="200"
        backgroundImage={imageUrl}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
        borderTopRadius="20px"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bgGradient="linear(to-t, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))"
          borderRadius="md"
        />

        <Tag
          position="absolute"
          bottom="10px"
          right="10px"
          color="white"
          p="8px"
          borderRadius="md"
          alignItems="center"
          rounded="10"
          bg="rgba(255, 255, 255, 0.2)"
          backdropFilter="blur(10px)"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // 부드러운 그림자
        >
          <TagLeftIcon boxSize="16px" as={Image} src={positionIcon} />
          <TagLabel fontSize="m" fontWeight="bold">
            {address}
          </TagLabel>
        </Tag>
      </CardHeader>
      <CardBody>
        <VStack>
          <HStack justifyContent="space-between" w="full" borderBottom="1px" borderColor="gray.200" pb={2}>
            <HStack gap="4px">
              <Tag fontSize="m" fontWeight="light" bg="secondary" color="white" rounded="5">
                {missionType}
              </Tag>
              <Tag fontSize="m" fontWeight="light" bg="primary" color="white">
                진행중
              </Tag>
              <Tag fontSize="m" fontWeight="light" variant="outline" color="primary">
                {difficulty}
              </Tag>
            </HStack>
            <Tag bg="black" color="white" rounded="20px" px="10px" py="5px">
              <TagLeftIcon boxSize="16px" as={Image} src={checkIcon} />
              <TagLabel fontSize="m">참여자 {count}명</TagLabel>
            </Tag>
          </HStack>
        </VStack>
        <Text fontWeight="bold" color="black" fontSize="xl">
          {title}
        </Text>
        <HStack>
          <Image src={clockIcon} alt="" boxSize="16px" p="0" />
          <Text fontWeight="bold" color="danger" fontSize="l">
            4시간 21분 30초 후 종료
          </Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MissionCard;
