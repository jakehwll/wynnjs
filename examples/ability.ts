import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();

const tree = "mage";

const { data: abilityTree } = await client.ability.getTree(tree);
const { data: abilityMap } = await client.ability.getMap(tree);
const { data: aspects } = await client.ability.listAspects(tree);

console.log(
  Object.keys(abilityTree.archetypes).length,
  Object.keys(abilityMap).length,
  aspects.length,
);
