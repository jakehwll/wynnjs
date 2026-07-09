import { z } from "zod";

import { PaginatedItemResponseSchema } from "./item";
import { PaginatedItemQueryOptionsSchema } from "../shared/pagination";

export const ListItemsOptionsSchema = PaginatedItemQueryOptionsSchema;

export type ListItemsOptions = z.infer<typeof ListItemsOptionsSchema>;

export const ListItemsResultSchema = PaginatedItemResponseSchema;

export type ListItemsResult = z.infer<typeof ListItemsResultSchema>;
