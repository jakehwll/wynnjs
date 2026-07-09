import { z } from "zod";
import { LegacyRankColourSchema } from "./whoami";

export const GetPlayerOptionsSchema = z.object({
  fullResult: z.boolean().optional(),
});

export type GetPlayerOptions = z.infer<typeof GetPlayerOptionsSchema>;

const GuildReferenceSchema = z.object({
  uuid: z.uuid(),
  name: z.string(),
  prefix: z.string(),
  rank: z.string().nullable().optional(),
  rankStars: z.string().nullable().optional(),
});

const RankMapSchema = z.record(z.string(), z.number());

const CountListSchema = z.object({
  total: z.number(),
  list: z.record(z.string(), z.number()),
});

const RaidStatsSchema = z.object({
  damageTaken: z.number(),
  damageDealt: z.number(),
  healthHealed: z.number(),
  deaths: z.number(),
  buffsTaken: z.number(),
  gambitsUsed: z.number(),
});

const PvpStatsSchema = z.object({
  kills: z.number().optional(),
  deaths: z.number().optional(),
});

const PlayerGlobalDataSchema = z.object({
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
  guildRaids: CountListSchema.nullable(),
  raidStats: RaidStatsSchema.nullable(),
  pvp: PvpStatsSchema,
});

const ProfessionProgressSchema = z.object({
  level: z.number(),
  xpPercent: z.number(),
});

const ProfessionsSchema = z.object({
  fishing: ProfessionProgressSchema.optional(),
  woodcutting: ProfessionProgressSchema.optional(),
  mining: ProfessionProgressSchema.optional(),
  farming: ProfessionProgressSchema.optional(),
  scribing: ProfessionProgressSchema.optional(),
  jeweling: ProfessionProgressSchema.optional(),
  alchemism: ProfessionProgressSchema.optional(),
  cooking: ProfessionProgressSchema.optional(),
  weaponsmithing: ProfessionProgressSchema.optional(),
  tailoring: ProfessionProgressSchema.optional(),
  woodworking: ProfessionProgressSchema.optional(),
  armouring: ProfessionProgressSchema.optional(),
});

const CharacterSchema = z.object({
  type: z.string(),
  reskin: z.string().nullable(),
  nickname: z.string().nullable(),
  level: z.number(),
  xp: z.number(),
  xpPercent: z.number(),
  totalLevel: z.number(),
  preEconomy: z.boolean().nullable(),
  gamemode: z.array(z.string()),
  contentCompletion: z.number(),
  wars: z.number(),
  playtime: z.number(),
  mobsKilled: z.number(),
  chestsFound: z.number(),
  itemsIdentified: z.number(),
  blocksWalked: z.number(),
  logins: z.number(),
  deaths: z.number(),
  discoveries: z.number(),
  pvp: PvpStatsSchema,
  skillPoints: z.record(z.string(), z.number()).nullable(),
  professions: ProfessionsSchema,
  dungeons: CountListSchema.nullable(),
  raids: CountListSchema.nullable(),
  worldEvents: z.number(),
  lootruns: z.number(),
  caves: z.number(),
  quests: z.array(z.string()),
  restrictions: z.record(z.string(), z.boolean()),
  removedStat: z.array(z.string()),
});

export const GetPlayerResultSchema = z.object({
  username: z.string(),
  online: z.boolean(),
  server: z.string().nullable(),
  activeCharacter: z.uuid().nullable(),
  nickname: z.string().nullable(),
  uuid: z.uuid(),
  rank: z.string(),
  rankBadge: z.string(),
  legacyRankColour: LegacyRankColourSchema,
  shortenedRank: z.string().nullable(),
  supportRank: z.string().nullable(),
  veteran: z.boolean(),
  lastJoin: z.string(),
  guild: GuildReferenceSchema.nullable(),
  ranking: RankMapSchema,
  previousRanking: RankMapSchema,
  firstJoin: z.string(),
  playtime: z.number(),
  globalData: PlayerGlobalDataSchema,
  featuredStats: z.record(z.string(), z.union([z.string(), z.number()])),
  wallpaper: z.string(),
  avatar: z.string(),
  restrictions: z.record(z.string(), z.boolean()),
  characters: z.record(z.uuid(), CharacterSchema).optional(),
});

export type GetPlayerResult = z.infer<typeof GetPlayerResultSchema>;
