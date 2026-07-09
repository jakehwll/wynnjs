# Contributing to @wynnjs/api

Thanks for helping improve the Wynncraft API v3 TypeScript client. This guide covers local setup, project conventions, and what we expect in pull requests.

## Prerequisites

- [Bun](https://bun.sh/) (used for install, scripts, and CI)
- Node.js 18+ (consumer smoke tests run on 18, 20, and 22)

## Getting started

```bash
git clone https://github.com/jakehwll/wynnjs.git
cd wynnjs
bun install
```

Run the full local quality gate before opening a PR:

```bash
bun run ci
```

That runs lint, format check, typecheck, tests, build, example typecheck, and a dry-run `npm pack`.

Useful individual commands:

| Command                                   | Purpose                                  |
| ----------------------------------------- | ---------------------------------------- |
| `bun run test`                            | Run all Vitest tests                     |
| `bun run test:watch`                      | Watch mode                               |
| `bun run typecheck`                       | `tsc --noEmit` (`packages/api/src`)      |
| `bun run typecheck:examples`              | Typecheck examples against built `dist/` |
| `bun run lint` / `bun run lint:fix`       | Oxlint                                   |
| `bun run format` / `bun run format:check` | Oxfmt                                    |
| `bun run build`                           | Build `packages/api/dist/` via tsup      |
| `bun run test:fixtures`                   | Refresh doc example JSON fixtures        |

## Project layout

```
packages/
  api/                 # published @wynnjs/api
    src/
      client.ts        # WynnClient entry point
      modules/         # API modules (player, guild, item, …)
      schemas/         # Zod schemas + exported types, grouped by domain
        <module>/
          __fixtures__/  # Doc example JSON for schema tests
      testing/         # Shared test helpers
    examples/          # Runnable usage samples
    scripts/           # Fixture sync and tooling
```

The published package only ships `dist/`. Source lives under `packages/api/src/`.

## Making changes

### Adding or updating an endpoint

Most endpoint work touches three places under `packages/api/`:

1. **Schema** — `packages/api/src/schemas/<module>/<endpoint>.ts`
   - Define Zod schemas for request options and response shapes
   - Export inferred TypeScript types

2. **Module method** — `packages/api/src/modules/<module>.ts`
   - Add or update the client method that calls `this.client.request()`
   - Document params and return shape with JSDoc (`@param`, `@returns`)

3. **Tests**
   - Schema fixture test in `packages/api/src/schemas/<module>/<module>.test.ts` using `expectDocExample()`
   - Unit or integration tests colocated with the code they cover (`*.test.ts` next to the source file)

Re-export new types from `packages/api/src/schemas/index.ts` if needed. The package `src/index.ts` re-exports everything from schemas automatically.

### HTTP conventions

- Regular query params go in `params`
- Wynncraft presence flags (`?fullResult`, `?static`, etc.) go in `presenceParams` via `RequestConfig`
- Path segments should be passed through `encodeURIComponent()`
- Authenticated endpoints require `WynnClientOptions.auth`

### Response types

Match the [Wynncraft API docs](https://docs.wynncraft.com/) literally. Some endpoints return UUID-keyed maps (`Record<string, T>`) rather than flat objects — preserve that in the schema even if it looks awkward in IDE hovers.

### JSDoc

Public API surface should be documented:

- Module classes and methods
- `WynnClient`, auth types, errors, and HTTP helpers
- Non-obvious option fields (e.g. `options.fullResult`, `options.identifier`)

Use `@param` for each argument (including nested option fields like `options.page`) and `@returns` for the response shape. Add `@example` when usage is non-obvious.

### Examples

If you add a new common workflow, consider a small runnable sample in `packages/api/examples/`. Use fictional usernames and UUIDs — do not commit real player data.

## Tests

### Schema / fixture tests

Doc examples are stored as JSON under each module's `__fixtures__/` directory and validated against Zod schemas:

```ts
import { expectDocExample } from "../../testing/doc-example";
import { GetPlayerResultSchema } from "./get-player";

expectDocExample(import.meta.url, GetPlayerResultSchema, "get-player");
```

Refresh fixtures from the docs with:

```bash
bun run test:fixtures
```

Review the diff carefully before committing — fixtures should reflect the official docs, not live API drift you didn't intend.

### Unit tests

Pure helpers (`auth`, `http`, `errors`) have focused unit tests colocated in `packages/api/src/*.test.ts`.

### Integration tests

`packages/api/src/client.test.ts` uses `axios-mock-adapter` to verify request wiring without hitting the live API.

## Code style

- **Formatter:** Oxfmt (`.oxfmtrc.json`)
- **Linter:** Oxlint (`.oxlintrc.json`)
- **TypeScript:** strict mode, no `any` unless unavoidable
- Keep diffs focused — match existing naming, imports, and file structure
- Do not hand-edit `dist/`; it is build output

## Pull requests

1. Branch from `main`
2. Make your changes with tests
3. Run `bun run ci` locally
4. Open a PR with a short description of what changed and why

CI must pass before merge. It runs the same checks as `bun run ci` plus a Node consumer smoke test that installs the packed tarball and verifies ESM + CJS imports.

### What we look for

- Types and schemas match the official Wynncraft v3 API
- New public methods have JSDoc
- Tests cover schema shapes and any non-trivial request logic
- No secrets, real usernames, or session tokens in examples or fixtures

## Versioning

The npm package uses independent semver (currently `3.0.0`). The Wynncraft API release the client targets is `WYNNCRAFT_API_VERSION` in `packages/api/src/constants.ts` (currently `3.7.2`).

- **Client release** (`packages/api/package.json` `version`) — bump for fixes, features, or breaking client changes (`3.0.1`, `3.1.0`, `4.0.0`, …).
- **API alignment** (`WYNNCRAFT_API_VERSION`) — update when you realign schemas and methods to a new Wynncraft API release. Note the change in `CHANGELOG.md`; bump the client major/minor if the API delta is breaking for consumers.

## Publishing to npm

Publishing runs in GitHub Actions via [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC). No long-lived `NPM_TOKEN` is required for `npm publish`.

### One-time setup (npmjs.com)

1. Ensure `@wynnjs/api` exists under your npm account or org (first publish creates it).
2. Open **Packages → `@wynnjs/api` → Settings → Trusted publishing**.
3. Select **GitHub Actions** and configure:
   - **Repository owner:** `jakehwll`
   - **Repository name:** `wynnjs`
   - **Workflow filename:** `publish.yml` (filename only, not the path)
   - **Environment:** leave blank (this workflow does not use a GitHub Environment)
4. Save the trusted publisher.
5. Optional hardening (recommended with 2FA): **Settings → Publishing access → Require two-factor authentication and disallow tokens**. Trusted publishing still works; revoke any old automation publish tokens.

`packages/api/package.json` `repository.url` must match the GitHub repo (`git+https://github.com/jakehwll/wynnjs.git`).

### Release flow

1. Bump `version` in `packages/api/package.json` and add a `CHANGELOG.md` entry.
2. Merge to `main`.
3. Create a GitHub Release with tag `vX.Y.Z` (must match `packages/api/package.json`, e.g. `v3.0.0`).
4. The [Publish workflow](.github/workflows/publish.yml) runs CI, verifies the tag, and publishes with provenance via OIDC.

To publish without a release, use **Actions → Publish → Run workflow** on `main`.

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).
