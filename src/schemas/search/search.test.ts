import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { GlobalSearchResultSchema } from "./global-search";

describe("search schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses global search results", () => {
    expectDocExample(here, GlobalSearchResultSchema, "global-search");
  });
});
