import MissionDetailPageContent from './page.client';
import prisma from '@/lib/prisma';

// 서버사이드에서 미션 데이터를 가져오기 위한 함수
export default async function MissionDetailPage({ params }: { params: { id: string } }) {
  // 미션 ID를 파라미터로 받아옴
  const missionId = params.id;

  // 데이터베이스에서 해당 미션을 가져옴
  const mission = await prisma.mission.findUnique({
    where: { id: parseInt(missionId) }, // 미션 ID가 숫자이므로 변환
    include: {
      event: true, // 연관된 event 정보도 가져옴
      missionHolders: true, // 미션 홀더 정보도 포함
    },
  });

  if (!mission) {
    return <></>;
  }

  return <MissionDetailPageContent mission={mission} />;
}
