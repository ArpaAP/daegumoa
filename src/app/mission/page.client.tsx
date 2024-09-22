'use client';

import MissionCard from '@/components/display/MissionCard';

import { eventTestData } from '@/constants/eventtest';
import { missionTestData } from '@/constants/missiontest';

import { Box, Text, VStack, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { Mission, Event, MissionHolder } from '@prisma/client';

type MissionWithEventAndHolder = Mission & { event: Event } & { missionHolders: MissionHolder[] };

interface MissionListProps {
  missions: MissionWithEventAndHolder[];
}

export default function MissionPageContent({ missions }: MissionListProps) {
  return (
    <Box h="100dvh" px={6} py={12}>
      <Box px={3} pb={6}>
        <Text fontSize="xl" color="primary" fontWeight="Bold">
          미션
        </Text>
        <Text fontSize="md" color="gray">
          다양한 미션을 도전해봐요
        </Text>
      </Box>

      <Tabs variant="outlined" size="sm" pb="100px">
        <TabList mb={4} px={3}>
          <Tab>전체</Tab>
          <Tab>시장</Tab>
          <Tab>축제</Tab>
          <Tab>기타</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <VStack gap="20px">
              {missions.map((mission, index) => (
                <MissionCard key={index} mission={mission} />
              ))}
            </VStack>
          </TabPanel>
          <TabPanel p={0}>
            <VStack gap="20px">
              {missions
                .filter((mission) => mission.tag == 'MARKET')
                .map((mission, index) => (
                  <MissionCard key={index} mission={mission} />
                ))}
            </VStack>
          </TabPanel>
          <TabPanel p={0}>
            <VStack gap="20px">
              {missions
                .filter((mission) => mission.tag == 'FESTIVAL')
                .map((mission, index) => (
                  <MissionCard key={index} mission={mission} />
                ))}
            </VStack>
          </TabPanel>
          <TabPanel p={0}>
            <VStack gap="20px">
              {missions
                .filter((mission) => mission.tag == 'ETC')
                .map((mission, index) => (
                  <MissionCard key={index} mission={mission} />
                ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
