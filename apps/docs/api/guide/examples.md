# Examples

Copy-paste oriented samples. Full files live in [`packages/api/examples/`](https://github.com/jakehwll/wynnjs/tree/main/packages/api/examples).

From the monorepo root:

```bash
bun run packages/api/examples/basic.ts
```

## Minimal client

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();
const { data, rateLimit } = await client.classes.list();

console.log(
  Object.values(data).map((entry) => entry.name),
  rateLimit?.remaining,
);
```

## API token + whoami

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient({
  auth: { type: "token", token: process.env.WYNN_API_TOKEN! },
});

const { data: identities } = await client.player.whoAmI();

for (const identity of Object.values(identities)) {
  console.log(identity.username, identity.online);
}
```

## Player profile + characters

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();
const username = "YourUsername";

const { data: profile } = await client.player.getPlayer(username, {
  fullResult: true,
});

console.log(profile.username, profile.online, profile.guild?.name);

const { data: characters } = await client.player.listCharacters(username);

for (const [uuid, character] of Object.entries(characters)) {
  console.log(uuid, character.type, character.nickname);
}
```

## Item search

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();

const { data: results } = await client.item.searchItems(
  { query: "wand", tier: "legendary" },
  { page: 0 },
);

console.log(results.controller.count, results.results.length);

const { data: quick } = await client.item.quickSearchItems("helmet");
console.log(quick.map((item) => item.displayName));
```

## Typed errors

```ts
import { WynnApiError, WynnClient } from "@wynnjs/api";

const client = new WynnClient();

try {
  await client.player.getPlayer("DefinitelyNotARealPlayer_12345");
} catch (error) {
  if (error instanceof WynnApiError.NotFound) {
    console.error("missing:", error.detail);
  } else if (error instanceof WynnApiError.MultipleObjectsReturned) {
    console.error("pick one:", error.objects);
  } else if (error instanceof WynnApiError) {
    console.error(error.error, error.status, error.detail);
  } else {
    throw error;
  }
}
```

## More in the repo

| File                                                                                                            | Covers                           |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [`oauth.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/oauth.ts)                       | OAuth `me` + exchange sketch     |
| [`guild-and-search.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/guild-and-search.ts) | Search, guild, leaderboard types |
| [`ability.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/ability.ts)                   | Tree, map, aspects               |
| [`map.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/map.ts)                           | Markers, events, camps           |
| [`news.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/news.ts)                         | Articles + videos                |

## Cookbooks

| Recipe                    | Page                                                  |
| ------------------------- | ----------------------------------------------------- |
| Walk every page           | [Pagination](/api/cookbook/pagination)                |
| `MultipleObjectsReturned` | [Ambiguous matches](/api/cookbook/ambiguous-matches)  |
| OAuth code → token → `me` | [OAuth](/api/cookbook/oauth)                          |
| Session cookies           | [Session auth](/api/cookbook/session-auth)            |
| Budget + backoff          | [Rate limits](/api/cookbook/rate-limits)              |
| Recipe `full_result`      | [Recipe fullResult](/api/cookbook/recipe-full-result) |
| `assetUrl` / CDN paths    | [CDN assets](/api/cookbook/cdn-assets)                |

Use fictional usernames and UUIDs. Do not commit real player data, tokens, or session cookies.
