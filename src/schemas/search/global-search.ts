import { z } from "zod";

import { ItemListSchema } from "../item/item";

const SearchGuildResultSchema = z.object({
  name: z.string(),
  prefix: z.string(),
});

const SearchAreaResultSchema = z.object({
  start: z.array(z.unknown()),
  end: z.array(z.unknown()),
});

export const GlobalSearchOptionsSchema = z.object({
  only: z.string().optional(),
});

export type GlobalSearchOptions = z.infer<typeof GlobalSearchOptionsSchema>;

export const GlobalSearchResultSchema = z.object({
  query: z.string(),
  players: z.record(z.string(), z.string()).optional(),
  guilds: z.record(z.string(), SearchGuildResultSchema).optional(),
  items: ItemListSchema.optional(),
  guildsPrefix: z.record(z.string(), SearchGuildResultSchema).optional(),
  territories: z.record(z.string(), SearchAreaResultSchema).optional(),
  discoveries: z.record(z.string(), SearchAreaResultSchema).optional(),
});

export type GlobalSearchResult = z.infer<typeof GlobalSearchResultSchema>;
