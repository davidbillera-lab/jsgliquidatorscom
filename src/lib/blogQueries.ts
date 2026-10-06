import { supabase } from "@/integrations/supabase/client";

// Shared by the blog route loaders (server render) and the pages (browser refresh),
// so the server-sent HTML already contains the posts.

export async function fetchPublishedPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchPublishedPost(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}
