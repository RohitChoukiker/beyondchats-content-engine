import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

/* ================= CONFIG ================= */

const BASE_URL = "https://beyondchats.com";
const BLOG_LIST_URL = "https://beyondchats.com/blogs/";

const LARAVEL_BASE = "http://127.0.0.1:8000";
const LARAVEL_ARTICLE_API = `${LARAVEL_BASE}/api/articles`;

const SERP_API_KEY = process.env.SERP_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const RUN_PHASE_1 = true;
const RUN_PHASE_2 = true;



async function scrapeArticle(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const title = $("h1").first().text().trim();
  let content = "";

  $("p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 40) content += text + "\n\n";
  });

  return { title, content, source_url: url };
}

async function runPhase1() {


  const { data } = await axios.get(BLOG_LIST_URL);
  const $ = cheerio.load(data);

  const links = [];
  const seen = new Set();

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.startsWith("/blogs/") && href !== "/blogs/" && !seen.has(href)) {
      seen.add(href);
      links.push(BASE_URL + href);
    }
  });

  const oldestBlogs = links.slice(-5);
  console.log(` ${oldestBlogs.length} blogs`);

  for (const url of oldestBlogs) {
    const article = await scrapeArticle(url);
    if (article.content.length < 150) continue;

    await axios.post(LARAVEL_ARTICLE_API, article);

  }
}



async function fetchLatestArticle() {
  const res = await axios.get(`${LARAVEL_BASE}/api/articles/latest`);
  return res.data.data;
}

async function searchOnGoogle(query) {
  const res = await axios.get("https://serpapi.com/search.json", {
    params: { q: query, engine: "google", api_key: SERP_API_KEY, num: 5 },
  });

  return (res.data.organic_results || [])
    .map(r => r.link)
    .filter(l => l && l.startsWith("http") && !l.includes("beyondchats.com"))
    .slice(0, 2);
}

async function scrapeExternalArticle(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let content = "";
  $("p").each((_, el) => {
    const t = $(el).text().trim();
    if (t.length > 50) content += t + "\n\n";
  });

  return content;
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function rewriteWithGemini(original, r1, r2) {
  if (!GEMINI_API_KEY) throw new Error("Gemini key missing");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Improve the article using references. Do not copy text.

Original:
${original}

Ref1:
${r1}

Ref2:
${r2}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function publishUpdatedArticle(title, content, refs) {
  return axios.post(LARAVEL_ARTICLE_API, {
    title: `Improved: ${title}`,
    content: `${content}\n\nReferences:\n- ${refs[0]}\n- ${refs[1]}`,
    is_updated: true,
  });
}

async function runPhase2() {


  const article = await fetchLatestArticle();
  const links = await searchOnGoogle(article.title);
  if (links.length < 2) return;

  const r1 = await scrapeExternalArticle(links[0]);
  const r2 = await scrapeExternalArticle(links[1]);

  const improved = await rewriteWithGemini(article.content, r1, r2);
  await publishUpdatedArticle(article.title, improved, links);


}



async function runAutomation() {


  if (RUN_PHASE_1) await runPhase1();
  if (RUN_PHASE_2) await runPhase2();

  console.log("\n🎉 AUTOMATION COMPLETE");
}

runAutomation().catch(err => {
  console.error(" automation error:", err.message);
});
