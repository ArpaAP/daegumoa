import { Mission } from '@prisma/client';

export const missionTestData: Mission = {
  id: 1,
  title: '치맥 페스티벌 인증샷 이벤트',
  startTime: new Date('2024-09-20T16:34:40Z'),
  endTime: new Date('2024-09-30T17:52:40Z'),
  tag: 'FESTIVAL',
  difficulty: 'EASY',
  missionImg: 'https://cdn.idaegu.com/news/photo/202406/607766_275915_352.png',
  eventId: 1,
  info: '1. 치맥페스티벌 참가\n2. 다양한 체험 콘텐츠 즐기기\n3. 부스 방문 인증샷 업로드하기',
  createdDate: new Date(),
  modifiedDate: new Date(),
};
