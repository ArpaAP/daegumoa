import { Avatar, Flex, Text, VStack } from '@chakra-ui/react';

function refineName(str: string) {
  const trimmedStr = str.substring(0, 6);
  const maskedStr = trimmedStr.substring(0, 3) + '*'.repeat(trimmedStr.length - 2);

  return maskedStr;
}

type RefinedUserInfo = {
  nickname: string;
  badges: number;
  profileImage: string;
};

interface RankingCardProps {
  name: string;
  data: RefinedUserInfo[];
}

export default function RankingCard({ name, data }: RankingCardProps) {
  // const data = [
  //   { nickname: 'W.Developer7773', badges: 6, profileImage: 'https://github.com/whitedev7773.png' },
  //   { nickname: 'ArpaAP', badges: 5, profileImage: 'https://github.com/ArpaAP.png' },
  //   { nickname: 'Jamie2779', badges: 3, profileImage: 'https://github.com/jamie2779.png' },
  // ];

  return (
    <VStack align="start" spacing="10px" w="100%">
      <Text ml="10px" fontSize="m" fontWeight="medium">
        {name}
      </Text>
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="end"
        gap="30px"
        align="end"
        boxShadow="card"
        p="30px"
        bgColor="white"
        borderRadius="card"
      >
        {/* 2등 */}
        <VStack spacing="10px">
          <Text
            fontSize="s"
            fontWeight="medium"
            padding="4px 7px 3px 7px"
            color="white"
            bgColor="#bbbbbb"
            borderRadius="6px"
          >
            2등
          </Text>
          <Avatar boxSize="60px" src={data[1].profileImage} />
          <VStack spacing="0">
            <Text fontSize="s" fontWeight="bold">
              {refineName(data[1].nickname)}님
            </Text>
            <Text fontSize="xs" fontWeight="medium" color="grey">
              뱃지 {data[1].badges}개
            </Text>
          </VStack>
        </VStack>
        {/* 1등 */}
        <VStack spacing="10px">
          <Text
            fontSize="s"
            fontWeight="medium"
            padding="4px 7px 3px 7px"
            color="white"
            bgColor="#ECC80E"
            borderRadius="6px"
          >
            1등
          </Text>
          <Avatar boxSize="72px" src={data[0].profileImage} />
          <VStack spacing="0">
            <Text fontSize="m" fontWeight="bold">
              {refineName(data[0].nickname)}님
            </Text>
            <Text fontSize="xs" fontWeight="medium" color="grey">
              뱃지 {data[0].badges}개
            </Text>
          </VStack>
        </VStack>
        {/* 3등 */}
        <VStack spacing="10px">
          <Text
            fontSize="s"
            fontWeight="medium"
            padding="4px 7px 3px 7px"
            color="white"
            bgColor="#746202"
            borderRadius="6px"
          >
            3등
          </Text>
          <Avatar boxSize="48px" src={data[2].profileImage} />
          <VStack spacing="0">
            <Text fontSize="xs" fontWeight="bold">
              {refineName(data[2].nickname)}님
            </Text>
            <Text fontSize="xs" fontWeight="medium" color="grey">
              뱃지 {data[2].badges}개
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </VStack>
  );
}
