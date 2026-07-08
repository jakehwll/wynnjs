import { describe, it } from "vitest";

import { expectDocExample } from "../../testing/doc-example";
import { GetCharacterAbilitiesResultSchema } from "./get-character-abilities";
import { GetPlayerResultSchema } from "./get-player";
import { ListOnlinePlayersResultSchema } from "./list-online-players";
import { ListPlayerCharactersResultSchema } from "./list-player-characters";
import { WhoAmIResultSchema } from "./whoami";

describe("player schemas (docs examples)", () => {
  const here = import.meta.url;

  it("parses list online players", () => {
    expectDocExample(here, ListOnlinePlayersResultSchema, "list-online-players");
  });

  it("parses whoami", () => {
    expectDocExample(here, WhoAmIResultSchema, "whoami");
  });

  it("parses get player", () => {
    expectDocExample(here, GetPlayerResultSchema, "get-player");
  });

  it("parses list player characters", () => {
    expectDocExample(here, ListPlayerCharactersResultSchema, "list-player-characters");
  });

  it("parses character ability map", () => {
    expectDocExample(here, GetCharacterAbilitiesResultSchema, "get-character-abilities");
  });
});
