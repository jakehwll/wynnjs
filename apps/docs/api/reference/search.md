# Search

`client.search` — global search across players, guilds, items, and more.

Official docs: [Search](https://docs.wynncraft.com/modules/search/global-search).

## `search(query, options?)`

`GET /search/:query`

| Option  | Type     | Description                                            |
| ------- | -------- | ------------------------------------------------------ |
| `only?` | `string` | Restrict results, e.g. `"player"`, `"guild"`, `"item"` |

Result keys are optional depending on matches. The echo `query` field always comes back.

```ts
type GlobalSearchResult = {
  query: string;
  players?: Record<string, string>; // uuid → username (or similar)
  guilds?: Record<string, { name: string; prefix: string }>;
  guildsPrefix?: Record<string, { name: string; prefix: string }>;
  items?: Record<string, ItemSummary>; // same list shape as item module
  territories?: Record<string, { start: unknown[]; end: unknown[] }>;
  discoveries?: Record<string, { start: unknown[]; end: unknown[] }>;
};
```

```ts
const { data } = await client.search.search("cabbage", { only: "item" });

console.log(data.query);
if (data.items) {
  console.log(Object.keys(data.items));
}
```

### Narrowing with `only`

| `only` value | Typical keys present     |
| ------------ | ------------------------ |
| `"player"`   | `players`                |
| `"guild"`    | `guilds`, `guildsPrefix` |
| `"item"`     | `items`                  |
| omitted      | whichever domains match  |

Use `only` when you know the domain — cheaper responses and clearer narrowing in your own code.

### When not to use global search

| Need                         | Prefer instead                                   |
| ---------------------------- | ------------------------------------------------ |
| Structured item filters      | [`item.searchItems`](/api/reference/item)        |
| Exact guild by prefix / UUID | [`guild.getGuildByPrefix`](/api/reference/guild) |
| Full player profile          | [`player.getPlayer`](/api/reference/player)      |

Global search is for discovery / autocomplete-style lookups, not deep filters.

## Related

- [Item](/api/reference/item) for query + filter search
- [Pagination](/api/cookbook/pagination) (item search pages; global search is a single response)
- Runnable sample: [`examples/guild-and-search.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/guild-and-search.ts)
