import type { WynnHttpClient, WynnResponse } from "../http";
import { type ClassTree } from "../schemas/shared/class-tree";
import { type GetAbilityMapResult } from "../schemas/ability/get-ability-map";
import { type GetAbilityTreeResult } from "../schemas/ability/get-ability-tree";
import { type ListAspectsResult } from "../schemas/ability/list-aspects";

/** Ability trees, maps, and aspects. */
export class AbilityModule {
  constructor(private readonly client: WynnHttpClient) {}

  /**
   * Fetch the ability tree layout for a class.
   *
   * @param tree - Class tree: `archer`, `warrior`, `assassin`, `mage`, or `shaman`.
   * @returns Ability tree nodes and connections.
   */
  async getTree(tree: ClassTree): Promise<WynnResponse<GetAbilityTreeResult>> {
    return this.client.request<GetAbilityTreeResult>({
      path: `/ability/tree/${encodeURIComponent(tree)}`,
    });
  }

  /**
   * Fetch the ability map for a class.
   *
   * @param tree - Class tree: `archer`, `warrior`, `assassin`, `mage`, or `shaman`.
   * @returns Ability map keyed by page.
   */
  async getMap(tree: ClassTree): Promise<WynnResponse<GetAbilityMapResult>> {
    return this.client.request<GetAbilityMapResult>({
      path: `/ability/map/${encodeURIComponent(tree)}`,
    });
  }

  /**
   * List all aspects for a class tree.
   *
   * @param tree - Class tree: `archer`, `warrior`, `assassin`, `mage`, or `shaman`.
   * @returns Aspect definitions for the given tree.
   */
  async listAspects(tree: ClassTree): Promise<WynnResponse<ListAspectsResult>> {
    return this.client.request<ListAspectsResult>({
      path: `/aspects/${encodeURIComponent(tree)}`,
    });
  }
}
