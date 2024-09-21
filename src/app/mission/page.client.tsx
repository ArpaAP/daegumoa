'use client';

import MissionCard from '@/components/display/MissionCard';
import BottomMenu from '@/components/navbar/BottomMenu';

import { eventTestData } from '@/constants/eventtest';
import { missionTestData } from '@/constants/missiontest';

import { Box, Text, VStack, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';

export default function MissionPageContent() {
  return (
    <>
      <Box h="100dvh" px={6} py={12}>
        <Box px={3} pb={6}>
          <Text fontSize="xl" color="primary" fontWeight="Bold">
            미션
          </Text>
          <Text fontSize="md" color="gray">
            다양한 미션을 도전해봐요
          </Text>
        </Box>

        <Tabs variant="outlined" size="sm">
          <TabList mb={4} px={3}>
            <Tab>전체</Tab>
            <Tab>시장</Tab>
            <Tab>축제</Tab>
            <Tab>기타</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <VStack gap="20px">
                <MissionCard mission={{ ...missionTestData, event: eventTestData, holders: [] }} />
              </VStack>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>four!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <BottomMenu />
    </>
  );
}
