# Authentication

Pass `auth` when constructing the client. `WynnAuth` is a discriminated union of API tokens, OAuth access tokens, and session cookies.

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient({
  auth: { type: "token", token: process.env.WYNN_API_TOKEN! },
});
```

Authenticated callers get higher rate limits on the shared buckets — see the [official authentication docs](https://docs.wynncraft.com/authentication).

## Auth shapes

| Type    | Shape                            | Header                                |
| ------- | -------------------------------- | ------------------------------------- |
| Token   | `{ type: "token", token }`       | `Authorization: Bearer <token>`       |
| OAuth   | `{ type: "oauth", accessToken }` | `Authorization: Bearer <accessToken>` |
| Session | `{ type: "session", cookie }`    | `Cookie: <cookie>`                    |

### API token

Issued from the Wynncraft developer portal. Typical for server-side bots and tools.

```ts
const client = new WynnClient({
  auth: { type: "token", token: process.env.WYNN_API_TOKEN! },
});

const { data } = await client.player.whoAmI();
const me = Object.values(data)[0];
console.log(me?.username, me?.online);
```

### OAuth access token

For user-delegated access. Use `client.oauth.me()` with an OAuth token, and `client.oauth.exchangeToken()` to trade an authorization code for tokens (no prior auth required).

Step-by-step: [OAuth cookbook](/api/cookbook/oauth).

```ts
const client = new WynnClient({
  auth: { type: "oauth", accessToken: process.env.WYNN_OAUTH_ACCESS_TOKEN! },
});

const { data } = await client.oauth.me();
```

Token exchange (PKCE or client secret):

```ts
const { data: tokens } = await client.oauth.exchangeToken({
  code: "...",
  redirectUri: "https://example.com/callback",
  clientId: process.env.WYNN_OAUTH_CLIENT_ID!,
  // clientSecret?: string
  // codeVerifier?: string
});
```

### Session cookie

Browser session flows (e.g. `PHPSESSID=...`). Prefer tokens or OAuth for new integrations.

Deep dive: [Session auth cookbook](/api/cookbook/session-auth).

```ts
const client = new WynnClient({
  auth: { type: "session", cookie: process.env.WYNN_SESSION_COOKIE! },
});
```

## Auth-required endpoints

| Method                         | Required auth                    |
| ------------------------------ | -------------------------------- |
| `client.player.whoAmI()`       | Any `WynnAuth`                   |
| `client.oauth.me()`            | `{ type: "oauth", accessToken }` |
| `client.oauth.exchangeToken()` | None                             |

Missing or invalid credentials surface as typed errors such as `WynnApiError.Forbidden`, `InvalidTokenError`, or `MalformedTokenError` — see [Errors](/api/guide/errors).
