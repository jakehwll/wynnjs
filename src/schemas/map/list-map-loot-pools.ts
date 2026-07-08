import { z } from "zod";

import { LootPoolSchema, MapLootPoolQueryOptionsSchema } from "./map";

export const ListMapLootPoolsOptionsSchema = MapLootPoolQueryOptionsSchema;

export type ListMapLootPoolsOptions = z.infer<typeof ListMapLootPoolsOptionsSchema>;

export const ListMapLootPoolsResultSchema = z.array(LootPoolSchema);

export type ListMapLootPoolsResult = z.infer<typeof ListMapLootPoolsResultSchema>;
