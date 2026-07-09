import { z } from "zod";
import { LegacyRankColourSchema } from "../player/whoami";

const OAuthApplicationSchema = z.object({
  client_id: z.string(),
  scopes: z.array(z.string()),
});

const OAuthProfileSchema = z.object({
  username: z.string(),
  primary: z.boolean(),
  rank: z.string(),
  supportRank: z.string().nullable(),
  shortenedRank: z.string().nullable(),
  legacyRankColour: LegacyRankColourSchema,
  rankBadge: z.string(),
  accessRules: z.record(z.string(), z.string()),
});

export const GetOAuthIdentityResultSchema = z.object({
  application: OAuthApplicationSchema,
  profiles: z.record(z.uuid(), OAuthProfileSchema),
});

export type GetOAuthIdentityResult = z.infer<typeof GetOAuthIdentityResultSchema>;
