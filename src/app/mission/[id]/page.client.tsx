'use client';

import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import axios from 'axios';
import dayjs from 'dayjs';

import BottomMenu from '@/components/navbar/BottomMenu';

import checkIcon from '@/assets/icons/check.svg';
import clockDanger from '@/assets/icons/clock_danger.svg';
import clockSuccess from '@/assets/icons/clock_success.svg';
import positionIcon from '@/assets/icons/position_primary.svg';
import prevIcon from '@/assets/icons/prev.svg';
import starIcon from '@/assets/icons/star_primary.svg';
import uploadIcon from '@/assets/icons/upload.svg';

import { Image, Link } from '@chakra-ui/next-js';
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
import { Mission, Event, MissionHolder, Image as TImage } from '@prisma/client';
import duration from 'dayjs/plugin/duration';
import { useRouter } from 'next/navigation';

dayjs.extend(duration);

type MissionWithEventAndHolder = Mission & { event: Event } & { missionHolders: MissionHolder[] };

interface MissionDetailProps {
  mission: MissionWithEventAndHolder;
}

interface UploadFormState {
  missionId: number;
  image: File;
}

const startMessage: string = '미션이 곧 시작됩니다.';
const endMessage: string = '종료된 미션입니다';

export default function MissionPageContent({ mission }: MissionDetailProps) {
  const [message, setMessage] = useState('');

  const router = useRouter();

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

  const { register, watch, control, setValue, handleSubmit } = useForm<UploadFormState>({});

  const { image } = watch();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setValue('image', files[0]);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    if (isUploading) return;

    if (e.dataTransfer) {
      const file = e.dataTransfer.files[0];

      if (file) {
        const fileName = file.name;
        const fileNameSplit = fileName.split('.');
        const fileExtension = fileNameSplit[fileNameSplit.length - 1];
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          setValue('image', file);
        } else {
          toast.error('이미지 파일만 업로드 가능합니다.');
        }
      }
    }
  };

  const onSubmit: SubmitHandler<UploadFormState> = (data) => {
    if (data.image === undefined) {
      toast.error('이미지를 업로드해주세요.');
      return;
    }

    const formData = new FormData();

    formData.append('missionId', mission.id.toString());
    formData.append('image', data.image);

    const uploadToast = toast.loading('사진을 업로드하고 있습니다...');
    setIsUploading(true);

    axios
      .post(`/api/mission/${mission.id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('사진 업로드를 완료했습니다.', { id: uploadToast });

          console.log(res.data);

          const missionHolder = res.data.data.missionHolder as MissionHolder;

          axios.get(`/api/badge/${missionHolder.userId}`).finally(() => {
            router.refresh();
          });
        } else {
          toast.error('사진 업로드에 실패했습니다.', { id: uploadToast });
        }
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const now = dayjs(); // 현재 시간
  const start = dayjs(mission.startTime); // 이벤트 시작 시간
  const end = dayjs(mission.endTime); // 이벤트 종료 시간

  const status = now.isBefore(start) ? 'WAITING' : now.isAfter(end) ? 'END' : 'PROGRESS';

  return (
    <>
      <Box h="100dvh" px="20px" py="30px" w="full">
        <Link href="/mission" _hover={{ textDecoration: 'none' }}>
          <HStack px="10px" py="20px">
            <Image src={prevIcon} alt="" boxSize="16px" />
            <Text fontSize="xl" color="primary" fontWeight="Bold">
              미션 정보
            </Text>
          </HStack>
        </Link>
        <VStack gap="20px" pb="150px">
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
                <Text fontWeight="bold" color={message.includes('일') ? 'success' : 'danger'} fontSize="xs">
                  {message}
                </Text>
              </HStack>

              <Text fontWeight="bold" color="black" fontSize="xl">
                {mission.title}
              </Text>

              <HStack gap="20px" py="10px">
                <HStack>
                  <Image src={positionIcon} alt="" boxSize="16px" />
                  <Text fontSize="xs" color="primary">
                    {mission.event.addr2}
                  </Text>
                </HStack>
                <Link href={`/event/${mission.event.id}`} _hover={{ textDecoration: 'none' }}>
                  <HStack>
                    <Image src={starIcon} alt="" boxSize="16px" />
                    <Text fontSize="xs" color="primary">
                      {mission.event.title}
                    </Text>
                  </HStack>
                </Link>
              </HStack>

              <VStack>
                <HStack justifyContent="space-between" w="full">
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
            </CardBody>
          </Card>
          <Card w="100%">
            <CardBody>
              <Text fontSize="m" color="secondary" fontWeight="medium" pb="5px">
                미션 내용
              </Text>
              {mission.info.split('<br>').map((line, index) => (
                <Text key={index} fontSize="m" color="black" fontWeight="medium">
                  {line}
                </Text>
              ))}
            </CardBody>
          </Card>
        </VStack>
        {message != endMessage && message != startMessage && message != '' && (
          <Button
            position="absolute"
            bottom="80px"
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
        )}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} w="full" mx="20px">
            <ModalHeader>사진 업로드</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {image ? (
                <Box>
                  <Image
                    src={URL.createObjectURL(image)}
                    alt=""
                    width={100}
                    height={100}
                    w="full"
                    h="full"
                    objectFit="cover"
                    rounded="md"
                  />
                  <Text fontSize="m" fontWeight="semibold" pt={2}>
                    {image.name}
                  </Text>
                </Box>
              ) : (
                <Button
                  w="full"
                  h="full"
                  py={6}
                  rounded="xl"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  bg={dragOver ? 'primary' : 'white'}
                  color={dragOver ? 'white' : 'black'}
                  borderColor={dragOver ? 'primary' : 'grey'}
                  borderWidth={1}
                  _hover={{
                    bg: 'primary',
                    color: 'white',
                  }}
                  onClick={() => {
                    if (isUploading) return;
                    inputRef.current?.click();
                  }}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Box pointerEvents="none">
                    <Text fontSize="m" fontWeight="semibold" pb={1}>
                      터치하여 사진 업로드
                    </Text>
                    <Text fontSize="s">또는 PC의 경우 드래그 앤 드롭하여 사진 업로드</Text>
                  </Box>
                </Button>
              )}

              <input type="file" accept="image/*" ref={inputRef} hidden onChange={handleFileSelect} />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="primary" mr={3} onClick={onClose}>
                업로드
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <BottomMenu />
    </>
  );
}
