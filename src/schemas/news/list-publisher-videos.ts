import { z } from "zod";

export const ListPublisherVideosResultSchema = z.record(z.string(), z.string());

export type ListPublisherVideosResult = z.infer<typeof ListPublisherVideosResultSchema>;
