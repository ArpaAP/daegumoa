'use client';

import toast from 'react-hot-toast';

import ky from 'ky';

import { Image } from '@chakra-ui/next-js';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
  CardFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import { Image as prismaImage, Mission, MissionHolder } from '@prisma/client';
import { useRouter } from 'next/navigation';

type MissionHolderWithMissionAndImage = MissionHolder & { mission: Mission } & { image: prismaImage };

interface EventCardProps {
  missionHolder: MissionHolderWithMissionAndImage;
}

export default function EventCard({ missionHolder }: EventCardProps) {
  const router = useRouter();
  const setStatus = (status: string) => {
    toast
      .promise(
        ky.post('/api/admin', {
          json: { missionHolderId: missionHolder.id, status },
        }),
        {
          loading: '수정 중입니다...',
          success: '성공적으로 수정 되었습니다!',
          error: '정보 수정 중 문제가 발생했습니다.',
        },
      )
      .then(() => {
        setTimeout(() => {
          router.refresh();
        }, 1000);
      });
  };

  return (
    <Card w="100%" rounded="20">
      <Image
        borderTopRadius={20}
        width={100}
        height={200}
        w="100%"
        h="auto"
        src={missionHolder.image.src}
        alt={missionHolder.image.alt}
      ></Image>
      <CardBody>
        <Text>
          {missionHolder.mission.title} ({missionHolder.status})
        </Text>
        <Text fontSize="m" color="secondary" fontWeight="medium" pb="5px">
          미션 내용
        </Text>
        {missionHolder.mission.info.split('<br>').map((line, index) => (
          <Text key={index} fontSize="m" color="black" fontWeight="medium">
            {line}
          </Text>
        ))}
        <ButtonGroup pt={2}>
          {missionHolder.status != 'WAIT' && (
            <Box as="button" bg="blue.500" color="white" px={4} py={2} rounded="md" onClick={() => setStatus('WAIT')}>
              대기
            </Box>
          )}
          {missionHolder.status != 'REJECT' && (
            <Box as="button" bg="red.500" color="white" px={4} py={2} rounded="md" onClick={() => setStatus('REJECT')}>
              거절
            </Box>
          )}
          {missionHolder.status != 'COMPLETE' && (
            <Box
              as="button"
              bg="green.500"
              color="white"
              px={4}
              py={2}
              rounded="md"
              onClick={() => setStatus('COMPLETE')}
            >
              완료
            </Box>
          )}
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}
