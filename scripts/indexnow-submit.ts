// Submit all sitemap URLs to IndexNow (Bing + Yandex + ChatGPT search index).
// Run after publishing major changes:  bunx tsx scripts/indexnow-submit.ts
//
// IndexNow is the API ChatGPT/Bing use for near-instant indexing.
// Docs: https://www.indexnow.org/documentation

import { readFileSync } from "fs";
import { resolve } from "path";

const HOST = "jsgliquidators.com";
const KEY = "1b252a8f4de5d2132183bf668d7ef8c6";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function extractUrls(xml: string): string[] {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());
}

async function main() {
  const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
  const urlList = extractUrls(xml);
  if (urlList.length === 0) {
    console.error("No URLs found in sitemap.xml");
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow (Bing/ChatGPT)...`);

  // IndexNow accepts up to 10,000 URLs per request
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  console.log(`IndexNow status: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    process.exit(1);
  }
  console.log("Done. Bing/ChatGPT will recrawl the submitted URLs shortly.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
