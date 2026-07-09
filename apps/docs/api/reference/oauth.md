# OAuth

`client.oauth` — identity and token exchange.

Official docs: [OAuth2](https://docs.wynncraft.com/oauth2/creating-an-application).

For a full walkthrough, see the [OAuth cookbook](/api/cookbook/oauth).

## When to use which

| Goal                             | Method          | Auth on client         |
| -------------------------------- | --------------- | ---------------------- |
| Linked profiles + granted scopes | `me`            | `{ type: "oauth", … }` |
| Code → access token              | `exchangeToken` | None (public POST)     |

`me()` does **not** accept API tokens or session cookies — only OAuth access tokens. For token/session identity use [`player.whoAmI`](/api/reference/player).

## `me()`

`GET /oauth/me` — **OAuth access token required**

```ts
type GetOAuthIdentityResult = {
  application: {
    client_id: string;
    scopes: string[];
  };
  profiles: Record<
    string, // uuid
    {
      username: string;
      primary: boolean;
      rank: string;
      supportRank: string | null;
      shortenedRank: string | null;
      legacyRankColour: { main: string; sub: string };
      rankBadge: string;
      accessRules: Record<string, string>;
    }
  >;
};
```

```ts
const client = new WynnClient({
  auth: { type: "oauth", accessToken: process.env.WYNN_OAUTH_ACCESS_TOKEN! },
});

const { data } = await client.oauth.me();
const primary = Object.values(data.profiles).find((p) => p.primary);
console.log(data.application.scopes, primary?.username);
```

## `exchangeToken(options)`

`POST /oauth/token` — no prior auth

Sends `application/x-www-form-urlencoded` via `toOAuthTokenFormBody`.

| Option          | Type     | Description                          |
| --------------- | -------- | ------------------------------------ |
| `code`          | `string` | Authorization code from the redirect |
| `redirectUri`   | `string` | Must match the registered redirect   |
| `clientId`      | `string` | Application client ID                |
| `clientSecret?` | `string` | Confidential clients                 |
| `codeVerifier?` | `string` | PKCE verifier for public clients     |

### Result

```ts
type ExchangeOAuthTokenResult = {
  access_token: string;
  token_type: "bearer";
  scope: string;
};
```

```ts
const { data } = await new WynnClient().oauth.exchangeToken({
  code: "...",
  redirectUri: "https://example.com/callback",
  clientId: process.env.WYNN_OAUTH_CLIENT_ID!,
  codeVerifier: process.env.WYNN_OAUTH_CODE_VERIFIER,
});

const authed = new WynnClient({
  auth: { type: "oauth", accessToken: data.access_token },
});
```

## Related

- [Authentication](/api/guide/authentication)
- [OAuth cookbook](/api/cookbook/oauth)
- [Session auth](/api/cookbook/session-auth) (different credential type)
- [CDN assets](/api/cookbook/cdn-assets) for `rankBadge`
