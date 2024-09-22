import ProfileContent from './page.client';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Profile({ params }: { params: { id: string } }) {
  const userId = parseInt(params.id); // 문자열을 정수로 변환

  // ID가 유효한 숫자인지 확인
  if (isNaN(userId)) {
    redirect('/404');
  }

  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      badge: true,
      badgeHolders: {
        include: {
          badge: true,
        },
      },
      eventHolders: {
        include: {
          event: true,
        },
      },
      missionHolders: true,
    },
  });

  if (session?.user?.email) {
    const viewer = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    return <ProfileContent user={user} viewerId={viewer?.id ?? null} />;
  } else {
    return <></>;
  }
}
