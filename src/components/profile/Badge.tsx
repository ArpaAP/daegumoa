'use client';

import React from 'react';

import BadgeIcon from '@/assets/icons/badge';

import { Image } from '@chakra-ui/next-js';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

const BangeWrapper = styled.div<{ level: number }>`
  width: fit-content;
  height: 28px;
  padding: 2px 10px 2px 4px;
  display: flex;
  align-items: center;
  gap: 4px;

  border-radius: 6px;
  background-color: ${(props) => {
    switch (props.level) {
      case 1:
        return '#2ECC7125';
      case 2:
        return '#0652DD25';
      case 3:
        return '#FF000025';
      case 4:
        return '#F10FDA25';
      case 5:
        return '#00000025';
      default:
        return '#2ECC7125';
    }
  }};

  font-size: 12px;
  color: ${(props) => {
    switch (props.level) {
      case 1:
        return '#2ECC71';
      case 2:
        return '#0652DD';
      case 3:
        return '#FF0000';
      case 4:
        return '#F10FDA';
      case 5:
        return '#000000';
      default:
        return '#2ECC71';
    }
  }};
`;

export interface BadgeProps {
  info: {
    level: 1 | 2 | 3 | 4 | 5 | number;
    name: string;
    desc: string;
  };
}

const Badge: React.FC<BadgeProps> = ({ info }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const badge_icon = BadgeIcon[info.level - 1];

  return (
    <>
      <BangeWrapper level={info.level} onClick={onOpen}>
        <Image boxSize="24px" src={badge_icon} alt={`${info.level}단계 뱃지`} />
        {info.name}
      </BangeWrapper>

      {/* 뱃지 누르면 모달 떠요 */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent padding="20px" borderRadius="20px">
          <ModalBody padding="0px" justifyContent="center">
            <VStack>
              <Image boxSize="96px" src={badge_icon} alt={`${info.level}단계 뱃지`} />
              <Text fontSize="l" fontWeight="bold">
                {info.name}
              </Text>
              <Text fontSize="s" fontWeight="regular" color="grey">
                {info.desc}
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter padding=" 30px 0px 0px 0px">
            <Button w="80px" h="43px" borderRadius="8px" onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Badge;
