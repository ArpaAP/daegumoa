import { z } from 'zod';

// badgeId가 숫자 또는 null일 수 있도록 스키마 수정
export const userPostSchema = z.object({
  missionHolderId: z.number(),
  status: z.string(),
});
