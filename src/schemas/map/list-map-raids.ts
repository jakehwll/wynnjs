import { z } from "zod";

import { MapLootPoolContentSchema, MapLootPoolQueryOptionsSchema } from "./map";

export const ListMapRaidsOptionsSchema = MapLootPoolQueryOptionsSchema;

export type ListMapRaidsOptions = z.infer<typeof ListMapRaidsOptionsSchema>;

export const ListMapRaidsResultSchema = z.array(MapLootPoolContentSchema);

export type ListMapRaidsResult = z.infer<typeof ListMapRaidsResultSchema>;
