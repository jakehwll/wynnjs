/**
 * Typed client for the [Wynncraft API v3](https://docs.wynncraft.com/).
 *
 * @packageDocumentation
 */

export type { WynnAuth, WynnClientOptions } from "./auth";
export type { WynnApiErrorBody, KnownWynnApiError, WynnErrorName } from "./errors";
export type {
  MultipleObjectsEntry,
  MultipleObjectsMap,
  MultipleObjectsReturnedBody,
} from "./schemas/errors/multiple-objects-returned";
export type { RateLimitInfo, RequestConfig, WynnHttpClient, WynnResponse } from "./http";

export { WynnClient } from "./client";
export { WynnApiError } from "./errors";
export { API_BASE_URL, CDN_BASE_URL, WYNNCRAFT_API_VERSION, assetUrl } from "./constants";

export type * from "./schemas";
export * from "./schemas";
