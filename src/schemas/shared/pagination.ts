import { z } from "zod";

export const PaginationControllerSchema = z.object({
  count: z.number(),
  current_count: z.number(),
  pages: z.number(),
  prev: z.number().nullable(),
  current: z.number(),
  next: z.number().nullable(),
});

export type PaginationController = z.infer<typeof PaginationControllerSchema>;

export const PaginatedQueryOptionsSchema = z.object({
  page: z.number().optional(),
  fullResult: z.boolean().optional(),
});

export type PaginatedQueryOptions = z.infer<typeof PaginatedQueryOptionsSchema>;

export const PaginatedItemQueryOptionsSchema = PaginatedQueryOptionsSchema;
export type PaginatedItemQueryOptions = PaginatedQueryOptions;

export const PaginatedRecipeQueryOptionsSchema = PaginatedQueryOptionsSchema;
export type PaginatedRecipeQueryOptions = PaginatedQueryOptions;
