import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List published JSG Liquidators blog posts (Denver estate liquidation, business liquidation, e-commerce consignment, junk removal). Returns id, title, slug, excerpt, author, and published date.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Maximum number of posts (default 20)."),
    search: z.string().optional().describe("Case-insensitive substring to match in title."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, search }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    let query = supabase
      .from("blog_posts")
      .select("id,title,slug,excerpt,author,featured_image_url,created_at,updated_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (search) query = query.ilike("title", `%${search}%`);
    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { posts: data ?? [] },
    };
  },
});
