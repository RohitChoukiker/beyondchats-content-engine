import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://beyondchats.com";
const BLOG_LIST_URL = "https://beyondchats.com/blogs/";

// ------------------
// scrape single blog
// ------------------
async function scrapeArticle(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const title = $("h1").first().text().trim();

  let content = "";
  $("p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 40) {
      content += text + "\n\n";
    }
  });

  return {
    title,
    content,
    source_url: url,
  };
}

// ------------------
// scrape blog list
// ------------------
async function scrapeOldestBlogs() {
  console.log("🔍 Fetching blogs list...");

  const { data } = await axios.get(BLOG_LIST_URL);
  const $ = cheerio.load(data);

  const links = [];
  const seen = new Set();

  $("a").each((_, el) => {
    const href = $(el).attr("href");

    if (
      href &&
      href.startsWith("/blogs/") &&
      !href.includes("#") &&
      !seen.has(href)
    ) {
      seen.add(href);
      links.push(BASE_URL + href);
    }
  });

  if (links.length === 0) {
    console.log("❌ No blog links found");
    return;
  }

  // last 5 = oldest blogs
  const oldestBlogs = links.slice(-5);

  console.log(`📰 Found ${oldestBlogs.length} oldest blogs\n`);

  for (const blogUrl of oldestBlogs) {
    console.log("────────────────────────────────────");
    console.log(`➡️ URL: ${blogUrl}`);

    const article = await scrapeArticle(blogUrl);

    if (!article.title || article.content.length < 100) {
      console.log("⚠️ Skipping weak article\n");
      continue;
    }

    console.log("📝 TITLE:");
    console.log(article.title);

    console.log("\n📄 CONTENT (first 500 chars):");
    console.log(article.content.slice(0, 500) + "...\n");
  }

  console.log("🎉 Scraping completed (console only)");
}

scrapeOldestBlogs();





// import axios from "axios";
// import * as cheerio from "cheerio";

// const BASE_URL = "https://beyondchats.com";
// const BLOG_LIST_URL = "https://beyondchats.com/blogs/";
// const LARAVEL_API = "http://127.0.0.1:8000/api/articles";

// // ------------------
// // scrape single blog
// // ------------------
// async function scrapeArticle(url) {
//   const { data } = await axios.get(url);
//   const $ = cheerio.load(data);

//   const title = $("h1").first().text().trim();

//   let content = "";
//   $("p").each((_, el) => {
//     const text = $(el).text().trim();
//     if (text.length > 40) {
//       content += text + "\n\n";
//     }
//   });

//   return {
//     title,
//     content,
//     source_url: url,
//   };
// }

// // ------------------
// // scrape blog list
// // ------------------
// async function scrapeOldestBlogs() {
//   console.log("🔍 Fetching blogs list...");

//   const { data } = await axios.get(BLOG_LIST_URL);
//   const $ = cheerio.load(data);

//   const links = [];
//   const seen = new Set();

//   $("a").each((_, el) => {
//     const href = $(el).attr("href");

//     if (
//       href &&
//       href.startsWith("/blogs/") &&
//       !href.includes("#") &&
//       !seen.has(href)
//     ) {
//       seen.add(href);
//       links.push(BASE_URL + href);
//     }
//   });

//   if (links.length === 0) {
//     console.log("❌ No blog links found");
//     return;
//   }

//   // last 5 = oldest blogs
//   const oldestBlogs = links.slice(-5);

//   console.log(`📰 Found ${oldestBlogs.length} oldest blogs`);

//   for (const blogUrl of oldestBlogs) {
//     console.log(`➡️ Scraping: ${blogUrl}`);

//     const article = await scrapeArticle(blogUrl);

//     if (!article.title || article.content.length < 100) {
//       console.log("⚠️ Skipping weak article");
//       continue;
//     }

//     await axios.post(LARAVEL_API, article);
//     console.log(`✅ Saved: ${article.title}`);
//   }

//   console.log("🎉 Scraping completed");
// }

// scrapeOldestBlogs();
