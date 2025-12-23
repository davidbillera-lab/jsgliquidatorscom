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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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

Format your response EXACTLY like this, with no code blocks or extra formatting:
TITLE: Your blog post title here
EXCERPT: A 1-2 sentence summary for preview cards
CONTENT:
<p>Your HTML content starts here...</p>
<h2>Section heading</h2>
<p>More content...</p>`
          },
          {
            role: "user",
            content: `Write a blog post about: ${topic}. Make it approximately 600-800 words. Use HTML formatting for the content with paragraphs (<p>), headings (<h2>, <h3>), and lists (<ul>, <li>) where appropriate.`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content;

    if (!generatedText) {
      throw new Error("No content generated");
    }

    console.log("Raw AI response:", generatedText);

    // Parse the structured response
    let blogData;
    try {
      // Parse the TITLE/EXCERPT/CONTENT format
      const titleMatch = generatedText.match(/TITLE:\s*(.+?)(?:\n|EXCERPT:)/s);
      const excerptMatch = generatedText.match(/EXCERPT:\s*(.+?)(?:\n|CONTENT:)/s);
      const contentMatch = generatedText.match(/CONTENT:\s*([\s\S]+)$/);

      if (titleMatch && excerptMatch && contentMatch) {
        blogData = {
          title: titleMatch[1].trim(),
          excerpt: excerptMatch[1].trim(),
          content: contentMatch[1].trim()
        };
      } else {
        // Fallback: try to extract sensible content
        console.log("Could not parse structured format, using fallback");
        blogData = {
          title: topic,
          excerpt: `Learn about ${topic.toLowerCase()} from the experts at JSG Liquidators.`,
          content: generatedText
            .replace(/```json[\s\S]*?```/g, '') // Remove JSON code blocks
            .replace(/```[\s\S]*?```/g, '') // Remove other code blocks
            .replace(/^[\s\S]*?<p>/m, '<p>') // Start from first paragraph
            .trim()
        };
        
        // If content still looks like JSON, extract the actual content
        if (blogData.content.includes('"content"')) {
          try {
            const jsonMatch = blogData.content.match(/"content"\s*:\s*"([\s\S]*?)"\s*[,}]/);
            if (jsonMatch) {
              blogData.content = jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
            }
          } catch (e) {
            console.log("Could not extract content from JSON");
          }
        }
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      blogData = {
        title: topic,
        excerpt: `Learn about ${topic.toLowerCase()} from the experts at JSG Liquidators.`,
        content: `<p>${generatedText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`
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
