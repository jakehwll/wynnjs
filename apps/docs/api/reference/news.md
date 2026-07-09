# News

`client.news` — publisher articles, videos, and the legacy latest-news feed.

Official docs: [News](https://docs.wynncraft.com/modules/news/list-latest-news).

```ts
type PublisherArticleType = "blog" | "event" | "giveaway" | "article" | "poll";
```

## When to use which

| Goal                        | Method           | Notes                                            |
| --------------------------- | ---------------- | ------------------------------------------------ |
| Quick combined feed         | `listLatestNews` | Legacy forum-style entries (`LatestNewsEntry[]`) |
| Paginated publisher catalog | `listArticles`   | `{ controller, results: Record<pk, Summary> }`   |
| Full article body           | `fetchArticle`   | By type + numeric pk or slug                     |
| Featured videos             | `listVideos`     | Record / map of video entries                    |

## Latest news

```ts
type LatestNewsEntry = {
  title: string;
  date: string;
  forumThread: string;
  author: string;
  content: string;
  comments: string;
};

const { data } = await client.news.listLatestNews();
console.log(data[0]?.title, data[0]?.author);
```

## List articles (paginated)

```ts
type PublisherArticleSummary = {
  pk: number;
  title: string;
  type: PublisherArticleType;
  banner: string;
  banner_zoom: boolean;
  recap: string;
  visible: boolean;
  start_date: string;
  end_date: string | null;
  pinned: boolean;
  has_content: boolean;
  published_at: string;
};
```

`results` is a **record**, not an array. Pages are 0-indexed — see [Pagination](/api/cookbook/pagination#news-articles).

```ts
let page = 0;

for (;;) {
  const { data } = await client.news.listArticles("blog", { page });

  for (const [pk, article] of Object.entries(data.results)) {
    console.log(pk, article.title, article.published_at);
  }

  if (data.controller.next === null) break;
  page = data.controller.next;
}
```

Banner paths are relative CDN assets — resolve with [`assetUrl`](/api/cookbook/cdn-assets):

```ts
import { assetUrl } from "@wynnjs/api";

const bannerUrl = assetUrl(article.banner);
```

## Fetch one article

`pk` may be a numeric id or slug from `listArticles`.

```ts
type PublisherArticle = {
  id: number;
  type: PublisherArticleType;
  title: string;
  recap: string;
  banner: string;
  content: Array<{
    id: string;
    type: string;
    focus: boolean;
    content: string | { question: string; answers: Record<string, string> /* … */ };
    discord: boolean;
    website: boolean;
  }>;
  published_at: string;
  start_date: string;
  end_date: string | null;
  likes: number;
  // …discord / visibility / poll fields
};
```

```ts
const { data: page } = await client.news.listArticles("article", { page: 0 });
const pk = Object.keys(page.results)[0]!;

const { data: article } = await client.news.fetchArticle("article", pk);
console.log(article.title, article.content.length);
```

## Videos

```ts
const { data: videos } = await client.news.listVideos();
console.log(Object.keys(videos).length);
```

## Related

- [Pagination cookbook](/api/cookbook/pagination)
- [CDN assets cookbook](/api/cookbook/cdn-assets)
- Runnable sample: [`examples/news.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/news.ts)
