import { z } from "zod";

import { ClassTreeSchema } from "../shared/class-tree";

export const ClassNameSchema = ClassTreeSchema;

export type ClassName = z.infer<typeof ClassNameSchema>;

const ClassArchetypeSchema = z.object({
  name: z.string(),
  difficulty: z.number(),
  max: z.number(),
  icon: z.string(),
  damage: z.number(),
  defence: z.number(),
  range: z.number(),
  speed: z.number(),
});

export const GetClassResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  lore: z.string(),
  overallDifficulty: z.number(),
  overallMax: z.number(),
  archetypes: z.record(z.string(), ClassArchetypeSchema),
});

export type GetClassResult = z.infer<typeof GetClassResultSchema>;
