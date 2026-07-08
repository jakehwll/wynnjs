import { z } from "zod";

import { PublisherArticleSchema } from "./article";

export const FetchPublisherArticleResultSchema = PublisherArticleSchema;

export type FetchPublisherArticleResult = z.infer<typeof FetchPublisherArticleResultSchema>;
