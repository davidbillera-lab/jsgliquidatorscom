import { createFileRoute } from "@tanstack/react-router";
import BlogAdmin from "@/pages/BlogAdmin";

export const Route = createFileRoute("/blog-admin")({
  component: BlogAdmin,
});
