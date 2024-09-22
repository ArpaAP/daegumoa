'use client';

import EventCard from '@/components/display/EventCard';
import BottomMenu from '@/components/navbar/BottomMenu';

import banner from '@/assets/banner.png';

import { Box, Card, CardBody, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <VStack px={6} py={12} gap={6} align="left">
        <Image src={banner} alt="banner" width={375} height={200} />

        <Box>
          <Text fontSize="24px" fontWeight="bold" color="primary">
            진행중인 이벤트
          </Text>
          <Text fontSize="m" color="grey">
            지금 진행되는 이벤트를 확인하세요
          </Text>
        </Box>

        <Card>
          <CardBody as={VStack} gap={4} align="left">
            <Input placeholder="검색" borderRadius="10px" />

            <Tabs variant="outlined" size="sm">
              <TabList mb={4}>
                <Tab>전체</Tab>
                <Tab>시장</Tab>
                <Tab>축제</Tab>
                <Tab>기타</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0}>
                  <EventCard
                    title="2024 떡볶이페스티벌"
                    startDate="5.4 (토)"
                    endDate="5.5 (일)"
                    location="고성동 3가"
                    tel="031-0000-0000"
                    imageUrl="https://picsum.photos/200/200"
                  />
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
          </CardBody>
        </Card>
      </VStack>

      <BottomMenu />
    </>
  );
}
