import { z } from "zod";

import { PaginationControllerSchema } from "../shared/pagination";

const IdentificationRangeSchema = z.object({
  min: z.number(),
  raw: z.number(),
  max: z.number(),
});

export const IdentificationValueSchema = z.union([z.number(), IdentificationRangeSchema]);

export type IdentificationValue = z.infer<typeof IdentificationValueSchema>;

export const ItemSchema = z.object({
  displayName: z.string(),
  internalName: z.string(),
  type: z.string(),
  subType: z.string(),
  icon: z.object({
    value: z.object({
      id: z.string(),
      name: z.string(),
      customModelData: z.object({
        rangeDispatch: z.array(z.number()),
      }),
    }),
    format: z.string(),
  }),
  emblem: z.string(),
  tier: z.string(),
  attackSpeed: z.string().optional(),
  averageDps: z.number().optional(),
  restriction: z.string().optional(),
  dropRestriction: z.string().optional(),
  gathering: z.string().optional(),
  set: z.string().optional(),
  elements: z.array(z.string()).optional(),
  requirements: z
    .object({
      level: z.number().optional(),
      classRequirement: z.string().optional(),
      strength: z.number().optional(),
      dexterity: z.number().optional(),
      intelligence: z.number().optional(),
      defence: z.number().optional(),
      agility: z.number().optional(),
    })
    .optional(),
  majorIds: z.record(z.string(), z.string()).optional(),
  powderSlots: z.number().optional(),
  lore: z.string().optional(),
  identifications: z.record(z.string(), IdentificationValueSchema).optional(),
  base: z.record(z.string(), IdentificationValueSchema).optional(),
});

export type Item = z.infer<typeof ItemSchema>;

export const ItemListSchema = z.array(ItemSchema);

export type ItemList = z.infer<typeof ItemListSchema>;

export const PaginatedItemResponseSchema = z.object({
  controller: PaginationControllerSchema,
  results: ItemListSchema,
});

export type PaginatedItemResponse = z.infer<typeof PaginatedItemResponseSchema>;
