# Map

`client.map` — markers, raids, camps, world events, and live player pins.

Official docs: [Map](https://docs.wynncraft.com/modules/map/list-map-markers).

## When to use which

| Goal                                               | Method                | Shape                         |
| -------------------------------------------------- | --------------------- | ----------------------------- |
| Live player pins (friends / party / guild context) | `listPlayerLocations` | `PlayerLocation[]`            |
| Static POIs / NPCs / dungeons                      | `listMarkers`         | `MapMarker[]`                 |
| Active world events                                | `listWorldEvents`     | `WorldEvent[]`                |
| Camps (+ loot)                                     | `listCamps`           | camp list (level filter)      |
| Raids (+ loot)                                     | `listRaids`           | raid list (level filter)      |
| Standalone loot pools                              | `listLootPools`       | loot pool list (level filter) |
| Gathering nodes                                    | `listGatheringNodes`  | node list                     |
| Total quest count                                  | `getQuestCount`       | `{ quests: number }`          |

`listCamps`, `listRaids`, and `listLootPools` accept `level?: number` to filter by combat level.

## Live players

```ts
const { data } = await client.map.listPlayerLocations();

for (const player of data) {
  console.log(player.name, player.server, player.x, player.z);
  console.log("party", player.party.length, "guild", player.guild.length);
}
```

```ts
type PlayerLocation = {
  uuid: string;
  name: string;
  nickname: string | null;
  character: string;
  server: string | null;
  x: number;
  y: number;
  z: number;
  friends: PlayerLocationMember[];
  party: PlayerLocationMember[];
  guild: PlayerLocationMember[];
};
```

## Markers

```ts
const { data: markers } = await client.map.listMarkers();
console.log(markers.length, markers[0]);
```

## World events

```ts
type WorldEvent = {
  name: string;
  internalName: string;
  lore: string;
  difficulty: string | null;
  level: number | null;
  length: string | null;
  requirements: Array<{ type: string; value: number | string }> | null;
  location: Array<{
    event: { x: number; y: number; z: number } | null;
    spawn: { x: number; y: number; z: number } | null;
    reward: { x: number; y: number; z: number } | null;
    radius: number | null;
    spawnRadius: number | null;
  }>;
  schedule: string | null;
  rewardPerLevel: Record<string, string[]> | null;
};
```

```ts
const { data: events } = await client.map.listWorldEvents();
for (const event of events) {
  console.log(event.name, event.level, event.difficulty);
}
```

## Camps, raids, loot pools

These share a loot-oriented content shape (name, difficulty, level, rewards, optional location).

```ts
const level = 90;

const [{ data: camps }, { data: raids }, { data: pools }] = await Promise.all([
  client.map.listCamps({ level }),
  client.map.listRaids({ level }),
  client.map.listLootPools({ level }),
]);

console.log(camps.length, raids.length, pools.length);
```

```ts
type LootPoolReward = {
  name: string;
  type: string;
  amount: number;
  always: boolean;
  tier?: string | null;
  shiny?: boolean;
};
```

Omit `level` to fetch the unfiltered list.

## Gathering + quests

```ts
const { data: nodes } = await client.map.listGatheringNodes();
const { data: quests } = await client.map.getQuestCount();
console.log(nodes.length, quests.quests);
```

## Parallel snapshot

```ts
const [markers, events, questCount, camps] = await Promise.all([
  client.map.listMarkers(),
  client.map.listWorldEvents(),
  client.map.getQuestCount(),
  client.map.listCamps({ level: 90 }),
]);

console.log(markers.data.length, events.data.length, questCount.data.quests, camps.data.length);
```

Watch [rate limits](/api/cookbook/rate-limits) if you fan out many map calls on a guest client.

## Related

- Runnable sample: [`examples/map.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/map.ts)
