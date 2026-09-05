import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const LABEL_OVERRIDES: Record<string, string> = {
  faq: "FAQ",
  areas: "Service Areas",
  "why-work-with-us": "Why Work With Us",
  privacy: "Privacy Policy",
  blog: "Blog",
  services: "Services",
  auctions: "Auctions & E-Commerce",
  about: "About",
  contact: "Contact",
  testimonials: "Reviews",
  search: "Search",
};

const HIDDEN_PREFIXES = ["/blog-admin", "/admin-auth", "/oauth"];

function labelFor(segment: string) {
  return (
    LABEL_OVERRIDES[segment] ??
    segment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  if (pathname === "/" || HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, i) => ({
    label: labelFor(segment),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/40">
      <ol className="container mx-auto flex flex-wrap items-center gap-1.5 px-4 py-2.5 text-sm text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
            {crumb.isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.href} className="hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
