import { Mission } from '@prisma/client';

export const missionTestData: Mission = {
  id: 1,
  title: '치맥페스티벌 인증샷 찍기',
  startTime: new Date('2024-09-20T16:34:40Z'),
  endTime: new Date('2024-09-30T17:52:40Z'),
  tag: 'FESTIVAL',
  difficulty: 'EASY',
  missionImg: 'https://cdn.idaegu.com/news/photo/202406/607766_275915_352.png',
  eventId: 1,
  info: '치맥페스티벌의 여러 부스를 즐기는 사진을 찍어주세요!',
  createdDate: new Date(),
  modifiedDate: new Date(),
};
