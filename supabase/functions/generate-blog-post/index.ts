import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const topics = [
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
  "The value of transparency in estate sale pricing"
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

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Pick a random topic
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    console.log(`Generating blog post about: ${topic}`);

    // Generate 2 images in parallel with the blog content
    const imagePrompts = [
      `Professional photograph of an organized estate sale in a beautiful home, warm natural lighting, antique furniture and collectibles neatly displayed, welcoming atmosphere, high quality editorial style photo, 16:9 aspect ratio`,
      `Professional photograph of a cozy living room with vintage furniture and family heirlooms, soft lighting, moving boxes in background suggesting downsizing, warm and inviting atmosphere, editorial style, 16:9 aspect ratio`
    ];

    const [contentResponse, image1Data, image2Data] = await Promise.all([
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
- Auction services (including through LiveAuctioneers)
- Compassionate service during difficult transitions
- Services that can help offset or cover costs through auction proceeds

Write in a warm, professional tone. Include practical tips and insights. The blog posts should be informative and helpful, not overly salesy.

IMPORTANT: Structure the content with natural image placement markers. Use {{IMAGE_1}} after the first introductory paragraph and {{IMAGE_2}} between major sections.

Format your response EXACTLY like this, with no code blocks or extra formatting:
TITLE: Your blog post title here
EXCERPT: A 1-2 sentence summary for preview cards
CONTENT:
<p>Your HTML content starts here...</p>
{{IMAGE_1}}
<h2>Section heading</h2>
<p>More content...</p>
{{IMAGE_2}}
<h2>Another section</h2>
<p>More content...</p>`
            },
            {
              role: "user",
              content: `Write a blog post about: ${topic}. Make it approximately 600-800 words. Use HTML formatting for the content with paragraphs (<p>), headings (<h2>, <h3>), and lists (<ul>, <li>) where appropriate. Remember to include {{IMAGE_1}} and {{IMAGE_2}} markers at natural break points in the content.`
            }
          ],
        }),
      }),
      generateImage(imagePrompts[0], LOVABLE_API_KEY),
      generateImage(imagePrompts[1], LOVABLE_API_KEY)
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

    if (image1Data) {
      image1Url = await uploadImageToStorage(supabase, image1Data, `ai-blog-${timestamp}-1.png`);
    }
    if (image2Data) {
      image2Url = await uploadImageToStorage(supabase, image2Data, `ai-blog-${timestamp}-2.png`);
    }

    console.log("Image URLs:", { image1Url, image2Url });

    // Parse the structured response
    let blogData;
    try {
      // Parse the TITLE/EXCERPT/CONTENT format
      const titleMatch = generatedText.match(/TITLE:\s*(.+?)(?:\n|EXCERPT:)/s);
      const excerptMatch = generatedText.match(/EXCERPT:\s*(.+?)(?:\n|CONTENT:)/s);
      const contentMatch = generatedText.match(/CONTENT:\s*([\s\S]+)$/);

      if (titleMatch && excerptMatch && contentMatch) {
        let content = contentMatch[1].trim();
        
        // Replace image placeholders with actual images
        const imageStyle = 'width: 100%; border-radius: 0.75rem; margin: 2rem 0;';
        
        if (image1Url) {
          content = content.replace(
            /\{\{IMAGE_1\}\}/g,
            `<img src="${image1Url}" alt="Estate sale preparation" style="${imageStyle}" />`
          );
        } else {
          content = content.replace(/\{\{IMAGE_1\}\}/g, '');
        }
        
        if (image2Url) {
          content = content.replace(
            /\{\{IMAGE_2\}\}/g,
            `<img src="${image2Url}" alt="Professional estate organization" style="${imageStyle}" />`
          );
        } else {
          content = content.replace(/\{\{IMAGE_2\}\}/g, '');
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

    // Insert the blog post as a draft
    const { data: insertedPost, error: insertError } = await supabase
      .from("blog_posts")
      .insert({
        title: blogData.title,
        slug: slug,
        excerpt: blogData.excerpt,
        content: blogData.content,
        author: "Penny",
        published: false,
        published_at: null,
        featured_image_url: image1Url || null, // Use first generated image as featured
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
