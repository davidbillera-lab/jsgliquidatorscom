import { createFileRoute } from "@tanstack/react-router";
import ServiceAreaPage from "@/pages/ServiceAreaPage";

export const Route = createFileRoute("/areas/$slug/")({
  component: ServiceAreaPage,
});
