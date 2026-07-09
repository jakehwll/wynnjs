# Handle ambiguous matches

Some Wynncraft lookups can match more than one resource. Instead of picking one, the API returns HTTP / code `300` with an `objects` map. The client throws `WynnApiError.MultipleObjectsReturned`.

```ts
import { WynnApiError, WynnClient } from "@wynnjs/api";

const client = new WynnClient();

try {
  const { data } = await client.player.getPlayer("ambiguous-name");
  console.log(data.username);
} catch (error) {
  if (!(error instanceof WynnApiError.MultipleObjectsReturned)) throw error;

  // Pick a concrete UUID / username from the map, then retry.
  const [id, entry] = Object.entries(error.objects ?? {})[0] ?? [];
  console.log("candidates:", error.objects);

  if (entry?.username) {
    const { data } = await client.player.getPlayer(entry.username);
    console.log(data.uuid, data.username);
  } else if (id) {
    // Some maps are keyed by UUID already.
    const { data } = await client.player.getPlayer(id);
    console.log(data.username);
  }
}
```

## What `objects` looks like

Each entry is a light identity — fields vary by resource type:

```ts
type MultipleObjectsEntry = {
  username?: string;
  name?: string;
  prefix?: string;
  uuid?: string;
  rank?: string;
  supportRank?: string | null;
  shortenedRank?: string | null;
  legacyRankColour?: { main: string; sub: string };
  rankBadge?: string;
};
```

## UX pattern

1. Catch `MultipleObjectsReturned`
2. Present `Object.values(error.objects)` to the user (username / name / prefix)
3. Retry with a unique identifier (UUID, exact username, guild prefix)

Do not swallow the error and guess — that is how you fetch the wrong player.
