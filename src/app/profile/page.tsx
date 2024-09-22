import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  // 세션이 없으면 로그인 페이지로 리다이렉트
  if (!session?.user?.email) {
    redirect('/login'); // 로그인 페이지로 리다이렉트
  }

  // 유저 정보 가져오기
  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
  });

  // 유저가 있으면 해당 유저의 프로필 페이지로 리다이렉트
  if (user) {
    redirect(`/profile/${user.id}`); // 프로필 페이지로 리다이렉트
  }

  // 유저가 없으면 404 페이지로 리다이렉트
  redirect('/404');
}
