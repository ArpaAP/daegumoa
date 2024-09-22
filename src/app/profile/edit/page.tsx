import ProfileEditContent from './profile.client';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
  });

  if (!user) {
    return redirect('/login');
  }

  return <ProfileEditContent user={{ ...user, profileImg: session!.user!.image ?? `` }} />;
}
