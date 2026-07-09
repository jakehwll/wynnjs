import { WynnApiError, WynnClient } from "@wynnjs/api";

const client = new WynnClient();

try {
  await client.player.getPlayer("DefinitelyNotARealPlayer_12345");
} catch (error) {
  if (error instanceof WynnApiError.NotFound) {
    console.error("Player not found:", error.detail);
  } else if (error instanceof WynnApiError.Forbidden) {
    console.error("Profile is private:", error.detail);
  } else if (error instanceof WynnApiError.TooManyRequest) {
    console.error("Rate limited:", error.detail);
  } else if (error instanceof WynnApiError.MultipleObjectsReturned) {
    console.error("Ambiguous match:", error.objects);
  } else if (error instanceof WynnApiError) {
    console.error(error.error, error.status, error.detail);
  } else {
    throw error;
  }
}
