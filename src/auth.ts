import type { AxiosInstance } from "axios";

/**
 * Authentication credentials for endpoints that require a logged-in user.
 *
 * - `token` — API token issued from the Wynncraft developer portal
 * - `oauth` — OAuth2 access token
 * - `session` — browser session cookie (e.g. `PHPSESSID=...`)
 */
export type WynnAuth =
  | { type: "token"; /** API token from the Wynncraft developer portal. */ token: string }
  | { type: "oauth"; /** OAuth2 access token from an authorization flow. */ accessToken: string }
  | { type: "session"; /** Full session cookie header value. */ cookie: string };

/** Options for constructing a {@link WynnClient}. */
export type WynnClientOptions = {
  /** Override the default {@link API_BASE_URL}. */
  baseUrl?: string;
  /** Credentials for authenticated endpoints. */
  auth?: WynnAuth;
  /** Inject a custom Axios instance (useful for testing). */
  http?: AxiosInstance;
};

/**
 * Convert {@link WynnAuth} into HTTP headers for the Axios client.
 *
 * @param auth - Credentials, or `undefined` for unauthenticated requests.
 * @returns `Authorization` or `Cookie` header map. Empty when unauthenticated.
 */
export function authHeaders(auth: WynnAuth | undefined): Record<string, string> {
  if (!auth) {
    return {};
  }

  switch (auth.type) {
    case "token":
      return { Authorization: `Bearer ${auth.token}` };
    case "oauth":
      return { Authorization: `Bearer ${auth.accessToken}` };
    case "session":
      return { Cookie: auth.cookie };
  }
}
