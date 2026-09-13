/**
 * Postbuild prerender: generates per-route static HTML files in dist/
 * so non-JS AI crawlers (CCBot, basic ChatGPT/Claude/Perplexity fetchers)
 * see route-specific titles, meta tags, JSON-LD, and content.
 *
 * The React bundle still hydrates normally for human visitors.
 *
 * Hosts that serve `<path>/index.html` for `<path>/` (Lovable hosting does
 * this) will deliver these prerendered files for direct navigations and
 * fall back to the SPA shell for unknown routes.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { faqGroups, allFaqs } from "../src/data/faqData";
import { serviceAreas } from "../src/data/serviceAreas";
import { coreServiceSeo } from "../src/data/coreServiceSeo";
import { serviceLocationData } from "../src/data/serviceLocationContent";

const SITE_URL = "https://jsgliquidators.com";
const DIST = resolve("dist");
const TEMPLATE_PATH = resolve(DIST, "index.html");

if (!existsSync(TEMPLATE_PATH)) {
  console.error("[prerender] dist/index.html missing — run `vite build` first.");
  process.exit(0); // don't fail the build
}

const TEMPLATE = readFileSync(TEMPLATE_PATH, "utf8");

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ||
  "https://mhclrysmujybkgyibxlo.supabase.co";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";

type Route = {
  path: string; // e.g. /blog/foo  (no trailing slash, no leading domain)
  title: string;
  description: string;
  bodyHtml: string; // injected inside #root as crawler-visible content
  jsonLd?: object | object[];
  ogType?: "website" | "article";
  image?: string;
};

// Cities and services come from the same source of truth the app routes use,
// so every /areas/{city}/{service} route in the sitemap gets a prerendered file.
const CITIES = serviceAreas.map((a) => a.slug);
const CITY_NAMES: Record<string, string> = Object.fromEntries(
  serviceAreas.map((a) => [a.slug, a.city]),
);
const SERVICES = serviceLocationData.map((service) => ({
  slug: service.serviceSlug,
  name: service.serviceName,
}));
const titleCase = (s: string) =>
  CITY_NAMES[s] ||
  s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Make an image URL absolute so crawlers/social cards resolve it. */
function absoluteUrl(u: string): string {
  if (/^https?:\/\//i.test(u)) return u;
  return `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`;
}

/** Remove scripts, styles, iframes and inline event handlers from stored article HTML. */
function sanitizeArticleHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

function renderHtml(route: Route): string {
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const ogType = route.ogType || "website";
  const ogImage = route.image || `${SITE_URL}/logo.png`;
  const jsonLdArr = route.jsonLd
    ? Array.isArray(route.jsonLd)
      ? route.jsonLd
      : [route.jsonLd]
    : [];

  let html = TEMPLATE;

  // Replace <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`,
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
  );

  // Replace og:title / og:description / og:url / og:type
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${ogType}" />`,
  );
  if (route.image) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${ogImage}" />`,
    );
  }

  // Twitter
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
  );

  // Inject canonical (insert before </head>)
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(
      /<link rel="canonical"[^>]*>/,
      canonicalTag,
    );
  } else {
    html = html.replace("</head>", `    ${canonicalTag}\n  </head>`);
  }

  // Inject per-route JSON-LD before </head>
  if (jsonLdArr.length) {
    const blocks = jsonLdArr
      .map(
        (o) =>
          `<script type="application/ld+json" data-prerender-route-schema="true">${JSON.stringify(o)}</script>`,
      )
      .join("\n    ");
    html = html.replace("</head>", `    ${blocks}\n  </head>`);
  }

  // Non-home routes must not inherit the homepage-specific WebPage entity.
  if (route.path !== "/") {
    html = html.replace(
      /\s*<script type="application\/ld\+json">[\s\S]*?"@id": "https:\/\/jsgliquidators\.com\/#webpage"[\s\S]*?<\/script>/,
      "",
    );
  }

  // Replace #root inner content with the route body (crawler-visible).
  // The React app will re-render on hydration in the browser.
  // Vite hoists the module script into <head>, so match the #root container
  // itself (greedy to the final closing tag before </body>).
  html = html.replace(
    /<div id="root"[^>]*>[\s\S]*<\/div>/,
    `<div id="root" aria-hidden="false">\n${route.bodyHtml}\n    </div>`,
  );

  return html;
}

function writeRoute(route: Route) {
  const html = renderHtml(route);
  // Path "/foo/bar" → dist/foo/bar/index.html
  const segments = route.path.replace(/^\/+|\/+$/g, "");
  const outDir = segments
    ? resolve(DIST, segments)
    : DIST;
  // Don't overwrite root index.html (vite already wrote it; keep its full content)
  if (!segments) return;
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), html);
}

/**
 * Write dist/404.html — a noindex "not found" document. Hosting that supports
 * a 404 document will serve it with a real HTTP 404 for unknown paths.
 */
function writeNotFound() {
  let html = renderHtml({
    path: "/404",
    title: "Page Not Found | JSG Liquidators",
    description: "The page you requested could not be found. Browse JSG Liquidators' Denver estate sale, liquidation, cleanout, and consignment services.",
    bodyHtml: `<main style="max-width:900px;margin:0 auto;padding:24px;">
      <h1>Page not found</h1>
      <p>The page you requested does not exist. Try one of these:</p>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Estate liquidation services</a></li>
        <li><a href="/auctions">Current auctions</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      ${commonFooter()}
    </main>`,
  });
  html = html
    .replace(/<link rel="canonical"[^>]*>/, "")
    .replace(
      /<meta name="robots"[^>]*>/,
      '<meta name="robots" content="noindex, follow" />',
    );
  writeFileSync(resolve(DIST, "404.html"), html);
}

/** Write a redirect stub for a legacy path (canonical points at the target). */
function writeRedirect(from: string, to: string) {
  const target = `${SITE_URL}${to}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${target}" />
    <meta http-equiv="refresh" content="0; url=${to}" />
    <title>Redirecting to ${target}</title>
    <script>window.location.replace(${JSON.stringify(to)});</script>
  </head>
  <body><p>This page has moved to <a href="${to}">${target}</a>.</p></body>
</html>`;
  const segments = from.replace(/^\/+/, "");
  if (segments.endsWith(".html")) {
    writeFileSync(resolve(DIST, segments), html);
  } else {
    mkdirSync(resolve(DIST, segments), { recursive: true });
    writeFileSync(resolve(DIST, segments, "index.html"), html);
  }
}

const breadcrumb = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.item,
  })),
});

function commonFooter(): string {
  return `<footer style="margin-top:32px;padding-top:16px;border-top:1px solid #ddd;font-size:14px;">
      <p><strong>JSG Liquidators</strong> · Denver, Colorado · Cleanout costs are quoted and paid upfront · Optional sale proceeds may help recoup costs.</p>
      <p>Call David: <a href="tel:805-444-4069">(805) 444-4069</a> · Email: <a href="mailto:jsgliquidators@gmail.com">jsgliquidators@gmail.com</a></p>
      <nav><a href="/">Home</a> · <a href="/services">Services</a> · <a href="/auctions">Auctions</a> · <a href="/blog">Blog</a> · <a href="/contact">Contact</a> · <a href="/llms.txt">AI: llms.txt</a></nav>
    </footer>`;
}

// ---------- Static pages ----------
const staticPages: Route[] = [
  {
    path: "/services",
    title: "Estate Liquidation Services in Denver | JSG Liquidators",
    description: "Estate sales, business liquidation, cleanouts, e-commerce consignment and junk removal across Denver. Custom plans and upfront cleanout pricing.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Estate Liquidation Services in Denver, Colorado</h1>
      <p>JSG Liquidators provides custom estate liquidation plans across the Denver metro area. Cleanout work is quoted and paid upfront; optional auction and e-commerce proceeds may help clients recoup costs without any guaranteed result.</p>
      <h2>Our services</h2>
      <ul>
        <li><a href="/services">Estate Sales &amp; Online Auctions</a> — Nationwide buyer reach via LiveAuctioneers, Denver Online Auctions, and eBay.</li>
        <li><a href="/services/estate-cleanouts">Estate Cleanouts</a> — custom property plans with clear upfront cleanout quotes.</li>
        <li><a href="/services">Business Liquidation</a> — Office equipment, inventory, fixtures, and machinery for closing or relocating businesses.</li>
        <li><a href="/services">E-Commerce Consignment</a> — eBay and marketplace listings for high-value items.</li>
        <li><a href="/services/junk-removal">Junk Removal</a> — quoted removal with optional evaluation of approved items for resale.</li>
      </ul>
      ${commonFooter()}
    </main>`,
  },
  {
    path: "/about",
    title: "About JSG Liquidators | Denver Estate Sale Company",
    description: "JSG Liquidators is a Denver family-run estate sale and liquidation company offering online sales, e-commerce consignment and upfront-priced cleanouts.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>About JSG Liquidators</h1>
       <p>JSG Liquidators is operated by JSG Liquidators LLC. David and Vincent help Denver-area clients plan estate sales, business liquidation, e-commerce consignment and property cleanouts.</p>
      <p>Cleanout work is quoted and paid upfront. Approved items may also be sold through online auction or e-commerce, giving clients an opportunity to recoup some or all of the expense without a guaranteed return.</p>
      ${commonFooter()}
    </main>`,
  },
  {
    path: "/contact",
    title: "Contact JSG Liquidators | Denver Estate Sales",
    description: "Contact JSG Liquidators for a free Denver estate sale, liquidation, or cleanout consultation. Call (805) 444-4069 or email jsgliquidators@gmail.com.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Contact JSG Liquidators</h1>
      <p>Free, no-obligation consultations for estate sales, business liquidation, cleanouts, consignment, and junk removal anywhere in the Denver metro.</p>
      <dl>
        <dt>Phone (David, primary)</dt><dd><a href="tel:805-444-4069">(805) 444-4069</a></dd>
        <dt>Phone (Vincent, secondary)</dt><dd><a href="tel:805-340-4817">(805) 340-4817</a></dd>
        <dt>Email</dt><dd><a href="mailto:jsgliquidators@gmail.com">jsgliquidators@gmail.com</a></dd>
        <dt>Hours</dt><dd>Mon–Fri 8:00 AM – 6:00 PM Mountain Time · Saturday by appointment</dd>
        <dt>Service area</dt><dd>Denver, Aurora, Lakewood, Highlands Ranch, Castle Rock, Englewood, Littleton, Centennial, Parker, Arvada, Westminster, Thornton, Boulder, and surrounding Front Range communities</dd>
      </dl>
      ${commonFooter()}
    </main>`,
  },
  {
    path: "/testimonials",
    title: "Customer Testimonials | JSG Liquidators Denver",
    description: "Read reviews from Denver estate sale and liquidation clients who used JSG Liquidators for professional, AI-powered estate sales.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>What Denver clients say about JSG Liquidators</h1>
      <p>Hundreds of completed Colorado estate sales, cleanouts, and business liquidations. Clients consistently cite our professionalism, communication, and ability to find value in items they thought were worthless.</p>
      ${commonFooter()}
    </main>`,
  },
  {
    path: "/auctions",
    title: "Current Online Auctions | JSG Liquidators Denver",
    description: "Browse JSG Liquidators' current online estate auctions on LiveAuctioneers, Denver Online Auctions, and eBay. Antiques, collectibles, furniture, tools, and more.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Current JSG Liquidators Auctions</h1>
      <p>We list estate inventory across three marketplaces to reach the maximum buyer pool:</p>
      <ul>
        <li><a href="https://jsg-liquidators.liveauctioneers.com/">LiveAuctioneers</a> — antiques, fine art, jewelry, collectibles.</li>
        <li><a href="https://denveronlineauctions.com/marketplace/jsg-estate-liquidation">Denver Online Auctions</a> — local Colorado pickup auctions.</li>
        <li><a href="https://ebay.us/m/tsG4b9">eBay</a> — global reach for high-value items.</li>
      </ul>
      ${commonFooter()}
    </main>`,
  },
  {
    path: "/why-work-with-us",
    title: "Why Work With JSG Liquidators | Denver Estate Experts",
    description: "Denver estate liquidator offering custom plans, online auctions, e-commerce consignment and clearly quoted upfront cleanout services.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Why work with JSG Liquidators</h1>
      <ul>
        <li><strong>Clear cleanout pricing</strong> — cleanout costs are quoted and paid upfront.</li>
        <li><strong>Optional sales</strong> — auction or e-commerce proceeds may help recoup costs, but returns are not guaranteed.</li>
       <li><strong>AI-assisted research</strong> — marketplace information helps inform item and channel decisions.</li>
       <li><strong>Property-specific timing</strong> — schedules depend on the items, sales channel, buyer demand and cleanout scope.</li>
        <li><strong>Full-service</strong> — appraisal, photography, listing, sale, payment, and final cleanup.</li>
       <li><strong>Denver-area service</strong> — one team coordinates the approved sales and property plan.</li>
      </ul>
      ${commonFooter()}
    </main>`,
  },
  {
    path: "/faq",
    title: "Estate Sale & Liquidation FAQs Denver | JSG Liquidators",
    description: "Answers to Denver estate sale, liquidation, cleanout and consignment questions, including upfront cleanout pricing, timelines and service areas.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Denver Estate Sale &amp; Liquidation FAQs</h1>
      <p class="speakable-summary"><strong>TL;DR:</strong> Straight answers about estate sales, online auctions, cleanouts &amp; e-commerce consignment across Denver and the Front Range. Cleanout costs are quoted and paid upfront. Call David at <a href="tel:805-444-4069">(805) 444-4069</a>.</p>
      ${faqGroups
        .map(
          (g) =>
            `<h2>${escapeHtml(g.heading)}</h2>` +
            g.items.map((i) => `<h3>${escapeHtml(i.question)}</h3><p>${escapeHtml(i.answer)}</p>`).join(""),
        )
        .join("")}
      ${commonFooter()}
    </main>`,
    jsonLd: [
      breadcrumb([
        { name: "Home", item: SITE_URL + "/" },
        { name: "FAQ", item: SITE_URL + "/faq" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  },
  {
    path: "/how-much-do-estate-sale-companies-charge",
    title: "How Much Do Estate Sale Companies Charge in Denver? | JSG Liquidators",
    description: "Denver estate sale pricing varies by job. JSG provides custom plans, clear upfront cleanout pricing, and optional auction or e-commerce sales.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>How Much Do Estate Sale Companies Charge in Denver?</h1>
      <p class="speakable-summary"><strong>TL;DR:</strong> Every estate is different, so JSG Liquidators builds a custom plan. If a cleanout is involved, its quoted cost is paid upfront. Optional auction and e-commerce proceeds may help recoup some or all of that expense, but no result is guaranteed. Free consultations: <a href="tel:805-444-4069">(805) 444-4069</a>.</p>
      <h2>Why there's no one-size-fits-all price</h2>
      <p>Fair pricing depends on the size of the estate, the mix of items, your timeline, the cleanout scope, and which sales channels (online auction, eBay store, e-commerce consignment) fit best. JSG strategizes with each client during a free walkthrough before quoting.</p>
      <h2>The JSG model: cleanouts with built-in revenue recovery</h2>
      <ul>
        <li><strong>Cleanouts at the core</strong> — sorting and clearing the property while identifying items with resale value first.</li>
        <li><strong>Online auction sales</strong> — auction-worthy items photographed, researched, and sold to competing bidders, typically within 7–10 days.</li>
        <li><strong>E-commerce &amp; consignment</strong> — higher-value pieces listed on the JSG eBay store for a national buyer pool.</li>
        <li><strong>Optional cost recovery</strong> — sale proceeds may help recoup some or all of the upfront cleanout cost, but returns are not guaranteed.</li>
      </ul>
      <h2>How it works: from walkthrough to broom-clean</h2>
      <ol>
        <li><strong>Free walkthrough &amp; consultation</strong> — JSG walks the property, identifies items with resale value, and discusses goals and timeline. Free, no obligation.</li>
        <li><strong>Custom plan &amp; clear cost structure</strong> — an itemized plan covering auction, eBay store / e-commerce consignment, donation, recycling, disposal, and the upfront cleanout price.</li>
        <li><strong>Online auctions &amp; e-commerce sales</strong> — items are photographed, researched, and listed online, typically selling within 7–10 days.</li>
        <li><strong>Sales settle separately, property left broom-clean</strong> — sale proceeds are settled under the agreement and may help recoup costs, but no amount is promised.</li>
      </ol>
      <h2>Frequently asked questions</h2>
      <h3>How much do estate sale companies charge in Denver?</h3>
      <p>Many companies charge a commission and some add setup fees or minimums. JSG builds a custom plan per job. If a cleanout is included, its quoted cost is paid upfront; optional sale proceeds may help recoup that expense.</p>
      <h3>Why isn't there a set price for your services?</h3>
      <p>No two estates are alike; a flat rate would overcharge some clients and underserve others. JSG provides a clear, itemized plan after a free property walkthrough.</p>
      <h3>What happens after the free walkthrough?</h3>
      <p>You'll receive a custom plan covering what's worth selling at auction, what belongs in eBay or e-commerce consignment, what can be donated or recycled, what needs disposal, and the upfront cost of any cleanout work.</p>
      <h3>How long does the process take?</h3>
      <p>Most estates move from signed agreement to broom-clean in 7–14 days. Online auctions typically run 7–10 days, with expedited timelines available for urgent situations.</p>
      <h3>What sales options are available?</h3>
      <p>JSG offers online estate auctions, eBay store and e-commerce consignment, and direct business liquidation. Most clients use a combination based on what's in the property.</p>
      <h3>Can sale proceeds help me recoup my upfront cleanout cost?</h3>
      <p>They may. Approved items can be sold through online auctions or eBay, and proceeds are settled according to the agreement. The amount depends on what sells and is not guaranteed.</p>
      <h3>What's the difference between your auction sales and e-commerce consignment?</h3>
      <p>Online auctions move volume quickly, usually within 7–10 days. E-commerce consignment is better for higher-value pieces that benefit from a set asking price and a national buyer pool.</p>
      <h3>Do you charge for the initial consultation?</h3>
      <p>No — consultations are free and carry no obligation.</p>
      <h3>What if my estate has more junk than valuables?</h3>
      <p>We'll tell you honestly what has value and what doesn't. Even a few good finds can offset cleanout costs, and we'll recommend donation, recycling, or disposal for the rest.</p>
      ${commonFooter()}
    </main>`,
    jsonLd: [
      breadcrumb([
        { name: "Home", item: SITE_URL + "/" },
        { name: "Estate Sale Costs", item: SITE_URL + "/how-much-do-estate-sale-companies-charge" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How JSG Liquidators prices an estate sale, cleanout, or liquidation in Denver",
        description: "Every job is quoted individually: a free walkthrough, clear upfront cleanout pricing when removal is included, and optional online auction or e-commerce sales.",
        totalTime: "P14D",
        step: [
          { "@type": "HowToStep", position: 1, name: "Free walkthrough & consultation", text: "JSG walks the property with you, identifies items with resale value, and discusses your goals and timeline — free and with no obligation." },
          { "@type": "HowToStep", position: 2, name: "Custom plan & clear cost structure", text: "You receive an itemized plan covering online auction, eBay store / e-commerce consignment, donation, recycling, disposal, and the upfront price of any cleanout work." },
          { "@type": "HowToStep", position: 3, name: "Online auctions & e-commerce sales", text: "Items are photographed, researched, and listed online — typically selling within 7–10 days — with higher-value pieces reaching national buyers through e-commerce consignment." },
          { "@type": "HowToStep", position: 4, name: "Sales settle separately, property left broom-clean", text: "Sale proceeds are settled according to the agreement and may help recoup the upfront cleanout cost, but no amount is guaranteed." },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": SITE_URL + "/#organization",
        name: "JSG Liquidators",
        url: SITE_URL + "/how-much-do-estate-sale-companies-charge",
        telephone: "+1-805-444-4069",
        email: "jsgliquidators@gmail.com",
        priceRange: "Free consultation — custom quote per job",
        areaServed: ["Denver", "Aurora", "Lakewood", "Westminster", "Arvada", "Boulder", "Thornton", "Centennial", "Highlands Ranch", "Castle Rock", "Englewood", "Littleton", "Fort Collins", "Colorado Springs"].map((city) => ({ "@type": "City", name: `${city}, CO` })),
      },
    ],
  },
  {
    path: "/privacy",
    title: "Privacy Policy | JSG Liquidators Denver Estate Sales",
    description:
      "How JSG Liquidators collects, uses, and protects information submitted through jsgliquidators.com. Contact jsgliquidators@gmail.com with privacy questions.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Privacy Policy</h1>
      <p>JSG Liquidators collects only the information you submit through our contact and estimate forms — name, phone, email, property location, and details about your estate sale, liquidation, consignment, or cleanout request.</p>
      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your request and schedule a free consultation.</li>
        <li>To provide estate sale, auction, e-commerce consignment, and cleanout services.</li>
        <li>To send service updates you have asked for. We never sell your information.</li>
      </ul>
      <h2>Contact</h2>
      <p>Email <a href="mailto:jsgliquidators@gmail.com">jsgliquidators@gmail.com</a> or call <a href="tel:805-444-4069">(805) 444-4069</a> to review, correct, or delete your information.</p>
      ${commonFooter()}
    </main>`,
    jsonLd: breadcrumb([
      { name: "Home", item: SITE_URL + "/" },
      { name: "Privacy Policy", item: SITE_URL + "/privacy" },
    ]),
  },
];


// ---------- Category hub pages (Core 30: /services/{category}) ----------
const categoryPages: Route[] = SERVICES.map((svc) => {
  const seo = coreServiceSeo.find((entry) => entry.slug === svc.slug);
  const pageTitle = seo?.title ?? `${svc.name} Denver`;
  const pageH1 = seo?.h1 ?? `${svc.name} in Denver`;
  const pageDescription = seo?.description ?? `${svc.name} in Denver with a custom plan and free consultation.`;
  const pageSummary = seo?.summary ?? `JSG Liquidators provides ${svc.name.toLowerCase()} in the Denver metro area.`;
  const pageUrl = `${SITE_URL}/services/${svc.slug}`;
  return {
  path: `/services/${svc.slug}`,
  title: `${pageTitle} | JSG Liquidators`,
  description: pageDescription,
  bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
    <h1>${pageH1}</h1>
    <p class="speakable-summary">${pageSummary} Cleanout work, when selected, is quoted and paid upfront. Optional sale proceeds may help recoup costs but are not guaranteed. Call David at <a href="tel:805-444-4069">(805) 444-4069</a>.</p>
    <h2>${svc.name} — city by city</h2>
    <ul>${CITIES.map((c) => `<li><a href="/areas/${c}/${svc.slug}">${svc.name} in ${titleCase(c)}, CO</a></li>`).join("")}</ul>
    <h2>Related services</h2>
    <ul>${SERVICES.filter((s) => s.slug !== svc.slug).map((s) => `<li><a href="/services/${s.slug}">${s.name}</a></li>`).join("")}</ul>
    ${commonFooter()}
  </main>`,
  jsonLd: [
    breadcrumb([
      { name: "Home", item: SITE_URL + "/" },
      { name: "Services", item: SITE_URL + "/services" },
      { name: svc.name, item: pageUrl },
    ]),
    { "@context": "https://schema.org", "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: pageTitle, description: pageDescription, isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${pageUrl}#service` } },
    { "@context": "https://schema.org", "@type": "Service", "@id": `${pageUrl}#service`, name: svc.name, serviceType: svc.name, url: pageUrl, provider: { "@id": `${SITE_URL}/#organization` }, isPartOf: { "@id": `${SITE_URL}/#service` }, areaServed: { "@type": "AdministrativeArea", name: "Denver metro area" } },
  ],
};
});

// ---------- City / area pages ----------
const areaPages: Route[] = [];
for (const city of CITIES) {
  const cityName = titleCase(city);
  areaPages.push({
    path: `/areas/${city}`,
    title: `${cityName} Estate Sales & Liquidation | JSG Liquidators`,
    description: `Estate sales, cleanouts, business liquidation, consignment, and junk removal in ${cityName}, Colorado. Custom plans and clear upfront cleanout pricing.`,
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Estate Sales &amp; Liquidation in ${cityName}, Colorado</h1>
      <p>JSG Liquidators provides custom estate liquidation plans in ${cityName}. Cleanout work is quoted and paid upfront; optional auction and e-commerce proceeds may help clients recoup costs without any guarantee.</p>
      <h2>${cityName} services</h2>
      <ul>${SERVICES.map((s) => `<li><a href="/areas/${city}/${s.slug}">${s.name} in ${cityName}</a></li>`).join("")}</ul>
      ${commonFooter()}
    </main>`,
    jsonLd: breadcrumb([
      { name: "Home", item: SITE_URL + "/" },
      { name: "Services", item: SITE_URL + "/services" },
      { name: cityName, item: `${SITE_URL}/areas/${city}` },
    ]),
  });
  for (const svc of SERVICES) {
    areaPages.push({
      path: `/areas/${city}/${svc.slug}`,
      title: `${svc.name} in ${cityName}, CO | JSG Liquidators`,
      description: `Professional ${svc.name.toLowerCase()} services in ${cityName}, Colorado. Custom planning and clear upfront cleanout pricing when applicable.`,
      bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
        <h1>${svc.name} in ${cityName}, Colorado</h1>
        <p>JSG Liquidators offers professional ${svc.name.toLowerCase()} throughout ${cityName} and surrounding Denver-metro communities. Scheduling depends on the project scope and current availability.</p>
        <p>Cleanout work is quoted and paid upfront. Approved items may be sold through auction or e-commerce, and proceeds may help recoup costs without any guaranteed result.</p>
        ${commonFooter()}
      </main>`,
      jsonLd: breadcrumb([
        { name: "Home", item: SITE_URL + "/" },
        { name: cityName, item: `${SITE_URL}/areas/${city}` },
        { name: svc.name, item: `${SITE_URL}/areas/${city}/${svc.slug}` },
      ]),
    });
  }
}

// ---------- Blog index + posts ----------
async function fetchBlogPosts() {
  if (!SUPABASE_KEY) {
    console.warn("[prerender] No Supabase key; skipping blog prerender.");
    return [] as Array<{
      slug: string;
      title: string;
      excerpt: string | null;
      content: string | null;
      author: string | null;
      published_at: string | null;
      featured_image_url: string | null;
    }>;
  }
  const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { data, error } = await sb
    .from("blog_posts")
    .select("slug, title, excerpt, content, author, published_at, updated_at, featured_image_url")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });
  if (error) {
    console.warn("[prerender] Blog fetch error:", error.message);
    return [];
  }
  return data ?? [];
}

async function main() {
  console.log("[prerender] Generating static route HTML…");
  let count = 0;

  for (const route of staticPages) {
    writeRoute(route);
    count++;
  }
  for (const route of categoryPages) {
    writeRoute(route);
    count++;
  }
  for (const route of areaPages) {
    writeRoute(route);
    count++;
  }

  const posts = await fetchBlogPosts();
  // Blog index
  writeRoute({
    path: "/blog",
    title: "Estate Liquidation Blog | JSG Liquidators Denver",
    description: "Estate sale tips, AI-powered liquidation insights, and Denver-specific cleanout guides from JSG Liquidators.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>JSG Liquidators Blog</h1>
      <p>Practical Denver-focused guides on estate sales, liquidation, cleanouts, consignment, and how AI is changing the industry.</p>
      <ul>${posts.map((p) => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a>${p.excerpt ? ` — ${escapeHtml(p.excerpt)}` : ""}</li>`).join("")}</ul>
      ${commonFooter()}
    </main>`,
  });
  count++;

  for (const p of posts) {
    const excerpt =
      p.excerpt || (p.content ? stripHtml(p.content).slice(0, 200) : "");
    // Full article body in the initial HTML (scripts/handlers stripped).
    const articleHtml = p.content
      ? sanitizeArticleHtml(p.content)
      : `<p>${escapeHtml(excerpt)}</p>`;
    const url = `${SITE_URL}/blog/${p.slug}`;
    const image = p.featured_image_url
      ? absoluteUrl(p.featured_image_url)
      : `${SITE_URL}/logo.png`;
    writeRoute({
      path: `/blog/${p.slug}`,
      title: `${p.title} | JSG Liquidators Blog`,
      description: excerpt || `Read ${p.title} on the JSG Liquidators blog.`,
      ogType: "article",
      image,
      bodyHtml: `<main style="max-width:900px;margin:0 auto;padding:24px;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> · <a href="/blog">Blog</a> · <span>${escapeHtml(p.title)}</span></nav>
        <article>
          <h1>${escapeHtml(p.title)}</h1>
          <p><em>By ${escapeHtml(p.author || "JSG Liquidators")}${p.published_at ? ` · Published ${new Date(p.published_at).toLocaleDateString("en-US")}` : ""}</em></p>
          ${p.featured_image_url ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(p.title)}" style="max-width:100%;height:auto;" />` : ""}
          ${articleHtml}
        </article>
        <h2>Related services</h2>
        <ul>
          <li><a href="/services/estate-sales">Estate sales &amp; online auctions in Denver</a></li>
          <li><a href="/services/estate-cleanouts">Estate cleanouts</a></li>
          <li><a href="/services/consignment">E-commerce consignment</a></li>
        </ul>
        <p><a href="/contact">Request a free consultation</a> · <a href="/blog">← All guides</a></p>
        ${commonFooter()}
      </main>`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          headline: p.title,
          description: excerpt,
          author: {
            "@type": p.author && p.author !== "JSG Liquidators" ? "Person" : "Organization",
            name: p.author || "JSG Liquidators",
          },
          datePublished: p.published_at || undefined,
          dateModified: (p as { updated_at?: string }).updated_at || p.published_at || undefined,
          image,
          url,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          isPartOf: { "@id": `${SITE_URL}/#website` },
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
        breadcrumb([
          { name: "Home", item: SITE_URL + "/" },
          { name: "Blog", item: SITE_URL + "/blog" },
          { name: p.title, item: url },
        ]),
      ],
    });
    count++;
  }

  // --- Soft-404 shell + legacy redirect stubs ---
  // Hosting serves 404.html for unknown paths where supported.
  writeNotFound();
  writeRedirect("/why-us", "/why-work-with-us");
  writeRedirect("/current-auctions.html", "/auctions");
  writeRedirect("/contact.html", "/contact");
  count += 4;


  console.log(`[prerender] Wrote ${count} prerendered route files.`);
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  // do not fail the build
  process.exit(0);
});
