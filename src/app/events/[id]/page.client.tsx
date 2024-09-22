'use client';

import toast from 'react-hot-toast';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

import haversineDistance from 'haversine-distance';

import BottomMenu from '@/components/navbar/BottomMenu';

import prevIcon from '@/assets/icons/prev.svg';

import { IconPhone, IconPosition } from '@/icons';
import { Image, Link } from '@chakra-ui/next-js';
import { Box, Text, VStack, HStack, Tag, Card, CardBody, Button } from '@chakra-ui/react';
import { Event } from '@prisma/client';

interface EventDetailProps {
  event: Event;
}

export default function EventDetailPage({ event }: EventDetailProps) {
  const handleLocation = () => {
    toast.loading('위치 정보를 불러오는 중...', {
      id: 'locationDetect',
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const distance = haversineDistance(
          { latitude: event.lat, longitude: event.lng },
          { latitude: position.coords.latitude, longitude: position.coords.longitude },
        );

        console.log(`거리: ${distance}m`);

        if (distance < 100) {
          toast.success('위치 인증에 성공했습니다.', {
            id: 'locationDetect',
          });
        } else {
          toast.error(`이벤트 장소 근처 100m 내에서 위치 인증해주세요.\n(현재 거리: ${distance.toFixed()}m)`, {
            id: 'locationDetect',
          });
        }
      });
    } else {
      toast.error('위치 정보를 불러오는데 실패했습니다.', {
        id: 'locationDetect',
      });
    }
  };

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
            {!event.mainImg && (
              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="#ccc"
                fontSize="xl"
                fontWeight="bold"
              >
                이미지 없음
              </Text>
            )}
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

              <HStack gap="20px" color="primary">
                <HStack>
                  <IconPosition boxSize="16px" />
                  <Text fontSize="xs">{event.addr2}</Text>
                </HStack>
                <HStack>
                  <IconPhone boxSize="16px" />
                  <Text fontSize="xs">{event.tel}</Text>
                </HStack>
              </HStack>

              <HStack gap={1}>
                <Tag fontSize="xs" fontWeight="light" bg="secondary" color="white" rounded="5">
                  {event.tag === 'MARKET'
                    ? '시장'
                    : event.tag === 'FESTIVAL'
                      ? '축제'
                      : event.tag === 'PERFORM'
                        ? '공연/전시'
                        : '기타'}
                </Tag>
                <Tag fontSize="xs" fontWeight="light" bg="primary" color="white">
                  진행중
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

        <Box h="60px" />
        <Box
          position="fixed"
          width="100%"
          maxWidth="600px"
          left="50%"
          transform="translateX(-50%)"
          bottom="60px"
          px="20px"
          py="15px"
          zIndex={99998}
          bg="var(--background)"
        >
          <Button
            w="full"
            h="50px"
            rounded="8px"
            colorScheme="primary"
            boxShadow="lg"
            zIndex="1000"
            gap="5px"
            onClick={handleLocation}
          >
            <IconPosition />
            <Text fontWeight="normal">위치 인증하기</Text>
          </Button>
        </Box>
      </Box>

      <BottomMenu />
    </>
  );
}
