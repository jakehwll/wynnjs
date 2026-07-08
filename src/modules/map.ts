import type { WynnHttpClient, WynnResponse } from "../http";
import { type GetQuestCountResult } from "../schemas/map/get-quest-count";
import { type ListGatheringNodesResult } from "../schemas/map/list-gathering-nodes";
import { type ListMapMarkersResult } from "../schemas/map/list-map-markers";
import { type ListMapCampsOptions, type ListMapCampsResult } from "../schemas/map/list-map-camps";
import {
  type ListMapLootPoolsOptions,
  type ListMapLootPoolsResult,
} from "../schemas/map/list-map-loot-pools";
import { type ListMapRaidsOptions, type ListMapRaidsResult } from "../schemas/map/list-map-raids";
import { type ListPlayerLocationsResult } from "../schemas/map/list-player-locations";
import { type ListWorldEventsResult } from "../schemas/map/list-world-events";

/** Map markers, raids, camps, and world events. */
export class MapModule {
  constructor(private readonly client: WynnHttpClient) {}

  /** @returns Live player locations on the world map. */
  async listPlayerLocations(): Promise<WynnResponse<ListPlayerLocationsResult>> {
    return this.client.request<ListPlayerLocationsResult>({
      path: "/map/locations/player",
    });
  }

  /** @returns Map markers such as NPCs, dungeons, and points of interest. */
  async listMarkers(): Promise<WynnResponse<ListMapMarkersResult>> {
    return this.client.request<ListMapMarkersResult>({
      path: "/map/locations/markers",
    });
  }

  /** @returns Currently active world events. */
  async listWorldEvents(): Promise<WynnResponse<ListWorldEventsResult>> {
    return this.client.request<ListWorldEventsResult>({
      path: "/map/world-events",
    });
  }

  /**
   * List camps.
   *
   * @param options.level - Filter to camps at a specific combat level.
   * @returns Camp definitions and loot pool contents.
   */
  async listCamps(options: ListMapCampsOptions = {}): Promise<WynnResponse<ListMapCampsResult>> {
    const { level } = options;

    return this.client.request<ListMapCampsResult>({
      path: "/map/camps",
      params: level !== undefined ? { level } : undefined,
    });
  }

  /**
   * List raids.
   *
   * @param options.level - Filter to raids at a specific combat level.
   * @returns Raid definitions and loot pool contents.
   */
  async listRaids(options: ListMapRaidsOptions = {}): Promise<WynnResponse<ListMapRaidsResult>> {
    const { level } = options;

    return this.client.request<ListMapRaidsResult>({
      path: "/map/raids",
      params: level !== undefined ? { level } : undefined,
    });
  }

  /**
   * List loot pools.
   *
   * @param options.level - Filter to loot pools at a specific combat level.
   * @returns Loot pool definitions and contents.
   */
  async listLootPools(
    options: ListMapLootPoolsOptions = {},
  ): Promise<WynnResponse<ListMapLootPoolsResult>> {
    const { level } = options;

    return this.client.request<ListMapLootPoolsResult>({
      path: "/map/loot-pools",
      params: level !== undefined ? { level } : undefined,
    });
  }

  /** @returns Gathering node locations across the map. */
  async listGatheringNodes(): Promise<WynnResponse<ListGatheringNodesResult>> {
    return this.client.request<ListGatheringNodesResult>({
      path: "/map/gathering-nodes",
    });
  }

  /** @returns Quest completion counts across the map. */
  async getQuestCount(): Promise<WynnResponse<GetQuestCountResult>> {
    return this.client.request<GetQuestCountResult>({
      path: "/map/quests",
    });
  }
}
