import { z } from "zod";

import { AbilityIconSchema } from "./ability";

const AbilityTreeArchetypeSchema = z.object({
  name: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  icon: AbilityIconSchema,
  slot: z.number(),
});

const AbilityDefinitionSchema = z.object({
  name: z.string(),
  icon: AbilityIconSchema,
  slot: z.number(),
  coordinates: z.object({
    x: z.number(),
    y: z.number(),
  }),
  description: z.array(z.string()),
  requirements: z.record(z.string(), z.number()),
  links: z.array(z.string()),
  locks: z.array(z.string()).nullable(),
  page: z.number(),
});

export const GetAbilityTreeResultSchema = z.object({
  archetypes: z.record(z.string(), AbilityTreeArchetypeSchema),
  pages: z.record(z.string(), z.record(z.string(), AbilityDefinitionSchema)),
});

export type GetAbilityTreeResult = z.infer<typeof GetAbilityTreeResultSchema>;
