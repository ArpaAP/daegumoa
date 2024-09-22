'use client';

import { useState } from 'react';

import EventCard from '@/components/display/EventCard';
import BottomMenu from '@/components/navbar/BottomMenu';

import banner from '@/assets/banner.png';

import { Image } from '@chakra-ui/next-js';
import { Box, Card, CardBody, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import { Event } from '@prisma/client';

interface HomePageProps {
  events: Event[];
}

export default function HomePage({ events }: HomePageProps) {
  const [search, setSearch] = useState('');

  const searchedEvents = events.filter((event: Event) => event.title.includes(search) || event.addr1.includes(search));

  return (
    <>
      <VStack px={6} py={12} gap={6} align="left">
        <Image src={banner} alt="banner" width={375} height={200} w="full" h="auto" />

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
            <Input placeholder="검색" borderRadius="10px" value={search} onChange={(e) => setSearch(e.target.value)} />

            <Tabs variant="outlined" size="sm">
              <TabList mb={4}>
                <Tab>전체</Tab>
                <Tab>시장</Tab>
                <Tab>축제</Tab>
                <Tab>공연</Tab>
                <Tab>기타</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0}>
                  <VStack align="left">
                    {searchedEvents.map((event) => {
                      return (
                        <EventCard
                          key={event.id}
                          id={event.id}
                          title={event.title}
                          startDate={event.startDate?.toLocaleDateString() ?? ''}
                          endDate={event.endDate?.toLocaleDateString() ?? ''}
                          location={event.addr1}
                          tel={event.tel ?? '-'}
                          imageUrl={event.mainImg}
                        />
                      );
                    })}
                  </VStack>
                </TabPanel>
                <TabPanel p={0}>
                  <VStack align="left">
                    {searchedEvents
                      .filter((event) => event.tag === 'MARKET')
                      .map((event) => {
                        return (
                          <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            startDate={event.startDate?.toLocaleDateString() ?? ''}
                            endDate={event.endDate?.toLocaleDateString() ?? ''}
                            location={event.addr1}
                            tel={event.tel ?? '-'}
                            imageUrl={event.mainImg}
                          />
                        );
                      })}
                  </VStack>
                </TabPanel>
                <TabPanel p={0}>
                  <VStack align="left">
                    {searchedEvents
                      .filter((event) => event.tag === 'FESTIVAL')
                      .map((event) => {
                        return (
                          <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            startDate={event.startDate?.toLocaleDateString() ?? ''}
                            endDate={event.endDate?.toLocaleDateString() ?? ''}
                            location={event.addr1}
                            tel={event.tel ?? '-'}
                            imageUrl={event.mainImg}
                          />
                        );
                      })}
                  </VStack>
                </TabPanel>
                <TabPanel p={0}>
                  <VStack align="left">
                    {searchedEvents
                      .filter((event) => event.tag === 'PERFORM')
                      .map((event) => {
                        return (
                          <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            startDate={event.startDate?.toLocaleDateString() ?? ''}
                            endDate={event.endDate?.toLocaleDateString() ?? ''}
                            location={event.addr1}
                            tel={event.tel ?? '-'}
                            imageUrl={event.mainImg}
                          />
                        );
                      })}
                  </VStack>
                </TabPanel>
                <TabPanel p={0}>
                  <VStack align="left">
                    {searchedEvents
                      .filter((event) => event.tag === 'ETC')
                      .map((event) => {
                        return (
                          <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            startDate={event.startDate?.toLocaleDateString() ?? ''}
                            endDate={event.endDate?.toLocaleDateString() ?? ''}
                            location={event.addr1}
                            tel={event.tel ?? '-'}
                            imageUrl={event.mainImg}
                          />
                        );
                      })}
                  </VStack>
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
