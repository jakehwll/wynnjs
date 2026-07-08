import type { WynnHttpClient, WynnResponse } from "../http";
import {
  type GetLeaderboardOptions,
  type GetLeaderboardResult,
} from "../schemas/leaderboards/get-leaderboard";
import { type ListLeaderboardTypesResult } from "../schemas/leaderboards/list-leaderboard-types";

/** Leaderboard types and rankings. */
export class LeaderboardsModule {
  constructor(private readonly client: WynnHttpClient) {}

  /** @returns Available leaderboard type identifiers. */
  async listTypes(): Promise<WynnResponse<ListLeaderboardTypesResult>> {
    return this.client.request<ListLeaderboardTypesResult>({
      path: "/leaderboards/types",
    });
  }

  /**
   * Fetch entries for a leaderboard type.
   *
   * @param lbType - Leaderboard type slug from {@link LeaderboardsModule.listTypes}.
   * @param options.resultLimit - Maximum number of entries to return.
   * @returns Leaderboard entries keyed by rank position.
   */
  async get(
    lbType: string,
    options: GetLeaderboardOptions = {},
  ): Promise<WynnResponse<GetLeaderboardResult>> {
    const { resultLimit } = options;

    return this.client.request<GetLeaderboardResult>({
      path: `/leaderboards/${encodeURIComponent(lbType)}`,
      params: resultLimit !== undefined ? { resultLimit } : undefined,
    });
  }
}
