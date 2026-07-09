# Classes

`client.classes` — playable classes and metadata.

Official docs: [Classes](https://docs.wynncraft.com/modules/classes/list-classes).

```ts
type ClassName = "archer" | "warrior" | "assassin" | "mage" | "shaman";
```

Same union as ability `ClassTree` — use either for class-scoped calls.

## When to use which

| Goal                   | Method     |
| ---------------------- | ---------- |
| Catalog of all classes | `list`     |
| One class + archetypes | `getClass` |

## `list()`

`GET /classes`

```ts
const { data } = await client.classes.list();
console.log(Object.values(data).map((entry) => entry.name));
```

## `getClass(className)`

`GET /classes/:className`

```ts
type GetClassResult = {
  id: string;
  name: string;
  lore: string;
  overallDifficulty: number;
  overallMax: number;
  archetypes: Record<
    string,
    {
      name: string;
      difficulty: number;
      max: number;
      icon: string;
      damage: number;
      defence: number;
      range: number;
      speed: number;
    }
  >;
};
```

```ts
const { data } = await client.classes.getClass("warrior");
console.log(data.name, data.overallDifficulty);
for (const [id, arch] of Object.entries(data.archetypes)) {
  console.log(id, arch.name, arch.damage, arch.defence);
}
```

Unknown class names throw `NotFound` (or a validation-style API error depending on the path).

## Related

- Ability trees for a class: [`client.ability`](/api/reference/ability)
- Player characters expose `type` matching these names: [`player.listCharacters`](/api/reference/player)
