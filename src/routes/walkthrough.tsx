import { createFileRoute } from "@tanstack/react-router";
import Walkthrough from "@/pages/Walkthrough";

export const Route = createFileRoute("/walkthrough")({
  component: Walkthrough,
});
