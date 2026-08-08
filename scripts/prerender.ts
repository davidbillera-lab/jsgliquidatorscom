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
const SERVICES = [
  { slug: "estate-sales", name: "Estate Sales" },
  { slug: "estate-cleanouts", name: "Estate Cleanouts" },
  { slug: "business-liquidation", name: "Business Liquidation" },
  { slug: "consignment", name: "E-Commerce Consignment" },
  { slug: "junk-removal", name: "Junk Removal" },
];
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
          `<script type="application/ld+json">${JSON.stringify(o)}</script>`,
      )
      .join("\n    ");
    html = html.replace("</head>", `    ${blocks}\n  </head>`);
  }

  // Replace #root inner content with the route body (crawler-visible).
  // The React app will re-render on hydration in the browser.
  html = html.replace(
    /<div id="root"[^>]*>[\s\S]*?<\/div>\s*<script type="module"/,
    `<div id="root" aria-hidden="false">\n${route.bodyHtml}\n    </div>\n    <script type="module"`,
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
      <p><strong>JSG Liquidators</strong> · Denver, Colorado · No upfront cost — auction proceeds offset fees · Items sold in 7–10 days.</p>
      <p>Call David: <a href="tel:805-444-4069">(805) 444-4069</a> · Email: <a href="mailto:jsgliquidators@gmail.com">jsgliquidators@gmail.com</a></p>
      <nav><a href="/">Home</a> · <a href="/services">Services</a> · <a href="/auctions">Auctions</a> · <a href="/blog">Blog</a> · <a href="/contact">Contact</a> · <a href="/llms.txt">AI: llms.txt</a></nav>
    </footer>`;
}

// ---------- Static pages ----------
const staticPages: Route[] = [
  {
    path: "/services",
    title: "Estate Liquidation Services in Denver | JSG Liquidators",
    description: "Estate sales, business liquidation, estate cleanouts, e-commerce consignment, and junk removal across Denver and the Colorado Front Range. No upfront cost.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Estate Liquidation Services in Denver, Colorado</h1>
      <p>JSG Liquidators provides full-service estate liquidation across the Denver metro area on a no-upfront-cost "Revenue Recovery" model. Online auction proceeds cover or offset our service fees.</p>
      <h2>Our services</h2>
      <ul>
        <li><a href="/services">Estate Sales &amp; Online Auctions</a> — Nationwide buyer reach via LiveAuctioneers, Denver Online Auctions, and eBay.</li>
        <li><a href="/services">Estate Cleanouts</a> — 4-step, ~12-day "Auction-Backed Cleanout" that recovers value before clearing the property.</li>
        <li><a href="/services">Business Liquidation</a> — Office equipment, inventory, fixtures, and machinery for closing or relocating businesses.</li>
        <li><a href="/services">E-Commerce Consignment</a> — eBay and marketplace listings for high-value items.</li>
        <li><a href="/services">Junk Removal</a> — Eco-friendly removal; valuable items identified first to offset costs.</li>
      </ul>
      ${commonFooter()}
    </main>`,
  },
  {
    path: "/about",
    title: "About JSG Liquidators | Denver Estate Sale Company",
    description: "JSG Liquidators is a Denver, Colorado family-run estate sale and liquidation company founded by David Billera. AI-first inventory, fast 7–10 day turnaround, no upfront fees.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>About JSG Liquidators</h1>
      <p>JSG Liquidators is a Denver-based, family-run estate and business liquidation company founded by David Billera. We've completed hundreds of Colorado liquidations using an AI-first inventory and pricing workflow that routes every item to the highest-paying marketplace.</p>
      <p>Our "Revenue Recovery" model means clients pay no upfront fees — online auction proceeds cover or offset our service costs. Items typically sell within 7–10 days; full estate cleanouts take about 12 days.</p>
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
        <dt>Hours</dt><dd>Mon–Fri 8:00 AM – 6:00 PM MT · Same-day &amp; emergency cleanouts available</dd>
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
    description: "Denver's AI-first estate liquidator. No upfront cost, items sold in 7–10 days, full-service appraisal through cleanup, hundreds of completed Colorado liquidations.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Why work with JSG Liquidators</h1>
      <ul>
        <li><strong>No upfront cost</strong> — auction proceeds cover or offset fees.</li>
        <li><strong>AI-first inventory &amp; pricing</strong> — items routed to the highest-paying marketplace.</li>
        <li><strong>Fast turnaround</strong> — items typically sold in 7–10 days; full cleanouts in ~12 days.</li>
        <li><strong>Full-service</strong> — appraisal, photography, listing, sale, payment, and final cleanup.</li>
        <li><strong>Local &amp; trusted</strong> — Denver-based, family-run, hundreds of completed Colorado liquidations.</li>
      </ul>
      ${commonFooter()}
    </main>`,
  },
  {
    path: "/faq",
    title: "Estate Sale & Liquidation FAQs Denver | JSG Liquidators",
    description: "Answers to Denver estate sale, liquidation, cleanout & consignment questions — costs, timelines, service areas & our no-upfront-fee Revenue Recovery model.",
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Denver Estate Sale &amp; Liquidation FAQs</h1>
      <p class="speakable-summary"><strong>TL;DR:</strong> Straight answers about estate sales, online auctions, cleanouts &amp; e-commerce consignment across Denver and the Front Range. No upfront cost — auction proceeds offset fees. Call David at <a href="tel:805-444-4069">(805) 444-4069</a>.</p>
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
];

// ---------- Category hub pages (Core 30: /services/{category}) ----------
const categoryPages: Route[] = SERVICES.map((svc) => ({
  path: `/services/${svc.slug}`,
  title: `${svc.name} in Denver & Colorado | JSG Liquidators`,
  description: `${svc.name} throughout Denver, Aurora, Lakewood, Highlands Ranch, Castle Rock, Boulder, Colorado Springs and the Front Range. No upfront cost, items sold in 7–10 days. Call (805) 444-4069.`,
  bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
    <h1>${svc.name} in Denver &amp; the Colorado Front Range</h1>
    <p class="speakable-summary"><strong>TL;DR:</strong> JSG Liquidators provides ${svc.name.toLowerCase()} across every Denver-metro city. No upfront cost. Items sell in 7–10 days. Call David at <a href="tel:805-444-4069">(805) 444-4069</a>.</p>
    <h2>${svc.name} — city by city</h2>
    <ul>${CITIES.map((c) => `<li><a href="/areas/${c}/${svc.slug}">${svc.name} in ${titleCase(c)}, CO</a></li>`).join("")}</ul>
    <h2>Related services</h2>
    <ul>${SERVICES.filter((s) => s.slug !== svc.slug).map((s) => `<li><a href="/services/${s.slug}">${s.name}</a></li>`).join("")}</ul>
    ${commonFooter()}
  </main>`,
  jsonLd: breadcrumb([
    { name: "Home", item: SITE_URL + "/" },
    { name: "Services", item: SITE_URL + "/services" },
    { name: svc.name, item: `${SITE_URL}/services/${svc.slug}` },
  ]),
}));

// ---------- City / area pages ----------
const areaPages: Route[] = [];
for (const city of CITIES) {
  const cityName = titleCase(city);
  areaPages.push({
    path: `/areas/${city}`,
    title: `${cityName} Estate Sales & Liquidation | JSG Liquidators`,
    description: `Estate sales, cleanouts, business liquidation, consignment, and junk removal in ${cityName}, Colorado. No upfront cost — auction proceeds cover fees.`,
    bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
      <h1>Estate Sales &amp; Liquidation in ${cityName}, Colorado</h1>
      <p>JSG Liquidators provides full-service estate liquidation in ${cityName} on a no-upfront-cost basis. Online auction proceeds cover or offset our service fees, and items typically sell within 7–10 days.</p>
      <h2>${cityName} services</h2>
      <ul>${SERVICES.map((s) => `<li><a href="/areas/${city}/${s.slug}">${s.name} in ${cityName}</a></li>`).join("")}</ul>
      ${commonFooter()}
    </main>`,
    jsonLd: breadcrumb([
      { name: "Home", item: SITE_URL + "/" },
      { name: "Service Areas", item: SITE_URL + "/service-areas" },
      { name: cityName, item: `${SITE_URL}/areas/${city}` },
    ]),
  });
  for (const svc of SERVICES) {
    areaPages.push({
      path: `/areas/${city}/${svc.slug}`,
      title: `${svc.name} in ${cityName}, CO | JSG Liquidators`,
      description: `Professional ${svc.name.toLowerCase()} services in ${cityName}, Colorado. AI-first pricing, no upfront cost, items sold in 7–10 days.`,
      bodyHtml: `<main style="max-width:1100px;margin:0 auto;padding:24px;">
        <h1>${svc.name} in ${cityName}, Colorado</h1>
        <p>JSG Liquidators offers professional ${svc.name.toLowerCase()} throughout ${cityName} and surrounding Denver-metro communities. Same-day and emergency service available.</p>
        <p>Our auction-backed model recovers value from items before clearing the property — clients pay no upfront fees and most items sell within 7–10 days.</p>
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
    .select("slug, title, excerpt, content, author, published_at, featured_image_url")
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
    const bodySnippet = p.content
      ? stripHtml(p.content).slice(0, 1500)
      : excerpt;
    const url = `${SITE_URL}/blog/${p.slug}`;
    writeRoute({
      path: `/blog/${p.slug}`,
      title: `${p.title} | JSG Liquidators Blog`,
      description: excerpt || `Read ${p.title} on the JSG Liquidators blog.`,
      ogType: "article",
      image: p.featured_image_url || undefined,
      bodyHtml: `<main style="max-width:900px;margin:0 auto;padding:24px;">
        <article>
          <h1>${escapeHtml(p.title)}</h1>
          ${p.author ? `<p><em>By ${escapeHtml(p.author)}${p.published_at ? ` · ${new Date(p.published_at).toLocaleDateString("en-US")}` : ""}</em></p>` : ""}
          ${p.featured_image_url ? `<img src="${escapeHtml(p.featured_image_url)}" alt="${escapeHtml(p.title)}" style="max-width:100%;height:auto;" />` : ""}
          <p>${escapeHtml(bodySnippet)}…</p>
          <p><a href="/blog">← Back to all guides</a></p>
        </article>
        ${commonFooter()}
      </main>`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: excerpt,
          author: p.author ? { "@type": "Person", name: p.author } : undefined,
          datePublished: p.published_at || undefined,
          image: p.featured_image_url || undefined,
          mainEntityOfPage: url,
          publisher: {
            "@type": "Organization",
            name: "JSG Liquidators",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
          },
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

  console.log(`[prerender] Wrote ${count} prerendered route files.`);
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  // do not fail the build
  process.exit(0);
});
