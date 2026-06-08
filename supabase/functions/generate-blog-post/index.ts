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

    // Pick a random topic and inject a random Denver-metro location for local relevance
    const location = DENVER_LOCATIONS[Math.floor(Math.random() * DENVER_LOCATIONS.length)];
    const topic = topics[Math.floor(Math.random() * topics.length)].replace(/\{\{LOCATION\}\}/g, location);

    console.log(`Generating blog post about: ${topic} (location: ${location})`);

    // Generate 3 images in parallel with the blog content for better visual interest
    const imagePrompts = [
      `Professional photograph of an organized estate sale in a beautiful home, warm natural lighting, antique furniture and collectibles neatly displayed, welcoming atmosphere, high quality editorial style photo, 16:9 aspect ratio`,
      `Professional photograph of a cozy living room with vintage furniture and family heirlooms, soft lighting, moving boxes in background suggesting downsizing, warm and inviting atmosphere, editorial style, 16:9 aspect ratio`,
      `Professional photograph of an online auction setup with laptop showing auction listings, beautiful antiques and collectibles arranged for photography, modern e-commerce meets traditional estate items, warm lighting, 16:9 aspect ratio`
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
              content: `You are a content writer for JSG Liquidators, Denver's trusted estate and business liquidation experts, serving the entire Denver metro area in Colorado. Every blog post MUST be locally focused on Denver and the surrounding Colorado communities — never generic, never California, never national.

The company offers (in the Denver metro):
- Professional estate liquidation and estate sales
- Auction services through LiveAuctioneers and Denver Online Auctions
- E-commerce consignment via eBay (national buyer reach from Denver)
- Complete home, business, hoarding, and same-day/emergency cleanouts
- "Revenue Recovery" / "Auction-Backed Cleanout" model — items typically sold within 7-10 days, often offsetting or covering cleanout costs
- Compassionate, no-upfront-cost service for families in transition
- Service area: Denver, Aurora, Lakewood, Arvada, Westminster, Centennial, Thornton, Highlands Ranch, Parker, Littleton, Englewood, Wheat Ridge, Golden, Castle Rock, Boulder, Broomfield, and surrounding Colorado communities
- Contact: David at 805-444-4069, Vinnie at 805-340-4817, jsgliquidators@gmail.com

LOCAL RELEVANCE REQUIREMENTS (mandatory, every post):
- Mention the target city/neighborhood ("${location}") naturally at least 3-4 times across the post (title, intro, body, conclusion).
- Reference Denver metro context: Colorado housing market, Front Range, local seasons (Denver winters, spring market), nearby neighborhoods, I-25/I-70 corridors, or local landmarks where relevant.
- Reference Colorado-specific realities when relevant: Colorado probate process, Denver-area realtor partnerships, mountain-to-plains moves, Front Range downsizing trends.
- Tie in the Denver-area economy and housing market, not generic "today's economy."
- Name our local marketplaces (Denver Online Auctions, LiveAuctioneers) and the 7-10 day timeline when discussing how items are sold.
- Include the Denver service-area phone (805-444-4069) and a soft call-to-action for free Denver-metro consultations near the end.

Write in a warm, professional, locally-rooted tone. Be helpful first, not salesy.

IMPORTANT: Structure the content with natural image placement markers for EXACTLY 3 images:
- {{IMAGE_1}} - Place after the first introductory paragraph (1-2 paragraphs in)
- {{IMAGE_2}} - Place in the middle section, between major topic transitions
- {{IMAGE_3}} - Place near the end, before the conclusion/CTA section

Ensure proper spacing with clear paragraph breaks and section headings. Each section should be substantial (2-3 paragraphs minimum).

Format your response EXACTLY like this, with no code blocks or extra formatting:
TITLE: Your blog post title here (must include "${location}" or "Denver")
EXCERPT: A 1-2 sentence summary for preview cards (must reference Denver or ${location})
CONTENT:
<p>Your HTML content starts here with engaging introduction that names ${location} and Denver...</p>
{{IMAGE_1}}
<h2>First major section heading</h2>
<p>Substantial content with local references...</p>
<p>More content with proper spacing...</p>
{{IMAGE_2}}
<h2>Second major section heading</h2>
<p>More substantial content with local references...</p>
{{IMAGE_3}}
<h2>Conclusion or Call to Action</h2>
<p>Final thoughts with Denver-metro CTA and phone number...</p>`
            },
            {
              role: "user",
              content: `Write a locally-focused blog post for ${location} (Denver metro, Colorado) about: ${topic}. Make it approximately 800-1000 words with substantial sections. Use HTML formatting with paragraphs (<p>), headings (<h2>, <h3>), and lists (<ul>, <li>) where appropriate. Mention "${location}" naturally at least 3-4 times and reference Denver metro context throughout. Include exactly 3 image placeholders ({{IMAGE_1}}, {{IMAGE_2}}, {{IMAGE_3}}) at natural break points.`
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
