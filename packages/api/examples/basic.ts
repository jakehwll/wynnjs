import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();

const { data: classes, rateLimit } = await client.classes.list();

console.log(
  Object.values(classes).map((entry) => entry.name),
  rateLimit?.remaining,
);
