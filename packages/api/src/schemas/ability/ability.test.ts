import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { GetAbilityMapResultSchema } from "./get-ability-map";
import { GetAbilityTreeResultSchema } from "./get-ability-tree";
import { ListAspectsResultSchema } from "./list-aspects";

describe("ability schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses ability tree", () => {
    expectDocExample(here, GetAbilityTreeResultSchema, "get-ability-tree");
  });

  it("parses ability map", () => {
    expectDocExample(here, GetAbilityMapResultSchema, "get-ability-map");
  });

  it("parses aspects list", () => {
    expectDocExample(here, ListAspectsResultSchema, "list-aspects");
  });
});
