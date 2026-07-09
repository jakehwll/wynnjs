import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();

const { data: searchResults } = await client.search.search("archer", {
  only: "item",
});

console.log(searchResults.query, Object.keys(searchResults.items ?? {}));

// Replace with a real guild name, prefix, or UUID.
const guildName = "Example Guild";

const { data: guild } = await client.guild.getGuild(guildName);

console.log(guild.name, guild.members.total);

const { data: leaderboardTypes } = await client.leaderboards.listTypes();

console.log(leaderboardTypes);
