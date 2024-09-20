'use client';

import google from '@/assets/google.png';
import logo from '@/assets/logo.svg';

import { Image } from '@chakra-ui/next-js';
import { Box, Button, Text, VStack } from '@chakra-ui/react';

export default function LoginPageContent() {
  return (
    <Box h="100dvh">
      <VStack h="100%">
        <VStack gap={0} justify="center" flexGrow={1}>
          <Image src={logo} alt="logo" pb={8} />
          <Text color="secondary" fontWeight="light">
            대구시 행사의 모든 것
          </Text>
          <Text color="primary.shade4" fontWeight="bold" fontSize={30}>
            대구모아
          </Text>
        </VStack>

        <Box w="full" p={4}>
          <VStack>
            <Text fontSize="s" color="secondary">
              서비스 이용을 위해 로그인해주세요.
            </Text>
            <Button w="full" bg="white" rounded="full" shadow="0 0 30px 0 rgb(0 0 0 / 8%);" py={6}>
              <Image src={google} alt="google" w={6} h={6} mr={2} />
              <Text fontSize="xs" fontWeight="regular" color="black">
                Google로 로그인
              </Text>
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
