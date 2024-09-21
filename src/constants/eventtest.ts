import { Event } from '@prisma/client';

export const eventTestData: Event = {
  id: 1,
  addr1: '대구광역시 달서구 공원순환로 36',
  addr2: '두류공원 일원',
  cat: 'Music',
  startDate: new Date('2024-07-03'),
  endDate: new Date('2024-07-07'),
  lat: 35.8508964729,
  lng: 128.5587997668,
  tel: '053-248-9998',
  title: '대구치맥페스티벌',
  tag: 'FESTIVAL',
  message: '치맥 좋아하는 사람 모여라!',
  info: '매년 여름, 대구에서 치킨과 맥주의 조합을 테마로 한 대구치맥페스티벌이 열린다. 치맥페스티벌이라는 말 그대로 축제 기간 동안 치킨과 시원한 맥주를 즐기며 가수들의 공연을 관람할 수 있다. 유명 치킨프렌차이즈들이 참여하기 때문에 다양한 치킨을 한자리에서 골고루 맛볼 수 있다. 시원한 얼음물에 발을 담그고 치맥을 즐길 수 있는 공간도 마련되어 있다. 유명 가수들의 축하공연과 DJ들의 EDM파티가 열리며, 밤 9시 9분에는 모두 함께 건배를 외치는 치맥 99 건배 타임 이벤트도 진행된다.\n행사내용:1. 관람행사\n- 치맥K-POP 콘서트, 치맥EDM Party, 치맥포크 콘서트, 치맥버스킹, 초청공연\n\n2. 참여행사\n- 치맥99타임, 하와이안 아이스 펍, 치맥 시민 참여 이벤트, 치킨 신메뉴 경연대회, 수제맥주 창작 칵테일 경연대회\n\n3. 체험행사\n-사전예약 식음존, 비즈니스 라운지, 치맥 포토존, 하와이안 아이스 펍, 치맥 플레이 존\n',
  mainImg: 'http://tong.visitkorea.or.kr/cms/resource/57/3301757_image2_1.jpg',
  thumbnailImg: 'http://tong.visitkorea.or.kr/cms/resource/57/3301757_image3_1.jpg',
  createdDate: new Date(),
  modifiedDate: new Date(),
};
