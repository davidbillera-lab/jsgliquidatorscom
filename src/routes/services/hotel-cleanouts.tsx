import { createFileRoute } from "@tanstack/react-router";
import CommercialServicePage from "@/pages/CommercialServicePage";

export const Route = createFileRoute("/services/hotel-cleanouts")({
  component: () => <CommercialServicePage slug="hotel-cleanouts" />,
});
