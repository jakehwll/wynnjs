# Schemas

`@wynnjs/api` ships Zod schemas alongside inferred TypeScript types. They are optional for consumers — the client already types `data` for you — but useful when you want runtime validation or to share shapes outside the client.

```ts
import { GetPlayerResultSchema, type GetPlayerResult } from "@wynnjs/api";

const { data } = await client.player.getPlayer("Salted");

// typed already
const profile: GetPlayerResult = data;

// optional runtime check
const parsed = GetPlayerResultSchema.parse(data);
```

## Peer dependency

Install `zod` next to `@wynnjs/api`. The client depends on Zod **^4.4.0**.

Schemas are re-exported from the package root (`export * from "./schemas"`), so you rarely need deep imports.

## When to validate

- Untrusted transforms between the client and your own storage
- Narrowing discriminated unions (e.g. item metadata with / without `static`)
- Sharing the same schema between the client and a separate worker or edge handler

For normal `WynnClient` usage, TypeScript types are enough.

## Naming

Schemas follow `*Schema` / result type pairs, for example:

| Schema                           | Type                       |
| -------------------------------- | -------------------------- |
| `GetPlayerResultSchema`          | `GetPlayerResult`          |
| `ItemSchema`                     | `Item`                     |
| `ItemSearchRequestSchema`        | `ItemSearchRequest`        |
| `PaginationControllerSchema`     | `PaginationController`     |
| `ExchangeOAuthTokenResultSchema` | `ExchangeOAuthTokenResult` |

Hover types in your editor, or import `type { ... } from "@wynnjs/api"`, for the full surface. Abridged shapes for common results live on the [Player](/api/reference/player) and [Item](/api/reference/item) reference pages.
