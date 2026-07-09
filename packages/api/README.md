# @wynnjs/api

TypeScript client for the [Wynncraft API v3](https://docs.wynncraft.com/).

**Docs:** [jakehwll.github.io/wynnjs](https://jakehwll.github.io/wynnjs/)

Client release `3.0.0` · implements Wynncraft API **`3.7.2`** (`WYNNCRAFT_API_VERSION`).

## Install

```bash
npm install @wynnjs/api zod
```

`zod` is a peer dependency. Ships ESM and CommonJS. Requires TypeScript 5+ (or any runtime that can consume `.d.ts`).

## Quick start

```ts
import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();
const { data, rateLimit } = await client.classes.list();

console.log(Object.values(data).map((entry) => entry.name));
console.log(rateLimit?.remaining);
```

Auth, errors, cookbooks, and the full method reference are on the [docs site](https://jakehwll.github.io/wynnjs/). Upstream field behaviour: [docs.wynncraft.com](https://docs.wynncraft.com/).

Runnable samples: [`examples/`](./examples/).

## Contributing

See [CONTRIBUTING.md](https://github.com/jakehwll/wynnjs/blob/main/CONTRIBUTING.md).
