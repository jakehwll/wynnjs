# Player

`client.player` — profiles, characters, and online status.

Official docs: [Player module](https://docs.wynncraft.com/modules/player/list-online-players).

## When to use which

| Goal                              | Method                   |
| --------------------------------- | ------------------------ |
| Who is online right now           | `listOnlinePlayers`      |
| Authenticated account identity    | `whoAmI` (auth required) |
| Public profile by username / UUID | `getPlayer`              |
| Character list for a player       | `listCharacters`         |
| Ability loadout for one character | `getCharacterAbilities`  |

## `listOnlinePlayers(options?)`

`GET /player`

| Option        | Type               | Description                     |
| ------------- | ------------------ | ------------------------------- |
| `identifier?` | `string`           | Filter by username or UUID      |
| `server?`     | `string \| number` | Filter by server name or number |

```ts
const { data } = await client.player.listOnlinePlayers();
// { total: number, players: Record<username, serverName> }
```

## `whoAmI()`

`GET /player/whoami` — **auth required**

Returns a **single-entry** `Record<uuid, PlayerIdentity>`. Grab the profile with `Object.values(data)[0]`.

```ts
const client = new WynnClient({
  auth: { type: "token", token: process.env.WYNN_API_TOKEN! },
});

const { data } = await client.player.whoAmI();
const me = Object.values(data)[0];
console.log(me?.username, me?.online, me?.rank);
```

## `getPlayer(username, options?)`

`GET /player/:username`

`username` may be a username or UUID. Ambiguous names throw [`MultipleObjectsReturned`](/api/cookbook/ambiguous-matches).

| Option        | Type      | Description                                        |
| ------------- | --------- | -------------------------------------------------- |
| `fullResult?` | `boolean` | Presence `?fullResult` — includes `characters` map |

### Result shape (abridged)

```ts
type GetPlayerResult = {
  username: string;
  uuid: string;
  online: boolean;
  server: string | null;
  activeCharacter: string | null;
  rank: string;
  rankBadge: string;
  supportRank: string | null;
  veteran: boolean;
  firstJoin: string;
  lastJoin: string;
  playtime: number;
  guild: {
    uuid: string;
    name: string;
    prefix: string;
    rank?: string | null;
  } | null;
  globalData: {
    totalLevel: number;
    mobsKilled: number;
    chestsFound: number;
    completedQuests: number;
    // …dungeons, raids, pvp, …
  };
  characters?: Record<
    string,
    {
      type: string;
      nickname: string | null;
      level: number;
      totalLevel: number;
      playtime: number;
      // …
    }
  >;
};
```

```ts
const { data } = await client.player.getPlayer("Salted", { fullResult: true });

console.log(data.username, data.guild?.prefix);
for (const [uuid, character] of Object.entries(data.characters ?? {})) {
  console.log(uuid, character.type, character.level);
}
```

Private profiles throw `WynnApiError.Forbidden`. Missing players throw `NotFound`.

## `listCharacters(username)`

`GET /player/:username/characters`

Lighter than `getPlayer({ fullResult: true })` when you only need character UUIDs / types.

```ts
const { data } = await client.player.listCharacters("Salted");
// Record<characterUuid, LightCharacter>
```

## `getCharacterAbilities(username, characterUuid)`

`GET /player/:username/characters/:characterUuid/abilities`

```ts
const { data: characters } = await client.player.listCharacters("Salted");
const uuid = Object.keys(characters)[0]!;
const { data } = await client.player.getCharacterAbilities("Salted", uuid);
```

## Related

- [Authentication](/api/guide/authentication)
- [Ambiguous matches](/api/cookbook/ambiguous-matches)
- Runnable sample: [`examples/player.ts`](https://github.com/jakehwll/wynnjs/blob/main/packages/api/examples/player.ts)
