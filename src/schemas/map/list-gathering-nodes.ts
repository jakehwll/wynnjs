import { z } from "zod";

import { GatheringNodeSchema } from "./map";

export const ListGatheringNodesResultSchema = z.array(GatheringNodeSchema);

export type ListGatheringNodesResult = z.infer<typeof ListGatheringNodesResultSchema>;
