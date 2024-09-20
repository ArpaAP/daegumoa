'use client';

import MissionCard from '@/components/missionCard';

import { eventTestData } from '@/constants/eventtest';
import { missionTestData } from '@/constants/missiontest';

import { Box, Button, Text, VStack, HStack, Tag } from '@chakra-ui/react';

export default function MissionPageContent() {
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
        <MissionCard mission={{ ...missionTestData, event: eventTestData, holders: [] }} />
      </VStack>
    </Box>
  );
}
