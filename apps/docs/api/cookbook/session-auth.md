# Session cookie auth

`{ type: "session", cookie }` sends a raw `Cookie` header. Use it when you already have a browser session (e.g. scraped `PHPSESSID=...` from an authenticated web login) and need the same identity on API calls.

Prefer [API tokens](/api/guide/authentication) or [OAuth](/api/cookbook/oauth) for new apps. Session cookies are brittle, user-specific, and easy to misuse.

## Shape

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient({
  auth: {
    type: "session",
    // Full Cookie header value — not just the session id name
    cookie: process.env.WYNN_SESSION_COOKIE!,
  },
});
```

The client sets:

```http
Cookie: <your cookie string>
```

Include the full header value you would send from the browser (`PHPSESSID=…` and any other required cookies, joined with `; ` if needed).

## What works

| Method               | Session auth                                     |
| -------------------- | ------------------------------------------------ |
| `player.whoAmI()`    | Yes — any `WynnAuth`                             |
| Other public modules | Yes (same as token) for higher RPM when accepted |
| `oauth.me()`         | **No** — needs `{ type: "oauth", accessToken }`  |

```ts
const { data } = await client.player.whoAmI();
const me = Object.values(data)[0];
console.log(me?.username);
```

## Failure modes

| Symptom                                     | Likely cause                                                                     |
| ------------------------------------------- | -------------------------------------------------------------------------------- |
| `InvalidTokenError` / `MalformedTokenError` | Wrong auth type or mangled cookie                                                |
| `Forbidden` / `CSRFError`                   | Session expired, missing CSRF context, or endpoint expects token/OAuth           |
| Works in browser, fails here                | Cookie incomplete (missing flags / companion cookies) or bound to another origin |

## Rules of thumb

- Never commit session cookies
- Rotate / invalidate when a user logs out
- Do not share one session across many servers — treat it like a password
- If you control the integration, switch to a developer API token or OAuth

## Related

- [Authentication](/api/guide/authentication)
- [OAuth cookbook](/api/cookbook/oauth)
- [Errors](/api/guide/errors)
