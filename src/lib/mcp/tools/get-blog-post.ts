import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description: "Fetch a single published blog post by slug, including full HTML content.",
  inputSchema: {
    slug: z.string().min(1).describe("Post slug from list_blog_posts."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    if (!data) return { content: [{ type: "text", text: `No published post with slug "${slug}"` }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { post: data },
    };
  },
});
