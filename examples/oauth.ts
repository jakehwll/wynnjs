import { WynnClient } from "@wynnjs/api";

// OAuth access token from https://docs.wynncraft.com/docs/authentication
const client = new WynnClient({
  auth: { type: "oauth", accessToken: process.env.WYNN_OAUTH_ACCESS_TOKEN! },
});

const { data: identity } = await client.oauth.me();

console.log(identity.application.scopes);

for (const [uuid, profile] of Object.entries(identity.profiles)) {
  console.log(uuid, profile.username, profile.primary);
}

// Exchange an authorization code for an access token (run once after the OAuth redirect).
// const exchangeClient = new WynnClient();
// const { data: tokens } = await exchangeClient.oauth.exchangeToken({
//   code: process.env.WYNN_OAUTH_CODE!,
//   redirectUri: process.env.WYNN_OAUTH_REDIRECT_URI!,
//   clientId: process.env.WYNN_OAUTH_CLIENT_ID!,
//   clientSecret: process.env.WYNN_OAUTH_CLIENT_SECRET,
//   codeVerifier: process.env.WYNN_OAUTH_CODE_VERIFIER,
// });
//
// console.log(tokens.access_token, tokens.scope);
