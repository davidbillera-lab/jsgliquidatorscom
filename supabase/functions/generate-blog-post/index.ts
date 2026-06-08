import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.48/deno-dom-wasm.ts";

const ALLOWED_TAGS = new Set(['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'span', 'div']);
const ALLOWED_ATTR: Record<string, Set<string>> = {
  '*': new Set(['class', 'id', 'style', 'title']),
  'a': new Set(['href', 'target']),
  'img': new Set(['src', 'alt']),
};

function sanitizeNode(node: any): string {
  if (node.nodeType === 3) return escapeHtml(node.textContent || '');
  if (node.nodeType !== 1) return '';
  
  const tag = node.tagName.toLowerCase();
  if (!ALLOWED_TAGS.has(tag)) {
    // Strip tag but keep children
    return Array.from(node.childNodes).map((c: any) => sanitizeNode(c)).join('');
  }
  
  // Build allowed attributes
  const attrs: string[] = [];
  const globalAttrs = ALLOWED_ATTR['*'] || new Set();
  const tagAttrs = ALLOWED_ATTR[tag] || new Set();
  
  for (const attr of Array.from(node.attributes) as any[]) {
    const name = attr.name.toLowerCase();
    if (globalAttrs.has(name) || tagAttrs.has(name)) {
      let value = attr.value;
      // Validate URLs for href/src
      if ((name === 'href' || name === 'src') && !/^(?:https?:|mailto:|\/)/i.test(value)) {
        continue;
      }
      // Block javascript: URIs
      if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(value)) {
        continue;
      }
      attrs.push(`${name}="${escapeAttr(value)}"`);
    }
  }
  
  const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
  
  // Self-closing tags
  if (['br', 'img'].includes(tag)) {
    return `<${tag}${attrStr} />`;
  }
  
  const children = Array.from(node.childNodes).map((c: any) => sanitizeNode(c)).join('');
  return `<${tag}${attrStr}>${children}</${tag}>`;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sanitizeHtml(html: string): string {
  try {
    const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
    if (!doc) return escapeHtml(html);
    const wrapper = doc.querySelector('div');
    if (!wrapper) return escapeHtml(html);
    return Array.from(wrapper.childNodes).map((c: any) => sanitizeNode(c)).join('');
  } catch (e) {
    console.error("Sanitization error, returning escaped HTML:", e);
    return escapeHtml(html);
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Service-area cities that have dedicated landing pages on jsgliquidators.com.
// Each slug MUST match src/data/serviceAreas.ts so internal links resolve.
type ServiceAreaEntry = {
  name: string;
  slug: string;
  county: string;
  zips: string[];
  neighborhoods: string[];
  landmarks: string[];
};

const SERVICE_AREAS: ServiceAreaEntry[] = [
  { name: "Denver", slug: "denver", county: "Denver County", zips: ["80202","80203","80205","80206","80209","80211","80218"], neighborhoods: ["Cherry Creek","Washington Park","Capitol Hill","LoDo","RiNo","Sloan's Lake","Stapleton/Central Park","Berkeley","Highland"], landmarks: ["Union Station","City Park","Cherry Creek Mall","I-25 corridor","I-70 corridor"] },
  { name: "Aurora", slug: "aurora", county: "Arapahoe & Adams County", zips: ["80010","80012","80013","80014","80015","80016"], neighborhoods: ["Saddle Rock","Tallyn's Reach","Heather Gardens","Southlands"], landmarks: ["Anschutz Medical Campus","Cherry Creek State Park","Buckley Space Force Base","E-470"] },
  { name: "Lakewood", slug: "lakewood", county: "Jefferson County", zips: ["80214","80215","80226","80227","80228","80232"], neighborhoods: ["Belmar","Green Mountain","Applewood","Eiber"], landmarks: ["Belmar shopping district","Bear Creek Lake Park","6th Avenue corridor","US-285"] },
  { name: "Highlands Ranch", slug: "highlands-ranch", county: "Douglas County", zips: ["80126","80129","80130"], neighborhoods: ["Backcountry","Eastridge","Northridge","Westridge"], landmarks: ["Highlands Ranch Mansion","C-470","Town Center"] },
  { name: "Castle Rock", slug: "castle-rock", county: "Douglas County", zips: ["80104","80108","80109"], neighborhoods: ["The Meadows","Founders Village","Castle Pines"], landmarks: ["Outlets at Castle Rock","I-25 / Wolfensberger exit","The Rock"] },
  { name: "Englewood", slug: "englewood", county: "Arapahoe County", zips: ["80110","80111","80112","80113"], neighborhoods: ["Old Englewood","CityCenter"], landmarks: ["Swedish Medical Center","Hampden Avenue","Broadway corridor"] },
  { name: "Littleton", slug: "littleton", county: "Arapahoe / Jefferson / Douglas", zips: ["80120","80121","80122","80123","80124","80125","80127","80128"], neighborhoods: ["Historic Downtown Littleton","Ken Caryl","Roxborough"], landmarks: ["Aspen Grove","Chatfield Reservoir","Santa Fe Drive"] },
  { name: "Thornton", slug: "thornton", county: "Adams County", zips: ["80229","80233","80241","80260","80602"], neighborhoods: ["Original Thornton","Eastlake","Trail Winds"], landmarks: ["Denver Premium Outlets","I-25 / 144th","Larkridge"] },
  { name: "Westminster", slug: "westminster", county: "Adams & Jefferson County", zips: ["80003","80020","80021","80030","80031","80234"], neighborhoods: ["Bradburn Village","Legacy Ridge","Standley Lake"], landmarks: ["Westminster Promenade","Standley Lake","US-36 / 88th"] },
  { name: "Arvada", slug: "arvada", county: "Jefferson County", zips: ["80002","80003","80004","80005","80007"], neighborhoods: ["Olde Town Arvada","Candelas","Leyden Rock"], landmarks: ["Olde Town Arvada","Apex Center","Wadsworth Boulevard"] },
  { name: "Centennial", slug: "centennial", county: "Arapahoe County", zips: ["80111","80112","80121","80122"], neighborhoods: ["Willow Creek","Walnut Hills","Piney Creek"], landmarks: ["Streets at SouthGlenn","Centennial Airport","I-25 / Arapahoe"] },
  { name: "Boulder", slug: "boulder", county: "Boulder County", zips: ["80301","80302","80303","80304","80305"], neighborhoods: ["North Boulder","South Boulder","Mapleton Hill","Table Mesa"], landmarks: ["Pearl Street Mall","CU Boulder","Flatirons","US-36"] },
  { name: "Fort Collins", slug: "fort-collins", county: "Larimer County", zips: ["80521","80524","80525","80526","80528"], neighborhoods: ["Old Town","Harmony","Fossil Lake"], landmarks: ["Old Town Square","CSU","Horsetooth Reservoir","I-25 / Harmony"] },
  { name: "Colorado Springs", slug: "colorado-springs", county: "El Paso County", zips: ["80903","80904","80905","80906","80907","80920"], neighborhoods: ["Old North End","Broadmoor","Briargate","Old Colorado City"], landmarks: ["Garden of the Gods","Pikes Peak","Fort Carson","I-25 / Academy"] },
];

const SERVICES = [
  { name: "Estate Sales & Online Auctions", slug: "estate-sales", focus: "on-site and hybrid estate sales backed by LiveAuctioneers and Denver Online Auctions" },
  { name: "E-Commerce Consignment", slug: "consignment", focus: "national-reach consignment via eBay and online auction houses, shipped from Denver" },
  { name: "Business Liquidation", slug: "business-liquidation", focus: "restaurant, retail, office and warehouse asset recovery across the Front Range" },
  { name: "Estate Clean Outs", slug: "estate-cleanouts", focus: "the 12-day Auction-Backed Cleanout that offsets cost through Revenue Recovery" },
  { name: "Junk Removal", slug: "junk-removal", focus: "value-first junk removal that pulls out resellable items before anything hits the dumpster" },
];

// Topic templates rotate by SERVICE so each post is naturally about one
// specific service in one specific city — the strongest local SEO/GEO/AEO signal.
const TOPIC_TEMPLATES_BY_SERVICE: Record<string, string[]> = {
  "estate-sales": [
    "How estate sales work in {{LOCATION}}, {{COUNTY}}: a 7-10 day local guide",
    "{{LOCATION}} estate sale checklist: what {{COUNTY}} families should expect",
    "Hybrid estate sales in {{LOCATION}}: pairing in-person buyers with online auction reach",
  ],
  "consignment": [
    "Selling antiques from {{LOCATION}} on eBay and LiveAuctioneers: a Denver-metro guide",
    "E-commerce consignment for {{LOCATION}} sellers: from {{NEIGHBORHOOD}} attic to national buyer",
    "Why {{LOCATION}} collectors ship through Denver Online Auctions",
  ],
  "business-liquidation": [
    "Closing a business in {{LOCATION}}? A step-by-step Front Range liquidation playbook",
    "Restaurant and retail liquidation in {{LOCATION}}, {{COUNTY}}: maximizing recovery",
    "Office and warehouse cleanouts in {{LOCATION}}: what {{COUNTY}} owners should expect",
  ],
  "estate-cleanouts": [
    "Auction-Backed Cleanouts in {{LOCATION}}: how the 12-day Revenue Recovery model works",
    "Probate cleanouts in {{LOCATION}}, Colorado: a {{COUNTY}} executor's roadmap",
    "Same-day and emergency estate cleanouts in {{LOCATION}} and nearby {{NEIGHBORHOOD}}",
    "Hoarding cleanouts in {{LOCATION}}: compassionate help for {{COUNTY}} families",
    "Downsizing in {{LOCATION}}: a senior-friendly guide for {{NEIGHBORHOOD}} homeowners",
  ],
  "junk-removal": [
    "Junk removal vs. estate liquidation in {{LOCATION}}: which saves {{COUNTY}} homeowners more?",
    "Value-first junk removal in {{LOCATION}}: how we offset hauling cost with resale",
    "Realtor-referred cleanouts in {{LOCATION}}: prepping {{NEIGHBORHOOD}} listings fast",
  ],
};

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];


const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Generate a relevant image for the blog post
async function generateImage(prompt: string, apiKey: string): Promise<string | null> {
  try {
    console.log("Generating image for:", prompt);
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      console.error("Image generation failed:", response.status);
      return null;
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (imageUrl) {
      console.log("Image generated successfully");
      return imageUrl;
    }
    
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

// Upload base64 image to storage
async function uploadImageToStorage(
  supabase: any,
  base64Data: string,
  filename: string
): Promise<string | null> {
  try {
    // Extract the base64 content (remove data:image/png;base64, prefix)
    const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0));
    
    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filename, buffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filename);
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase environment variables not configured");
    }

    // Authentication: require either a valid CRON_SECRET header (for scheduled jobs)
    // or an authenticated admin user (for manual calls). The previous logic allowed
    // anyone with the public anon key to bypass admin checks.
    const cronSecretHeader = req.headers.get('x-cron-secret');
    const CRON_SECRET = Deno.env.get('CRON_SECRET');
    const isCronCall = !!(CRON_SECRET && cronSecretHeader && cronSecretHeader === CRON_SECRET);

    if (!isCronCall) {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized: Missing token' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const token = authHeader.replace('Bearer ', '');
      const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

      const { data: { user }, error: userError } = await supabaseAuth.auth.getUser(token);
      if (userError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data: adminRole, error: roleError } = await supabaseAuth
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleError) {
        console.error("Error checking user role:", roleError);
        return new Response(JSON.stringify({ error: 'Error verifying permissions' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (!adminRole) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log("Admin user verified:", user.email);
    } else {
      console.log("Authenticated cron job execution");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Pick a city + a service, then a topic template scoped to that service.
    const area = pick(SERVICE_AREAS);
    const service = pick(SERVICES);
    const neighborhood = pick(area.neighborhoods);
    const landmark = pick(area.landmarks);
    const templates = TOPIC_TEMPLATES_BY_SERVICE[service.slug];
    const topic = pick(templates)
      .replace(/\{\{LOCATION\}\}/g, area.name)
      .replace(/\{\{COUNTY\}\}/g, area.county)
      .replace(/\{\{NEIGHBORHOOD\}\}/g, neighborhood);

    const cityUrl = `https://jsgliquidators.com/service-areas/${area.slug}`;
    const serviceUrl = `https://jsgliquidators.com/services/${service.slug}`;
    const cityServiceUrl = `https://jsgliquidators.com/service-areas/${area.slug}/${service.slug}`;

    console.log(`Generating blog post: "${topic}" | city=${area.name} service=${service.slug}`);

    const imagePrompts = [
      `Professional editorial photograph of an organized estate sale inside a tasteful ${area.name}, Colorado home, warm natural Front Range light through the windows, antique furniture and collectibles neatly displayed, welcoming atmosphere, no visible text or logos, 16:9 aspect ratio`,
      `Professional editorial photograph of a cozy ${area.name} Colorado living room with vintage furniture and family heirlooms, soft afternoon light, a few moving boxes in the background suggesting downsizing, warm and inviting, no visible text or logos, 16:9 aspect ratio`,
      `Professional editorial photograph of an online auction workspace with a laptop showing auction listings, beautiful antiques and collectibles arranged for photography on a clean table, modern e-commerce meets traditional estate items, warm lighting, no visible text or logos, 16:9 aspect ratio`
    ];

    const [contentResponse, image1Data, image2Data, image3Data] = await Promise.all([
      fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `You are a local content writer for JSG Liquidators — Denver's trusted estate and business liquidation experts serving the Front Range of Colorado. Every post is hyper-local to ONE city and ONE service. Never generic, never California, never national filler.

TARGET CITY: ${area.name} (${area.county}, Colorado)
NEARBY NEIGHBORHOODS: ${area.neighborhoods.join(", ")}
LOCAL LANDMARKS / CORRIDORS: ${area.landmarks.join(", ")}
SERVED ZIP CODES (mention 2-3 naturally): ${area.zips.join(", ")}
TARGET SERVICE: ${service.name} — ${service.focus}

COMPANY FACTS (use accurately):
- Revenue Recovery / Auction-Backed Cleanout model — items typically sold in 7-10 days, often offsetting cleanout cost
- Marketplaces: LiveAuctioneers, Denver Online Auctions, eBay (national reach shipped from Denver)
- Compassionate, no-upfront-cost service for families in transition
- Primary contact: David at 805-444-4069 · Secondary: Vinnie at 805-340-4817 · jsgliquidators@gmail.com
- Service-area page: ${cityUrl}
- Service page: ${serviceUrl}
- City + service landing page: ${cityServiceUrl}

LOCALIZATION RULES (mandatory):
- Use "${area.name}" by name at least 5 times across title, intro, body, FAQ, and conclusion.
- Mention ${area.county} at least once.
- Reference at least TWO neighborhoods from the list above by name.
- Reference at least ONE landmark/corridor from the list above by name.
- Mention 2-3 of the ZIP codes naturally (e.g., "homes near ${area.zips[0]} and ${area.zips[1]}").
- Reference Colorado-specific realities where relevant: Colorado probate, Front Range housing market, mountain-to-plains moves, Denver-area realtor partnerships.
- Tie pricing/timeline statements to the 7-10 day local auction cycle — not generic claims.

AEO / GEO / SEO STRUCTURE (mandatory — write content that answer engines can lift):
1. Open with a 2-3 sentence "TL;DR" answer box wrapped in <div class="tldr"><p><strong>Quick answer:</strong> ...</p></div> that directly answers the topic question for someone in ${area.name}.
2. Use clear H2/H3 questions phrased the way locals search (e.g., "How much does an estate cleanout cost in ${area.name}?", "Do you serve ${neighborhood}?"). Answer in the first sentence below each heading — answer-first, then expand.
3. Include at least one <ul> "at-a-glance" list (timeline, what's included, ZIPs served, etc.) — easy for AI overviews to extract.
4. End the body with a <h2>Frequently asked questions in ${area.name}</h2> section containing 4-5 <h3> questions, each answered in 1-3 sentences. Keep questions natural-language and locally-scoped.
5. Include 2-3 internal links using exact anchor text and full URLs:
   - <a href="${cityUrl}">${service.name} in ${area.name}</a>
   - <a href="${serviceUrl}">${service.name}</a>
   - <a href="${cityServiceUrl}">${service.name} in ${area.name}, ${area.county}</a>
6. End with a clear local CTA paragraph naming ${area.name} and the phone 805-444-4069.

Write in a warm, professional, locally-rooted tone. Be helpful first, not salesy. No fabricated statistics, no fake testimonials, no invented case studies.

IMAGE PLACEHOLDERS (exactly 3, in this order):
- {{IMAGE_1}} after the TL;DR + first H2 intro paragraph
- {{IMAGE_2}} in the middle, between two major sections
- {{IMAGE_3}} just before the FAQ section

Format your response EXACTLY like this, no code blocks, no markdown fences:
TITLE: Title that includes "${area.name}" and naturally hints at ${service.name}
EXCERPT: 1-2 sentence preview that names ${area.name} and the service
CONTENT:
<div class="tldr"><p><strong>Quick answer:</strong> ...</p></div>
<p>Intro paragraph that names ${area.name} and ${area.county}...</p>
{{IMAGE_1}}
<h2>Question-style heading about ${service.name} in ${area.name}</h2>
<p>Answer-first paragraph...</p>
<ul><li>...</li><li>...</li></ul>
<h2>Second question-style heading</h2>
<p>...</p>
{{IMAGE_2}}
<h2>Third local section (neighborhoods, ZIPs, or process)</h2>
<p>...</p>
{{IMAGE_3}}
<h2>Frequently asked questions in ${area.name}</h2>
<h3>Question 1?</h3><p>Answer.</p>
<h3>Question 2?</h3><p>Answer.</p>
<h3>Question 3?</h3><p>Answer.</p>
<h3>Question 4?</h3><p>Answer.</p>
<h2>Talk to a local ${area.name} liquidator</h2>
<p>CTA paragraph with 805-444-4069 and a link to <a href="${cityServiceUrl}">${service.name} in ${area.name}</a>.</p>`
            },
            {
              role: "user",
              content: `Write the post described above for the city of ${area.name}, ${area.county}, Colorado about: ${topic}. Service focus: ${service.name}. Target length 900-1100 words. Reference these neighborhoods at least twice between them: ${area.neighborhoods.slice(0,3).join(", ")}. Reference this local landmark/corridor naturally: ${landmark}. Mention these ZIPs naturally: ${area.zips.slice(0,3).join(", ")}. Include exactly 3 image placeholders ({{IMAGE_1}}, {{IMAGE_2}}, {{IMAGE_3}}) at the marked positions.`
            }
          ],
        }),
      }),

      generateImage(imagePrompts[0], LOVABLE_API_KEY),
      generateImage(imagePrompts[1], LOVABLE_API_KEY),
      generateImage(imagePrompts[2], LOVABLE_API_KEY)
    ]);

    if (!contentResponse.ok) {
      const errorText = await contentResponse.text();
      console.error("AI gateway error:", contentResponse.status, errorText);
      
      if (contentResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (contentResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${contentResponse.status}`);
    }

    const data = await contentResponse.json();
    const generatedText = data.choices?.[0]?.message?.content;

    if (!generatedText) {
      throw new Error("No content generated");
    }

    console.log("Raw AI response:", generatedText);

    // Upload generated images to storage
    const timestamp = Date.now();
    let image1Url: string | null = null;
    let image2Url: string | null = null;
    let image3Url: string | null = null;

    if (image1Data) {
      image1Url = await uploadImageToStorage(supabase, image1Data, `ai-blog-${timestamp}-1.png`);
    }
    if (image2Data) {
      image2Url = await uploadImageToStorage(supabase, image2Data, `ai-blog-${timestamp}-2.png`);
    }
    if (image3Data) {
      image3Url = await uploadImageToStorage(supabase, image3Data, `ai-blog-${timestamp}-3.png`);
    }

    console.log("Image URLs:", { image1Url, image2Url, image3Url });

    // Parse the structured response
    let blogData;
    try {
      // Parse the TITLE/EXCERPT/CONTENT format
      const titleMatch = generatedText.match(/TITLE:\s*(.+?)(?:\n|EXCERPT:)/s);
      const excerptMatch = generatedText.match(/EXCERPT:\s*(.+?)(?:\n|CONTENT:)/s);
      const contentMatch = generatedText.match(/CONTENT:\s*([\s\S]+)$/);

      if (titleMatch && excerptMatch && contentMatch) {
        let content = contentMatch[1].trim();
        
        // Replace image placeholders with actual images - improved styling for better spacing
        const imageStyle = 'width: 100%; border-radius: 0.75rem; margin: 2.5rem 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);';
        
        if (image1Url) {
          content = content.replace(
            /\{\{IMAGE_1\}\}/g,
            `<img src="${image1Url}" alt="Estate sale preparation and organization" style="${imageStyle}" />`
          );
        } else {
          content = content.replace(/\{\{IMAGE_1\}\}/g, '');
        }
        
        if (image2Url) {
          content = content.replace(
            /\{\{IMAGE_2\}\}/g,
            `<img src="${image2Url}" alt="Professional downsizing and estate services" style="${imageStyle}" />`
          );
        } else {
          content = content.replace(/\{\{IMAGE_2\}\}/g, '');
        }

        if (image3Url) {
          content = content.replace(
            /\{\{IMAGE_3\}\}/g,
            `<img src="${image3Url}" alt="Online auctions and e-commerce consignment" style="${imageStyle}" />`
          );
        } else {
          content = content.replace(/\{\{IMAGE_3\}\}/g, '');
        }

        blogData = {
          title: titleMatch[1].trim(),
          excerpt: excerptMatch[1].trim(),
          content: content
        };
      } else {
        // Fallback: try to extract sensible content
        console.log("Could not parse structured format, using fallback");
        blogData = {
          title: topic,
          excerpt: `Learn about ${topic.toLowerCase()} from the experts at JSG Liquidators.`,
          content: generatedText
            .replace(/```json[\s\S]*?```/g, '')
            .replace(/```[\s\S]*?```/g, '')
            .replace(/^[\s\S]*?<p>/m, '<p>')
            .replace(/\{\{IMAGE_\d\}\}/g, '')
            .trim()
        };
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      blogData = {
        title: topic,
        excerpt: `Learn about ${topic.toLowerCase()} from the experts at JSG Liquidators.`,
        content: `<p>${generatedText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>').replace(/\{\{IMAGE_\d\}\}/g, '')}</p>`
      };
    }

    const slug = generateSlug(blogData.title) + "-" + Date.now();

    // Insert the blog post - auto-publish for cron, draft for manual
    const shouldPublish = isCronCall;
    const { data: insertedPost, error: insertError } = await supabase
      .from("blog_posts")
      .insert({
        title: blogData.title,
        slug: slug,
        excerpt: blogData.excerpt,
        content: sanitizeHtml(blogData.content),
        author: "Penny",
        published: shouldPublish,
        published_at: shouldPublish ? new Date().toISOString() : null,
        featured_image_url: image1Url || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting blog post:", insertError);
      throw new Error(`Failed to save blog post: ${insertError.message}`);
    }

    console.log("Blog post created:", insertedPost.id);

    return new Response(JSON.stringify({ 
      success: true, 
      post: {
        id: insertedPost.id,
        title: insertedPost.title,
        slug: insertedPost.slug
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating blog post:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
