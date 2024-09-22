'use client';

import MissionHolder from '@/components/display/MissionHolder';
import BottomMenu from '@/components/navbar/BottomMenu';

import { Box, Text, VStack, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { Image, Mission, MissionHolder as prismaMissionHolder } from '@prisma/client';

type MissionHolderWithMissionAndImage = prismaMissionHolder & { mission: Mission } & { image: Image };

interface MissionListProps {
  missionHolders: MissionHolderWithMissionAndImage[];
}

export default function MissionPageContent({ missionHolders }: MissionListProps) {
  return (
    <>
      <Box h="100dvh" px={6} py={12}>
        <Box px={3} pb={6}>
          <Text fontSize="xl" color="primary" fontWeight="Bold">
            미션 관리 페이지
          </Text>
          <Text fontSize="md" color="gray">
            들어온 인증 요청을 받아주세요
          </Text>
        </Box>

        <Tabs variant="outlined" size="sm" pb="100px">
          <TabList mb={4} px={3}>
            <Tab>대기중</Tab>
            <Tab>거절됨</Tab>
            <Tab>완료됨</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <VStack gap="20px">
                {missionHolders
                  .filter((missionHolder) => missionHolder.status == 'WAIT')
                  .map((mission, index) => (
                    <MissionHolder key={index} missionHolder={mission} />
                  ))}
              </VStack>
            </TabPanel>
            <TabPanel p={0}>
              <VStack gap="20px">
                {missionHolders
                  .filter((missionHolder) => missionHolder.status == 'REJECT')
                  .map((mission, index) => (
                    <MissionHolder key={index} missionHolder={mission} />
                  ))}
              </VStack>
            </TabPanel>
            <TabPanel p={0}>
              <VStack gap="20px">
                {missionHolders
                  .filter((missionHolder) => missionHolder.status == 'COMPLETE')
                  .map((mission, index) => (
                    <MissionHolder key={index} missionHolder={mission} />
                  ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <BottomMenu />
    </>
  );
}
