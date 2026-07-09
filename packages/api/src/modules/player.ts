import type { WynnHttpClient, WynnResponse } from "../http";
import { type ListPlayerCharactersResult } from "../schemas/player/list-player-characters";
import { type GetCharacterAbilitiesResult } from "../schemas/player/get-character-abilities";
import { type GetPlayerOptions, type GetPlayerResult } from "../schemas/player/get-player";
import {
  type ListOnlinePlayersOptions,
  type ListOnlinePlayersResult,
} from "../schemas/player/list-online-players";
import { type WhoAmIResult } from "../schemas/player/whoami";

/** Player profiles, characters, and online status. */
export class PlayerModule {
  constructor(private readonly client: WynnHttpClient) {}

  /**
   * List currently online players.
   *
   * @param options.identifier - Filter by username or UUID.
   * @param options.server - Filter by server name or number.
   * @returns Online player count and username-to-server map.
   */
  async listOnlinePlayers(
    options: ListOnlinePlayersOptions = {},
  ): Promise<WynnResponse<ListOnlinePlayersResult>> {
    return this.client.request<ListOnlinePlayersResult>({
      path: "/player",
      params: options,
    });
  }

  /**
   * Fetch the authenticated player's profile.
   *
   * Requires credentials on the client.
   *
   * @returns UUID-keyed map of {@link PlayerIdentity}. The API returns a
   * single entry for the authenticated account.
   *
   * @example
   * ```ts
   * const { data } = await client.player.whoAmI();
   * const profile = Object.values(data)[0]!;
   * ```
   */
  async whoAmI(): Promise<WynnResponse<WhoAmIResult>> {
    return this.client.request<WhoAmIResult>({
      path: "/player/whoami",
    });
  }

  /**
   * Fetch a player profile by username.
   *
   * @param username - Wynncraft username.
   * @param options.fullResult - Include extended character data when `true`.
   * @returns Player profile and character summaries.
   */
  async getPlayer(
    username: string,
    options: GetPlayerOptions = {},
  ): Promise<WynnResponse<GetPlayerResult>> {
    return this.client.request<GetPlayerResult>({
      path: `/player/${encodeURIComponent(username)}`,
      presenceParams: options.fullResult ? ["fullResult"] : undefined,
    });
  }

  /**
   * List characters for a player.
   *
   * @param username - Wynncraft username.
   * @returns Character list keyed by UUID.
   */
  async listCharacters(username: string): Promise<WynnResponse<ListPlayerCharactersResult>> {
    return this.client.request<ListPlayerCharactersResult>({
      path: `/player/${encodeURIComponent(username)}/characters`,
    });
  }

  /**
   * Fetch ability assignments for a specific character.
   *
   * @param username - Wynncraft username.
   * @param characterUuid - Character UUID from {@link PlayerModule.listCharacters}.
   * @returns Ability map keyed by page.
   */
  async getCharacterAbilities(
    username: string,
    characterUuid: string,
  ): Promise<WynnResponse<GetCharacterAbilitiesResult>> {
    return this.client.request<GetCharacterAbilitiesResult>({
      path: `/player/${encodeURIComponent(username)}/characters/${encodeURIComponent(characterUuid)}/abilities`,
    });
  }
}
