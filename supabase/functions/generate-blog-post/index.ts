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

const topics = [
  // Economy & Financial Topics
  "How today's economy makes estate liquidation smarter than ever",
  "Downsizing in a tough economy: Turning belongings into financial freedom",
  "Why e-commerce consignment is booming in the current market",
  "Estate auctions vs. traditional sales: Which wins in today's economy?",
  "How inflation is driving more families to professional liquidation services",
  "Turning clutter into cash: Smart strategies for uncertain economic times",
  "The rise of online auctions: How the economy is changing how we sell",
  "Financial benefits of professional estate cleanouts during economic uncertainty",
  
  // Traditional Estate Sale Topics
  "Tips for preparing your home for an estate sale",
  "How to price items at an estate sale for maximum value",
  "The benefits of professional estate liquidation services",
  "Common mistakes to avoid when organizing an estate sale",
  "How auction services can help recover costs during estate liquidation",
  "A guide to downsizing: What to keep, sell, or donate",
  "Understanding the estate sale process from start to finish",
  "How to find hidden treasures in estate sales",
  "Why timing matters for successful estate liquidations",
  "The emotional side of estate sales: Helpful tips for families",
  "Antiques and collectibles: Maximizing their value at auction",
  "Estate sale vs. garage sale: Which is right for you?",
  "How to handle a loved one's belongings with care and respect",
  "The role of appraisals in estate liquidation",
  "Preparing for an auction: What sellers need to know",
  "How professional liquidators help during difficult transitions",
  "Tips for buyers: Getting the best deals at estate sales",
  "Seasonal considerations for estate sales and auctions",
  "How to work with an estate liquidator: A step-by-step guide",
  "The value of transparency in estate sale pricing",
  
  // Clean Out & Consignment Topics
  "Complete home cleanouts: What to expect and how to prepare",
  "E-commerce consignment explained: How your items reach buyers worldwide",
  "From attic to auction: The journey of your consigned items",
  "Why more sellers are choosing consignment over DIY selling"
];

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

    // Check if this is a cron job call (no auth required) or admin call (auth required)
    const authHeader = req.headers.get('Authorization');
    const isCronCall = authHeader?.includes(Deno.env.get("SUPABASE_ANON_KEY") || '');
    
    if (!isCronCall && authHeader) {
      // Verify admin for manual calls
      const token = authHeader.replace('Bearer ', '');
      const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      
      const { data: { user }, error: userError } = await supabaseAuth.auth.getUser(token);
      if (userError || !user) {
        console.log("Invalid token or user not found:", userError?.message);
        return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Check if user has admin role
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
        console.log("User is not an admin:", user.id);
        return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log("Admin user verified:", user.email);
    } else {
      console.log("Cron job execution - auto-publishing enabled");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Pick a random topic
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    console.log(`Generating blog post about: ${topic}`);

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
              content: `You are a content writer for JSG Liquidators, a professional estate liquidation and auction company in California. Write engaging, helpful blog posts that provide value to readers who may be dealing with estate sales, downsizing, or liquidation needs.

The company offers:
- Professional estate liquidation services
- Auction services (including through LiveAuctioneers and Denver Online Auctions)
- E-commerce consignment through eBay and other platforms
- Complete home cleanouts
- Compassionate service during difficult transitions
- Services that can help offset or cover costs through auction proceeds

Write in a warm, professional tone. Include practical tips and insights. The blog posts should be informative and helpful, not overly salesy.

When relevant, tie in current economic conditions and how they affect:
- The smart financial decision to liquidate unused belongings
- The growing popularity of online auctions and e-commerce
- How professional liquidation helps families during financial transitions
- The value of turning unused items into cash

IMPORTANT: Structure the content with natural image placement markers for EXACTLY 3 images:
- {{IMAGE_1}} - Place after the first introductory paragraph (1-2 paragraphs in)
- {{IMAGE_2}} - Place in the middle section, between major topic transitions
- {{IMAGE_3}} - Place near the end, before the conclusion/CTA section

Ensure proper spacing with clear paragraph breaks and section headings. Each section should be substantial (2-3 paragraphs minimum).

Format your response EXACTLY like this, with no code blocks or extra formatting:
TITLE: Your blog post title here
EXCERPT: A 1-2 sentence summary for preview cards
CONTENT:
<p>Your HTML content starts here with engaging introduction...</p>
{{IMAGE_1}}
<h2>First major section heading</h2>
<p>Substantial content...</p>
<p>More content with proper spacing...</p>
{{IMAGE_2}}
<h2>Second major section heading</h2>
<p>More substantial content...</p>
{{IMAGE_3}}
<h2>Conclusion or Call to Action</h2>
<p>Final thoughts...</p>`
            },
            {
              role: "user",
              content: `Write a blog post about: ${topic}. Make it approximately 800-1000 words with substantial sections. Use HTML formatting with paragraphs (<p>), headings (<h2>, <h3>), and lists (<ul>, <li>) where appropriate. Include exactly 3 image placeholders ({{IMAGE_1}}, {{IMAGE_2}}, {{IMAGE_3}}) at natural break points. Ensure the content is well-spaced with clear section divisions.`
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
