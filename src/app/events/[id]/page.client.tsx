'use client';

import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

import BottomMenu from '@/components/navbar/BottomMenu';

import positionIcon from '@/assets/icons/position_primary.svg';
import prevIcon from '@/assets/icons/prev.svg';

import { Image, Link } from '@chakra-ui/next-js';
import { Box, Text, VStack, HStack, Tag, Card, CardBody } from '@chakra-ui/react';
import { Event } from '@prisma/client';

interface EventDetailProps {
  event: Event;
}

export default function EventDetailPage({ event }: EventDetailProps) {
  return (
    <>
      <Box px={6} py={8} w="full" position="relative">
        <Link href="/" _hover={{ textDecoration: 'none' }}>
          <HStack px="10px" py="20px">
            <Image src={prevIcon} alt="" boxSize="16px" />
            <Text fontSize="xl" color="primary" fontWeight="Bold">
              이벤트 정보
            </Text>
          </HStack>
        </Link>
        <VStack gap="20px">
          <Box
            position="relative"
            w="100%"
            h="200"
            backgroundImage={event.mainImg ?? undefined}
            bgSize="cover"
            bgRepeat="no-repeat"
            bgPosition="center"
            rounded="10px"
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
          </Box>
          <Card w="100%">
            <CardBody as={VStack} gap={4} align="left">
              <Box>
                {(event.startDate || event.endDate) && (
                  <Text fontWeight="medium" color="grey" fontSize="s">
                    {event.startDate?.toLocaleDateString()} ~ {event.endDate?.toLocaleDateString()}
                  </Text>
                )}

                <Text fontWeight="bold" color="black" fontSize="xl">
                  {event.title}
                </Text>
              </Box>

              <HStack gap="20px">
                <HStack>
                  <Image src={positionIcon} alt="" boxSize="16px" />
                  <Text fontSize="xs" color="primary">
                    {event.addr2}
                  </Text>
                </HStack>
                <HStack>
                  <Image src={positionIcon} alt="" boxSize="16px" />
                  <Text fontSize="xs" color="primary">
                    {event.tel}
                  </Text>
                </HStack>
              </HStack>

              <HStack gap={1}>
                <Tag fontSize="xs" fontWeight="light" bg="secondary" color="white" rounded="5">
                  asdf
                </Tag>
                <Tag fontSize="xs" fontWeight="light" bg="primary" color="white">
                  진행중
                </Tag>
                <Tag fontSize="xs" fontWeight="light" variant="outline" color="primary">
                  asdf
                </Tag>
              </HStack>

              <Text fontWeight="medium" color="secondary" fontSize="s" whiteSpace="pre-line">
                {event.info?.replaceAll('<br>', '\n')}
              </Text>
            </CardBody>
          </Card>

          <Card w="100%">
            <CardBody>
              <Box pb={2}>
                <Text fontSize="m" color="secondary" pb={1}>
                  위치
                </Text>
                <Text fontSize="m" color="black">
                  {event.addr1}
                </Text>
              </Box>
              <Map
                style={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '10px',
                }}
                center={{
                  lat: event.lat,
                  lng: event.lng,
                }}
              >
                <MapMarker
                  position={{
                    lat: event.lat,
                    lng: event.lng,
                  }}
                />
                <MapTypeControl position={'TOPRIGHT'} />
                <ZoomControl position={'RIGHT'} />
              </Map>
            </CardBody>
          </Card>
        </VStack>
      </Box>

      <BottomMenu />
    </>
  );
}
