import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();

const { data: markers } = await client.map.listMarkers();
const { data: events } = await client.map.listWorldEvents();
const { data: questCount } = await client.map.getQuestCount();

console.log(markers.length, events.length, questCount.quests);

const { data: camps } = await client.map.listCamps({ level: 90 });

console.log(camps.length);
