import ProfileContent from './page.client';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';

type NewUser = User & { profileImg: string };

export default async function Profile() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
  });

  if (!user) {
    return redirect('/login');
  }

  return <ProfileContent user={{ ...user, profileImg: session!.user!.image ?? `` } as NewUser} />;
}
