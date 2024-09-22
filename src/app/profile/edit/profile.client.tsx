'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import ky from 'ky';

import Badge from '@/components/profile/Badge';

import personIcon from '@/assets/icons/person.svg';
import prevIcon from '@/assets/icons/prev.svg';

import { Image, Link } from '@chakra-ui/next-js';
import { Button, Flex, FormControl, FormLabel, HStack, Input, Select, Text, VStack } from '@chakra-ui/react';
import { User, Badge as prismaBadge } from '@prisma/client';
import { useRouter } from 'next/navigation';

type newUser = User & { badge: prismaBadge | null };

export interface ProfileEditFormState {
  nickname: string;
  badgeId: number | null;
  // representRanking: string;
}

interface ProfileEditContentProps {
  user: newUser;
  badge_list: prismaBadge[];
}

export default function ProfileEditContent({ user, badge_list }: ProfileEditContentProps) {
  const { register, handleSubmit } = useForm<ProfileEditFormState>();

  const router = useRouter();

  const submit: SubmitHandler<ProfileEditFormState> = (data) => {
    toast
      .promise(
        ky.post('/api/profileEdit', {
          json: data,
        }),
        {
          loading: '수정 중입니다...',
          success: '성공적으로 수정 되었습니다!',
          error: '정보 수정 중 문제가 발생했습니다.',
        },
      )
      .then(() => {
        setTimeout(() => {
          router.push(`/profile/${user.id}`);
        }, 1000);
      });
  };

  const error: SubmitErrorHandler<ProfileEditFormState> = (errors) => {
    toast.error(
      `${Object.entries(errors)
        .map(([k, v]) => v.message)
        .join(', ')}`,
      {
        id: 'formError',
      },
    );
  };

  return (
    <Flex direction="column" gap="30px" p="20px" height="100%">
      <HStack mt="20px">
        <Link href={`/profile/${user.id}`}>
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
          src={user.profileImg || personIcon}
          alt={`${user.nickname}님의 프로필 이미지`}
          priority
        />
        <VStack spacing="0px">
          {user.badge && <Badge info={user.badge} />}
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
            defaultValue={user.nickname || ''}
          />
        </FormControl>
        <FormControl p="10px">
          <FormLabel htmlFor="BadgeId" fontSize="s" ml="10px" mb="5px" color="secondary">
            대표 뱃지
          </FormLabel>
          <Select id="BadgeId" m="0px" p="0px" borderRadius="10px" fontSize="xs" {...register('badgeId')}>
            <option value="">미선택</option>
            {badge_list.map((badge, i) => (
              <option key={i} value={badge.id}>
                {badge.name} ({badge.level == 5 ? 'Master' : `${badge.level}레벨`})
              </option>
            ))}
          </Select>
        </FormControl>
        {/* <FormControl p="10px">
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
        </FormControl> */}
        <Button
          type="submit"
          position="absolute"
          left="20px"
          right="20px"
          bottom="80px"
          borderRadius="8px"
          boxSizing="border-box"
          fontSize="s"
        >
          저장하기
        </Button>
      </form>
    </Flex>
  );
}
