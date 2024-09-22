'use client';

import { IconPhone, IconPosition } from '@/icons';
import { Image, Link } from '@chakra-ui/next-js';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';

interface EventCardProps {
  id: number;
  title: string;
  startDate: string | null;
  endDate: string | null;
  location: string;
  tel: string;
  imageUrl?: string | null;
}

export default function EventCard({ id, title, startDate, endDate, location, tel, imageUrl }: EventCardProps) {
  return (
    <Link href={`/events/${id}`} prefetch _hover={{ textDecoration: 'none' }}>
      <HStack gap={3}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={100}
            height={100}
            w="72px"
            h="72px"
            rounded="lg"
            flexShrink={0}
            style={{
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box w="72px" h="72px" bgColor="#ccc" rounded="lg" flexShrink={0}>
            <Text fontSize="xs" color="white" textAlign="center" pt="30px">
              이미지 없음
            </Text>
          </Box>
        )}
        <VStack align="left" gap={0}>
          {(startDate || endDate) && (
            <Text color="secondary" fontSize="xs">
              {startDate} ~ {endDate}
            </Text>
          )}
          <Text fontWeight="bold">{title}</Text>
          <HStack justify="left" color="grey" pt={0.5} gap={1}>
            <IconPosition boxSize="14px" />
            <Text fontSize="s" noOfLines={1}>
              {location.replace('대구광역시', '')}
            </Text>
            <IconPhone boxSize="14px" />
            <Text fontSize="s" noOfLines={1}>
              {tel}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Link>
  );
}
