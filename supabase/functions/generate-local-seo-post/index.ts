import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.48/deno-dom-wasm.ts";

// ============ Sanitization (mirrors generate-blog-post) ============
const ALLOWED_TAGS = new Set(['p','br','strong','em','u','h1','h2','h3','h4','h5','h6','ul','ol','li','a','img','blockquote','code','pre','span','div']);
const ALLOWED_ATTR: Record<string, Set<string>> = {
  '*': new Set(['class','id','style','title']),
  'a': new Set(['href','target']),
  'img': new Set(['src','alt']),
};
function escapeHtml(s: string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function escapeAttr(s: string){return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function sanitizeNode(node: any): string {
  if (node.nodeType === 3) return escapeHtml(node.textContent || '');
  if (node.nodeType !== 1) return '';
  const tag = node.tagName.toLowerCase();
  if (!ALLOWED_TAGS.has(tag)) return Array.from(node.childNodes).map((c:any)=>sanitizeNode(c)).join('');
  const attrs: string[] = [];
  const g = ALLOWED_ATTR['*']!; const t = ALLOWED_ATTR[tag] || new Set();
  for (const a of Array.from(node.attributes) as any[]) {
    const n = a.name.toLowerCase();
    if (g.has(n) || t.has(n)) {
      const v = a.value;
      if ((n==='href'||n==='src') && !/^(?:https?:|mailto:|\/)/i.test(v)) continue;
      if ((n==='href'||n==='src') && /^\s*javascript:/i.test(v)) continue;
      attrs.push(`${n}="${escapeAttr(v)}"`);
    }
  }
  const attrStr = attrs.length ? ' '+attrs.join(' ') : '';
  if (['br','img'].includes(tag)) return `<${tag}${attrStr} />`;
  const kids = Array.from(node.childNodes).map((c:any)=>sanitizeNode(c)).join('');
  return `<${tag}${attrStr}>${kids}</${tag}>`;
}
function sanitizeHtml(html: string): string {
  try {
    const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
    const wrapper = doc?.querySelector('div');
    if (!wrapper) return escapeHtml(html);
    return Array.from(wrapper.childNodes).map((c:any)=>sanitizeNode(c)).join('');
  } catch { return escapeHtml(html); }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ============ Local SEO data (mirrors src/data/serviceAreas.ts) ============
const cities = [
  { slug: "denver", city: "Denver", county: "Denver County", neighborhoods: ["Capitol Hill","Cherry Creek","Washington Park","RiNo","Park Hill","Highlands","Stapleton"], landmarks: ["Cherry Creek Shopping District","Denver Art Museum","RiNo Arts District","Washington Park"], zips: ["80202","80206","80210","80218"] },
  { slug: "aurora", city: "Aurora", county: "Arapahoe County", neighborhoods: ["Heather Gardens","Southlands","Saddle Rock","Murphy Creek","Original Aurora"], landmarks: ["Aurora Reservoir","Southlands Mall","Stanley Marketplace","Anschutz Medical Campus"], zips: ["80012","80016","80017"] },
  { slug: "lakewood", city: "Lakewood", county: "Jefferson County", neighborhoods: ["Belmar","Green Mountain","Bear Creek","Applewood"], landmarks: ["Belmar Shopping District","Green Mountain","Bear Creek Lake Park","Colorado Mills"], zips: ["80214","80226","80228"] },
  { slug: "highlands-ranch", city: "Highlands Ranch", county: "Douglas County", neighborhoods: ["BackCountry","Southridge","Eastridge","Westridge"], landmarks: ["Highlands Ranch Mansion","Wildcat Mountain","Town Center","Redstone Park"], zips: ["80126","80129","80130"] },
  { slug: "castle-rock", city: "Castle Rock", county: "Douglas County", neighborhoods: ["The Meadows","Crystal Valley","Founders Village","Downtown Castle Rock"], landmarks: ["Castle Rock","Philip S. Miller Park","The Outlets at Castle Rock","Festival Park"], zips: ["80104","80108","80109"] },
  { slug: "englewood", city: "Englewood", county: "Arapahoe County", neighborhoods: ["CityCenter","South Broadway","Old Englewood"], landmarks: ["CityCenter Englewood","South Broadway Antique Row","Belleview Park","Pirates Cove"], zips: ["80110","80113"] },
  { slug: "littleton", city: "Littleton", county: "Arapahoe County", neighborhoods: ["Downtown Littleton","Ken Caryl","Columbine Valley","Roxborough"], landmarks: ["Historic Downtown Littleton","Hudson Gardens","Chatfield State Park","Littleton Museum"], zips: ["80120","80123","80128"] },
  { slug: "thornton", city: "Thornton", county: "Adams County", neighborhoods: ["Original Thornton","Trail Winds","Heritage Todd Creek"], landmarks: ["Carpenter Park","Trail Winds Recreation Center","Todd Creek Golf Club"], zips: ["80229","80233","80241"] },
  { slug: "westminster", city: "Westminster", county: "Adams County", neighborhoods: ["Standley Lake","Legacy Ridge","Bradburn Village"], landmarks: ["Westminster City Center","Standley Lake","Butterfly Pavilion","Westminster Promenade"], zips: ["80003","80020","80031"] },
  { slug: "arvada", city: "Arvada", county: "Jefferson County", neighborhoods: ["Olde Town Arvada","Candelas","Leyden Rock","West Woods"], landmarks: ["Olde Town Arvada","Apex Center","Ralston Creek Trail","Arvada Center for the Arts"], zips: ["80003","80004","80007"] },
  { slug: "centennial", city: "Centennial", county: "Arapahoe County", neighborhoods: ["Willow Creek","Walnut Hills","Piney Creek","SouthGlenn"], landmarks: ["Centennial Center Park","Streets at SouthGlenn","Centennial Airport","deKoevend Park"], zips: ["80015","80111","80122"] },
  { slug: "boulder", city: "Boulder", county: "Boulder County", neighborhoods: ["North Boulder","Mapleton Hill","Chautauqua","Table Mesa"], landmarks: ["Pearl Street Mall","Chautauqua Park","University of Colorado","The Flatirons"], zips: ["80301","80302","80304"] },
  { slug: "fort-collins", city: "Fort Collins", county: "Larimer County", neighborhoods: ["Old Town","Harmony","Timnath","Windsor"], landmarks: ["Old Town Fort Collins","Horsetooth Reservoir","CSU Campus","The Exchange"], zips: ["80521","80525","80528"] },
  { slug: "colorado-springs", city: "Colorado Springs", county: "El Paso County", neighborhoods: ["Old Colorado City","Briargate","Broadmoor","Black Forest"], landmarks: ["Garden of the Gods","Pikes Peak","United States Air Force Academy","The Broadmoor"], zips: ["80903","80906","80918","80920"] },
];

// Focused service set per user request
const services = [
  {
    slug: "e-commerce-consignment",
    name: "E-Commerce Consignment",
    pageUrl: "/areas/{slug}/consignment",
    angle: "selling valuable items on eBay, Etsy, LiveAuctioneers, and specialty marketplaces with professional photography, listing, and shipping handled for the seller",
    keywords: "e-commerce consignment {city}, eBay consignment {city}, sell items online {city} CO, online consignment Colorado",
  },
  {
    slug: "estate-liquidation",
    name: "Estate Liquidation",
    pageUrl: "/areas/{slug}/estate-cleanouts",
    angle: "full-service estate liquidation with the Revenue Recovery model — items auctioned first to offset cleanout costs, items sold within 7–10 days, no upfront cost",
    keywords: "estate liquidation {city} CO, estate sale company {city}, estate cleanout {city} Colorado, estate liquidators {city}",
  },
  {
    slug: "business-liquidation",
    name: "Business Liquidation",
    pageUrl: "/areas/{slug}/business-liquidation",
    angle: "commercial and business asset liquidation for closing restaurants, retail, offices, and medical practices — online auctions to commercial buyers, broom-clean handover",
    keywords: "business liquidation {city} CO, commercial liquidation {city}, restaurant liquidation {city}, office liquidation {city}",
  },
  {
    slug: "estate-auction-services",
    name: "Estate Auction Services",
    pageUrl: "/areas/{slug}/estate-sales",
    angle: "professional online estate auctions reaching nationwide bidders via LiveAuctioneers and Denver Online Auctions — typically 20–40% higher returns than tag sales",
    keywords: "estate auctions {city} CO, online estate auctions {city}, estate sale auctions {city}, estate auction company {city}",
  },
];

const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

async function generateImage(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image","text"],
      }),
    });
    if (!r.ok) return null;
    const d = await r.json();
    return d.choices?.[0]?.message?.images?.[0]?.image_url?.url ?? null;
  } catch { return null; }
}

async function uploadImageToStorage(supabase: any, base64Data: string, filename: string): Promise<string|null> {
  try {
    const base64 = base64Data.replace(/^data:image\/\w+;base64,/,'');
    const buf = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const { error } = await supabase.storage.from("blog-images").upload(filename, buf, { contentType: 'image/png', upsert: true });
    if (error) return null;
    return supabase.storage.from("blog-images").getPublicUrl(filename).data.publicUrl;
  } catch { return null; }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Required environment variables not configured");
    }

    // Auth: same pattern as generate-blog-post — cron uses anon key, admin uses JWT
    const authHeader = req.headers.get('Authorization');
    const isCronCall = authHeader?.includes(Deno.env.get("SUPABASE_ANON_KEY") || '');
    if (!isCronCall && authHeader) {
      const token = authHeader.replace('Bearer ','');
      const sbAuth = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const { data: { user }, error: ue } = await sbAuth.auth.getUser(token);
      if (ue || !user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      const { data: role } = await sbAuth.from('user_roles').select('role').eq('user_id', user.id).eq('role','admin').maybeSingle();
      if (!role) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Pick random city + service combo
    const city = cities[Math.floor(Math.random() * cities.length)];
    const service = services[Math.floor(Math.random() * services.length)];
    const neighborhood = city.neighborhoods[Math.floor(Math.random() * city.neighborhoods.length)];
    const landmark = city.landmarks[Math.floor(Math.random() * city.landmarks.length)];
    const pageUrl = service.pageUrl.replace("{slug}", city.slug);
    const author = service.slug === "business-liquidation" ? "David" : "Penny";
    const keywords = service.keywords.replace(/\{city\}/g, city.city);

    console.log(`Generating local SEO post: ${service.name} in ${city.city} (focus: ${neighborhood})`);

    const imagePrompts = [
      `Professional editorial photograph representing ${service.name} in ${city.city}, Colorado. Warm natural lighting, tasteful interior or commercial setting, no text overlay, no logos, 16:9 aspect ratio.`,
      `Professional photograph of a local ${city.city} ${neighborhood} neighborhood scene with subtle reference to ${landmark}, daytime, warm and inviting, no text, no logos, 16:9 aspect ratio.`,
      `Professional photograph representing online auctions and e-commerce: laptop showing auction listings beside tastefully arranged antiques and quality items, warm lighting, no text, 16:9 aspect ratio.`,
    ];

    const systemPrompt = `You are a senior content writer for JSG Liquidators, "Denver's Trusted Estate and Business Liquidation Experts." You write Generative Engine Optimization (GEO) content optimized for AI search engines (ChatGPT, Perplexity, Google AI Overviews) AND traditional Google local SEO.

CORE RULES:
- This post is HYPER-LOCAL to ${city.city}, ${city.county}, Colorado.
- The service in focus is: ${service.name} — ${service.angle}.
- Mention ${city.city} or its neighborhoods (e.g. ${city.neighborhoods.slice(0,3).join(', ')}) and landmarks (e.g. ${landmark}, ${city.landmarks[0]}) naturally throughout. Aim for 8+ explicit local references.
- Include at least one of these ZIP codes contextually: ${city.zips.join(', ')}.
- Reference the company's Revenue Recovery model and the "items sold in 7–10 days" promise where relevant.
- Phone: (805) 444-4069. Email: jsgliquidators@gmail.com.
- Cite the relevant service page once with an anchor link to ${pageUrl} using descriptive anchor text.
- Voice: warm, authoritative, locally-rooted, not salesy.

GEO STRUCTURE (important for AI extractability):
- Open with a clear one-sentence answer to "What is the best way to handle ${service.name.toLowerCase()} in ${city.city}, CO?"
- Use H2 sections with question-style headings ("How does...", "What does...", "Why ${city.city} residents...")
- Include a short bulleted "Key facts" list near the top with city, county, ZIP codes, and the service summary.
- Include a FAQ-style closing section with 3 question/answer pairs specific to ${city.city}.

IMAGE PLACEMENT — use EXACTLY these markers:
{{IMAGE_1}} after the intro
{{IMAGE_2}} mid-article
{{IMAGE_3}} before the conclusion

OUTPUT FORMAT (no code blocks, no extra prose):
TITLE: <title with "${city.city}" and a service keyword, 50-65 chars>
EXCERPT: <1-2 sentence summary including "${city.city}">
CONTENT:
<p>...</p>
{{IMAGE_1}}
<h2>...</h2>
<p>...</p>
{{IMAGE_2}}
<h2>...</h2>
<p>...</p>
{{IMAGE_3}}
<h2>...</h2>
<p>...</p>`;

    const userPrompt = `Write a 900-1100 word locally-targeted blog post about ${service.name} in ${city.city}, Colorado. Anchor specific examples to ${neighborhood} and reference ${landmark}. Target these keywords naturally: ${keywords}. Include the 3 image placeholders and the FAQ-style closing section. Use semantic HTML (<p>, <h2>, <h3>, <ul>, <li>).`;

    const [contentResponse, img1, img2, img3] = await Promise.all([
      fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }),
      generateImage(imagePrompts[0], LOVABLE_API_KEY),
      generateImage(imagePrompts[1], LOVABLE_API_KEY),
      generateImage(imagePrompts[2], LOVABLE_API_KEY),
    ]);

    if (!contentResponse.ok) {
      const txt = await contentResponse.text();
      console.error("AI gateway error:", contentResponse.status, txt);
      if (contentResponse.status === 429) return new Response(JSON.stringify({ error: "Rate limited" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (contentResponse.status === 402) return new Response(JSON.stringify({ error: "Payment required" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI gateway error: ${contentResponse.status}`);
    }

    const aiData = await contentResponse.json();
    const generated = aiData.choices?.[0]?.message?.content;
    if (!generated) throw new Error("No content generated");

    const ts = Date.now();
    const i1 = img1 ? await uploadImageToStorage(supabase, img1, `local-seo-${ts}-1.png`) : null;
    const i2 = img2 ? await uploadImageToStorage(supabase, img2, `local-seo-${ts}-2.png`) : null;
    const i3 = img3 ? await uploadImageToStorage(supabase, img3, `local-seo-${ts}-3.png`) : null;

    // Parse
    const titleMatch = generated.match(/TITLE:\s*(.+?)(?:\n|EXCERPT:)/s);
    const excerptMatch = generated.match(/EXCERPT:\s*(.+?)(?:\n|CONTENT:)/s);
    const contentMatch = generated.match(/CONTENT:\s*([\s\S]+)$/);

    const imgStyle = 'width: 100%; border-radius: 0.75rem; margin: 2.5rem 0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);';
    const replaceImg = (html: string, marker: string, url: string | null, alt: string) =>
      html.replace(new RegExp(`\\{\\{${marker}\\}\\}`, 'g'),
        url ? `<img src="${url}" alt="${alt}" style="${imgStyle}" />` : '');

    let title: string, excerpt: string, content: string;
    if (titleMatch && excerptMatch && contentMatch) {
      title = titleMatch[1].trim();
      excerpt = excerptMatch[1].trim();
      content = contentMatch[1].trim();
      content = replaceImg(content, 'IMAGE_1', i1, `${service.name} in ${city.city}, CO`);
      content = replaceImg(content, 'IMAGE_2', i2, `${city.city} ${neighborhood} neighborhood`);
      content = replaceImg(content, 'IMAGE_3', i3, `Online auctions for ${city.city} estates`);
    } else {
      title = `${service.name} in ${city.city}, CO`;
      excerpt = `Local guide to ${service.name.toLowerCase()} in ${city.city}, ${city.county}.`;
      content = `<p>${generated.replace(/\{\{IMAGE_\d\}\}/g,'').replace(/\n\n/g,'</p><p>')}</p>`;
    }

    // Append local-business footer block (also helps GEO entity grounding)
    content += `
<h3>About this service area</h3>
<p>JSG Liquidators serves all of ${city.city}, ${city.county} (ZIP codes ${city.zips.join(', ')}) and surrounding communities. Learn more on our <a href="${pageUrl}">${service.name} in ${city.city}</a> page or call <strong>(805) 444-4069</strong>.</p>`;

    const slug = generateSlug(title) + "-" + city.slug + "-" + ts;

    const { data: inserted, error: insertError } = await supabase
      .from("blog_posts")
      .insert({
        title,
        slug,
        excerpt,
        content: sanitizeHtml(content),
        author,
        published: isCronCall,
        published_at: isCronCall ? new Date().toISOString() : null,
        featured_image_url: i1 || null,
      })
      .select()
      .single();

    if (insertError) throw new Error(`Failed to save post: ${insertError.message}`);

    console.log("Local SEO post created:", inserted.id, slug);

    return new Response(JSON.stringify({
      success: true,
      post: { id: inserted.id, title: inserted.title, slug: inserted.slug, city: city.city, service: service.name },
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error("Error generating local SEO post:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
