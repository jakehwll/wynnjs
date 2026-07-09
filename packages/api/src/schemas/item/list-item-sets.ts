import { z } from "zod";

const ItemSetBonusSchema = z.object({
  major: z.array(z.string()),
  minor: z.record(z.string(), z.union([z.number(), z.string()])),
});

const ItemSetSchema = z.object({
  internalName: z.string(),
  bonuses: z.record(z.string(), ItemSetBonusSchema),
  parts: z.array(z.string()),
});

export const ListItemSetsResultSchema = z.record(z.string(), ItemSetSchema);

export type ListItemSetsResult = z.infer<typeof ListItemSetsResultSchema>;
