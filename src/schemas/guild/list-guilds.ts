import { z } from "zod";

export const ListGuildsOptionsSchema = z.object({
  identifier: z.enum(["username", "uuid"]).optional(),
});

export type ListGuildsOptions = z.infer<typeof ListGuildsOptionsSchema>;

const GuildListEntryByNameSchema = z.object({
  uuid: z.uuid(),
  prefix: z.string(),
});

const GuildListEntryByUuidSchema = z.object({
  name: z.string(),
  prefix: z.string(),
});

export const ListGuildsByNameResultSchema = z.record(z.string(), GuildListEntryByNameSchema);

export const ListGuildsByUuidResultSchema = z.record(z.uuid(), GuildListEntryByUuidSchema);

export type ListGuildsByNameResult = z.infer<typeof ListGuildsByNameResultSchema>;

export type ListGuildsByUuidResult = z.infer<typeof ListGuildsByUuidResultSchema>;

export type ListGuildsResult = ListGuildsByNameResult | ListGuildsByUuidResult;
