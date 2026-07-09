import type { WynnHttpClient, WynnResponse } from "../http";
import { type ClassName, type GetClassResult } from "../schemas/classes/get-class";
import { type ListClassesResult } from "../schemas/classes/list-classes";

/** Playable classes and their metadata. */
export class ClassesModule {
  constructor(private readonly client: WynnHttpClient) {}

  /** @returns All playable classes. */
  async list(): Promise<WynnResponse<ListClassesResult>> {
    return this.client.request<ListClassesResult>({
      path: "/classes",
    });
  }

  /**
   * Fetch metadata for a single class.
   *
   * @param className - Class identifier, e.g. `mage` or `warrior`.
   * @returns Class stats, archetypes, and weapon types.
   */
  async getClass(className: ClassName): Promise<WynnResponse<GetClassResult>> {
    return this.client.request<GetClassResult>({
      path: `/classes/${encodeURIComponent(className)}`,
    });
  }
}
