import { z } from "zod";

import { MapMarkerSchema } from "./map";

export const ListMapMarkersResultSchema = z.array(MapMarkerSchema);

export type ListMapMarkersResult = z.infer<typeof ListMapMarkersResultSchema>;
