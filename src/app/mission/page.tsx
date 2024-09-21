import MissionPageContent from './page.client';
import prisma from '@/lib/prisma';

export default async function MissionPage() {
  const missions = await prisma.mission.findMany({
    include: {
      event: true,
      missionHolders: true,
    },
  });

  return <MissionPageContent missions={missions} />;
}
