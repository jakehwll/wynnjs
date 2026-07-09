import { z } from "zod";

const AbilityIconValueCustomModelDataSchema = z.object({
  rangeDispatch: z.array(z.number()),
});

const AbilityIconValueSchema = z.object({
  id: z.string(),
  name: z.string(),
  customModelData: AbilityIconValueCustomModelDataSchema,
});

export const AbilityIconSchema = z.object({
  name: z.string().optional(),
  value: AbilityIconValueSchema,
  format: z.string(),
});

export type AbilityIcon = z.infer<typeof AbilityIconSchema>;

const AbilityMapNodeCoordinatesSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const AbilityMapNodeMetaIconSchema = z.union([AbilityIconSchema, z.string()]);

const AbilityMapNodeMetaSchema = z.object({
  icon: AbilityMapNodeMetaIconSchema.optional(),
  page: z.number(),
  id: z.string().optional(),
});

export const AbilityMapNodeSchema = z.object({
  type: z.enum(["ability", "connector"]),
  coordinates: AbilityMapNodeCoordinatesSchema,
  meta: AbilityMapNodeMetaSchema,
  family: z.array(z.string()),
});

export type AbilityMapNode = z.infer<typeof AbilityMapNodeSchema>;

export const AbilityMapPagesSchema = z.record(z.string(), z.array(AbilityMapNodeSchema));

export type AbilityMapPages = z.infer<typeof AbilityMapPagesSchema>;
