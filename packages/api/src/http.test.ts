import { describe, expect, it } from "vitest";

import { parseRateLimit, serializeRequestParams, toAxiosRequestConfig } from "./http";
import { callParamsSerializer } from "./testing/axios";

describe("serializeRequestParams", () => {
  it("returns an empty string when there are no params", () => {
    expect(serializeRequestParams(undefined)).toBe("");
  });

  it("serializes query params and skips undefined values", () => {
    expect(
      serializeRequestParams({
        identifier: "uuid",
        server: 1,
        ignored: undefined,
      }),
    ).toBe("identifier=uuid&server=1");
  });

  it("encodes special characters via URLSearchParams", () => {
    expect(serializeRequestParams({ only: "item & recipe" })).toBe("only=item+%26+recipe");
  });

  it("appends presence-only flags without values", () => {
    expect(serializeRequestParams(undefined, ["fullResult"])).toBe("fullResult");
  });

  it("combines query params and presence flags", () => {
    expect(serializeRequestParams({ identifier: "username" }, ["fullResult"])).toBe(
      "identifier=username&fullResult",
    );
  });

  it("encodes presence flag names", () => {
    expect(serializeRequestParams(undefined, ["full_result"])).toBe("full_result");
  });
});

describe("toAxiosRequestConfig", () => {
  it("delegates regular params to axios and customizes presence flags", () => {
    const axiosConfig = toAxiosRequestConfig({
      path: "/player/foo",
      presenceParams: ["fullResult"],
    });

    expect(axiosConfig.url).toBe("/player/foo");
    expect(axiosConfig.params).toEqual({});
    expect(callParamsSerializer(axiosConfig.paramsSerializer, {})).toBe("fullResult");
  });

  it("uses axios default serialization when no presence flags are set", () => {
    const axiosConfig = toAxiosRequestConfig({
      path: "/player",
      params: { identifier: "uuid" },
    });

    expect(axiosConfig.url).toBe("/player");
    expect(axiosConfig.params).toEqual({ identifier: "uuid" });
    expect(axiosConfig.paramsSerializer).toBeUndefined();
  });
});

describe("parseRateLimit", () => {
  it("parses complete rate limit headers", () => {
    const headers = {
      get: (name: string) => {
        const values: Record<string, string> = {
          "ratelimit-bucket": "PLAYER",
          "ratelimit-limit": "50",
          "ratelimit-remaining": "49",
          "ratelimit-reset": "1700000000",
        };
        return values[name];
      },
    };

    expect(parseRateLimit(headers)).toEqual({
      bucket: "PLAYER",
      limit: 50,
      remaining: 49,
      reset: 1700000000,
    });
  });

  it("returns null when any rate limit header is missing", () => {
    const headers = {
      get: (name: string) => (name === "ratelimit-bucket" ? "PLAYER" : undefined),
    };

    expect(parseRateLimit(headers)).toBeNull();
  });

  it("coerces numeric header values to strings and numbers", () => {
    const headers = {
      get: (name: string) => {
        const values: Record<string, string | number> = {
          "ratelimit-bucket": 123,
          "ratelimit-limit": "50",
          "ratelimit-remaining": "1",
          "ratelimit-reset": "99",
        };
        return values[name];
      },
    };

    expect(parseRateLimit(headers)).toEqual({
      bucket: "123",
      limit: 50,
      remaining: 1,
      reset: 99,
    });
  });
});
