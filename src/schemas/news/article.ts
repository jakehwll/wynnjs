import { z } from "zod";

export const PublisherArticleTypeSchema = z.enum(["blog", "event", "giveaway", "article", "poll"]);

export type PublisherArticleType = z.infer<typeof PublisherArticleTypeSchema>;

const PublisherPollRequirementSchema = z.object({
  type: z.string(),
  subType: z.string().nullable(),
  value: z.number(),
});

const PublisherPollQuestionSchema = z.object({
  answers: z.record(z.string(), z.string()),
  override: z.boolean(),
  question: z.string(),
  requirements: z.array(PublisherPollRequirementSchema),
});

const PublisherArticleContentBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  focus: z.boolean(),
  content: z.union([z.string(), PublisherPollQuestionSchema]),
  discord: z.boolean(),
  website: z.boolean(),
});

export const PublisherArticleSchema = z
  .object({
    id: z.number(),
    type: PublisherArticleTypeSchema,
    created_by: z.string(),
    discord_messages: z.record(z.string(), z.string()),
    discord_recap: z.boolean(),
    allow_discord: z.boolean(),
    destination: z.string(),
    published: z.boolean(),
    pinned: z.boolean(),
    visible: z.boolean(),
    content: z.array(PublisherArticleContentBlockSchema),
    start_date: z.string(),
    end_date: z.string().nullable(),
    recap: z.string(),
    title: z.string(),
    banner: z.string(),
    banner_zoom: z.boolean(),
    likes: z.number(),
    published_at: z.string(),
    require_discord: z.boolean(),
    require_clan: z.boolean(),
    poll_settings: z.array(PublisherPollRequirementSchema).optional(),
    poll_public: z.boolean().optional(),
    votes: z.record(z.string(), z.unknown()).nullable().optional(),
  })
  .passthrough();

export type PublisherArticle = z.infer<typeof PublisherArticleSchema>;

export const PublisherArticleSummarySchema = z.object({
  pk: z.number(),
  title: z.string(),
  type: PublisherArticleTypeSchema,
  banner: z.string(),
  banner_zoom: z.boolean(),
  recap: z.string(),
  visible: z.boolean(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  pinned: z.boolean(),
  has_content: z.boolean(),
  published_at: z.string(),
});

export type PublisherArticleSummary = z.infer<typeof PublisherArticleSummarySchema>;
