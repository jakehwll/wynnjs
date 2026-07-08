import { z } from "zod";

export const ListOnlinePlayersOptionsSchema = z.object({
  identifier: z.union([z.string(), z.uuid()]).optional(),
  server: z.union([z.string(), z.number()]).optional(),
});

export type ListOnlinePlayersOptions = z.infer<typeof ListOnlinePlayersOptionsSchema>;

export const ListOnlinePlayersResultSchema = z.object({
  total: z.number(),
  players: z.record(z.string(), z.string()),
});

export type ListOnlinePlayersResult = z.infer<typeof ListOnlinePlayersResultSchema>;
