import { z } from "zod";

export const LegacyRankColourSchema = z.object({
  main: z.string(),
  sub: z.string(),
});

export type LegacyRankColour = z.infer<typeof LegacyRankColourSchema>;

/** Public player identity fields returned by authenticated player endpoints. */
export const PlayerIdentitySchema = z.object({
  username: z.string(),
  online: z.boolean(),
  nickname: z.string().nullable(),
  rank: z.string(),
  supportRank: z.string().nullable(),
  shortenedRank: z.string().nullable(),
  legacyRankColour: LegacyRankColourSchema,
  rankBadge: z.string(),
});

export type PlayerIdentity = z.infer<typeof PlayerIdentitySchema>;

/**
 * Authenticated player identities keyed by account UUID.
 *
 * The whoami endpoint returns one entry — use `Object.values(data)[0]` to
 * access the profile directly.
 */
export const WhoAmIResultSchema = z.record(z.uuid(), PlayerIdentitySchema);

/** Map of account UUID → {@link PlayerIdentity}. */
export type WhoAmIResult = z.infer<typeof WhoAmIResultSchema>;
