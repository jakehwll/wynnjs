import { z } from "zod";

const ClassSummarySchema = z.object({
  name: z.string(),
  overallDifficulty: z.number(),
});

export const ListClassesResultSchema = z.record(z.string(), ClassSummarySchema);

export type ListClassesResult = z.infer<typeof ListClassesResultSchema>;
