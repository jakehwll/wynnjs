import type { WynnHttpClient, WynnResponse } from "../http";
import { type GlobalSearchOptions, type GlobalSearchResult } from "../schemas/search/global-search";

/** Global search across players, guilds, and items. */
export class SearchModule {
  constructor(private readonly client: WynnHttpClient) {}

  /**
   * Search across Wynncraft resources.
   *
   * @param query - Free-text search query.
   * @param options.only - Limit results to a resource type, e.g. `player`, `guild`, or `item`.
   * @returns Matching players, guilds, items, and related entities.
   */
  async search(
    query: string,
    options: GlobalSearchOptions = {},
  ): Promise<WynnResponse<GlobalSearchResult>> {
    const { only } = options;

    return this.client.request<GlobalSearchResult>({
      path: `/search/${encodeURIComponent(query)}`,
      params: only !== undefined ? { only } : undefined,
    });
  }
}
