# Responses

Every module method resolves to a `WynnResponse<T>`:

```ts
type WynnResponse<T> = {
  data: T;
  rateLimit: RateLimitInfo | null;
};
```

```ts
const { data, rateLimit } = await client.player.getPlayer("Salted");
```

## Rate limits

Successful responses parse Wynncraft rate-limit headers into `rateLimit`. When headers are absent, `rateLimit` is `null`.

```ts
type RateLimitInfo = {
  bucket: string;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp (seconds)
};
```

| Header                | Field       |
| --------------------- | ----------- |
| `RateLimit-Bucket`    | `bucket`    |
| `RateLimit-Limit`     | `limit`     |
| `RateLimit-Remaining` | `remaining` |
| `RateLimit-Reset`     | `reset`     |

Buckets are tracked independently (`SHARED`, `PLAYER`, `GUILD`, …). Exhaustion throws [`WynnApiError.TooManyRequest`](/api/guide/errors).

```ts
if (rateLimit && rateLimit.remaining < 5) {
  // back off before the next call
}
```

## Presence params

Some Wynncraft options are **presence-only query flags** — the flag appears in the URL with no value (`?fullResult`). In the client they are booleans on the options object.

| Client option      | Wire flag      | Used by                                                  |
| ------------------ | -------------- | -------------------------------------------------------- |
| `fullResult: true` | `?fullResult`  | `player.getPlayer`, `item.listItems`, `item.searchItems` |
| `fullResult: true` | `?full_result` | `item.listRecipes`, `item.searchRecipes`                 |
| `static: true`     | `?static`      | `item.getMetadata`                                       |

Same option name, different wire flag for recipes — [Recipe fullResult cookbook](/api/cookbook/recipe-full-result).

```ts
await client.player.getPlayer("Salted", { fullResult: true });
// GET /player/Salted?fullResult

await client.item.getMetadata({ static: true });
// GET /item/metadata?static
```

## Pagination

Paginated endpoints return a controller plus results:

```ts
type PaginationController = {
  count: number;
  current_count: number;
  pages: number;
  prev: number | null;
  current: number;
  next: number | null;
};
```

Typical shape:

```ts
{
  controller: PaginationController;
  results: T; // array or record, depending on the endpoint
}
```

| Endpoint             | Options                |
| -------------------- | ---------------------- |
| `item.listItems`     | `page?`, `fullResult?` |
| `item.searchItems`   | `page?`, `fullResult?` |
| `item.listRecipes`   | `page?`, `fullResult?` |
| `item.searchRecipes` | `page?`, `fullResult?` |
| `news.listArticles`  | `page?`                |

Pages are **0-indexed** in the client options.

```ts
const { data } = await client.item.listItems({ page: 0 });
console.log(data.controller.pages, data.results.length);
```

Walk every page (with rate-limit awareness): [Pagination cookbook](/api/cookbook/pagination).

## Record-keyed responses

Many Wynncraft endpoints return UUID- or name-keyed maps rather than arrays. Preserve that shape in your code:

```ts
const { data } = await client.player.listCharacters("Salted");
// Record<characterUuid, LightCharacter>

for (const [uuid, character] of Object.entries(data)) {
  console.log(uuid, character.type);
}
```

`whoAmI()` returns a single-entry map — grab the profile with `Object.values(data)[0]`.
