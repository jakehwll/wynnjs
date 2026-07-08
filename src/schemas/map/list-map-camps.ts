import { z } from "zod";

import { MapLootPoolContentSchema, MapLootPoolQueryOptionsSchema } from "./map";

export const ListMapCampsOptionsSchema = MapLootPoolQueryOptionsSchema;

export type ListMapCampsOptions = z.infer<typeof ListMapCampsOptionsSchema>;

export const ListMapCampsResultSchema = z.array(MapLootPoolContentSchema);

export type ListMapCampsResult = z.infer<typeof ListMapCampsResultSchema>;
