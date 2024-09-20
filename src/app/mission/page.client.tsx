'use client';

import MissionCard from '../../components/missionCard';
import { MissionType, Difficulty } from '../../components/missionCard';
import { Box, Button, Text, VStack, HStack, Tag } from '@chakra-ui/react';

export default function LoginPageContent() {
  return (
    <Box h="100dvh" px="20px" py="30px">
      <Box px="10px">
        <Text fontSize="xl" color="primary" fontWeight="Bold">
          미션
        </Text>
        <Text fontSize="md" color="gray">
          다양한 미션을 도전해봐요
        </Text>
      </Box>
      <HStack p="10px">
        <Button color="primary" variant="outline">
          전체
        </Button>
        <Button color="gray" variant="outline">
          시장
        </Button>
        <Button color="gray" variant="outline">
          축제
        </Button>
        <Button color="gray" variant="outline">
          공연/전시
        </Button>
        <Button color="gray" variant="outline">
          기타
        </Button>
      </HStack>
      <VStack gap="20px">
        <MissionCard
          title="미션1"
          startDate="2024-09-20T16:34:40Z"
          endDate="2024-09-30T17:52:40Z"
          missionType={MissionType.MARKET}
          difficulty={Difficulty.EASY}
          imageUrl="https://via.placeholder.com/150"
          address="대구시 북구"
          count={10}
        />

        <MissionCard
          title="미션1"
          startDate="2024-09-20T16:34:40Z"
          endDate="2024-09-20T17:52:40Z"
          missionType={MissionType.MARKET}
          difficulty={Difficulty.EASY}
          imageUrl="https://via.placeholder.com/150"
          address="대구시 북구"
          count={10}
        />

        <MissionCard
          title="미션1"
          startDate="2024-09-20T16:34:40Z"
          endDate="2024-09-21T18:52:40Z"
          missionType={MissionType.MARKET}
          difficulty={Difficulty.EASY}
          imageUrl="https://via.placeholder.com/150"
          address="대구시 북구"
          count={10}
        />
      </VStack>
    </Box>
  );
}
