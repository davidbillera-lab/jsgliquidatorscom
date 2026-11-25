import { createFileRoute } from "@tanstack/react-router";
import SeoReport from "@/pages/SeoReport";

export const Route = createFileRoute("/seo-report")({
  head: () => ({ meta: [
    { title: "SEO Profile Link Report | JSG Liquidators" },
    { name: "description", content: "Private JSG Liquidators report of business profile links, backlink verification evidence and last-checked dates." },
    { property: "og:title", content: "SEO Profile Link Report | JSG Liquidators" },
    { property: "og:description", content: "Business profile backlinks and their latest verification status for JSG Liquidators." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: SeoReport,
});