import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { describe, expect, it } from "vitest";

import { WynnApiError, createWynnApiError, toWynnApiError } from "./errors";

function axiosError(status: number, data: unknown): AxiosError {
  const response = {
    status,
    statusText: String(status),
    data,
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  } satisfies Partial<AxiosResponse>;

  return new AxiosError(
    "request failed",
    "ERR_BAD_REQUEST",
    response.config,
    undefined,
    response as AxiosResponse,
  );
}

describe("createWynnApiError", () => {
  it("creates typed NotFound errors", () => {
    const error = createWynnApiError(
      {
        error: "NotFound",
        detail: "Resource not found.",
        code: 404,
      },
      404,
    );

    expect(error).toBeInstanceOf(WynnApiError.NotFound);
    expect(error.name).toBe("NotFound");
    expect(error.status).toBe(404);
    expect(error.detail).toBe("Resource not found.");
  });

  it("creates MultipleObjectsReturned with required objects", () => {
    const error = createWynnApiError(
      {
        error: "MultipleObjectsReturned",
        detail: "Query returned multiple results.",
        code: 300,
        objects: {
          "00000000-0000-4000-8000-000000000001": {
            username: "ExamplePlayer",
          },
        },
      },
      300,
    );

    expect(error).toBeInstanceOf(WynnApiError.MultipleObjectsReturned);
    expect(error.objects).toEqual({
      "00000000-0000-4000-8000-000000000001": {
        username: "ExamplePlayer",
      },
    });
  });

  it("falls back to base WynnApiError for unknown error names", () => {
    const error = createWynnApiError(
      {
        error: "SomeFutureError",
        detail: "Unhandled error type",
        code: 418,
      },
      418,
    );

    expect(error).toBeInstanceOf(WynnApiError);
    expect(error.name).toBe("WynnApiError");
    expect(error.error).toBe("SomeFutureError");
  });

  it("uses the registry subclass when MultipleObjectsReturned lacks objects", () => {
    const error = createWynnApiError(
      {
        error: "MultipleObjectsReturned",
        detail: "Ambiguous result",
        code: 300,
      },
      300,
    );

    expect(error).toBeInstanceOf(WynnApiError.MultipleObjectsReturned);
    expect(error.name).toBe("MultipleObjectsReturned");
    expect(error.objects).toBeUndefined();
  });
});

describe("toWynnApiError", () => {
  it("maps axios error responses to typed WynnApiError instances", () => {
    const error = toWynnApiError(
      axiosError(404, {
        error: "NotFound",
        detail: "No player found.",
        code: 404,
      }),
    );

    expect(error).toBeInstanceOf(WynnApiError.NotFound);
    expect(error?.detail).toBe("No player found.");
  });

  it("maps 300 MultipleObjectsReturned responses", () => {
    const error = toWynnApiError(
      axiosError(300, {
        error: "MultipleObjectsReturned",
        detail: "Ambiguous player lookup",
        code: 300,
        objects: {
          "00000000-0000-4000-8000-000000000001": {
            username: "ExamplePlayer",
          },
        },
      }),
    );

    expect(error).toBeInstanceOf(WynnApiError.MultipleObjectsReturned);
    expect(error?.status).toBe(300);
  });

  it("returns null for non-axios errors", () => {
    expect(toWynnApiError(new Error("boom"))).toBeNull();
  });

  it("returns null when axios has no response body", () => {
    const networkError = new AxiosError("network", "ERR_NETWORK", {} as InternalAxiosRequestConfig);

    expect(toWynnApiError(networkError)).toBeNull();
  });

  it("returns null when the response body is not a Wynn error shape", () => {
    expect(toWynnApiError(axiosError(500, { message: "nope" }))).toBeNull();
  });
});
