import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { FetchPublisherArticleResultSchema } from "./fetch-publisher-article";
import { ListLatestNewsResultSchema } from "./list-latest-news";
import { ListPublisherArticlesResultSchema } from "./list-publisher-articles";
import { ListPublisherVideosResultSchema } from "./list-publisher-videos";

describe("news schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses a published article", () => {
    expectDocExample(here, FetchPublisherArticleResultSchema, "fetch-article");
  });

  it("parses published articles list", () => {
    expectDocExample(here, ListPublisherArticlesResultSchema, "list-articles");
  });

  it("parses featured videos", () => {
    expectDocExample(here, ListPublisherVideosResultSchema, "list-videos");
  });

  it("parses legacy news feed", () => {
    expectDocExample(here, ListLatestNewsResultSchema, "list-latest-news");
  });
});
