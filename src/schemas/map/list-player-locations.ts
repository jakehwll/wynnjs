import { z } from "zod";

import { PlayerLocationSchema } from "./map";

export const ListPlayerLocationsResultSchema = z.array(PlayerLocationSchema);

export type ListPlayerLocationsResult = z.infer<typeof ListPlayerLocationsResultSchema>;
