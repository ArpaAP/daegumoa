'use client';

import positionIcon from '@/assets/icons/person.svg';

import { IconPhone, IconPosition } from '@/icons';
import { Image } from '@chakra-ui/next-js';
import { HStack, Text, VStack } from '@chakra-ui/react';

interface EventCardProps {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  tel: string;
  imageUrl: string;
}

export default function EventCard({ title, startDate, endDate, location, tel, imageUrl }: EventCardProps) {
  return (
    <HStack gap={3}>
      <Image src={imageUrl} alt={title} width={100} height={100} w="72px" h="72px" rounded="lg" />
      <VStack align="left" gap={0}>
        <Text color="secondary" fontSize="xs">
          {startDate} ~ {endDate}
        </Text>
        <Text fontWeight="bold">{title}</Text>
        <HStack justify="left" color="grey" pt={0.5} gap={1}>
          <IconPosition boxSize="14px" />
          <Text fontSize="s">{location}</Text>
          <IconPhone boxSize="14px" />
          <Text fontSize="s">{tel}</Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
