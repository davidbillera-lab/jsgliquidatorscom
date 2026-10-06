import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — permanent one-hop redirect.
export const Route = createFileRoute("/why-us")({
  beforeLoad: () => {
    throw redirect({ to: "/why-work-with-us", statusCode: 301 });
  },
});
