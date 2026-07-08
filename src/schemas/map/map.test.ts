import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { GetQuestCountResultSchema } from "./get-quest-count";
import { ListGatheringNodesResultSchema } from "./list-gathering-nodes";
import { ListMapCampsResultSchema } from "./list-map-camps";
import { ListMapLootPoolsResultSchema } from "./list-map-loot-pools";
import { ListMapMarkersResultSchema } from "./list-map-markers";
import { ListMapRaidsResultSchema } from "./list-map-raids";
import { ListPlayerLocationsResultSchema } from "./list-player-locations";
import { ListWorldEventsResultSchema } from "./list-world-events";

describe("map schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses map markers", () => {
    expectDocExample(here, ListMapMarkersResultSchema, "list-map-markers");
  });

  it("parses player locations", () => {
    expectDocExample(here, ListPlayerLocationsResultSchema, "list-player-locations");
  });

  it("parses world events", () => {
    expectDocExample(here, ListWorldEventsResultSchema, "list-world-events");
  });

  it("parses map camps", () => {
    expectDocExample(here, ListMapCampsResultSchema, "list-map-camps");
  });

  it("parses map raids", () => {
    expectDocExample(here, ListMapRaidsResultSchema, "list-map-raids");
  });

  it("parses loot pools", () => {
    expectDocExample(here, ListMapLootPoolsResultSchema, "list-map-loot-pools");
  });

  it("parses gathering nodes", () => {
    expectDocExample(here, ListGatheringNodesResultSchema, "list-gathering-nodes");
  });

  it("parses quest count", () => {
    expectDocExample(here, GetQuestCountResultSchema, "get-quest-count");
  });
});
