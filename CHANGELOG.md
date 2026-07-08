# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
Version numbers follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for this client. The Wynncraft API release the client implements is exposed separately as `WYNNCRAFT_API_VERSION` (currently `3.7.2`).

## [3.0.0] - 2026-07-09

Initial public release. Implements Wynncraft API v3 **3.7.2**.

### Added

- Initial public release of `@wynnjs/api`
- Typed `WynnClient` with modules for all Wynncraft API v3 endpoints (player, guild, item, ability, classes, map, search, leaderboards, news, oauth)
- Zod schemas and exported TypeScript types for request options and response shapes
- `WynnApiError` subclasses for known API error responses
- Rate-limit header parsing on every response
- Dual ESM and CommonJS builds with `.d.ts` declarations
- JSDoc on the public API surface
- Doc-example fixture tests synced from Wynncraft API docs
- Module and integration tests with `axios-mock-adapter`
- Runnable examples in `examples/`
- CI workflow (lint, format, typecheck, test, build, Node consumer smoke test)

[3.0.0]: https://github.com/jakehwll/wynnjs/releases/tag/v3.0.0
