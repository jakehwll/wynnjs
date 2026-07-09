# Constants

```ts
import { API_BASE_URL, CDN_BASE_URL, WYNNCRAFT_API_VERSION, assetUrl } from "@wynnjs/api";
```

| Export                  | Value / signature              | Description                                  |
| ----------------------- | ------------------------------ | -------------------------------------------- |
| `API_BASE_URL`          | `https://api.wynncraft.com/v3` | Default base URL for all requests            |
| `CDN_BASE_URL`          | `https://cdn.wynncraft.com`    | Base URL for CDN assets                      |
| `WYNNCRAFT_API_VERSION` | `3.7.2`                        | Wynncraft API release this client targets    |
| `assetUrl(path)`        | `(path: string) => string`     | Join a relative media path to `CDN_BASE_URL` |

## Versions

| Version                      | Meaning                             |
| ---------------------------- | ----------------------------------- |
| npm package (`package.json`) | Client release (`3.0.0`, …)         |
| `WYNNCRAFT_API_VERSION`      | Upstream API alignment (`3.7.2`, …) |

Bump the npm version for client changes. Update `WYNNCRAFT_API_VERSION` when schemas and methods are realigned to a new Wynncraft API release.

## CDN assets

Some responses include partial media paths. Complete them with `assetUrl`:

```ts
const url = assetUrl("nextgen/badges/rank_owner.svg");
// https://cdn.wynncraft.com/nextgen/badges/rank_owner.svg
```

Leading slashes on `path` are stripped. Recipes for player badges, news banners, and leaderboards: [CDN assets cookbook](/api/cookbook/cdn-assets).

See also the [official media URL notes](https://docs.wynncraft.com/welcome) and the [Changelog](/changelog).
