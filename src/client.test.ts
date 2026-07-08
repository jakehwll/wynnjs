import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { WynnClient } from "./client";
import { API_BASE_URL } from "./constants";
import { WynnApiError } from "./errors";
import { callParamsSerializer } from "./testing/axios";

const classesBody = {
  archer: {
    name: "Archer (Hunter)",
    overallDifficulty: 1,
  },
};

describe("WynnClient HTTP integration", () => {
  let http: ReturnType<typeof axios.create>;
  let mock: MockAdapter;
  let client: WynnClient;

  beforeEach(() => {
    http = axios.create({ baseURL: API_BASE_URL });
    mock = new MockAdapter(http);
    client = new WynnClient({ http });
  });

  afterEach(() => {
    mock.restore();
  });

  it("classes.list() performs a GET and returns response data", async () => {
    mock.onGet("/classes").reply(200, classesBody);

    const { data, rateLimit } = await client.classes.list();

    expect(data).toEqual(classesBody);
    expect(rateLimit).toBeNull();
  });

  it("player.getPlayer() encodes the path parameter", async () => {
    const body = { username: "foo", online: false };

    mock.onGet("/player/foo").reply(200, body);

    const { data } = await client.player.getPlayer("foo");

    expect(data).toEqual(body);
    expect(mock.history.get[0]?.url).toBe("/player/foo");
  });

  it("player.getPlayer() sends presence-only fullResult flag", async () => {
    const body = { username: "foo", online: true };

    mock.onGet("/player/foo").reply(200, body);

    const { data } = await client.player.getPlayer("foo", { fullResult: true });

    expect(data).toEqual(body);
    expect(mock.history.get[0]?.url).toBe("/player/foo");
    expect(callParamsSerializer(mock.history.get[0]?.paramsSerializer, {})).toBe("fullResult");
  });

  it("maps 404 API errors to WynnApiError.NotFound", async () => {
    mock.onGet("/player/nobody").reply(404, {
      error: "NotFound",
      detail: "No player found.",
      code: 404,
    });

    await expect(client.player.getPlayer("nobody")).rejects.toBeInstanceOf(WynnApiError.NotFound);
  });

  it("parses rate-limit headers on successful responses", async () => {
    mock.onGet("/classes").reply(200, classesBody, {
      "ratelimit-bucket": "SHARED",
      "ratelimit-limit": "100",
      "ratelimit-remaining": "99",
      "ratelimit-reset": "1700000000",
    });

    const { rateLimit } = await client.classes.list();

    expect(rateLimit).toEqual({
      bucket: "SHARED",
      limit: 100,
      remaining: 99,
      reset: 1700000000,
    });
  });
});
