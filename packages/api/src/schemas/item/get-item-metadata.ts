import { z } from "zod";

export const GetItemMetadataOptionsSchema = z.object({
  static: z.boolean().optional(),
});

export type GetItemMetadataOptions = z.infer<typeof GetItemMetadataOptionsSchema>;

const ItemStaticValueMapSchema = z.record(z.string(), z.number());

export const ItemMetadataSchema = z.object({
  filters: z.object({
    type: z.array(z.string()),
    advanced: z.record(z.string(), z.array(z.string())),
    tier: z.record(z.string(), z.array(z.string())),
    identifications: z.array(z.string()),
    majorIds: z.array(z.string()),
    levelRange: z.array(z.number()),
  }),
  static: ItemStaticValueMapSchema,
});

export type ItemMetadata = z.infer<typeof ItemMetadataSchema>;

export const ItemStaticMetadataSchema = z.object({
  attackSpeed: ItemStaticValueMapSchema,
  emblem: ItemStaticValueMapSchema,
  gathering: ItemStaticValueMapSchema,
  identifications: ItemStaticValueMapSchema,
  majorIds: ItemStaticValueMapSchema,
  set: ItemStaticValueMapSchema,
  subType: ItemStaticValueMapSchema,
  tier: ItemStaticValueMapSchema,
  type: ItemStaticValueMapSchema,
});

export type ItemStaticMetadata = z.infer<typeof ItemStaticMetadataSchema>;

export type GetItemMetadataResult = ItemMetadata | ItemStaticMetadata;
