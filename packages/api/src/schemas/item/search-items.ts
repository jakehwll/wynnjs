import { z } from "zod";

import { PaginatedItemResponseSchema } from "./item";
import { PaginatedItemQueryOptionsSchema } from "../shared/pagination";

const ScalarOrListSchema = z.union([z.string(), z.array(z.string())]);

export const ItemSearchRequestSchema = z.object({
  query: z.string().nullable().optional(),
  type: ScalarOrListSchema.optional(),
  tier: ScalarOrListSchema.optional(),
  attackSpeed: ScalarOrListSchema.optional(),
  levelRange: z.union([z.number(), z.array(z.number())]).optional(),
  professions: ScalarOrListSchema.optional(),
  identifications: ScalarOrListSchema.optional(),
  majorIds: ScalarOrListSchema.optional(),
});

export type ItemSearchRequest = z.infer<typeof ItemSearchRequestSchema>;

export const SearchItemsOptionsSchema = PaginatedItemQueryOptionsSchema;

export type SearchItemsOptions = z.infer<typeof SearchItemsOptionsSchema>;

export const SearchItemsResultSchema = PaginatedItemResponseSchema;

export type SearchItemsResult = z.infer<typeof SearchItemsResultSchema>;
