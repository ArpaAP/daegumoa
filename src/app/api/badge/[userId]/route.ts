import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { Badge } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// 특정 유저에게 특정 뱃지를 확인하고 없으면 부여하는 함수
async function checkAndGrantBadge(userId: number, badgeId: number) {
  // 해당 유저에게 이미 부여된 뱃지가 있는지 확인
  const existingBadge = await prisma.badgeHolder.findFirst({
    where: {
      userId: userId,
      badgeId: badgeId,
    },
  });

  // 이미 뱃지가 있으면 아무 작업도 하지 않음
  if (existingBadge) {
    return null;
  }

  // 뱃지가 없으면 새로운 뱃지 부여
  const badge = await prisma.badge.findFirst({
    where: { id: badgeId },
  });

  if (!badge) {
    return null;
  }

  await prisma.badgeHolder.create({
    data: {
      userId: userId,
      badgeId: badge.id,
    },
  });

  return badge;
}

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(params.userId, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  // 유저가 존재하는지 확인
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // 유저의 EventHolder 목록 불러오기
  const eventHolders = await prisma.eventHolder.findMany({
    where: { userId },
    include: {
      event: true,
    },
  });

  const missionHolders = await prisma.missionHolder.findMany({
    where: { userId },
    include: {
      mission: true,
    },
  });

  const badgesGranted: Badge[] = [];
  let badge = null;
  // 1~5번 뱃지를 부여하는 함수 호출
  switch (eventHolders.filter((eventholder) => eventholder.event.tag === 'MARKET').length) {
    case 15:
      badge = await checkAndGrantBadge(userId, 5);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 10:
      badge = await checkAndGrantBadge(userId, 4);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 5:
      badge = await checkAndGrantBadge(userId, 3);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 3:
      badge = await checkAndGrantBadge(userId, 2);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 1:
      badge = await checkAndGrantBadge(userId, 1);
      if (badge) {
        badgesGranted.push(badge);
      }
  }

  // 6~10번 뱃지를 부여하는 함수 호출
  switch (eventHolders.filter((eventholder) => eventholder.event.tag === 'FESTIVAL').length) {
    case 15:
      badge = await checkAndGrantBadge(userId, 10);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 10:
      badge = await checkAndGrantBadge(userId, 9);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 5:
      badge = await checkAndGrantBadge(userId, 8);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 3:
      badge = await checkAndGrantBadge(userId, 7);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 1:
      badge = await checkAndGrantBadge(userId, 6);
      if (badge) {
        badgesGranted.push(badge);
      }
  }

  //11번 뱃지를 부여하는 함수 호출
  if (eventHolders.some((eventholder) => eventholder.event.id === 220)) {
    badge = await checkAndGrantBadge(userId, 11);
    if (badge) {
      badgesGranted.push(badge);
    }
  }

  //12번 뱃지를 부여하는 함수 호출
  if (eventHolders.some((eventholder) => eventholder.event.id === 199)) {
    badge = await checkAndGrantBadge(userId, 12);
    if (badge) {
      badgesGranted.push(badge);
    }
  }

  //13번 뱃지를 부여하는 함수 호출
  if (eventHolders.some((eventholder) => eventholder.event.id === 112)) {
    badge = await checkAndGrantBadge(userId, 13);
    if (badge) {
      badgesGranted.push(badge);
    }
  }

  //15번 뱃지를 부여하는 함수 호출
  if (missionHolders.some((missionholder) => missionholder.missionId === 1)) {
    badge = await checkAndGrantBadge(userId, 15);
    if (badge) {
      badgesGranted.push(badge);
    }
  }
  //16번 뱃지를 부여하는 함수 호출
  if (missionHolders.some((missionholder) => missionholder.missionId === 2)) {
    badge = await checkAndGrantBadge(userId, 16);
    if (badge) {
      badgesGranted.push(badge);
    }
  }
  //17~20번 뱃지를 부여하는 함수 호출
  const eventCounts = eventHolders.reduce(
    (acc, eventHolder) => {
      acc[eventHolder.event.id] = (acc[eventHolder.event.id] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  const maxEventCount = Math.max(...Object.values(eventCounts));

  switch (maxEventCount) {
    case 5:
      badge = await checkAndGrantBadge(userId, 20);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 4:
      badge = await checkAndGrantBadge(userId, 19);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 3:
      badge = await checkAndGrantBadge(userId, 18);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 2:
      badge = await checkAndGrantBadge(userId, 17);
      if (badge) {
        badgesGranted.push(badge);
      }
  }

  //21~25번 뱃지를 부여하는 함수 호출
  switch (missionHolders.length) {
    case 15:
      badge = await checkAndGrantBadge(userId, 25);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 10:
      badge = await checkAndGrantBadge(userId, 24);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 5:
      badge = await checkAndGrantBadge(userId, 23);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 3:
      badge = await checkAndGrantBadge(userId, 22);
      if (badge) {
        badgesGranted.push(badge);
      }
    case 1:
      badge = await checkAndGrantBadge(userId, 21);
      if (badge) {
        badgesGranted.push(badge);
      }
  }

  return NextResponse.json({ badgesGranted });
}
