import { z } from "zod";

export const ListLeaderboardTypesResultSchema = z.array(z.string());

export type ListLeaderboardTypesResult = z.infer<typeof ListLeaderboardTypesResultSchema>;
