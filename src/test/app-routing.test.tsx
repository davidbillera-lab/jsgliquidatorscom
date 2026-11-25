import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /walkthrough instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/walkthrough");

    expect(matches.at(-1)?.routeId).toBe("/walkthrough");
  });

  it.each(["highlands-ranch", "denver", "castle-rock", "englewood", "littleton"])(
    "keeps the established %s city landing page reachable",
    (city) => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
      const match = router.matchRoutes(`/areas/${city}`).at(-1);
      expect(match?.routeId).toBe("/areas/$slug/");
      const params = match?.params;
      expect(params && "slug" in params ? params.slug : undefined).toBe(city);
    },
  );
});
