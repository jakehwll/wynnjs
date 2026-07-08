import { z } from "zod";

import { PaginatedRecipeQueryOptionsSchema } from "../shared/pagination";
import { PaginatedRecipeResponseSchema } from "./recipe";

const ScalarOrListSchema = z.union([z.string(), z.array(z.string())]);

export const RecipeSearchRequestSchema = z.object({
  query: ScalarOrListSchema.optional(),
  xp: z.union([z.number(), z.array(z.number())]).optional(),
  type: ScalarOrListSchema.optional(),
  skill: ScalarOrListSchema.optional(),
  materials: ScalarOrListSchema.optional(),
  level: z.union([z.number(), z.array(z.number())]).optional(),
  durability: z.union([z.number(), z.array(z.number())]).optional(),
  healthOrDamage: z.union([z.number(), z.array(z.number())]).optional(),
  duration: z.union([z.number(), z.array(z.number())]).optional(),
  basicDuration: z.union([z.number(), z.array(z.number())]).optional(),
});

export type RecipeSearchRequest = z.infer<typeof RecipeSearchRequestSchema>;

export const SearchRecipesOptionsSchema = PaginatedRecipeQueryOptionsSchema;

export type SearchRecipesOptions = z.infer<typeof SearchRecipesOptionsSchema>;

export const SearchRecipesResultSchema = PaginatedRecipeResponseSchema;

export type SearchRecipesResult = z.infer<typeof SearchRecipesResultSchema>;
