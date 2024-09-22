'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import checkIcon from '@/assets/icons/check.svg';
import clockDanger from '@/assets/icons/clock_danger.svg';
import clockSuccess from '@/assets/icons/clock_success.svg';
import positionIcon from '@/assets/icons/position.svg';

import { Image, Link } from '@chakra-ui/next-js';
import { Box, Card, CardHeader, CardBody, VStack, HStack, Tag, TagLeftIcon, TagLabel, Text } from '@chakra-ui/react';
import { Mission, Event, MissionHolder } from '@prisma/client';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const startMessage: string = '미션이 곧 시작됩니다.';
const endMessage: string = '종료된 미션입니다';
type MissionWithImageAndEventAndHolder = Mission & { event: Event } & { missionHolders: MissionHolder[] };

interface MissionCardProps {
  mission: MissionWithImageAndEventAndHolder;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
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

  const now = dayjs(); // 현재 시간
  const start = dayjs(mission.startTime); // 이벤트 시작 시간
  const end = dayjs(mission.endTime); // 이벤트 종료 시간

  const status = now.isBefore(start) ? 'WAITING' : now.isAfter(end) ? 'END' : 'PROGRESS';

  return (
    <Link href={`/mission/${mission.id}`} w="100%" _hover={{ textDecoration: 'none' }}>
      <Card w="100%" rounded="20">
        <CardHeader
          position="relative"
          w="100%"
          h="200"
          backgroundImage={mission.missionImg}
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPosition="center"
          borderTopRadius="20px"
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

          <Tag
            position="absolute"
            bottom="10px"
            right="10px"
            color="white"
            p="8px"
            borderRadius="md"
            alignItems="center"
            rounded="10"
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // 부드러운 그림자
          >
            <TagLeftIcon boxSize="16px" as={Image} src={positionIcon} alt="" />
            <TagLabel fontSize="m" fontWeight="bold">
              {mission.event.addr2}
            </TagLabel>
          </Tag>
        </CardHeader>
        <CardBody>
          <VStack>
            <HStack justifyContent="space-between" w="full" pb={2}>
              <HStack gap="4px">
                <Tag fontSize="xs" fontWeight="light" bg="secondary" color="white" rounded="5">
                  {mission.tag === 'MARKET'
                    ? '시장'
                    : mission.tag === 'FESTIVAL'
                      ? '축제'
                      : mission.tag === 'PERFORM'
                        ? '공연/전시'
                        : '기타'}
                </Tag>
                <Tag
                  fontSize="xs"
                  fontWeight="light"
                  bg={status === 'WAITING' ? 'success' : status === 'PROGRESS' ? 'primary' : 'danger'}
                  color="white"
                >
                  {status === 'WAITING' ? '대기중' : status === 'END' ? '종료' : '진행중'}
                </Tag>
                <Tag fontSize="xs" fontWeight="light" variant="outline" color="primary">
                  {mission.difficulty === 'EASY' ? '쉬움' : mission.difficulty === 'NORMAL' ? '보통' : '어려움'}
                </Tag>
              </HStack>
              <Tag bg="black" color="white" rounded="20px" px="10px" py="5px">
                <TagLeftIcon boxSize="16px" as={Image} src={checkIcon} alt="" />
                <TagLabel fontSize="xs">참여자 {mission.missionHolders.length}명</TagLabel>
              </Tag>
            </HStack>
          </VStack>
          <Text fontWeight="bold" color="black" fontSize="m" pb={2}>
            {mission.title}
          </Text>
          <HStack align="center">
            <Image src={message.includes('일') ? clockSuccess : clockDanger} alt="" boxSize="16px" p="0" />
            <Text fontWeight="bold" color={message.includes('일') ? 'success' : 'danger'} fontSize="xs">
              {message}
            </Text>
          </HStack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default MissionCard;
