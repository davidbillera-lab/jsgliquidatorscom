import { createFileRoute } from "@tanstack/react-router";
import ServiceLocationPage from "@/pages/ServiceLocationPage";

export const Route = createFileRoute("/areas/$slug/$serviceSlug")({
  component: ServiceLocationPage,
});
