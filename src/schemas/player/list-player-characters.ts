import { z } from "zod";

const LightCharacterMetaSchema = z.object({
  died: z.boolean(),
});

const LightCharacterSchema = z.object({
  type: z.string(),
  reskin: z.string().nullable(),
  nickname: z.string().nullable(),
  level: z.number(),
  xp: z.number(),
  xpPercent: z.number(),
  totalLevel: z.number(),
  gamemode: z.array(z.string()),
  meta: LightCharacterMetaSchema,
});

export const ListPlayerCharactersResultSchema = z.record(z.uuid(), LightCharacterSchema);

export type ListPlayerCharactersResult = z.infer<typeof ListPlayerCharactersResultSchema>;
