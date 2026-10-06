import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — permanent one-hop redirect.
export const Route = createFileRoute("/current-auctions.html")({
  beforeLoad: () => {
    throw redirect({ to: "/auctions", statusCode: 301 });
  },
});
