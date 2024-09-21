import ProfileContent from './page.client';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

type NewUser = User & { profileImg: string };

export default async function Profile() {
  const session = await auth();

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    return <ProfileContent user={{ ...user, profileImg: session.user.image ?? `` } as NewUser} />;
  } else {
    return <ProfileContent />;
  }
}
