import { describe, expect, it } from "vitest";

import { WynnApiErrorBodySchema, createWynnApiError } from "../../errors";
import { expectDocExample, loadFixture } from "../../testing/doc-example";
import { MultipleObjectsReturnedBodySchema } from "./multiple-objects-returned";

describe("error schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses the common error body shape", () => {
    expectDocExample(here, WynnApiErrorBodySchema, "not-found-error");
  });

  it("parses MultipleObjectsReturned bodies", () => {
    expectDocExample(here, MultipleObjectsReturnedBodySchema, "multiple-objects-returned-error");
  });

  it("creates typed errors from doc examples", () => {
    const notFound = createWynnApiError(loadFixture(here, "not-found-error"), 404);

    expect(notFound.name).toBe("NotFound");
    expect(notFound.detail).toBe("Resource not found.");

    const ambiguous = createWynnApiError(loadFixture(here, "multiple-objects-returned-error"), 300);

    expect(ambiguous.name).toBe("MultipleObjectsReturned");
    expect(ambiguous.objects).toBeDefined();
  });
});
