import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { GetClassResultSchema } from "./get-class";
import { ListClassesResultSchema } from "./list-classes";

describe("classes schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses class list", () => {
    expectDocExample(here, ListClassesResultSchema, "list-classes");
  });

  it("parses class detail", () => {
    expectDocExample(here, GetClassResultSchema, "get-class");
  });
});
