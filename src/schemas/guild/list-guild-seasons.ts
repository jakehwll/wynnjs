import { z } from "zod";

const GuildSeasonRewardConditionSchema = z.object({
  type: z.enum(["SR", "LEADERBOARD_POSITION"]),
  value: z.number(),
});

const GuildSeasonRewardSchema = z.object({
  condition: GuildSeasonRewardConditionSchema,
  type: z.enum([
    "BADGE",
    "EFFECT",
    "COSMETIC",
    "EMERALD",
    "PRIVATE_BANK_SLOT",
    "PUBLIC_BANK_SLOT",
    "GUILD_TOME",
    "STRUCTURE",
  ]),
  value: z.union([z.number(), z.string()]).nullable(),
  expires: z.string().nullable(),
});

const GuildSeasonDefinitionSchema = z.object({
  initDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  territoryHoldingSrPerHour: z.number(),
  srPerWar: z.number(),
  ratingRewards: z.array(GuildSeasonRewardSchema),
  leaderboardRewards: z.array(GuildSeasonRewardSchema),
});

export const ListGuildSeasonsResultSchema = z.record(z.string(), GuildSeasonDefinitionSchema);

export type ListGuildSeasonsResult = z.infer<typeof ListGuildSeasonsResultSchema>;
