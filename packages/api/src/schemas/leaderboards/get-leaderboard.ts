import { z } from "zod";

const GuildBannerLayerSchema = z
  .object({
    color: z.string().optional(),
    colour: z.string().optional(),
    pattern: z.string(),
  })
  .passthrough();

const GuildBannerSchema = z
  .object({
    base: z.string(),
    tier: z.number(),
    structure: z.string(),
    layers: z.array(GuildBannerLayerSchema),
  })
  .passthrough();

export const LeaderboardEntrySchema = z
  .object({
    metaScore: z.number().optional(),
    name: z.string(),
    uuid: z.uuid().optional(),
    prefix: z.string().optional(),
    score: z.number().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    banner: GuildBannerSchema.optional(),
    previousRanking: z.number().optional(),
    level: z.number().optional(),
    xp: z.number().optional(),
    territories: z.number().optional(),
    wars: z.number().optional(),
    created: z.string().optional(),
    characterUuid: z.uuid().optional(),
    characterType: z.string().optional(),
    characterData: z.record(z.string(), z.unknown()).optional(),
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
    restricted: z.boolean().optional(),
  })
  .passthrough();

export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

export const GetLeaderboardOptionsSchema = z.object({
  resultLimit: z.number().optional(),
});

export type GetLeaderboardOptions = z.infer<typeof GetLeaderboardOptionsSchema>;

export const GetLeaderboardResultSchema = z.record(z.string(), LeaderboardEntrySchema);

export type GetLeaderboardResult = z.infer<typeof GetLeaderboardResultSchema>;
