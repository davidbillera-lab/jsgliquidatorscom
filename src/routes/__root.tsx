import { useEffect } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  Link,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { initTracking } from "@/lib/tracking";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { googleTagsBootstrap, siteSchemaGraph } from "@/data/siteSchema";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "google-site-verification", content: "nfbbre69S6UrDxsrsiEJP3z5dEfyJPQjx62hYjEkTLY" },
      { name: "p:domain_verify", content: "14265d487f8312dedd0951decb6b1252" },
      { name: "author", content: "JSG Liquidators" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "bingbot", content: "index, follow" },
      { name: "msnbot", content: "index, follow" },
      { name: "msvalidate.01", content: "94B7E91982C6DAF0E66184BE1C6BCAAA" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      { children: googleTagsBootstrap },
      { type: "application/ld+json", children: JSON.stringify(siteSchemaGraph) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // ported from main.tsx — conversion + Core Web Vitals tracking
  useEffect(() => {
    initTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-display mb-2">This page didn't load</h1>
        <p className="text-muted-foreground mb-6">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <Link to="/" className="px-4 py-2 rounded-md border border-border bg-card text-foreground">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
