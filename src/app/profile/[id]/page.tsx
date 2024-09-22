import ProfileContent from './page.client';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export default async function Profile({ params }: { params: { id: string } }) {
  const userId = params.id;
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
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
