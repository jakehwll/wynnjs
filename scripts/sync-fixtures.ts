#!/usr/bin/env bun
/**
 * Refresh API doc example fixtures under each schema module's __fixtures__/ dir.
 * Source URLs are recorded in src/testing/fixture-sources.json.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const pages: Array<[string, string, string, number?]> = [
  ["player/list-online-players", "list-online-players", "src/schemas/player"],
  ["player/get-player-identity", "whoami", "src/schemas/player"],
  ["player/get-player", "get-player", "src/schemas/player"],
  ["player/list-player-characters", "list-player-characters", "src/schemas/player"],
  ["player/get-player-character-abilities", "get-character-abilities", "src/schemas/player"],
  ["o-auth-2/get-oauth-identity", "oauth-me", "src/schemas/oauth"],
  ["o-auth-2/exchange-oauth-token", "exchange-oauth-token", "src/schemas/oauth"],
  ["guild/list-guilds", "list-guilds", "src/schemas/guild", 0],
  ["guild/get-guild-by-name", "get-guild", "src/schemas/guild"],
  ["guild/list-guild-territories", "list-guild-territories", "src/schemas/guild"],
  ["guild/list-guild-seasons", "list-guild-seasons", "src/schemas/guild"],
  ["item-recipe/list-items", "list-items", "src/schemas/item"],
  ["item-recipe/search-items", "search-items", "src/schemas/item"],
  ["item-recipe/quick-search-items", "quick-search-items", "src/schemas/item"],
  ["item-recipe/get-item-metadata", "get-item-metadata", "src/schemas/item"],
  ["item-recipe/list-item-sets", "list-item-sets", "src/schemas/item"],
  ["item-recipe/list-recipes", "list-recipes", "src/schemas/item"],
  ["item-recipe/search-recipes", "search-recipes", "src/schemas/item"],
  ["ability-aspect/get-ability-tree", "get-ability-tree", "src/schemas/ability"],
  ["ability-aspect/get-ability-map", "get-ability-map", "src/schemas/ability"],
  ["ability-aspect/list-aspects", "list-aspects", "src/schemas/ability"],
  ["classes/list-classes", "list-classes", "src/schemas/classes"],
  ["classes/get-class", "get-class", "src/schemas/classes"],
  ["map/list-map-markers", "list-map-markers", "src/schemas/map"],
  ["map/list-player-locations", "list-player-locations", "src/schemas/map"],
  ["map/list-world-events", "list-world-events", "src/schemas/map"],
  ["map/list-map-camps", "list-map-camps", "src/schemas/map"],
  ["map/list-map-raids", "list-map-raids", "src/schemas/map"],
  ["map/list-map-loot-pools", "list-map-loot-pools", "src/schemas/map"],
  ["map/list-gathering-nodes", "list-gathering-nodes", "src/schemas/map"],
  ["map/get-quest-count", "get-quest-count", "src/schemas/map"],
  ["search/global-search", "global-search", "src/schemas/search"],
  ["leaderboards/list-leaderboard-types", "list-leaderboard-types", "src/schemas/leaderboards"],
  ["leaderboards/get-leaderboard", "get-leaderboard", "src/schemas/leaderboards"],
  ["news/fetch-publisher-article", "fetch-article", "src/schemas/news"],
  ["news/list-publisher-articles", "list-articles", "src/schemas/news"],
  ["news/list-publisher-videos", "list-videos", "src/schemas/news"],
  ["news/list-latest-news", "list-latest-news", "src/schemas/news"],
];

const sources: Record<string, string> = {
  "not-found-error": "https://docs.wynncraft.com/exceptions",
  "multiple-objects-returned-error": "https://docs.wynncraft.com/exceptions",
};

const manualFixtures: Array<[string, string, unknown]> = [
  [
    "src/schemas/guild",
    "list-guilds-uuid",
    {
      "adb5f0b5-5289-439c-9293-a29d220e7152": {
        name: "Spectral Cabbage",
        prefix: "SPC",
      },
    },
  ],
];

for (const [moduleDir, name, data] of manualFixtures) {
  const fixturesDir = join(root, moduleDir, "__fixtures__");
  sources[name] = "https://docs.wynncraft.com/modules/guild/list-guilds";
  mkdirSync(fixturesDir, { recursive: true });
  writeFileSync(join(fixturesDir, `${name}.json`), `${JSON.stringify(data, null, 2)}\n`);
  console.log(`updated ${moduleDir}/__fixtures__/${name}.json (manual)`);
}

for (const [path, name, moduleDir, exampleIndex] of pages) {
  const url = `https://docs.wynncraft.com/modules/${path}.md`;
  const fixturesDir = join(root, moduleDir, "__fixtures__");
  sources[name] = `https://docs.wynncraft.com/modules/${path}`;

  mkdirSync(fixturesDir, { recursive: true });

  const response = await fetch(url);
  const text = await response.text();

  if (!response.ok || text.includes("Page Not Found")) {
    console.error(`skip ${name}: ${url}`);
    continue;
  }

  const blocks = [...text.matchAll(/```json\n([\s\S]*?)```/g)]
    .map((match) => match[1]?.trim())
    .filter(
      (block): block is string =>
        block !== undefined && (block.startsWith("{") || block.startsWith("[")) && block !== "{}",
    );

  const example = blocks.at(exampleIndex ?? -1);
  if (!example) {
    console.error(`skip ${name}: no response example`);
    continue;
  }

  const parsed = JSON.parse(example) as unknown;

  writeFileSync(join(fixturesDir, `${name}.json`), `${JSON.stringify(parsed, null, 2)}\n`);
  console.log(`updated ${moduleDir}/__fixtures__/${name}.json`);
}

writeFileSync(
  join(root, "src/testing/fixture-sources.json"),
  `${JSON.stringify(sources, null, 2)}\n`,
);
