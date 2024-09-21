'use client';

import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import checkIcon from '@/assets/icons/check.svg';
import clockDanger from '@/assets/icons/clock_danger.svg';
import clockSuccess from '@/assets/icons/clock_success.svg';
import positionIcon from '@/assets/icons/position_primary.svg';
import prevIcon from '@/assets/icons/prev.svg';
import starIcon from '@/assets/icons/star_primary.svg';
import uploadIcon from '@/assets/icons/upload.svg';

import { Image } from '@chakra-ui/next-js';
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Card,
  Link,
  CardBody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Mission, Event, MissionHolder } from '@prisma/client';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type MissionWithImageAndEventAndHolder = Mission & { event: Event } & { holders: MissionHolder[] };

interface MissionDetailProps {
  mission: MissionWithImageAndEventAndHolder;
}

const startMessage: string = '미션이 곧 시작됩니다.';
const endMessage: string = '종료된 미션입니다';

export default function MissionPageContent({ mission }: MissionDetailProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs(); // 현재 시간
      const start = dayjs(mission.startTime); // 이벤트 시작 시간
      const end = dayjs(mission.endTime); // 이벤트 종료 시간

      if (now.isBefore(start)) {
        // 현재 시간이 이벤트 시작 시간 이전일 경우
        setMessage(startMessage);
      } else if (now.isAfter(end)) {
        // 현재 시간이 이벤트 종료 시간 이후일 경우
        clearInterval(interval);
        setMessage(endMessage);
      } else {
        // 이벤트 진행 중일 때 남은 시간 계산
        const diff = end.diff(now); // 종료 시간과 현재 시간의 차이 (밀리초 단위)
        const time = dayjs.duration(diff); // 차이를 duration으로 변환
        const days = time.days(); // 남은 일 수
        const hours = time.hours(); // 남은 시간
        const minutes = time.minutes(); // 남은 분
        const seconds = time.seconds(); // 남은 초
        if (days == 0) {
          if (hours == 0) {
            if (minutes == 0) {
              setMessage(`${seconds}초 후 종료`);
            } else {
              setMessage(`${minutes}분 ${seconds}초 후 종료`);
            }
          } else {
            setMessage(`${hours}시간 ${minutes}분 ${seconds}초 후 종료`);
          }
        } else {
          setMessage(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초 후 종료`);
        }
      }
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [mission.startTime, mission.endTime]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box h="100dvh" px="20px" py="30px" w="full" position="relative">
      <Link href="/mission" _hover={{ textDecoration: 'none' }}>
        <HStack px="10px" py="20px">
          <Image src={prevIcon} alt="" boxSize="16px" />
          <Text fontSize="xl" color="primary" fontWeight="Bold">
            미션 정보
          </Text>
        </HStack>
      </Link>
      <VStack gap="20px">
        <Box
          position="relative"
          w="100%"
          h="200"
          backgroundImage={mission.missionImg}
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
          <CardBody>
            <HStack>
              <Image src={message.includes('일') ? clockSuccess : clockDanger} alt="" boxSize="14px" p="0" />
              <Text fontWeight="bold" color={message.includes('일') ? 'success' : 'danger'} fontSize="m">
                {message}
              </Text>
            </HStack>

            <Text fontWeight="bold" color="black" fontSize="xl">
              {mission.title}
            </Text>

            <HStack gap="20px" py="10px">
              <HStack>
                <Image src={positionIcon} alt="" boxSize="16px" />
                <Text fontSize="m" color="primary">
                  {mission.event.addr2}
                </Text>
              </HStack>
              <Link href={`/event/${mission.event.id}`} _hover={{ textDecoration: 'none' }}>
                <HStack>
                  <Image src={starIcon} alt="" boxSize="16px" />
                  <Text fontSize="m" color="primary">
                    {mission.event.title}
                  </Text>
                </HStack>
              </Link>
            </HStack>

            <VStack>
              <HStack justifyContent="space-between" w="full">
                <HStack gap="4px">
                  <Tag fontSize="m" fontWeight="light" bg="secondary" color="white" rounded="5">
                    {mission.tag === 'MARKET'
                      ? '시장'
                      : mission.tag === 'FESTIVAL'
                        ? '축제'
                        : mission.tag === 'PERFORM'
                          ? '공연/전시'
                          : '기타'}
                  </Tag>
                  <Tag fontSize="m" fontWeight="light" bg="primary" color="white">
                    진행중
                  </Tag>
                  <Tag fontSize="m" fontWeight="light" variant="outline" color="primary">
                    {mission.difficulty === 'EASY' ? '쉬움' : mission.difficulty === 'NORMAL' ? '보통' : '어려움'}
                  </Tag>
                </HStack>
                <Tag bg="black" color="white" rounded="20px" px="10px" py="5px">
                  <TagLeftIcon boxSize="16px" as={Image} src={checkIcon} alt="" />
                  <TagLabel fontSize="m">
                    참여자 {mission.holders.filter((holders) => holders.status === 'COMPLETE').length}명
                  </TagLabel>
                </Tag>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
        <Card w="100%">
          <CardBody>
            <Text fontSize="l" color="secondary" fontWeight="bold" pb="5px">
              미션 내용
            </Text>
            {mission.info.split('\n').map((line, index) => (
              <Text key={index} fontSize="m" color="black" fontWeight="bold">
                {line}
              </Text>
            ))}
          </CardBody>
        </Card>
      </VStack>
      <Button
        position="absolute"
        bottom="20px"
        h="50px"
        left="0"
        right="0"
        marginX="20px"
        rounded="8px"
        colorScheme="primary"
        boxShadow="lg"
        zIndex="1000"
        gap="5px"
        onClick={onOpen}
      >
        <Image src={uploadIcon} alt=""></Image>
        <Text fontWeight="normal">사진 업로드</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="full" mx="20px">
          <ModalHeader>사진 업로드</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>미션을 수행한 사진을 업로드해주세요.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              업로드
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
