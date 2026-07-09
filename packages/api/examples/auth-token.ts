import { WynnClient } from "@wynnjs/api";

// API token from https://docs.wynncraft.com/docs/authentication
const client = new WynnClient({
  auth: { type: "token", token: process.env.WYNN_API_TOKEN! },
});

const { data: identities } = await client.player.whoAmI();

for (const identity of Object.values(identities)) {
  console.log(identity.username, identity.online);
}
