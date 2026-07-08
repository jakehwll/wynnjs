import { z } from "zod";

import { ItemListSchema } from "./item";

export const QuickSearchItemsResultSchema = ItemListSchema;

export type QuickSearchItemsResult = z.infer<typeof QuickSearchItemsResultSchema>;
