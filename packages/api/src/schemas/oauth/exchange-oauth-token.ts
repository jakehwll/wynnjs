import { z } from "zod";

export const ExchangeOAuthTokenOptionsSchema = z.object({
  code: z.string(),
  redirectUri: z.string(),
  clientId: z.string(),
  clientSecret: z.string().optional(),
  codeVerifier: z.string().optional(),
});

export type ExchangeOAuthTokenOptions = z.infer<typeof ExchangeOAuthTokenOptionsSchema>;

export const ExchangeOAuthTokenResultSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("bearer"),
  scope: z.string(),
});

export type ExchangeOAuthTokenResult = z.infer<typeof ExchangeOAuthTokenResultSchema>;

export function toOAuthTokenFormBody(options: ExchangeOAuthTokenOptions): URLSearchParams {
  const body = new URLSearchParams();

  body.set("grant_type", "authorization_code");
  body.set("code", options.code);
  body.set("redirect_uri", options.redirectUri);
  body.set("client_id", options.clientId);

  if (options.clientSecret) {
    body.set("client_secret", options.clientSecret);
  }

  if (options.codeVerifier) {
    body.set("code_verifier", options.codeVerifier);
  }

  return body;
}
