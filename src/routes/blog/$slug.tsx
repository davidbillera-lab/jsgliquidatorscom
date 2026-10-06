import { createFileRoute } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { fetchPublishedPost } from "@/lib/blogQueries";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    try {
      return { post: await fetchPublishedPost(params.slug) };
    } catch {
      return { post: undefined };
    }
  },
  component: BlogPost,
});
