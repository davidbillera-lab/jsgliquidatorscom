import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — permanent one-hop redirect.
export const Route = createFileRoute("/contact.html")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", statusCode: 301 });
  },
});
