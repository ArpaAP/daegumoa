import { z } from 'zod';

export const eventHolderPostSchema = z.object({
  eventId: z.number(),
});
