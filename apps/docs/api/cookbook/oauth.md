# OAuth end to end

Use OAuth when you need a **user-delegated** token (scopes, linked profiles). For bots and servers, prefer an [API token](/api/guide/authentication) instead.

Official setup: [Creating an application](https://docs.wynncraft.com/oauth2/creating-an-application).

## 1. Send the user to authorize

Build the authorize URL with your client id, redirect URI, scopes, and (for public clients) a PKCE `code_challenge`. Store the matching `code_verifier` for the callback.

## 2. Exchange the code

`exchangeToken` does **not** need prior auth. It posts `application/x-www-form-urlencoded`.

```ts
import { WynnClient } from "@wynnjs/api";

const bare = new WynnClient();

const { data: tokens } = await bare.oauth.exchangeToken({
  code: process.env.WYNN_OAUTH_CODE!,
  redirectUri: process.env.WYNN_OAUTH_REDIRECT_URI!,
  clientId: process.env.WYNN_OAUTH_CLIENT_ID!,
  // Confidential app:
  clientSecret: process.env.WYNN_OAUTH_CLIENT_SECRET,
  // Public / PKCE app:
  codeVerifier: process.env.WYNN_OAUTH_CODE_VERIFIER,
});

// { access_token, token_type: "bearer", scope }
```

## 3. Call as that user

```ts
const client = new WynnClient({
  auth: { type: "oauth", accessToken: tokens.access_token },
});

const { data: identity } = await client.oauth.me();

console.log(identity.application.scopes);

for (const [uuid, profile] of Object.entries(identity.profiles)) {
  console.log(uuid, profile.username, profile.primary);
}
```

`oauth.me()` requires `{ type: "oauth", accessToken }`. An API token will not work here.

## 4. Use the same client for other authed routes

Once constructed with the OAuth access token, other auth-required methods (e.g. `player.whoAmI()`) use the same credentials.

```ts
const { data: whoami } = await client.player.whoAmI();
const me = Object.values(whoami)[0];
console.log(me?.username);
```

## Checklist

| Step                 | Client method         | Auth on client     |
| -------------------- | --------------------- | ------------------ |
| Exchange code        | `oauth.exchangeToken` | none               |
| Read identity        | `oauth.me`            | OAuth access token |
| Authed player routes | `player.whoAmI`, …    | OAuth access token |

Store tokens like secrets. Never commit `code`, `clientSecret`, or `access_token`.
