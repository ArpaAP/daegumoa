import { userPostSchema } from './schema';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // 사용자 세션 가져오기
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 현재 로그인한 유저 정보를 DB에서 찾기
  let user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // 요청으로 들어온 데이터 파싱
  const body = await request.json();
  const parse = userPostSchema.safeParse(body);

  console.log(body);
  // 데이터가 유효하지 않은 경우
  if (!parse.success) {
    //console.error('Validation error:', parse.error); // 구체적인 에러 메시지 출력
    return NextResponse.json({ error: parse.error }, { status: 400 });
  }

  // 데이터 구조에서 badgeId와 nickname 가져오기
  const { data } = parse;

  // 유저 정보 업데이트 (badgeId와 nickname 변경)
  user = await prisma.user.update({
    where: {
      email: session.user.email!,
    },
    data: {
      badgeId: data.badgeId == '' ? null : parseInt(data.badgeId),
      nickname: data.nickname,
    },
  });

  // 업데이트된 유저 정보 반환
  return NextResponse.json(user);
}
