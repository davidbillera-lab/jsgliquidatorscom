import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import ReviewCard from "@/pages/ReviewCard";

export const Route = createFileRoute("/review-card")({
  head: () => ({ meta: [
    { title: "Review QR Card | JSG Liquidators" },
    { name: "description", content: "Review QR Card for JSG Liquidators customers." },
    { property: "og:title", content: "Review QR Card | JSG Liquidators" },
    { property: "og:description", content: "Review QR Card for JSG Liquidators customers." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  validateSearch: (s: Record<string, unknown>) => ({ for: z.string().optional().catch(undefined).parse(s["for"]) }),
  component: ReviewCardRoute,
});

function ReviewCardRoute() {
  const search = Route.useSearch();
  return <ReviewCard variant={search.for === "pickup" ? "pickup" : "thanks"} />;
}
