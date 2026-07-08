import { z } from "zod";

import { PaginationControllerSchema } from "../shared/pagination";
import { PublisherArticleSummarySchema } from "./article";

export const ListPublisherArticlesOptionsSchema = z.object({
  page: z.number().optional(),
});

export type ListPublisherArticlesOptions = z.infer<typeof ListPublisherArticlesOptionsSchema>;

export const ListPublisherArticlesResultSchema = z.object({
  controller: PaginationControllerSchema,
  results: z.record(z.string(), PublisherArticleSummarySchema),
});

export type ListPublisherArticlesResult = z.infer<typeof ListPublisherArticlesResultSchema>;
