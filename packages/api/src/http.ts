import type { AxiosHeaderValue, AxiosRequestConfig } from "axios";

type HeadersLike = {
  get(name: string): AxiosHeaderValue | undefined;
};

export type { HeadersLike };

/** Parsed Wynncraft rate-limit headers from a response. */
export type RateLimitInfo = {
  bucket: string;
  limit: number;
  remaining: number;
  /** Unix timestamp when the bucket resets. */
  reset: number;
};

/** Successful API response with parsed rate-limit metadata. */
export type WynnResponse<T> = {
  data: T;
  rateLimit: RateLimitInfo | null;
};

/** Wynncraft request shape: axios fields plus route path and presence-only query flags. */
export type RequestConfig<D = unknown> = Pick<
  AxiosRequestConfig<D>,
  "method" | "data" | "headers" | "params"
> & {
  /** API route path, e.g. `/player/foo`. */
  path: string;
  /**
   * Query flags sent without values, e.g. `?fullResult`.
   * Wynncraft uses these for optional response expansions.
   */
  presenceParams?: string[];
};

/**
 * Serialize query params. Presence flags are appended without values (`?fullResult`).
 *
 * @param params - Standard key-value query parameters.
 * @param presenceParams - Flag names to append without values, e.g. `["fullResult"]`.
 * @returns URL-encoded query string.
 */
export function serializeRequestParams(
  params: AxiosRequestConfig["params"],
  presenceParams?: string[],
): string {
  const searchParams = new URLSearchParams();

  if (params != null && typeof params === "object" && !Array.isArray(params)) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        searchParams.set(key, String(value));
      }
    }
  }

  const baseQuery = searchParams.toString();
  if (!presenceParams?.length) {
    return baseQuery;
  }

  const presenceQuery = presenceParams.map((param) => encodeURIComponent(param)).join("&");

  return baseQuery ? `${baseQuery}&${presenceQuery}` : presenceQuery;
}

/**
 * Map a {@link RequestConfig} to an Axios request config.
 *
 * @param config - Wynncraft request shape with path and optional presence flags.
 * @returns Axios-compatible request config.
 */
export function toAxiosRequestConfig<D = unknown>(config: RequestConfig<D>): AxiosRequestConfig<D> {
  const hasPresence = Boolean(config.presenceParams?.length);

  return {
    method: config.method ?? "GET",
    url: config.path,
    params: hasPresence ? (config.params ?? {}) : config.params,
    paramsSerializer: hasPresence
      ? (params) => serializeRequestParams(params, config.presenceParams)
      : undefined,
    data: config.data,
    headers: config.headers,
  };
}

/** Minimal HTTP surface used by API modules. */
export interface WynnHttpClient {
  request<T>(config: RequestConfig): Promise<WynnResponse<T>>;
}

/**
 * Parse Wynncraft rate-limit headers from a response.
 *
 * @param headers - Response headers with a `get(name)` accessor.
 * @returns Parsed rate-limit info, or `null` when headers are missing.
 */
export function parseRateLimit(headers: HeadersLike): RateLimitInfo | null {
  const bucket = headers.get("ratelimit-bucket");
  const limit = headers.get("ratelimit-limit");
  const remaining = headers.get("ratelimit-remaining");
  const reset = headers.get("ratelimit-reset");

  if (!bucket || !limit || !remaining || !reset) {
    return null;
  }

  return {
    bucket: String(bucket),
    limit: Number(limit),
    remaining: Number(remaining),
    reset: Number(reset),
  };
}
