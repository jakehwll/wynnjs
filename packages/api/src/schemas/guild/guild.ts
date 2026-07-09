import { z } from "zod";

export const GetGuildOptionsSchema = z.object({
  identifier: z.enum(["username", "uuid"]).optional(),
});

export type GetGuildOptions = z.infer<typeof GetGuildOptionsSchema>;

const CountListSchema = z.object({
  total: z.number(),
  list: z.record(z.string(), z.number()),
});

const PvpStatsSchema = z.object({
  kills: z.number().optional(),
  deaths: z.number().optional(),
});

const GuildMemberWeeklySchema = z.object({
  completed: z.boolean().optional(),
  streak: z.number().optional(),
});

const GuildMemberGlobalDataSchema = z.object({
  contentCompletion: z.number(),
  wars: z.number(),
  totalLevel: z.number(),
  mobsKilled: z.number(),
  chestsFound: z.number(),
  dungeons: CountListSchema,
  raids: CountListSchema,
  worldEvents: z.number(),
  lootruns: z.number(),
  caves: z.number(),
  completedQuests: z.number(),
  pvp: PvpStatsSchema,
  currentGuildRaids: CountListSchema.nullable().optional(),
  guildRaids: CountListSchema.nullable().optional(),
  playtime: z.number().optional(),
});

const GuildMemberRestrictionsSchema = z.object({
  online_status: z.boolean().optional(),
  main_access: z.boolean().optional(),
  guild_high_ranked_access: z.boolean().optional(),
});

const GuildMemberSchema = z.object({
  uuid: z.uuid().optional(),
  username: z.string().optional(),
  online: z.boolean(),
  lastJoin: z.string().nullable(),
  server: z.string().nullable(),
  contributed: z.number(),
  contributionRank: z.number(),
  joined: z.string(),
  weekly: GuildMemberWeeklySchema,
  globalData: GuildMemberGlobalDataSchema,
  restrictions: GuildMemberRestrictionsSchema,
});

const GuildMembersSchema = z.object({
  total: z.number(),
  owner: z.record(z.string(), GuildMemberSchema).optional(),
  chief: z.record(z.string(), GuildMemberSchema).optional(),
  strategist: z.record(z.string(), GuildMemberSchema).optional(),
  recruiter: z.record(z.string(), GuildMemberSchema).optional(),
  recruit: z.record(z.string(), GuildMemberSchema).optional(),
});

const BannerLayerSchema = z.object({
  color: z.string(),
  pattern: z.string(),
});

const GuildBannerSchema = z.object({
  base: z.string(),
  tier: z.number(),
  structure: z.string(),
  layers: z.array(BannerLayerSchema),
});

const GuildSeasonRankSchema = z.object({
  rating: z.number(),
  finalTerritories: z.number(),
});

export const GuildResultSchema = z.object({
  uuid: z.uuid(),
  name: z.string(),
  prefix: z.string(),
  level: z.number(),
  xpPercent: z.number(),
  territories: z.number(),
  wars: z.number(),
  raids: z.number(),
  created: z.string(),
  members: GuildMembersSchema,
  online: z.number(),
  banner: GuildBannerSchema,
  seasonRanks: z.record(z.string(), GuildSeasonRankSchema),
  ranking: z.record(z.string(), z.number()),
});

export type GuildResult = z.infer<typeof GuildResultSchema>;
