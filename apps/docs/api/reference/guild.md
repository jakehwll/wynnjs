# Guild

`client.guild` — listings, seasons, territories, and guild profiles.

Official docs: [Guild module](https://docs.wynncraft.com/modules/guild/list-guilds).

## When to use which

| Goal                    | Method             |
| ----------------------- | ------------------ |
| All guilds              | `listGuilds`       |
| Territory ownership map | `listTerritories`  |
| Season history          | `listSeasons`      |
| One guild by name       | `getGuild`         |
| One guild by tag        | `getGuildByPrefix` |
| One guild by UUID       | `getGuildByUuid`   |

Prefer **prefix** or **UUID** when you have them — names can be ambiguous ([cookbook](/api/cookbook/ambiguous-matches)).

## Identifier option

Several methods accept `identifier?: "username" | "uuid"`. That controls how **member maps** (and list keys for `listGuilds`) are keyed — not which guild you fetch.

```ts
const { data } = await client.guild.getGuild("Imperial", {
  identifier: "uuid",
});
```

## `listGuilds(options?)`

`GET /guild/list/guild`

```ts
const { data } = await client.guild.listGuilds({ identifier: "uuid" });
// Record keyed by username or uuid → { name, prefix }
```

## `listTerritories()`

`GET /guild/list/territory`

Returns `Record<territoryName, Territory>`:

```ts
type Territory = {
  guild: { uuid: string; name: string; prefix: string; hq: string };
  acquired: string;
  hq: boolean;
  resources: Array<{
    type: "EMERALD" | "ORE" | "WOOD" | "FISH" | "CROP";
    generation: number;
    stored: number;
    limit: number;
  }>;
  links: string[];
  treasury: "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  defences: "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  location: { start: number[]; end: number[] };
};
```

```ts
const { data: territories } = await client.guild.listTerritories();
const owned = Object.entries(territories).filter(([, t]) => t.guild.prefix === "IMP");
```

## `listSeasons()`

`GET /guild/seasons`

Returns `Record<seasonId, SeasonDefinition>` with SR rates and reward tables (`ratingRewards`, `leaderboardRewards`).

```ts
const { data: seasons } = await client.guild.listSeasons();
for (const [id, season] of Object.entries(seasons)) {
  console.log(id, season.initDate, season.endDate, season.srPerWar);
}
```

## Lookups

| Method             | Path                        |
| ------------------ | --------------------------- |
| `getGuild(name)`   | `GET /guild/:name`          |
| `getGuildByPrefix` | `GET /guild/prefix/:prefix` |
| `getGuildByUuid`   | `GET /guild/uuid/:uuid`     |

All three return the same `GuildResult` shape and accept `{ identifier? }`.

### Result shape (abridged)

```ts
type GuildResult = {
  uuid: string;
  name: string;
  prefix: string;
  level: number;
  xpPercent: number;
  territories: number;
  wars: number;
  raids: number;
  created: string;
  online: number;
  banner: {
    base: string;
    tier: number;
    structure: string;
    layers: Array<{ color: string; pattern: string }>;
  };
  members: {
    total: number;
    owner?: Record<string, GuildMember>;
    chief?: Record<string, GuildMember>;
    strategist?: Record<string, GuildMember>;
    recruiter?: Record<string, GuildMember>;
    recruit?: Record<string, GuildMember>;
  };
  // …seasonRanks, etc.
};
```

```ts
await client.guild.getGuild("Imperial");
await client.guild.getGuildByPrefix("IMP");
await client.guild.getGuildByUuid("adb5f0b5-5289-439c-9293-a29d220e7152");
```

Ambiguous names throw [`MultipleObjectsReturned`](/api/cookbook/ambiguous-matches). Missing guilds throw `NotFound`.

## Related

- [Leaderboards](/api/reference/leaderboards) for guild ranking boards
- [Ambiguous matches](/api/cookbook/ambiguous-matches)
- Runnable sample: [`examples/guild-and-search.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/guild-and-search.ts)
