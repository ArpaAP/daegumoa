'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import ky from 'ky';

import Badge from '@/components/profile/Badge';

import prevIcon from '@/assets/icons/prev.svg';

import { Image, Link } from '@chakra-ui/next-js';
import { Button, Flex, FormControl, FormLabel, HStack, Input, Select, Text, VStack } from '@chakra-ui/react';

export interface ProfileEditFormState {
  nickname: string;
  representBadge: string;
  representRanking: string;
}

export default function ProfileEditContent() {
  const { register, handleSubmit } = useForm<ProfileEditFormState>();

  // 나중에 백엔드에서 user 불러오세유
  const user = {
    id: 23,
    email: 'w.developer7773@gmail.com',
    name: '장기원',
    nickname: 'w.developer7773',
    profileImgId: null,
    badgeId: 4,
    createdDate: Date.now(),
    modifiedDate: Date.now(),
    // 기존 User필드에 profileImg추가
    profileImg: 'https://github.com/whitedev7773.png',
  };

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

  const submit: SubmitHandler<ProfileEditFormState> = (data) => {
    // toast
    //   .promise(
    //     ky.post('/api/users', {
    //       json: data,
    //     }),
    //     {
    //       loading: '회원가입 처리 중입니다...',
    //       success: '성공적으로 회원가입 처리되었습니다!',
    //       error: '회원가입 처리 중 문제가 발생했습니다.',
    //     },
    //   )
    //   .then(() => {
    //     setTimeout(() => {
    //       router.push('/');
    //     }, 1000);
    //   });
  };

  const error: SubmitErrorHandler<ProfileEditFormState> = (errors) => {
    // toast.error(
    //   `입력값을 확인해주세요: ${Object.entries(errors)
    //     .map(([k, v]) => v.message)
    //     .join(', ')}`,
    //   {
    //     id: 'formError',
    //   },
    // );
  };

  return (
    <Flex direction="column" gap="30px" p="20px">
      <HStack mt="20px">
        <Link href="/profile">
          <Image w="24px" h="24px" src={prevIcon} alt="뒤로가기" />
        </Link>
        <Text fontSize="l" fontWeight="medium" color="primary">
          프로필 수정
        </Text>
      </HStack>
      {/* 프로필 기본 정보 (이미지/이름/메인 뱃지) */}
      <HStack spacing="16px" p="0px 10px" boxSizing="border-box">
        <Image
          width="72"
          height="72"
          boxSize="72px"
          borderRadius="full"
          src={user.profileImg}
          alt={`${user.nickname}님의 프로필 이미지`}
          priority
        />
        <VStack spacing="0px">
          <Badge info={badge_list[4]} />
          <Text fontSize="xl" fontWeight="bold" color="primary.shade4">
            {user.name}님
          </Text>
        </VStack>
      </HStack>
      <form onSubmit={handleSubmit(submit, error)} style={{ height: '100%' }}>
        {/* 닉네임 수정 */}
        <FormControl p="10px">
          <FormLabel htmlFor="nickname" fontSize="s" ml="10px" mb="5px" color="secondary">
            닉네임
          </FormLabel>
          <Input
            id="nickname"
            p="20px"
            borderColor="#e2e8f0"
            borderRadius="10px"
            fontSize="xs"
            {...register('nickname', {
              required: '닉네임은 필수 입력값입니다.',
            })}
            defaultValue={user.nickname}
          />
        </FormControl>
        <FormControl p="10px">
          <FormLabel htmlFor="representBadge" fontSize="s" ml="10px" mb="5px" color="secondary">
            대표 뱃지
          </FormLabel>
          <Select
            id="representBadge"
            m="0px"
            p="0px"
            borderRadius="10px"
            fontSize="xs"
            {...register('representBadge', {
              required: '대표 뱃지는 필수 선택값입니다.',
            })}
          >
            {badge_list.map((badge, i) => (
              <option key={i} value={badge.name}>
                {badge.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl p="10px">
          <FormLabel htmlFor="representBadge" fontSize="s" ml="10px" mb="5px" color="secondary">
            대표 뱃지
          </FormLabel>
          <Select
            id="representRanking"
            m="0px"
            p="0px"
            borderRadius="10px"
            fontSize="xs"
            {...register('representRanking', {
              required: '대표 랭킹은 필수 선택값입니다.',
            })}
          >
            <option value="시장을 좋아하는 Mania">시장을 좋아하는 Mania</option>
            <option value="축제를 즐기는 Player">축제를 즐기는 Player</option>
            <option value="강연을 즐겨 듣는 Listener">강연을 즐겨 듣는 Listener</option>
          </Select>
        </FormControl>
        <Button type="submit" position="fixed" left="20px" bottom="20px" right="20px" borderRadius="8px" fontSize="s">
          저장하기
        </Button>
      </form>
    </Flex>
  );
}
