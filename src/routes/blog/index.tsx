import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import { fetchPublishedPosts } from "@/lib/blogQueries";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    try {
      return { posts: await fetchPublishedPosts() };
    } catch {
      return { posts: undefined };
    }
  },
  component: Blog,
});
