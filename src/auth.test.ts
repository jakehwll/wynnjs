import { describe, expect, it } from "vitest";

import { authHeaders } from "./auth";

describe("authHeaders", () => {
  it("returns empty headers when auth is undefined", () => {
    expect(authHeaders(undefined)).toEqual({});
  });

  it("sets Bearer token for API tokens", () => {
    expect(authHeaders({ type: "token", token: "abc123" })).toEqual({
      Authorization: "Bearer abc123",
    });
  });

  it("sets Bearer token for OAuth access tokens", () => {
    expect(authHeaders({ type: "oauth", accessToken: "oauth-token" })).toEqual({
      Authorization: "Bearer oauth-token",
    });
  });

  it("sets Cookie header for session auth", () => {
    expect(authHeaders({ type: "session", cookie: "PHPSESSID=example" })).toEqual({
      Cookie: "PHPSESSID=example",
    });
  });
});
