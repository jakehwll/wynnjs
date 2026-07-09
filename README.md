# @wynnjs/api

TypeScript client for the [Wynncraft API v3](https://docs.wynncraft.com/). Covers all public v3 endpoints with typed request options and response shapes.

Version `3.0.0` is the client release. This package implements [Wynncraft API v3](https://docs.wynncraft.com/) release **`3.7.2`** — see `WYNNCRAFT_API_VERSION` from the package.

## Install

```bash
npm install @wynnjs/api zod
```

Requires TypeScript 5+ (or any runtime that can consume `.d.ts` files). Ships ESM and CommonJS builds.

`zod` is a peer dependency — the client uses it for error parsing and exports schemas for optional response validation. npm 7+, pnpm, and Bun install peers automatically; add `zod` explicitly if your package manager does not.

## Usage

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();
const { data, rateLimit } = await client.classes.list();
```

Every method returns `{ data, rateLimit }` where `rateLimit` is parsed from Wynncraft headers when present. Response and options types are exported from the package — use editor hover or `import type { ... } from "@wynnjs/api"` for full shapes.

For endpoint behaviour and response fields, see the [Wynncraft API docs](https://docs.wynncraft.com/). This README lists client methods; JSDoc on `WynnClient` and module methods covers params and options.

### Authentication

Pass `auth` when constructing the client. Supports API tokens, OAuth access tokens, and session cookies via the `WynnAuth` union.

```ts
const client = new WynnClient({
  auth: { type: "token", token: process.env.WYNN_API_TOKEN! },
});
```

Endpoints like `client.player.whoAmI()` and `client.oauth.me()` require auth. See [`examples/auth-token.ts`](./packages/api/examples/auth-token.ts).

### Errors

Failed API responses throw `WynnApiError` subclasses (`NotFound`, `Forbidden`, `TooManyRequest`, `MultipleObjectsReturned`, etc.). See [`examples/errors.ts`](./packages/api/examples/errors.ts).

## API reference

`client.<module>.<method>()`. Path parameters come first, options second. Some options are presence-only flags (`fullResult`, `full_result`, `static`) — pass them in the options object and the client sends the flag without a value.

### Player (`client.player`)

| Method                                                         | Description                           |
| -------------------------------------------------------------- | ------------------------------------- |
| `client.player.listOnlinePlayers(options?)`                    | Online player list                    |
| `client.player.whoAmI()`                                       | Authenticated profile (auth required) |
| `client.player.getPlayer(username, options?)`                  | Player profile by username            |
| `client.player.listCharacters(username)`                       | Characters for a player               |
| `client.player.getCharacterAbilities(username, characterUuid)` | Ability assignments for a character   |

### OAuth (`client.oauth`)

| Method                                | Description                            |
| ------------------------------------- | -------------------------------------- |
| `client.oauth.me()`                   | OAuth user identity (auth required)    |
| `client.oauth.exchangeToken(options)` | Exchange authorization code for tokens |

### Guild (`client.guild`)

| Method                                            | Description          |
| ------------------------------------------------- | -------------------- |
| `client.guild.listGuilds(options?)`               | Guild list           |
| `client.guild.listTerritories()`                  | Guild territories    |
| `client.guild.listSeasons()`                      | Guild season history |
| `client.guild.getGuild(name, options?)`           | Guild by name        |
| `client.guild.getGuildByPrefix(prefix, options?)` | Guild by tag prefix  |
| `client.guild.getGuildByUuid(uuid, options?)`     | Guild by UUID        |

### Item (`client.item`)

| Method                                          | Description                          |
| ----------------------------------------------- | ------------------------------------ |
| `client.item.listItems(options?)`               | Item database                        |
| `client.item.searchItems(filters?, options?)`   | Structured item search               |
| `client.item.quickSearchItems(query)`           | Quick item name search               |
| `client.item.listRecipes(options?)`             | Recipe database                      |
| `client.item.searchRecipes(filters?, options?)` | Structured recipe search             |
| `client.item.getMetadata(options?)`             | Item filter and metadata definitions |
| `client.item.listSets()`                        | Item sets                            |

### Ability (`client.ability`)

| Method                             | Description              |
| ---------------------------------- | ------------------------ |
| `client.ability.getTree(tree)`     | Ability tree for a class |
| `client.ability.getMap(tree)`      | Ability map for a class  |
| `client.ability.listAspects(tree)` | Aspects for a class tree |

### Classes (`client.classes`)

| Method                               | Description          |
| ------------------------------------ | -------------------- |
| `client.classes.list()`              | All playable classes |
| `client.classes.getClass(className)` | Class metadata       |

### Map (`client.map`)

| Method                               | Description               |
| ------------------------------------ | ------------------------- |
| `client.map.listPlayerLocations()`   | Live player map locations |
| `client.map.listMarkers()`           | Map markers               |
| `client.map.listWorldEvents()`       | Active world events       |
| `client.map.listCamps(options?)`     | Camps                     |
| `client.map.listRaids(options?)`     | Raids                     |
| `client.map.listLootPools(options?)` | Loot pools                |
| `client.map.listGatheringNodes()`    | Gathering nodes           |
| `client.map.getQuestCount()`         | Quest completion counts   |

### Search (`client.search`)

| Method                                  | Description   |
| --------------------------------------- | ------------- |
| `client.search.search(query, options?)` | Global search |

### Leaderboards (`client.leaderboards`)

| Method                                      | Description                 |
| ------------------------------------------- | --------------------------- |
| `client.leaderboards.listTypes()`           | Available leaderboard types |
| `client.leaderboards.get(lbType, options?)` | Leaderboard entries         |

### News (`client.news`)

| Method                                            | Description                |
| ------------------------------------------------- | -------------------------- |
| `client.news.fetchArticle(articleType, pk)`       | Single publisher article   |
| `client.news.listArticles(articleType, options?)` | Publisher articles by type |
| `client.news.listVideos()`                        | Publisher videos           |
| `client.news.listLatestNews()`                    | Latest news feed           |

## Examples

Runnable scripts live in [`packages/api/examples/`](./packages/api/examples/). Run with `bun run packages/api/examples/basic.ts` from the repo root.

| File                                                                 | Module                      |
| -------------------------------------------------------------------- | --------------------------- |
| [`basic.ts`](./packages/api/examples/basic.ts)                       | classes                     |
| [`player.ts`](./packages/api/examples/player.ts)                     | player                      |
| [`auth-token.ts`](./packages/api/examples/auth-token.ts)             | player (API token)          |
| [`oauth.ts`](./packages/api/examples/oauth.ts)                       | oauth                       |
| [`guild-and-search.ts`](./packages/api/examples/guild-and-search.ts) | search, guild, leaderboards |
| [`item-search.ts`](./packages/api/examples/item-search.ts)           | item                        |
| [`map.ts`](./packages/api/examples/map.ts)                           | map                         |
| [`news.ts`](./packages/api/examples/news.ts)                         | news                        |
| [`ability.ts`](./packages/api/examples/ability.ts)                   | ability                     |
| [`errors.ts`](./packages/api/examples/errors.ts)                     | error handling              |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
