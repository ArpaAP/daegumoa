import AdminPageContent from './page.client';
import prisma from '@/lib/prisma';

export default async function MissionPage() {
  const missionHolders = await prisma.missionHolder.findMany({
    include: {
      mission: true,
      image: true,
    },
  });

  return <AdminPageContent missionHolders={missionHolders} />;
}
