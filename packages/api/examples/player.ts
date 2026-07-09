import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();

// Replace with a real in-game username.
const username = "YourUsername";

const { data: profile } = await client.player.getPlayer(username, {
  fullResult: true,
});

console.log(profile.username, profile.online);

const { data: characters } = await client.player.listCharacters(username);

for (const [uuid, character] of Object.entries(characters)) {
  console.log(uuid, character.type, character.nickname);
}

// Replace with a character UUID from listCharacters().
const characterUuid = "00000000-0000-4000-8000-000000000001";

const { data: abilities } = await client.player.getCharacterAbilities(username, characterUuid);

console.log(abilities);
