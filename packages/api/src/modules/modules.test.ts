import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { WynnClient } from "../client";
import { API_BASE_URL } from "../constants";
import { callParamsSerializer } from "../testing/axios";

function createTestClient() {
  const http = axios.create({ baseURL: API_BASE_URL });
  const mock = new MockAdapter(http);
  const client = new WynnClient({ http });

  return { http, mock, client };
}

describe("API modules", () => {
  let mock: MockAdapter;
  let client: WynnClient;

  beforeEach(() => {
    ({ mock, client } = createTestClient());
  });

  afterEach(() => {
    mock.restore();
  });

  describe("AbilityModule", () => {
    it("getTree() GETs an encoded class path", async () => {
      mock.onGet("/ability/tree/mage").reply(200, {});

      await client.ability.getTree("mage");

      expect(mock.history.get[0]?.url).toBe("/ability/tree/mage");
    });
  });

  describe("ClassesModule", () => {
    it("list() GETs /classes", async () => {
      mock.onGet("/classes").reply(200, []);

      await client.classes.list();

      expect(mock.history.get[0]?.url).toBe("/classes");
    });
  });

  describe("PlayerModule", () => {
    it("getPlayer() sends presence-only fullResult flag", async () => {
      mock.onGet("/player/foo").reply(200, {});

      await client.player.getPlayer("foo", { fullResult: true });

      expect(mock.history.get[0]?.url).toBe("/player/foo");
      expect(callParamsSerializer(mock.history.get[0]?.paramsSerializer, {})).toBe("fullResult");
    });
  });

  describe("GuildModule", () => {
    it("listGuilds() forwards identifier query params", async () => {
      mock.onGet("/guild/list/guild").reply(200, {});

      await client.guild.listGuilds({ identifier: "uuid" });

      expect(mock.history.get[0]?.params).toEqual({ identifier: "uuid" });
    });

    it("getGuildByPrefix() encodes the prefix in the path", async () => {
      mock.onGet("/guild/prefix/ABC").reply(200, {});

      await client.guild.getGuildByPrefix("ABC");

      expect(mock.history.get[0]?.url).toBe("/guild/prefix/ABC");
    });
  });

  describe("ItemModule", () => {
    it("searchItems() POSTs filters as JSON", async () => {
      const filters = { query: "wand", tier: "legendary" };

      mock.onPost("/item/search").reply(200, {});

      await client.item.searchItems(filters, { page: 2, fullResult: true });

      const request = mock.history.post[0];
      expect(request?.url).toBe("/item/search");
      expect(JSON.parse(String(request?.data))).toEqual(filters);
      expect(request?.params).toEqual({ page: 2 });
      expect(callParamsSerializer(request?.paramsSerializer, {})).toBe("fullResult");
    });

    it("searchRecipes() POSTs filters and sends full_result presence flag", async () => {
      const filters = { materials: "refined wheat string", level: [1, 3] };

      mock.onPost("/item/recipe/search").reply(200, {});

      await client.item.searchRecipes(filters, { fullResult: true });

      const request = mock.history.post[0];
      expect(request?.url).toBe("/item/recipe/search");
      expect(JSON.parse(String(request?.data))).toEqual(filters);
      expect(callParamsSerializer(request?.paramsSerializer, {})).toBe("full_result");
    });
  });

  describe("MapModule", () => {
    it("listCamps() forwards level query params", async () => {
      mock.onGet("/map/camps").reply(200, []);

      await client.map.listCamps({ level: 90 });

      expect(mock.history.get[0]?.url).toBe("/map/camps");
      expect(mock.history.get[0]?.params).toEqual({ level: 90 });
    });
  });

  describe("SearchModule", () => {
    it("search() encodes the query and forwards only filter", async () => {
      mock.onGet("/search/wand").reply(200, {});

      await client.search.search("wand", { only: "item" });

      expect(mock.history.get[0]?.url).toBe("/search/wand");
      expect(mock.history.get[0]?.params).toEqual({ only: "item" });
    });
  });

  describe("LeaderboardsModule", () => {
    it("get() encodes lbType and forwards resultLimit", async () => {
      mock.onGet("/leaderboards/completions").reply(200, {});

      await client.leaderboards.get("completions", { resultLimit: 10 });

      expect(mock.history.get[0]?.url).toBe("/leaderboards/completions");
      expect(mock.history.get[0]?.params).toEqual({ resultLimit: 10 });
    });
  });

  describe("NewsModule", () => {
    it("fetchArticle() encodes article type and primary key", async () => {
      mock.onGet("/publisher/articles/fetch/blog/42").reply(200, {});

      await client.news.fetchArticle("blog", 42);

      expect(mock.history.get[0]?.url).toBe("/publisher/articles/fetch/blog/42");
    });
  });

  describe("OAuthModule", () => {
    it("exchangeToken() POSTs urlencoded form body", async () => {
      mock.onPost("/oauth/token").reply(200, {
        access_token: "token",
        token_type: "bearer",
        scope: "identify",
      });

      await client.oauth.exchangeToken({
        code: "auth-code",
        redirectUri: "https://app.example/callback",
        clientId: "client-id",
        clientSecret: "client-secret",
        codeVerifier: "verifier",
      });

      const request = mock.history.post[0];
      expect(request?.url).toBe("/oauth/token");
      expect(request?.headers?.["Content-Type"]).toBe("application/x-www-form-urlencoded");
      expect(request?.data).toBe(
        "grant_type=authorization_code&code=auth-code&redirect_uri=https%3A%2F%2Fapp.example%2Fcallback&client_id=client-id&client_secret=client-secret&code_verifier=verifier",
      );
    });
  });
});
