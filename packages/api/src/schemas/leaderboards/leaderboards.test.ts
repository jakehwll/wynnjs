import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { GetLeaderboardResultSchema } from "./get-leaderboard";
import { ListLeaderboardTypesResultSchema } from "./list-leaderboard-types";

describe("leaderboards schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses leaderboard types", () => {
    expectDocExample(here, ListLeaderboardTypesResultSchema, "list-leaderboard-types");
  });

  it("parses leaderboard entries", () => {
    expectDocExample(here, GetLeaderboardResultSchema, "get-leaderboard");
  });
});
