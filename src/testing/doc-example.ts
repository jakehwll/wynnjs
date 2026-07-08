import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { expect } from "vitest";
import type { z } from "zod";

export function loadFixture<T = unknown>(fromModule: string, name: string): T {
  const fixturesDir = join(dirname(fileURLToPath(fromModule)), "__fixtures__");
  const contents = readFileSync(join(fixturesDir, `${name}.json`), "utf8");
  return JSON.parse(contents) as T;
}

export function expectDocExample<T extends z.ZodType>(
  fromModule: string,
  schema: T,
  fixtureName: string,
): void {
  const result = schema.safeParse(loadFixture(fromModule, fixtureName));

  expect(
    result.success,
    result.success ? undefined : JSON.stringify(result.error.format(), null, 2),
  ).toBe(true);
}
