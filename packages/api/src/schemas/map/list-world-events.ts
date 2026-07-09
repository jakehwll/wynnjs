import { z } from "zod";

import { WorldEventSchema } from "./map";

export const ListWorldEventsResultSchema = z.array(WorldEventSchema);

export type ListWorldEventsResult = z.infer<typeof ListWorldEventsResultSchema>;
