import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();

const { data: results } = await client.item.searchItems(
  { query: "wand", tier: "legendary" },
  { page: 0 },
);

console.log(results.controller.count, results.results.length);

const { data: quickResults } = await client.item.quickSearchItems("helmet");

console.log(quickResults.length);

const { data: metadata } = await client.item.getMetadata({ static: true });

console.log(Object.keys(metadata));
