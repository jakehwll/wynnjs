# Errors

Failed API responses throw `WynnApiError` subclasses. Prefer `instanceof` checks against the specific class.

```ts
import { WynnApiError, WynnClient } from "@wynnjs/api";

const client = new WynnClient();

try {
  await client.player.getPlayer("DefinitelyNotARealPlayer_12345");
} catch (error) {
  if (error instanceof WynnApiError.NotFound) {
    console.error("Player not found:", error.detail);
  } else if (error instanceof WynnApiError.Forbidden) {
    console.error("Profile is private:", error.detail);
  } else if (error instanceof WynnApiError.TooManyRequest) {
    console.error("Rate limited:", error.detail);
  } else if (error instanceof WynnApiError.MultipleObjectsReturned) {
    console.error("Ambiguous match:", error.objects);
  } else if (error instanceof WynnApiError) {
    console.error(error.error, error.status, error.detail);
  } else {
    throw error;
  }
}
```

The wire format matches the [official exceptions](https://docs.wynncraft.com/exceptions) shape (`error`, `detail`, `code`).

## Properties

| Property      | Type                 | Description                           |
| ------------- | -------------------- | ------------------------------------- |
| `error`       | `string`             | Machine-readable name (`NotFound`, …) |
| `detail`      | `string`             | Human-readable message                |
| `code`        | `number`             | Wynncraft error code                  |
| `status`      | `number`             | HTTP status                           |
| `identifier?` | `string`             | Resource identifier when present      |
| `objects?`    | `MultipleObjectsMap` | Only on `MultipleObjectsReturned`     |

## Subclasses

Access via `WynnApiError.<Name>`:

| Class                     | Typical meaning                       |
| ------------------------- | ------------------------------------- |
| `NotFound`                | Missing resource                      |
| `Forbidden`               | Private profile / insufficient access |
| `TooManyRequest`          | Rate limited (API spelling)           |
| `MultipleObjectsReturned` | Ambiguous query; see `objects`        |
| `InvalidFormError`        | Bad form body                         |
| `InvalidQueryParamsError` | Bad query params                      |
| `MalformedPayload`        | Unparseable body                      |
| `MalformedTokenError`     | Bad token format                      |
| `InvalidTokenError`       | Rejected token                        |
| `CSRFError`               | CSRF failure                          |
| `PaginationError`         | Bad page / pagination state           |
| `MethodNotAllowed`        | Wrong HTTP method                     |
| `InternalError`           | Upstream failure                      |
| `InvalidCharacterUUID`    | Bad character UUID                    |
| `NoCharacterFound`        | Character missing                     |
| `MalformedPrefixError`    | Bad guild prefix                      |
| `InvalidTree`             | Bad ability / class tree              |

Unknown error names still throw a base `WynnApiError` with the parsed body fields.

## MultipleObjectsReturned

Some queries can match more than one resource. The API returns code `300` with an `objects` map. The client surfaces that as `WynnApiError.MultipleObjectsReturned`.

```ts
if (error instanceof WynnApiError.MultipleObjectsReturned) {
  for (const [id, entry] of Object.entries(error.objects ?? {})) {
    console.log(id, entry.username ?? entry.name);
  }
}
```

Full retry / UX pattern: [Ambiguous matches cookbook](/api/cookbook/ambiguous-matches).

## Non-API failures

Network errors and non-JSON responses are **not** wrapped — they rethrow as the underlying Axios / runtime error. Only Wynncraft error bodies become `WynnApiError`.
