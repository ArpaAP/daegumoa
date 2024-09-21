'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import ky from 'ky';

import logo from '@/assets/logo.svg';

import { Image } from '@chakra-ui/next-js';
import { Box, VStack, Text, Input, FormControl, FormLabel, Spacer, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export interface RegisterFormState {
  name: string;
  nickname: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<RegisterFormState>();

  const submit: SubmitHandler<RegisterFormState> = (data) => {
    toast
      .promise(
        ky.post('/api/users', {
          json: data,
        }),
        {
          loading: '회원가입 처리 중입니다...',
          success: '성공적으로 회원가입 처리되었습니다!',
          error: '회원가입 처리 중 문제가 발생했습니다.',
        },
      )
      .then(() => {
        setTimeout(() => {
          router.push('/');
        }, 1000);
      });
  };

  const error: SubmitErrorHandler<RegisterFormState> = (errors) => {
    toast.error(
      `입력값을 확인해주세요: ${Object.entries(errors)
        .map(([k, v]) => v.message)
        .join(', ')}`,
      {
        id: 'formError',
      },
    );
  };

  return (
    <Box px={8} py={16} className="dvh-full">
      <form onSubmit={handleSubmit(submit, error)} style={{ height: '100%' }}>
        <VStack align="left" gap={4} h="full">
          <Image src={logo} alt="Logo" width="84" height="76" />
          <Text fontSize="xl" fontWeight="semibold" color="primary.shade3" lineHeight={1.2}>
            사용을 위해
            <br />
            추가적인 정보가 필요해요
          </Text>

          <FormControl>
            <FormLabel htmlFor="name" fontSize={14} color="secondary">
              이름
            </FormLabel>
            <Input
              id="name"
              {...register('name', {
                required: '이름은 필수 입력값입니다.',
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="nickname" fontSize={14} color="secondary">
              닉네임
            </FormLabel>
            <Input
              id="nickname"
              {...register('nickname', {
                required: '닉네임은 필수 입력값입니다.',
              })}
            />
          </FormControl>
          <Spacer />

          <Button type="submit" colorScheme="primary">
            회원가입
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
