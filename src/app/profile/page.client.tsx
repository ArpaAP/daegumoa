'use client';

import QRCode from 'react-qr-code';

import Badge from '@/components/profile/Badge';

import editColoredIcon from '@/assets/icons/edit_colored.svg';
import linkIcon from '@/assets/icons/link.svg';
import logoWithText from '@/assets/icons/logo_with_text.svg';
import mainRankIcon from '@/assets/icons/main_rank.svg';
import rankIcon from '@/assets/icons/rank.svg';
import starFilledIcon from '@/assets/icons/star_filled.svg';
import uploadIcon from '@/assets/icons/upload.svg';

import { Image } from '@chakra-ui/next-js';
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
} from '@chakra-ui/react';
import { User } from '@prisma/client';

type NewUser = User & { profileImg: string };

interface ProfileProps {
  user?: NewUser | null;
}

export default function ProfileContent({ user }: ProfileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 유저가 없으면 다른 화면 보여주기
  if (!user) {
    return <></>;
  }

  const badge_list = [
    { level: 1, name: '초보 탐험가', desc: '시장을 1개 방문하세요.' },
    { level: 2, name: '중수 탐험가', desc: '시장을 3개 방문하세요.' },
    { level: 3, name: '전문적인 탐험가', desc: '시장을 5개 방문하세요.' },
    { level: 4, name: '위대한 탐험가', desc: '시장을 10개 방문하세요.' },
    { level: 5, name: '맛집헌터', desc: '시장 속 숨은 맛집을 찾으세요.' },
    { level: 5, name: '마라톤 완주', desc: '마라톤을 1회 완주하세요.' },
    { level: 1, name: '소심한 방문객', desc: '행사에 1회 참가하세요.' },
    { level: 2, name: '익숙한 방문객', desc: '행사제 3회 참가하세요.' },
    { level: 5, name: '치맥 사랑꾼', desc: '치맥 페스티벌에 참가하세요.' },
    { level: 1, name: '피곤한 리스너', desc: '강의를 1개 청강하세요.' },
    { level: 2, name: '궁금한 리스너', desc: '강의를 3개 청강하세요.' },
    { level: 3, name: '손을 든 리스너', desc: '강의를 5개 청강하세요.' },
    { level: 4, name: '똑똑한 리스너', desc: '강의를 10개 청강하세요.' },
  ];

  return (
    <>
      {/* 프로필 공유 모달 */}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
        <ModalOverlay />
        <ModalContent mt={[0, 50]} padding="20px" borderRadius="0px 0px 20px 20px">
          <ModalCloseButton />
          <ModalBody padding="30px 0px 0px 0px" justifyContent="center">
            <Text fontSize="m" fontWeight="bold" textAlign="center">
              {user.nickname}님의 프로필
            </Text>
            <VStack mt="20px">
              <HStack spacing="20px" margin="20px 0px">
                <Image src={logoWithText} alt="대구모아 로고" />
                <QRCode size={110} value={` https://daegumoa.arpaap.dev/view/${user.nickname}`} />
              </HStack>
              <HStack>
                <Image src={linkIcon} alt="링크 아이콘" />
                <Text fontSize="xs" fontWeight="regular" color="primary">
                  https://daegumoa.arpaap.dev
                </Text>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* 전체 콘텐츠 */}
      <Flex direction="column" gap="20px" p="20px" boxSizing="border-box">
        {/* 프로필 기본 정보 (이미지/이름/메인 뱃지) */}
        <Flex p="40px 20px 0px 20px" gap="16px" boxSizing="border-box">
          <Image
            width="72"
            height="72"
            boxSize="72px"
            borderRadius="full"
            src={user.profileImg}
            alt={`${user.nickname}님의 프로필 이미지`}
            priority
          />
          <div>
            <Badge info={badge_list[4]} />
            <Text fontSize="xl" fontWeight="bold" color="primary.shade4">
              {user.name}님
            </Text>
          </div>
        </Flex>
        {/* 프로필 수정/공유 */}
        <ButtonGroup padding="0px 20px" width="100%" boxSizing="border-box">
          <Button
            leftIcon={<Image boxSize="20px" src={editColoredIcon} alt="프로필 수정" />}
            width={'100%'}
            textColor="primary"
            borderColor="primary"
            variant="outline"
            fontSize="s"
            fontWeight="regular"
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
              13개
            </Text>
          </HStack>
          {/* 콘텐츠 */}
          <Flex flexWrap="wrap" gap="8px">
            {badge_list.map((info, index) => (
              <Badge key={index} info={info} />
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
          <Flex
            width="100%"
            p="20px 20px 16px 20px"
            borderRadius="10px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor="#F3F3F3"
          >
            <Text>시장을 좋아하는 Mania</Text>
            <HStack spacing="8px">
              <Image w="32px" h="48px" src={mainRankIcon} alt="주요 랭크" />
              <Text fontSize="xl" fontWeight="bold" color="primary">
                1위
              </Text>
            </HStack>
          </Flex>
          {/* 2. 4분야 참여 수 디스플레이 */}
          <VStack align="stretch">
            <HStack>
              {/* 2.1.1. 참여한 행사 수 */}
              <Box width="100%" p="16px" borderRadius="10px" backgroundColor="grey.shade2">
                <Text fontSize="s" fontWeight="light" color="white" opacity="0.5">
                  참여한 행사 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="white">
                  17
                </Text>
              </Box>
              {/* 2.1.2. 둘러본 시장 수 */}
              <Box width="100%" p="16px" borderRadius="10px" backgroundColor="primary.shade4">
                <Text fontSize="s" fontWeight="light" color="white" opacity="0.5">
                  둘러본 시장 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="white">
                  4
                </Text>
              </Box>
            </HStack>
            <HStack>
              {/* 2.2.1. 성공한 미션 수 */}
              <Card variant="outline" width="100%" p="16px" borderRadius="10px" borderColor="success">
                <Text fontSize="s" fontWeight="light" color="success">
                  성공한 미션 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="success">
                  5
                </Text>
              </Card>
              {/* 2.2.2. 청강한 강의 수 */}
              <Card variant="outline" width="100%" p="16px" borderRadius="10px" borderColor="primary">
                <Text fontSize="s" fontWeight="light" color="primary">
                  성공한 미션 수
                </Text>
                <Text fontSize="28px" fontWeight="black" color="primary">
                  5
                </Text>
              </Card>
            </HStack>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}
