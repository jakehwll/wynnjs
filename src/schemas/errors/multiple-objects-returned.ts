import { z } from "zod";

export const MultipleObjectsEntrySchema = z
  .object({
    username: z.string().optional(),
    name: z.string().optional(),
    prefix: z.string().optional(),
    uuid: z.uuid().optional(),
    rank: z.string().optional(),
    supportRank: z.string().nullable().optional(),
    shortenedRank: z.string().nullable().optional(),
    legacyRankColour: z
      .object({
        main: z.string(),
        sub: z.string(),
      })
      .optional(),
    rankBadge: z.string().optional(),
  })
  .passthrough();

export type MultipleObjectsEntry = z.infer<typeof MultipleObjectsEntrySchema>;

export const MultipleObjectsMapSchema = z.record(z.string(), MultipleObjectsEntrySchema);

export type MultipleObjectsMap = z.infer<typeof MultipleObjectsMapSchema>;

export const MultipleObjectsReturnedBodySchema = z.object({
  error: z.literal("MultipleObjectsReturned"),
  detail: z.string(),
  code: z.literal(300),
  identifier: z.string().optional(),
  objects: MultipleObjectsMapSchema,
});

export type MultipleObjectsReturnedBody = z.infer<typeof MultipleObjectsReturnedBodySchema>;
