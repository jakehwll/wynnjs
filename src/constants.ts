/** Base URL for all Wynncraft API v3 requests. */
export const API_BASE_URL = "https://api.wynncraft.com/v3";

/** Wynncraft API release this client targets. Independent from the npm package version. */
export const WYNNCRAFT_API_VERSION = "3.7.2";

/** Base URL for Wynncraft CDN assets. */
export const CDN_BASE_URL = "https://cdn.wynncraft.com";

/**
 * Build a full CDN URL from a relative asset path.
 *
 * @param path - Asset path, with or without a leading slash.
 * @returns Absolute CDN URL.
 */
export function assetUrl(path: string): string {
  return `${CDN_BASE_URL}/${path.replace(/^\//, "")}`;
}
