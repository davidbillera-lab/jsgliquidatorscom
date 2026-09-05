import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { serviceAreas, allServices } from "@/data/serviceAreas";
import { allFaqs } from "@/data/faqData";

interface Result {
  title: string;
  href: string;
  excerpt: string;
  group: string;
}

const staticPages: Result[] = [
  { title: "Why Work With Us", href: "/why-work-with-us", excerpt: "No upfront cost, items sold in 7–10 days, full-service appraisal through cleanup.", group: "Pages" },
  { title: "Services", href: "/services", excerpt: "Estate sales, e-commerce consignment, business liquidation, cleanouts and junk removal.", group: "Pages" },
  { title: "Auctions & E-Commerce", href: "/auctions", excerpt: "Current online estate auctions and our eBay store.", group: "Pages" },
  { title: "Reviews", href: "/testimonials", excerpt: "What Denver families and businesses say about working with JSG Liquidators.", group: "Pages" },
  { title: "About", href: "/about", excerpt: "Denver-based, family-run estate liquidation company.", group: "Pages" },
  { title: "Contact", href: "/contact", excerpt: "Free consultation. Call (805) 444-4069 or send us a message.", group: "Pages" },
];

const Search = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  useEffect(() => {
    const id = setTimeout(() => {
      if (query) setParams({ q: query }, { replace: true });
      else setParams({}, { replace: true });
    }, 300);
    return () => clearTimeout(id);
  }, [query, setParams]);

  const { data: posts } = useQuery({
    queryKey: ["blog-posts-search"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title, slug, excerpt")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const index = useMemo<Result[]>(() => {
    const serviceHubs: Result[] = allServices.map((s) => ({
      title: s.name,
      href: `/services/${s.slug}`,
      excerpt: `${s.name} across Denver, Aurora, Lakewood, Boulder and the Front Range.`,
      group: "Services",
    }));

    const areas: Result[] = serviceAreas.map((a) => ({
      title: `Estate Services in ${a.city}, CO`,
      href: `/areas/${a.slug}`,
      excerpt: a.description,
      group: "Service Areas",
    }));

    const faqs: Result[] = allFaqs.map((f) => ({
      title: f.question,
      href: "/faq",
      excerpt: f.answer,
      group: "FAQ",
    }));

    const blog: Result[] = (posts ?? []).map((p) => ({
      title: p.title,
      href: `/blog/${p.slug}`,
      excerpt: p.excerpt ?? "",
      group: "Blog",
    }));

    return [...staticPages, ...serviceHubs, ...areas, ...blog, ...faqs];
  }, [posts]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return index
      .map((item) => {
        const haystack = `${item.title} ${item.excerpt}`.toLowerCase();
        const score = terms.reduce(
          (acc, t) =>
            acc + (item.title.toLowerCase().includes(t) ? 3 : 0) + (haystack.includes(t) ? 1 : 0),
          0,
        );
        return { item, score, matchedAll: terms.every((t) => haystack.includes(t)) };
      })
      .filter((r) => r.matchedAll)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40)
      .map((r) => r.item);
  }, [index, query]);

  return (
    <Layout>
      <SEOHead
        title="Search"
        description="Search JSG Liquidators for estate sales, e-commerce consignment, business liquidation, cleanouts, service areas, FAQs and blog articles across Denver and Colorado."
        canonical="/search"
        noindex
      />
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 max-w-3xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
          Search JSG Liquidators
        </h1>

        <div className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “estate sale Boulder”, “consignment”, or “how much does it cost”"
            aria-label="Search the site"
            className="pl-12 h-14 text-base"
          />
        </div>

        {query && (
          <p className="text-sm text-muted-foreground mb-6">
            {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
          </p>
        )}

        <div className="space-y-4">
          {results.map((r) => (
            <Link
              key={`${r.group}-${r.href}-${r.title}`}
              to={r.href}
              className="block rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-accent">
                {r.group}
              </span>
              <h2 className="text-lg font-semibold text-foreground mt-1">{r.title}</h2>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{r.excerpt}</p>
            </Link>
          ))}
        </div>

        {query && results.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-foreground font-medium mb-2">No matches for “{query}”.</p>
            <p className="text-muted-foreground text-sm">
              Call David at{" "}
              <a href="tel:805-444-4069" className="text-primary font-medium">
                (805) 444-4069
              </a>{" "}
              or browse our{" "}
              <Link to="/services" className="text-primary font-medium">
                services
              </Link>{" "}
              and{" "}
              <Link to="/faq" className="text-primary font-medium">
                FAQs
              </Link>
              .
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Search;
