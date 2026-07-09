# Item

`client.item` — item database, search, recipes, and metadata.

Official docs: [Item & Recipe](https://docs.wynncraft.com/modules/item-recipe/list-items).

## When to use which

| Goal                       | Method                          |
| -------------------------- | ------------------------------- |
| Browse / page the full DB  | `listItems`                     |
| Structured filters         | `searchItems`                   |
| Fuzzy name lookup          | `quickSearchItems`              |
| Recipe DB / search         | `listRecipes` / `searchRecipes` |
| Filter enums & static defs | `getMetadata`                   |
| Item sets                  | `listSets`                      |

Paginated endpoints return `{ controller, results }` — see [Pagination](/api/cookbook/pagination).

## Filters (`ItemSearchRequest`)

Scalars **or** arrays are accepted for most fields:

```ts
type ItemSearchRequest = {
  query?: string | null;
  type?: string | string[];
  tier?: string | string[];
  attackSpeed?: string | string[];
  levelRange?: number | number[];
  professions?: string | string[];
  identifications?: string | string[];
  majorIds?: string | string[];
};
```

```ts
const { data } = await client.item.searchItems(
  {
    type: ["wand", "relik"],
    tier: "legendary",
    levelRange: [80, 105],
  },
  { page: 0 },
);
```

## Item shape (abridged)

```ts
type Item = {
  displayName: string;
  internalName: string;
  type: string;
  subType: string;
  tier: string;
  attackSpeed?: string;
  averageDps?: number;
  requirements?: {
    level?: number;
    classRequirement?: string;
    strength?: number;
    dexterity?: number;
    intelligence?: number;
    defence?: number;
    agility?: number;
  };
  majorIds?: Record<string, string>;
  identifications?: Record<string, number | { min: number; raw: number; max: number }>;
  // icon, emblem, lore, powderSlots, …
};
```

## `listItems(options?)`

`GET /item/database`

| Option        | Type      | Description            |
| ------------- | --------- | ---------------------- |
| `page?`       | `number`  | 0-indexed              |
| `fullResult?` | `boolean` | Presence `?fullResult` |

## `searchItems(filters?, options?)`

`POST /item/search`

Same page options as `listItems`.

## `quickSearchItems(query)`

`GET /item/search/:query` — returns an `Item[]` (not paginated).

```ts
const { data } = await client.item.quickSearchItems("Nirvana");
```

## Recipes

`listRecipes` / `searchRecipes` mirror the item APIs, but `fullResult: true` is sent as **`?full_result`** on the wire. Details: [Recipe fullResult cookbook](/api/cookbook/recipe-full-result).

Recipe filters include `query`, `xp`, `type`, `skill`, `materials`, `level`, `durability`, `healthOrDamage`, `duration`, `basicDuration`.

## `getMetadata(options?)`

`GET /item/metadata`

| Option    | Type      | Description                                    |
| --------- | --------- | ---------------------------------------------- |
| `static?` | `boolean` | Presence `?static` — static filter definitions |

Return type is a discriminated union depending on `static`. Use this to populate filter UIs instead of hard-coding tiers / types.

```ts
const { data } = await client.item.getMetadata({ static: true });
console.log(Object.keys(data));
```

## `listSets()`

`GET /item/sets`

## Related

- [Pagination cookbook](/api/cookbook/pagination)
- Runnable sample: [`examples/item-search.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/item-search.ts)
