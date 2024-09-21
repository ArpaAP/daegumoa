'use client';

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
          <CardBody as={VStack} gap={2} align="left">
            <Input placeholder="검색" borderRadius="10px" />

            <Tabs variant="outlined" size="sm">
              <TabList my={2}>
                <Tab>전체</Tab>
                <Tab>시장</Tab>
                <Tab>축제</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0}>asdf</TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
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
