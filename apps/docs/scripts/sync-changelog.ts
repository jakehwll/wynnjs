import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, "../../../CHANGELOG.md");
const dest = resolve(here, "../changelog.md");

const body = readFileSync(source, "utf8").trimEnd();

const out = `---
editLink: false
---

${body}

## On this site

| Version | Meaning |
| ------- | ------- |
| npm \`version\` | Client release — bump for fixes, features, breaking client changes |
| \`WYNNCRAFT_API_VERSION\` | Upstream API alignment — see [Constants](/api/guide/constants) |

\`\`\`ts
import { WYNNCRAFT_API_VERSION } from "@wynnjs/api";

console.log(WYNNCRAFT_API_VERSION); // "3.7.2"
\`\`\`
`;

mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, `${out}\n`);
console.log(`Synced ${source} → ${dest}`);
