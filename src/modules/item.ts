import type { WynnHttpClient, WynnResponse } from "../http";
import {
  type GetItemMetadataOptions,
  type GetItemMetadataResult,
} from "../schemas/item/get-item-metadata";
import { type ListItemsOptions, type ListItemsResult } from "../schemas/item/list-items";
import { type ListItemSetsResult } from "../schemas/item/list-item-sets";
import { type ListRecipesOptions, type ListRecipesResult } from "../schemas/item/list-recipes";
import { type QuickSearchItemsResult } from "../schemas/item/quick-search-items";
import {
  type ItemSearchRequest,
  type SearchItemsOptions,
  type SearchItemsResult,
} from "../schemas/item/search-items";
import {
  type RecipeSearchRequest,
  type SearchRecipesOptions,
  type SearchRecipesResult,
} from "../schemas/item/search-recipes";

/** Item database, search, recipes, and metadata. */
export class ItemModule {
  constructor(private readonly client: WynnHttpClient) {}

  /**
   * List items from the item database.
   *
   * @param options.page - Page number for paginated results.
   * @param options.fullResult - Include full item data when `true`.
   * @returns Paginated item list.
   */
  async listItems(options: ListItemsOptions = {}): Promise<WynnResponse<ListItemsResult>> {
    const { page, fullResult } = options;

    return this.client.request<ListItemsResult>({
      path: "/item/database",
      params: page !== undefined ? { page } : undefined,
      presenceParams: fullResult ? ["fullResult"] : undefined,
    });
  }

  /**
   * Search items with structured filters.
   *
   * @param filters - Search criteria such as `type`, `tier`, `levelRange`, and `identifications`.
   * @param options.page - Page number for paginated results.
   * @param options.fullResult - Include full item data when `true`.
   * @returns Paginated matching items.
   */
  async searchItems(
    filters: ItemSearchRequest = {},
    options: SearchItemsOptions = {},
  ): Promise<WynnResponse<SearchItemsResult>> {
    const { page, fullResult } = options;

    return this.client.request<SearchItemsResult>({
      method: "POST",
      path: "/item/search",
      params: page !== undefined ? { page } : undefined,
      presenceParams: fullResult ? ["fullResult"] : undefined,
      data: filters,
    });
  }

  /**
   * Quick text search for items by name.
   *
   * @param query - Free-text item name query.
   * @returns Matching items keyed by internal name.
   */
  async quickSearchItems(query: string): Promise<WynnResponse<QuickSearchItemsResult>> {
    return this.client.request<QuickSearchItemsResult>({
      path: `/item/search/${encodeURIComponent(query)}`,
    });
  }

  /**
   * List recipes from the recipe database.
   *
   * @param options.page - Page number for paginated results.
   * @param options.fullResult - Include full recipe data when `true`.
   * @returns Paginated recipe list.
   */
  async listRecipes(options: ListRecipesOptions = {}): Promise<WynnResponse<ListRecipesResult>> {
    const { page, fullResult } = options;

    return this.client.request<ListRecipesResult>({
      path: "/item/recipe/database",
      params: page !== undefined ? { page } : undefined,
      presenceParams: fullResult ? ["full_result"] : undefined,
    });
  }

  /**
   * Search recipes with structured filters.
   *
   * @param filters - Search criteria such as `type`, `skill`, `materials`, and `level`.
   * @param options.page - Page number for paginated results.
   * @param options.fullResult - Include full recipe data when `true`.
   * @returns Paginated matching recipes.
   */
  async searchRecipes(
    filters: RecipeSearchRequest = {},
    options: SearchRecipesOptions = {},
  ): Promise<WynnResponse<SearchRecipesResult>> {
    const { page, fullResult } = options;

    return this.client.request<SearchRecipesResult>({
      method: "POST",
      path: "/item/recipe/search",
      params: page !== undefined ? { page } : undefined,
      presenceParams: fullResult ? ["full_result"] : undefined,
      data: filters,
    });
  }

  /**
   * Fetch item metadata.
   *
   * @param options.static - Include static value maps when `true`.
   * @returns Filter definitions, tiers, and identification metadata.
   */
  async getMetadata(
    options: GetItemMetadataOptions = {},
  ): Promise<WynnResponse<GetItemMetadataResult>> {
    return this.client.request<GetItemMetadataResult>({
      path: "/item/metadata",
      presenceParams: options.static ? ["static"] : undefined,
    });
  }

  /** @returns All item sets. */
  async listSets(): Promise<WynnResponse<ListItemSetsResult>> {
    return this.client.request<ListItemSetsResult>({
      path: "/item/sets",
    });
  }
}
