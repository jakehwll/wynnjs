import { z } from "zod";

const TerritoryGuildReferenceSchema = z.object({
  uuid: z.uuid(),
  name: z.string(),
  prefix: z.string(),
  hq: z.string(),
});

const TerritoryResourceSchema = z.object({
  type: z.enum(["EMERALD", "ORE", "WOOD", "FISH", "CROP"]),
  generation: z.number(),
  stored: z.number(),
  limit: z.number(),
});

const TerritoryLocationSchema = z.object({
  start: z.array(z.number()),
  end: z.array(z.number()),
});

const TerritorySchema = z.object({
  guild: TerritoryGuildReferenceSchema,
  acquired: z.string(),
  hq: z.boolean(),
  resources: z.array(TerritoryResourceSchema),
  links: z.array(z.string()),
  treasury: z.enum(["VERY_LOW", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"]),
  defences: z.enum(["VERY_LOW", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"]),
  location: TerritoryLocationSchema,
});

export const ListGuildTerritoriesResultSchema = z.record(z.string(), TerritorySchema);

export type ListGuildTerritoriesResult = z.infer<typeof ListGuildTerritoriesResultSchema>;
