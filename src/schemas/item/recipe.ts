import { z } from "zod";

import { PaginationControllerSchema } from "../shared/pagination";

const IntegerRangeSchema = z.object({
  minimum: z.number(),
  maximum: z.number(),
});

export const RecipeSchema = z.object({
  internalName: z.string(),
  type: z.string(),
  skill: z.string(),
  level: IntegerRangeSchema,
  durability: IntegerRangeSchema.optional(),
  materials: z.array(
    z.object({
      item: z.string(),
      amount: z.number(),
    }),
  ),
  healthOrDamage: IntegerRangeSchema,
  duration: IntegerRangeSchema.optional(),
  basicDuration: IntegerRangeSchema.optional(),
  sprites: z.record(
    z.string(),
    z.object({
      format: z.string(),
      value: z.object({
        id: z.string(),
        customModelData: z.number(),
        name: z.string(),
      }),
      name: z.string(),
    }),
  ),
  xp: z.number(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export const RecipeListSchema = z.array(RecipeSchema);

export type RecipeList = z.infer<typeof RecipeListSchema>;

export const PaginatedRecipeResponseSchema = z.object({
  controller: PaginationControllerSchema,
  results: RecipeListSchema,
});

export type PaginatedRecipeResponse = z.infer<typeof PaginatedRecipeResponseSchema>;
