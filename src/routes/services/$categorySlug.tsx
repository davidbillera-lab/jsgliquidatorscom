import { createFileRoute } from "@tanstack/react-router";
import ServiceCategoryPage from "@/pages/ServiceCategoryPage";

export const Route = createFileRoute("/services/$categorySlug")({
  component: ServiceCategoryPage,
});
