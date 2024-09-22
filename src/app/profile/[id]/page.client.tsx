'use client';

import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

import Badge from '@/components/profile/Badge';

import editColoredIcon from '@/assets/icons/edit_colored.svg';
import linkIcon from '@/assets/icons/link.svg';
import logoWithText from '@/assets/icons/logo_with_text.svg';
import mainRankIcon from '@/assets/icons/main_rank.svg';
import personIcon from '@/assets/icons/person.svg';
import rankIcon from '@/assets/icons/rank.svg';
import starFilledIcon from '@/assets/icons/star_filled.svg';
import uploadIcon from '@/assets/icons/upload.svg';

import { Image, Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { User, Badge as prismaBadge, BadgeHolder, EventHolder, MissionHolder, Event } from '@prisma/client';
import { useRouter } from 'next/navigation';

// BadgeHolder에 관련된 Badge 포함
type NewBadgeHolder = BadgeHolder & { badge: prismaBadge };
type NewEventHolder = EventHolder & { event: Event };
// User에 대표 뱃지와 badgeHolders 포함
type NewUser = User & { badge: prismaBadge | null } & { badgeHolders: NewBadgeHolder[] } & {
  missionHolders: MissionHolder[];
} & { eventHolders: NewEventHolder[] };

interface ProfileProps {
  user?: NewUser | null;
}

export default function ProfileContent({ user }: ProfileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullUrl, setFullUrl] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href; // 전체 URL 가져오기
      setFullUrl(currentUrl);
    }
  }, [router]);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const textToCopy = fullUrl; // 복사할 텍스트
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true); // 복사 성공 시 상태 업데이트
    } catch (err) {
      console.error('Failed to copy text:', err);
      setCopied(false); // 복사 실패 시 상태 업데이트
    }
  };

  // 유저가 없으면 다른 화면 보여주기
  if (!user) {
    return <></>;
  }

  return (
    <>
      {/* 프로필 공유 모달 */}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
        <ModalOverlay />
        <ModalContent mt="0" padding="20px" borderRadius="0px 0px 20px 20px">
          <ModalCloseButton />
          <ModalBody padding="30px 0px 0px 0px" justifyContent="center">
            <Text fontSize="m" fontWeight="bold" textAlign="center">
              {user.nickname}님의 프로필
            </Text>
            <VStack mt="20px">
              <HStack spacing="20px" margin="20px 0px">
                <Image src={logoWithText} alt="대구모아 로고" />
                <QRCode size={110} value={fullUrl} />
              </HStack>
              <Tooltip hasArrow label={copied ? '복사됨' : '클릭하여 복사'} bgColor="secondary">
                <HStack onClick={copyToClipboard} cursor="pointer" _active={{ transform: 'scale(0.95)' }}>
                  <Image src={linkIcon} alt="링크 아이콘" />
                  <Text fontSize="xs" fontWeight="regular" color="primary">
                    {fullUrl}
                  </Text>
                </HStack>
              </Tooltip>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* 전체 콘텐츠 */}
      <Flex direction="column" gap="20px" p="20px 20px 90px 20px" boxSizing="border-box">
        {/* 프로필 기본 정보 (이미지/이름/메인 뱃지) */}
        <Flex p="40px 20px 0px 20px" gap="16px" boxSizing="border-box">
          <Image
            width="72"
            height="72"
            boxSize="72px"
            borderRadius="full"
            src={user.profileImg || personIcon}
            alt={`${user.nickname}님의 프로필 이미지`}
            priority
          />
          <div>
            {user.badge ? <Badge info={user.badge} /> : <Box h="28px"></Box>}
            <Text fontSize="xl" fontWeight="bold" color="primary.shade4">
              {user.name}님
            </Text>
          </div>
        </Flex>
        {/* 프로필 수정/공유 */}
        <ButtonGroup padding="0px 20px" width="100%" boxSizing="border-box">
          <Button
            width="100%"
            leftIcon={<Image boxSize="20px" src={editColoredIcon} alt="프로필 수정" />}
            textColor="primary"
            borderColor="primary"
            variant="outline"
            fontSize="s"
            fontWeight="regular"
            onClick={() => router.push('/profile/edit')}
          >
            프로필 수정
          </Button>
          <Button
            leftIcon={<Image boxSize="18px" src={uploadIcon} alt="프로필 공유" />}
            width="100%"
            fontSize="s"
            fontWeight="400"
            onClick={onOpen}
          >
            프로필 공유
          </Button>
        </ButtonGroup>
        {/* 수집한 뱃지 모음 */}
        <Flex
          direction="column"
          gap="20px"
          boxShadow="card"
          p="20px"
          justifyContent="left"
          bgColor="white"
          borderRadius="card"
        >
          {/* 헤더 */}
          <HStack w="100" justifyContent="space-between" alignItems="center">
            <HStack>
              <Image boxSize="24px" src={starFilledIcon} alt="획득한 뱃지" />
              <Text fontSize="m" fontWeight="regular">
                수집한 뱃지들
              </Text>
            </HStack>
            <Text fontSize="s" fontWeight="medium" color="secondary">
              {user.badgeHolders.length}개
            </Text>
          </HStack>
          {/* 콘텐츠 */}
          <Flex flexWrap="wrap" gap="8px">
            {user.badgeHolders.map((badgeHolder, index) => (
              <Badge key={index} info={badgeHolder.badge} />
            ))}
          </Flex>
        </Flex>
        {/* 통계 */}
        <Flex
          direction="column"
          gap="20px"
          boxShadow="card"
          p="20px"
          justifyContent="left"
          bgColor="white"
          borderRadius="card"
        >
          {/* 헤더 */}
          <HStack w="100" alignItems="center">
            <Image boxSize="24px" src={rankIcon} alt="통계" />
            <Text fontSize="m" fontWeight="regular">
              통계
            </Text>
          </HStack>
          {/* 콘텐츠 */}
          {/* 1. 주요 랭킹 디스플레이 */}
          {/* <Flex
            width="100%"
            p="20px 20px 16px 20px"
            borderRadius="10px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor="#F3F3F3"
          >
            <Text>수집한 뱃지 수 랭킹</Text>
            <HStack spacing="8px">
              <Image w="32px" h="48px" src={mainRankIcon} alt="주요 랭크" />
              <Text fontSize="xl" fontWeight="bold" color="primary">
                1위
              </Text>
            </HStack>
          </Flex> */}
          {/* 2. 4분야 참여 수 디스플레이 */}
          <VStack align="stretch">
            <HStack>
              {/* 2.1.1. 참여한 행사 수 */}
              <Box width="100%" p="16px" borderRadius="10px" backgroundColor="grey.shade2">
                <Text fontSize="s" fontWeight="light" color="white" opacity="0.5">
                  참여한 행사 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="white">
                  {user.eventHolders.length}
                </Text>
              </Box>
              {/* 2.1.2. 성공한 미션 수 */}
              <Box width="100%" p="16px" borderRadius="10px" backgroundColor="primary.shade4">
                <Text fontSize="s" fontWeight="light" color="white" opacity="0.5">
                  성공한 미션 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="white">
                  {user.missionHolders.filter((holders) => holders.status === 'COMPLETE').length}
                </Text>
              </Box>
            </HStack>
            <HStack>
              {/* 2.2.1. 둘러본 시장 수 */}
              <Card variant="outline" width="100%" p="16px" borderRadius="10px" borderColor="success">
                <Text fontSize="s" fontWeight="light" color="success">
                  둘러본 시장 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="success">
                  {user.eventHolders.filter((holders) => holders.event.tag === 'MARKET').length}
                </Text>
              </Card>
              {/* 2.2.2. 방문한 축제 수 */}
              <Card variant="outline" width="100%" p="16px" borderRadius="10px" borderColor="primary">
                <Text fontSize="s" fontWeight="light" color="primary">
                  방문한 축제 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="primary">
                  {user.eventHolders.filter((holders) => holders.event.tag === 'FESTIVAL').length}
                </Text>
              </Card>
            </HStack>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}
