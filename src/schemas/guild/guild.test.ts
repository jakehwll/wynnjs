import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { GuildResultSchema } from "./guild";
import { ListGuildSeasonsResultSchema } from "./list-guild-seasons";
import { ListGuildTerritoriesResultSchema } from "./list-guild-territories";
import { ListGuildsByNameResultSchema, ListGuildsByUuidResultSchema } from "./list-guilds";

describe("guild schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses guild list keyed by name", () => {
    expectDocExample(here, ListGuildsByNameResultSchema, "list-guilds");
  });

  it("parses guild list keyed by uuid", () => {
    expectDocExample(here, ListGuildsByUuidResultSchema, "list-guilds-uuid");
  });

  it("parses guild detail", () => {
    expectDocExample(here, GuildResultSchema, "get-guild");
  });

  it("parses territory list", () => {
    expectDocExample(here, ListGuildTerritoriesResultSchema, "list-guild-territories");
  });

  it("parses season list", () => {
    expectDocExample(here, ListGuildSeasonsResultSchema, "list-guild-seasons");
  });
});
