import { createFileRoute } from "@tanstack/react-router";
import CommercialServicePage from "@/pages/CommercialServicePage";

export const Route = createFileRoute("/services/commercial-cleanouts")({
  component: () => <CommercialServicePage slug="commercial-cleanouts" />,
});
