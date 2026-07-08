import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { ItemStaticMetadataSchema } from "./get-item-metadata";
import { ListItemSetsResultSchema } from "./list-item-sets";
import { ListItemsResultSchema } from "./list-items";
import { ListRecipesResultSchema } from "./list-recipes";
import { QuickSearchItemsResultSchema } from "./quick-search-items";
import { SearchItemsResultSchema } from "./search-items";
import { SearchRecipesResultSchema } from "./search-recipes";

describe("item schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses item database page", () => {
    expectDocExample(here, ListItemsResultSchema, "list-items");
  });

  it("parses item search results", () => {
    expectDocExample(here, SearchItemsResultSchema, "search-items");
  });

  it("parses quick item search results", () => {
    expectDocExample(here, QuickSearchItemsResultSchema, "quick-search-items");
  });

  it("parses static item metadata", () => {
    expectDocExample(here, ItemStaticMetadataSchema, "get-item-metadata");
  });

  it("parses item sets", () => {
    expectDocExample(here, ListItemSetsResultSchema, "list-item-sets");
  });

  it("parses recipe database page", () => {
    expectDocExample(here, ListRecipesResultSchema, "list-recipes");
  });

  it("parses recipe search results", () => {
    expectDocExample(here, SearchRecipesResultSchema, "search-recipes");
  });
});
