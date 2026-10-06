import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — permanent one-hop redirect.
export const Route = createFileRoute("/privacy-policy")({
  beforeLoad: () => {
    throw redirect({ to: "/privacy", statusCode: 301 });
  },
});
