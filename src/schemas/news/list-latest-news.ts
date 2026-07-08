import { z } from "zod";

const LatestNewsEntrySchema = z.object({
  title: z.string(),
  date: z.string(),
  forumThread: z.string(),
  author: z.string(),
  content: z.string(),
  comments: z.string(),
});

export const ListLatestNewsResultSchema = z.array(LatestNewsEntrySchema);

export type ListLatestNewsResult = z.infer<typeof ListLatestNewsResultSchema>;
