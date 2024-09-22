import ProfileContent from './page.client';
import prisma from '@/lib/prisma';

export default async function Profile({ params }: { params: { id: string } }) {
  const userId = params.id;
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
  return <ProfileContent user={user} />;
}
