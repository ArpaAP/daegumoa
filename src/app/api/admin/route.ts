import { userPostSchema } from './schema';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { MissionStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // 사용자 세션 가져오기
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

  // 데이터 구조에서 missionHolderId와 status 가져오기
  const { data } = parse;

  // holder 정보 업데이트
  const missionholder = await prisma.missionHolder.update({
    where: {
      id: data.missionHolderId,
    },
    data: {
      status: data.status as MissionStatus,
    },
  });

  // 업데이트된 유저 정보 반환
  return NextResponse.json(missionholder);
}
