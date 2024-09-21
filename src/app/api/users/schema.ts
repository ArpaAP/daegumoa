import { z } from 'zod';

export const userPostSchema = z.object({
  name: z.string(),
  nickname: z.string(),
});
