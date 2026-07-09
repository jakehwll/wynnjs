# Leaderboards

`client.leaderboards` — discover type slugs, then fetch ranked entries.

Official docs: [Leaderboards](https://docs.wynncraft.com/modules/leaderboards/list-leaderboard-types).

## When to use which

| Goal                          | Method      |
| ----------------------------- | ----------- |
| Discover available board IDs  | `listTypes` |
| Top-N / full board for a slug | `get`       |

## Flow

1. `listTypes()` → `string[]` of slugs
2. `get(lbType, { resultLimit? })` → `Record<rankPosition, LeaderboardEntry>`

```ts
const { data: types } = await client.leaderboards.listTypes();
// e.g. ["completions", "solo/combat/…", "guilds/…", …]

const lbType = types.find((t) => t.includes("guild")) ?? types[0]!;

const { data } = await client.leaderboards.get(lbType, {
  resultLimit: 25,
});

for (const [place, entry] of Object.entries(data)) {
  console.log(place, entry.name, entry.score ?? entry.metaScore);
}
```

## `listTypes()`

`GET /leaderboards/types`

Returns a flat `string[]`. Slugs are opaque identifiers — pass them unchanged into `get`. Cache this list in long-running apps; it changes rarely.

```ts
const { data: types } = await client.leaderboards.listTypes();
const combat = types.filter((t) => t.includes("combat"));
```

## `get(lbType, options?)`

`GET /leaderboards/:lbType`

`lbType` is URL-encoded by the client. Unknown slugs typically yield `NotFound`.

| Option         | Type     | Description                                     |
| -------------- | -------- | ----------------------------------------------- |
| `resultLimit?` | `number` | Cap how many entries come back (`?resultLimit`) |

### Result shape

Keys are **rank positions as strings** (`"1"`, `"2"`, …), not array indices.

```ts
type GetLeaderboardResult = Record<string, LeaderboardEntry>;
```

### Entry shape (abridged)

Entries are intentionally loose — player boards and guild boards share one schema with optional fields:

```ts
type LeaderboardEntry = {
  name: string;
  uuid?: string;
  prefix?: string; // guilds
  score?: number;
  metaScore?: number;
  previousRanking?: number;
  level?: number;
  xp?: number;
  territories?: number;
  wars?: number;
  created?: string;
  characterUuid?: string;
  characterType?: string;
  characterData?: Record<string, unknown>;
  rank?: string;
  supportRank?: string | null;
  shortenedRank?: string | null;
  legacyRankColour?: { main: string; sub: string };
  rankBadge?: string;
  restricted?: boolean;
  banner?: {
    base: string;
    tier: number;
    structure: string;
    layers: Array<{ pattern: string; color?: string; colour?: string }>;
  };
  metadata?: Record<string, unknown>;
};
```

```ts
import { assetUrl } from "@wynnjs/api";

const top = data["1"];
if (top?.rankBadge) {
  console.log(assetUrl(top.rankBadge));
}
```

### Player vs guild boards

| Field family                         | Typical board                        |
| ------------------------------------ | ------------------------------------ |
| `uuid`, `rank`, `rankBadge`, `level` | Player / solo                        |
| `prefix`, `banner`, `territories`    | Guild                                |
| `characterUuid`, `characterType`     | Character-scoped solo boards         |
| `score` / `metaScore`                | Either — prefer whichever is present |

Always null-check optional fields before rendering UI.

## Caching tips

- Cache `listTypes()` in long-running apps — slugs change rarely
- Rankings change often; poll `get` on a schedule and respect [rate limits](/api/cookbook/rate-limits)
- Prefer `resultLimit` when you only need a top-N widget

## Related

- [CDN assets](/api/cookbook/cdn-assets) for `rankBadge` / banner art
- [Guild](/api/reference/guild) for territory / season context
- Runnable sample: [`examples/guild-and-search.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/guild-and-search.ts) (calls `listTypes`)
