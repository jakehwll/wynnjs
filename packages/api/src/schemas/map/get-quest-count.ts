import { z } from "zod";

export const GetQuestCountResultSchema = z.object({
  quests: z.number(),
});

export type GetQuestCountResult = z.infer<typeof GetQuestCountResultSchema>;
