import type { WynnHttpClient, WynnResponse } from "../http";
import { type PublisherArticleType } from "../schemas/news/article";
import { type FetchPublisherArticleResult } from "../schemas/news/fetch-publisher-article";
import { type ListLatestNewsResult } from "../schemas/news/list-latest-news";
import {
  type ListPublisherArticlesOptions,
  type ListPublisherArticlesResult,
} from "../schemas/news/list-publisher-articles";
import { type ListPublisherVideosResult } from "../schemas/news/list-publisher-videos";

/** Publisher articles, videos, and latest news. */
export class NewsModule {
  constructor(private readonly client: WynnHttpClient) {}

  /**
   * Fetch a single publisher article.
   *
   * @param articleType - Article category: `blog`, `event`, `giveaway`, `article`, or `poll`.
   * @param pk - Article primary key (numeric ID or slug).
   * @returns Full article content and metadata.
   */
  async fetchArticle(
    articleType: PublisherArticleType,
    pk: string | number,
  ): Promise<WynnResponse<FetchPublisherArticleResult>> {
    return this.client.request<FetchPublisherArticleResult>({
      path: `/publisher/articles/fetch/${encodeURIComponent(articleType)}/${encodeURIComponent(String(pk))}`,
    });
  }

  /**
   * List publisher articles of a given type.
   *
   * @param articleType - Article category: `blog`, `event`, `giveaway`, `article`, or `poll`.
   * @param options.page - Page number for paginated results.
   * @returns Paginated article summaries.
   */
  async listArticles(
    articleType: PublisherArticleType,
    options: ListPublisherArticlesOptions = {},
  ): Promise<WynnResponse<ListPublisherArticlesResult>> {
    const { page } = options;

    return this.client.request<ListPublisherArticlesResult>({
      path: `/publisher/articles/list/${encodeURIComponent(articleType)}`,
      params: page !== undefined ? { page } : undefined,
    });
  }

  /** @returns Publisher video listings. */
  async listVideos(): Promise<WynnResponse<ListPublisherVideosResult>> {
    return this.client.request<ListPublisherVideosResult>({
      path: "/publisher/videos/list",
    });
  }

  /** @returns Latest news feed entries. */
  async listLatestNews(): Promise<WynnResponse<ListLatestNewsResult>> {
    return this.client.request<ListLatestNewsResult>({
      path: "/latest-news",
    });
  }
}
