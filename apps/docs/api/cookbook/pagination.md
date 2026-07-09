# Paginate everything

Item and recipe list/search endpoints return a page of results plus a `controller`. Pages are **0-indexed**.

```ts
type PaginationController = {
  count: number; // total matching rows
  current_count: number; // rows on this page
  pages: number; // total pages
  prev: number | null;
  current: number;
  next: number | null;
};
```

## One page

```ts
const { data } = await client.item.searchItems({ type: "wand", tier: "legendary" }, { page: 0 });

console.log(data.controller.count, data.results.length);
```

## Walk every page

Stop when `controller.next` is `null`.

```ts
import type { Item, WynnClient } from "@wynnjs/api";

async function searchAllItems(
  client: WynnClient,
  filters: Parameters<WynnClient["item"]["searchItems"]>[0],
): Promise<Item[]> {
  const items: Item[] = [];
  let page = 0;

  for (;;) {
    const { data, rateLimit } = await client.item.searchItems(filters, { page });
    items.push(...data.results);

    if (rateLimit && rateLimit.remaining < 3) {
      const waitMs = Math.max(0, rateLimit.reset * 1000 - Date.now()) + 250;
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }

    if (data.controller.next === null) break;
    page = data.controller.next;
  }

  return items;
}

const legendaries = await searchAllItems(client, {
  type: "wand",
  tier: "legendary",
});
```

## `fullResult` vs paging

`fullResult: true` asks Wynncraft for an expanded payload on that request. It does **not** replace pagination — you still walk `controller.next` when the result set spans multiple pages.

Recipe endpoints send the flag as `?full_result` on the wire; the client option is still `fullResult: true`.

## News articles

`news.listArticles` is also paginated, but `results` is a **record** keyed by article pk, not an array:

```ts
let page = 0;

for (;;) {
  const { data } = await client.news.listArticles("blog", { page });
  for (const [pk, article] of Object.entries(data.results)) {
    console.log(pk, article.title);
  }
  if (data.controller.next === null) break;
  page = data.controller.next;
}
```
