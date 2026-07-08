import { WynnClient } from "@wynnjs/api";

const client = new WynnClient();

const { data: latest } = await client.news.listLatestNews();

console.log(latest.length, latest[0]?.title);

const { data: articles } = await client.news.listArticles("article");

console.log(articles.controller.count, Object.keys(articles.results));

const { data: videos } = await client.news.listVideos();

console.log(Object.keys(videos).length);

// Replace with a real article type and primary key from listArticles().
const { data: article } = await client.news.fetchArticle("article", 1);

console.log(article.title, article.type);
