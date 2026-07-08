import axios, { type AxiosInstance } from "axios";
import { authHeaders, type WynnAuth, type WynnClientOptions } from "./auth";
import { API_BASE_URL } from "./constants";
import { toWynnApiError } from "./errors";
import {
  parseRateLimit,
  toAxiosRequestConfig,
  type HeadersLike,
  type RequestConfig,
  type WynnHttpClient,
  type WynnResponse,
} from "./http";
import { AbilityModule } from "./modules/ability";
import { ClassesModule } from "./modules/classes";
import { GuildModule } from "./modules/guild";
import { ItemModule } from "./modules/item";
import { LeaderboardsModule } from "./modules/leaderboards";
import { MapModule } from "./modules/map";
import { NewsModule } from "./modules/news";
import { OAuthModule } from "./modules/oauth";
import { PlayerModule } from "./modules/player";
import { SearchModule } from "./modules/search";

/**
 * Typed Wynncraft API v3 client.
 *
 * Grouped by domain — `player`, `guild`, `item`, and so on. Every method
 * returns a {@link WynnResponse} with parsed rate-limit headers.
 *
 * @example
 * ```ts
 * const client = new WynnClient({
 *   auth: { type: "token", token: process.env.WYNN_API_TOKEN! },
 * });
 *
 * const { data, rateLimit } = await client.player.getPlayer("username");
 * ```
 */
export class WynnClient implements WynnHttpClient {
  /** Player profiles, characters, and online status. */
  readonly player: PlayerModule;
  /** Guild listings, seasons, and territory data. */
  readonly guild: GuildModule;
  /** Item database, search, recipes, and metadata. */
  readonly item: ItemModule;
  /** Ability trees, maps, and aspects. */
  readonly ability: AbilityModule;
  /** Playable classes and their metadata. */
  readonly classes: ClassesModule;
  /** Map markers, raids, camps, and world events. */
  readonly map: MapModule;
  /** Leaderboard types and rankings. */
  readonly leaderboards: LeaderboardsModule;
  /** Publisher articles, videos, and latest news. */
  readonly news: NewsModule;
  /** Global search across players, guilds, and items. */
  readonly search: SearchModule;
  /** OAuth identity and token exchange. */
  readonly oauth: OAuthModule;

  private readonly http: AxiosInstance;
  private readonly auth?: WynnAuth;

  /**
   * @param options - Client configuration. All fields are optional.
   * @param options.baseUrl - API base URL. Defaults to {@link API_BASE_URL}.
   * @param options.auth - Credentials for authenticated endpoints.
   * @param options.http - Custom Axios instance, e.g. for mocking in tests.
   */
  constructor(options: WynnClientOptions = {}) {
    this.auth = options.auth;

    this.http =
      options.http ??
      axios.create({
        baseURL: options.baseUrl ?? API_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(this.auth),
        },
      });

    this.http.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(toWynnApiError(error) ?? error),
    );

    this.player = new PlayerModule(this);
    this.guild = new GuildModule(this);
    this.item = new ItemModule(this);
    this.ability = new AbilityModule(this);
    this.classes = new ClassesModule(this);
    this.map = new MapModule(this);
    this.leaderboards = new LeaderboardsModule(this);
    this.news = new NewsModule(this);
    this.search = new SearchModule(this);
    this.oauth = new OAuthModule(this);
  }

  /**
   * Low-level request helper. Prefer module methods when available.
   *
   * @param config.path - API route path, e.g. `/player/foo`.
   * @param config.method - HTTP method. Defaults to `GET`.
   * @param config.params - Standard query parameters.
   * @param config.presenceParams - Wynncraft presence flags without values, e.g. `fullResult`.
   * @param config.data - Request body for `POST`/`PUT` requests.
   * @param config.headers - Additional request headers.
   * @returns Parsed response body and rate-limit metadata.
   */
  async request<T>(config: RequestConfig): Promise<WynnResponse<T>> {
    const response = await this.http.request<T>(toAxiosRequestConfig(config));

    return {
      data: response.data,
      rateLimit: parseRateLimit(response.headers as HeadersLike),
    };
  }

  /** Return the credentials passed at construction, if any. */
  getAuth(): WynnAuth | undefined {
    return this.auth;
  }
}
