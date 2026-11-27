import { createFileRoute } from "@tanstack/react-router";
import ReviewRedirect from "@/pages/ReviewRedirect";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [
    { title: "Leave a Google Review | JSG Liquidators" },
    { name: "description", content: "Leave a Google Review for JSG Liquidators customers." },
    { property: "og:title", content: "Leave a Google Review | JSG Liquidators" },
    { property: "og:description", content: "Leave a Google Review for JSG Liquidators customers." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: ReviewRedirect,
});
