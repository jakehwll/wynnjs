# @wynnjs/api

Typed TypeScript client for the [Wynncraft API v3](https://docs.wynncraft.com/welcome). Covers the public endpoints with request options, response types, Zod schemas, and rate-limit metadata.

These pages document the **client**. Field-level API behaviour lives on [docs.wynncraft.com](https://docs.wynncraft.com/welcome).

::: tip Versions
The npm package version (currently `3.0.0`) is independent from the Wynncraft API release this client targets — see `WYNNCRAFT_API_VERSION` (`3.7.2`).
:::

## Install

::: code-group

```sh [npm]
npm install @wynnjs/api zod
```

```sh [yarn]
yarn add @wynnjs/api zod
```

```sh [pnpm]
pnpm add @wynnjs/api zod
```

```sh [bun]
bun add @wynnjs/api zod
```

```sh [deno]
deno add npm:@wynnjs/api npm:zod
```

:::

`zod` is a peer dependency. The client uses it for error parsing and exports schemas so you can validate responses when you want. npm 7+, pnpm, and Bun install peers automatically.

Requires TypeScript 5+ (or any runtime that can consume `.d.ts` files). Ships ESM and CommonJS.

## Quick start

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();
const { data, rateLimit } = await client.classes.list();

console.log(Object.values(data).map((entry) => entry.name));
console.log(rateLimit?.remaining);
```

Every module method returns a [`WynnResponse`](/api/guide/responses):

```ts
{
  data: T;
  rateLimit: RateLimitInfo | null;
}
```

## What next

| Topic                                       | Why                                     |
| ------------------------------------------- | --------------------------------------- |
| [Client](/api/guide/client)                 | Options, modules, low-level `request()` |
| [Authentication](/api/guide/authentication) | Tokens, OAuth, sessions                 |
| [Responses](/api/guide/responses)           | Rate limits, pagination, presence flags |
| [Errors](/api/guide/errors)                 | Typed `WynnApiError` subclasses         |
| [Schemas](/api/guide/schemas)               | Optional Zod validation                 |
| [Examples](/api/guide/examples)             | Copy-paste samples                      |
| [API reference](/api/reference/player)      | Method-by-method coverage               |

## Cookbooks

| Recipe                                    | Page                                                  |
| ----------------------------------------- | ----------------------------------------------------- |
| Walk every page of search results         | [Pagination](/api/cookbook/pagination)                |
| Resolve `MultipleObjectsReturned`         | [Ambiguous matches](/api/cookbook/ambiguous-matches)  |
| OAuth code → token → `me()`               | [OAuth](/api/cookbook/oauth)                          |
| Session cookie auth                       | [Session auth](/api/cookbook/session-auth)            |
| Stay under RPM                            | [Rate limits](/api/cookbook/rate-limits)              |
| Recipe `full_result` vs item `fullResult` | [Recipe fullResult](/api/cookbook/recipe-full-result) |
| Resolve CDN media paths                   | [CDN assets](/api/cookbook/cdn-assets)                |

## Releases

See the [Changelog](/changelog) for client versions. Runtime API alignment is `WYNNCRAFT_API_VERSION` — [Constants](/api/guide/constants).
