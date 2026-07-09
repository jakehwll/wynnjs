# Ability

`client.ability` — ability trees, maps, and aspects.

Official docs: [Ability & Aspect](https://docs.wynncraft.com/modules/ability-aspect/get-ability-tree).

`tree` is a `ClassTree`:

```ts
type ClassTree = "archer" | "warrior" | "assassin" | "mage" | "shaman";
```

## When to use which

| Goal                  | Method        | Path                      |
| --------------------- | ------------- | ------------------------- |
| Full tree definitions | `getTree`     | `GET /ability/tree/:tree` |
| Layout / coordinates  | `getMap`      | `GET /ability/map/:tree`  |
| Aspects for a class   | `listAspects` | `GET /aspects/:tree`      |

Invalid trees throw `WynnApiError.InvalidTree`.

```ts
const tree = "mage" as const;

const [{ data: definitions }, { data: map }, { data: aspects }] = await Promise.all([
  client.ability.getTree(tree),
  client.ability.getMap(tree),
  client.ability.listAspects(tree),
]);
```

## `getTree(tree)`

Returns archetypes plus ability definitions keyed by page, then ability id:

```ts
type GetAbilityTreeResult = {
  archetypes: Record<
    string,
    {
      name: string;
      description: string;
      shortDescription: string;
      icon: AbilityIcon;
      slot: number;
    }
  >;
  pages: Record<
    string,
    Record<
      string,
      {
        name: string;
        icon: AbilityIcon;
        slot: number;
        coordinates: { x: number; y: number };
        description: string[];
        requirements: Record<string, number>;
        links: string[];
        locks: string[] | null;
        page: number;
      }
    >
  >;
};
```

## `getMap(tree)`

Layout / coordinate data for rendering the tree UI, keyed by page. Pair with `getTree` when you need both definitions and placement.

## `listAspects(tree)`

Aspect definitions for the class. Shape is a record / list of aspect entries (name, tiers, effects — see types in `@wynnjs/api`).

```ts
const { data: aspects } = await client.ability.listAspects("warrior");
console.log(Object.keys(aspects).length);
```

## Related

- Character ability assignments: [`player.getCharacterAbilities`](/api/reference/player)
- Class metadata: [`client.classes`](/api/reference/classes)
- Runnable sample: [`examples/ability.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/ability.ts)
