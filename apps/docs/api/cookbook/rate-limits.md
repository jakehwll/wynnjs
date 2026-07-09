# Stay under the rate limit

Every successful call returns parsed rate-limit headers as `rateLimit` (or `null` if headers are missing).

```ts
type RateLimitInfo = {
  bucket: string;
  limit: number;
  remaining: number;
  reset: number; // Unix seconds
};
```

Buckets (`SHARED`, `PLAYER`, `GUILD`, …) are independent — burning `PLAYER` does not empty `GUILD`.

## Read before you stampede

```ts
const { data, rateLimit } = await client.player.getPlayer("Salted");

if (rateLimit) {
  console.log(rateLimit.bucket, rateLimit.remaining, "/", rateLimit.limit);
}
```

## Back off when low

```ts
import type { RateLimitInfo } from "@wynnjs/api";

async function withBudget<T>(
  call: () => Promise<{ data: T; rateLimit: RateLimitInfo | null }>,
): Promise<T> {
  const { data, rateLimit } = await call();

  if (rateLimit && rateLimit.remaining <= 2) {
    const waitMs = Math.max(0, rateLimit.reset * 1000 - Date.now()) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  return data;
}

const profile = await withBudget(() => client.player.getPlayer("Salted"));
```

## Catch hard limits

When the API rejects you, the client throws `WynnApiError.TooManyRequest` (Wynncraft's spelling).

```ts
import { WynnApiError } from "@wynnjs/api";

try {
  await client.item.listItems({ page: 0 });
} catch (error) {
  if (error instanceof WynnApiError.TooManyRequest) {
    // wait, then retry once
    await new Promise((r) => setTimeout(r, 5_000));
    await client.item.listItems({ page: 0 });
    return;
  }
  throw error;
}
```

## Tips

- Prefer authenticated clients for higher RPM — see [Authentication](/api/guide/authentication)
- Parallelize across **different** buckets, not the same one
- When paging large result sets, check `remaining` between pages ([Pagination](/api/cookbook/pagination))
- Do not busy-loop on `TooManyRequest` — honor `reset` or a fixed delay
