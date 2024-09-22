import ProfileEditContent from './profile.client';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const session = await auth();

  // 세션이 없으면 로그인 페이지로 리다이렉트
  if (!session?.user?.email) {
    redirect('/login'); // 로그인 페이지로 리다이렉트
  }

  // 유저 정보 가져오기
  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    include: {
      badge: true,
    },
  });

  // 유저가 있으면 해당 유저의 프로필 페이지로 리다이렉트
  if (!user) {
    redirect('/404');
  }

  const badges = await prisma.badgeHolder.findMany({
    where: { userId: user.id },
    select: {
      badge: true,
    },
  });

  const badge_list = badges.map((badgeHolder) => badgeHolder.badge);

  return <ProfileEditContent user={user} profileImg={session.user.image ?? null} badge_list={badge_list} />;
}
