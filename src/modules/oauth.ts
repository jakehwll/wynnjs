import type { WynnHttpClient, WynnResponse } from "../http";
import {
  type ExchangeOAuthTokenOptions,
  type ExchangeOAuthTokenResult,
  toOAuthTokenFormBody,
} from "../schemas/oauth/exchange-oauth-token";
import { type GetOAuthIdentityResult } from "../schemas/oauth/get-oauth-identity";

/** OAuth identity and token exchange. */
export class OAuthModule {
  constructor(private readonly client: WynnHttpClient) {}

  /**
   * Fetch the authenticated OAuth user's identity.
   *
   * Requires `{ type: "oauth", accessToken }` credentials on the client.
   *
   * @returns OAuth user profile and linked Wynncraft account.
   */
  async me(): Promise<WynnResponse<GetOAuthIdentityResult>> {
    return this.client.request<GetOAuthIdentityResult>({
      path: "/oauth/me",
    });
  }

  /**
   * Exchange an authorization code for access tokens.
   *
   * @param options.code - Authorization code from the OAuth redirect.
   * @param options.redirectUri - Redirect URI registered with the OAuth app.
   * @param options.clientId - OAuth application client ID.
   * @param options.clientSecret - OAuth application client secret (confidential clients).
   * @param options.codeVerifier - PKCE code verifier, if the flow used PKCE.
   * @returns Access token and granted scopes.
   */
  async exchangeToken(
    options: ExchangeOAuthTokenOptions,
  ): Promise<WynnResponse<ExchangeOAuthTokenResult>> {
    return this.client.request<ExchangeOAuthTokenResult>({
      method: "POST",
      path: "/oauth/token",
      data: toOAuthTokenFormBody(options),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}
