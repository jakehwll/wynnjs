import { z } from "zod";

import { PaginatedRecipeQueryOptionsSchema } from "../shared/pagination";
import { PaginatedRecipeResponseSchema } from "./recipe";

export const ListRecipesOptionsSchema = PaginatedRecipeQueryOptionsSchema;

export type ListRecipesOptions = z.infer<typeof ListRecipesOptionsSchema>;

export const ListRecipesResultSchema = PaginatedRecipeResponseSchema;

export type ListRecipesResult = z.infer<typeof ListRecipesResultSchema>;
