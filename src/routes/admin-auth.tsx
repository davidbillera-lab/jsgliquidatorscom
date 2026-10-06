import { createFileRoute } from "@tanstack/react-router";
import AdminAuth from "@/pages/AdminAuth";

export const Route = createFileRoute("/admin-auth")({
  component: AdminAuth,
});
