# Recipe `fullResult` vs item `fullResult`

Same client option name. **Different query flag on the wire.**

| API                                      | Client option      | Presence flag sent |
| ---------------------------------------- | ------------------ | ------------------ |
| Items (`listItems`, `searchItems`)       | `fullResult: true` | `?fullResult`      |
| Recipes (`listRecipes`, `searchRecipes`) | `fullResult: true` | `?full_result`     |

The client maps this for you. You always pass camelCase `fullResult` in TypeScript.

```ts
// Items → ?fullResult
await client.item.searchItems({ type: "wand" }, { page: 0, fullResult: true });

// Recipes → ?full_result
await client.item.searchRecipes({ type: "wand" }, { page: 0, fullResult: true });
```

## What it is (and is not)

- **Is:** a Wynncraft presence flag asking for an expanded payload on **that** request
- **Is not:** “return every page” — you still paginate with `page` / `controller.next` ([Pagination](/api/cookbook/pagination))

## Recipe search filters

```ts
type RecipeSearchRequest = {
  query?: string | string[];
  xp?: number | number[];
  type?: string | string[];
  skill?: string | string[];
  materials?: string | string[];
  level?: number | number[];
  durability?: number | number[];
  healthOrDamage?: number | number[];
  duration?: number | number[];
  basicDuration?: number | number[];
};
```

```ts
const { data } = await client.item.searchRecipes(
  { skill: "woodworking", level: [90, 105] },
  { page: 0, fullResult: true },
);

console.log(data.controller.count, data.results.length);
```

## Debugging the wire

If you proxy traffic and only see `fullResult` on recipe calls, something else is building the URL — `@wynnjs/api` emits `full_result` for recipes via `presenceParams: ["full_result"]` in the item module.

## Related

- [Responses → presence params](/api/guide/responses#presence-params)
- [Item reference](/api/reference/item)
