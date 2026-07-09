import { z } from "zod";

import { AbilityIconSchema } from "./ability";

const AspectTierSchema = z.object({
  threshold: z.number(),
  description: z.array(z.string()),
});

const AspectSchema = z.object({
  name: z.string(),
  internalName: z.string(),
  icon: AbilityIconSchema,
  rarity: z.string(),
  requiredClass: z.string(),
  tiers: z.record(z.string(), AspectTierSchema),
});

export const ListAspectsResultSchema = z.array(AspectSchema);

export type ListAspectsResult = z.infer<typeof ListAspectsResultSchema>;
