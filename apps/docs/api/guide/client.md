# Client

`WynnClient` is the entry point. Methods are grouped by domain — `player`, `guild`, `item`, and so on. Prefer those over the low-level `request()` helper.

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient({
  // baseUrl?: string
  // auth?: WynnAuth
  // http?: AxiosInstance
});
```

## Options

| Option    | Type                                    | Description                                                                      |
| --------- | --------------------------------------- | -------------------------------------------------------------------------------- |
| `baseUrl` | `string`                                | Override [`API_BASE_URL`](/api/guide/constants) (`https://api.wynncraft.com/v3`) |
| `auth`    | [`WynnAuth`](/api/guide/authentication) | Credentials for authenticated endpoints                                          |
| `http`    | `AxiosInstance`                         | Custom Axios instance (useful for tests and mocks)                               |

## Modules

| Module       | Property              | Docs                               |
| ------------ | --------------------- | ---------------------------------- |
| Player       | `client.player`       | [API](/api/reference/player)       |
| Guild        | `client.guild`        | [API](/api/reference/guild)        |
| Item         | `client.item`         | [API](/api/reference/item)         |
| Ability      | `client.ability`      | [API](/api/reference/ability)      |
| Classes      | `client.classes`      | [API](/api/reference/classes)      |
| Map          | `client.map`          | [API](/api/reference/map)          |
| Leaderboards | `client.leaderboards` | [API](/api/reference/leaderboards) |
| News         | `client.news`         | [API](/api/reference/news)         |
| Search       | `client.search`       | [API](/api/reference/search)       |
| OAuth        | `client.oauth`        | [API](/api/reference/oauth)        |

## Calling conventions

- Path parameters come first, options second: `client.player.getPlayer(username, options?)`
- Presence-only Wynncraft flags (`fullResult`, `static`, …) are booleans in options — see [Responses](/api/guide/responses#presence-params)
- Path segments are URL-encoded for you
- Every method returns `Promise<WynnResponse<T>>`

## Low-level `request()`

For routes the modules do not cover yet:

```ts
const { data, rateLimit } = await client.request<{ ok: boolean }>({
  path: "/some/route",
  method: "GET",
  params: { page: 0 },
  presenceParams: ["fullResult"],
});
```

| Field            | Description                                    |
| ---------------- | ---------------------------------------------- |
| `path`           | Path under the API base (leading `/` optional) |
| `method`         | HTTP method (default `GET`)                    |
| `params`         | Normal query params                            |
| `presenceParams` | Query flags sent without values                |
| `data`           | Request body                                   |
| `headers`        | Extra headers                                  |

## Helpers

```ts
client.getAuth(); // WynnAuth | undefined
```
