import { createFileRoute } from "@tanstack/react-router";
import CommercialServicePage from "@/pages/CommercialServicePage";

export const Route = createFileRoute("/services/office-cleanouts")({
  component: () => <CommercialServicePage slug="office-cleanouts" />,
});
