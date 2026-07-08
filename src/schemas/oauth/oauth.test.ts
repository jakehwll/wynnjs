import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { ExchangeOAuthTokenResultSchema } from "./exchange-oauth-token";
import { GetOAuthIdentityResultSchema } from "./get-oauth-identity";

describe("oauth schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses oauth identity", () => {
    expectDocExample(here, GetOAuthIdentityResultSchema, "oauth-me");
  });

  it("parses oauth token exchange", () => {
    expectDocExample(here, ExchangeOAuthTokenResultSchema, "exchange-oauth-token");
  });
});
