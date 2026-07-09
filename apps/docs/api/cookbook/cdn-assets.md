# CDN assets with `assetUrl`

Wynncraft responses often return **relative** media paths (rank badges, banners, article art). The API never expands them to absolute URLs. Use `assetUrl` (or join `CDN_BASE_URL` yourself).

```ts
import { assetUrl, CDN_BASE_URL, WynnClient } from "@wynnjs/api";

assetUrl("nextgen/badges/rank_owner.svg");
// https://cdn.wynncraft.com/nextgen/badges/rank_owner.svg

assetUrl("/nextgen/badges/rank_owner.svg"); // leading slash stripped
// same URL

CDN_BASE_URL;
// https://cdn.wynncraft.com
```

Official note: [Media URLs](https://docs.wynncraft.com/welcome).

## Player rank badge

```ts
const { data } = await client.player.getPlayer("Salted");
const badge = assetUrl(data.rankBadge);
```

## Leaderboard badges

```ts
const { data: types } = await client.leaderboards.listTypes();
const { data } = await client.leaderboards.get(types[0]!, { resultLimit: 10 });

for (const entry of Object.values(data)) {
  if (entry.rankBadge) console.log(entry.name, assetUrl(entry.rankBadge));
}
```

## News banners

```ts
const { data } = await client.news.listArticles("blog", { page: 0 });

for (const article of Object.values(data.results)) {
  console.log(article.title, assetUrl(article.banner));
}
```

## MultipleObjectsReturned badges

Ambiguous player matches can include `rankBadge` on each candidate:

```ts
import { WynnApiError, assetUrl } from "@wynnjs/api";

try {
  await client.player.getPlayer("ambiguous");
} catch (error) {
  if (error instanceof WynnApiError.MultipleObjectsReturned) {
    for (const entry of Object.values(error.objects ?? {})) {
      if (entry.rankBadge) console.log(entry.username, assetUrl(entry.rankBadge));
    }
  }
}
```

## Related

- [Constants](/api/guide/constants)
- [Player](/api/reference/player) · [News](/api/reference/news) · [Leaderboards](/api/reference/leaderboards)
