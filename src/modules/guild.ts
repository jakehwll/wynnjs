import type { WynnHttpClient, WynnResponse } from "../http";
import { type GetGuildOptions, type GuildResult } from "../schemas/guild/guild";
import { type ListGuildsOptions, type ListGuildsResult } from "../schemas/guild/list-guilds";
import { type ListGuildSeasonsResult } from "../schemas/guild/list-guild-seasons";
import { type ListGuildTerritoriesResult } from "../schemas/guild/list-guild-territories";

/** Guild listings, seasons, and territory data. */
export class GuildModule {
  constructor(private readonly client: WynnHttpClient) {}

  /**
   * List guilds with optional filters.
   *
   * @param options.identifier - Lookup key for list entries: `username` or `uuid`.
   * @returns Guild list keyed by the chosen identifier.
   */
  async listGuilds(options: ListGuildsOptions = {}): Promise<WynnResponse<ListGuildsResult>> {
    return this.client.request<ListGuildsResult>({
      path: "/guild/list/guild",
      params: options,
    });
  }

  /** @returns All guild territories. */
  async listTerritories(): Promise<WynnResponse<ListGuildTerritoriesResult>> {
    return this.client.request<ListGuildTerritoriesResult>({
      path: "/guild/list/territory",
    });
  }

  /** @returns Guild season history. */
  async listSeasons(): Promise<WynnResponse<ListGuildSeasonsResult>> {
    return this.client.request<ListGuildSeasonsResult>({
      path: "/guild/seasons",
    });
  }

  /**
   * Fetch a guild by name.
   *
   * @param name - Guild name.
   * @param options.identifier - Response key for members: `username` or `uuid`.
   * @returns Guild profile and member data.
   */
  async getGuild(name: string, options: GetGuildOptions = {}): Promise<WynnResponse<GuildResult>> {
    return this.client.request<GuildResult>({
      path: `/guild/${encodeURIComponent(name)}`,
      params: options,
    });
  }

  /**
   * Fetch a guild by tag prefix.
   *
   * @param prefix - Guild tag prefix, e.g. `ABC`.
   * @param options.identifier - Response key for members: `username` or `uuid`.
   * @returns Guild profile and member data.
   */
  async getGuildByPrefix(
    prefix: string,
    options: GetGuildOptions = {},
  ): Promise<WynnResponse<GuildResult>> {
    return this.client.request<GuildResult>({
      path: `/guild/prefix/${encodeURIComponent(prefix)}`,
      params: options,
    });
  }

  /**
   * Fetch a guild by UUID.
   *
   * @param uuid - Guild UUID.
   * @param options.identifier - Response key for members: `username` or `uuid`.
   * @returns Guild profile and member data.
   */
  async getGuildByUuid(
    uuid: string,
    options: GetGuildOptions = {},
  ): Promise<WynnResponse<GuildResult>> {
    return this.client.request<GuildResult>({
      path: `/guild/uuid/${encodeURIComponent(uuid)}`,
      params: options,
    });
  }
}
