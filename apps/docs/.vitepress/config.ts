import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";

export default defineConfig({
  title: "wynnjs",
  description: "TypeScript tooling for the Wynncraft API",
  base: "/wynnjs/",
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: "https://jakehwll.github.io/wynnjs",
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },

  vite: {
    plugins: [groupIconVitePlugin()],
  },

  themeConfig: {
    siteTitle: "wynnjs",

    nav: [
      { text: "Guide", link: "/" },
      { text: "Cookbook", link: "/api/cookbook/pagination" },
      { text: "API", link: "/api/reference/player" },
      { text: "Changelog", link: "/changelog" },
      {
        text: "Wynncraft Docs",
        link: "https://docs.wynncraft.com/welcome",
      },
    ],

    sidebar: [
      {
        text: "@wynnjs/api",
        items: [
          { text: "Getting started", link: "/" },
          { text: "Client", link: "/api/guide/client" },
          { text: "Authentication", link: "/api/guide/authentication" },
          { text: "Responses", link: "/api/guide/responses" },
          { text: "Errors", link: "/api/guide/errors" },
          { text: "Schemas", link: "/api/guide/schemas" },
          { text: "Constants", link: "/api/guide/constants" },
          { text: "Examples", link: "/api/guide/examples" },
          { text: "Changelog", link: "/changelog" },
        ],
      },
      {
        text: "Cookbook",
        items: [
          { text: "Pagination", link: "/api/cookbook/pagination" },
          { text: "Ambiguous matches", link: "/api/cookbook/ambiguous-matches" },
          { text: "OAuth", link: "/api/cookbook/oauth" },
          { text: "Session auth", link: "/api/cookbook/session-auth" },
          { text: "Rate limits", link: "/api/cookbook/rate-limits" },
          { text: "Recipe fullResult", link: "/api/cookbook/recipe-full-result" },
          { text: "CDN assets", link: "/api/cookbook/cdn-assets" },
        ],
      },
      {
        text: "API reference",
        items: [
          { text: "Player", link: "/api/reference/player" },
          { text: "Guild", link: "/api/reference/guild" },
          { text: "Item", link: "/api/reference/item" },
          { text: "Ability", link: "/api/reference/ability" },
          { text: "Classes", link: "/api/reference/classes" },
          { text: "Map", link: "/api/reference/map" },
          { text: "Leaderboards", link: "/api/reference/leaderboards" },
          { text: "News", link: "/api/reference/news" },
          { text: "Search", link: "/api/reference/search" },
          { text: "OAuth", link: "/api/reference/oauth" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/jakehwll/wynnjs" }],

    editLink: {
      pattern: "https://github.com/jakehwll/wynnjs/edit/main/apps/docs/:path",
      text: "Edit this page",
    },

    footer: {
      message: "Unofficial TypeScript tooling for the Wynncraft API",
      copyright: "MIT Licensed",
    },

    search: {
      provider: "local",
    },
  },
});
