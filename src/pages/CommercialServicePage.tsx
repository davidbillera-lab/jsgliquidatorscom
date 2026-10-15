import { Link } from "@/lib/router-compat";
import { Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { getCommercialService } from "@/data/commercialServices";

const CommercialServicePage = ({ slug }: { slug: string }) => {
  const s = getCommercialService(slug)!;
  const url = `/services/${s.slug}`;
  return (
    <Layout>
      <SEOHead
        title={s.title}
        description={s.description}
        canonical={url}
        faqSchema={s.faqs}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: s.name, url },
        ]}
      />
      <section className="bg-gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">{s.h1}</h1>
          <p className="text-xl text-primary-foreground/80 mb-8 speakable-summary">{s.summary}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="secondary">
              <a href="tel:805-444-4069"><Phone className="w-5 h-5 mr-2" />Call (805) 444-4069</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40">
              <Link to="/contact">Request a Walk-Through</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          {s.sections.map((sec) => (
            <div key={sec.heading}>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{sec.heading}</h2>
              {sec.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
              {sec.bullets && (
                <ul className="space-y-2">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />{b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">Frequently asked questions</h2>
            <div className="space-y-4">
              {s.faqs.map((f) => (
                <div key={f.question} className="p-5 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{f.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-4">Related services</h2>
            <div className="flex flex-wrap gap-3">
              {s.related.map((r) => {
                const rel = getCommercialService(r)!;
                return (
                  <Link key={r} to={`/services/${r}`} className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-border bg-card text-foreground hover:text-primary">
                    {rel.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                );
              })}
              <Link to="/services/business-liquidation" className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-border bg-card text-foreground hover:text-primary">
                Business Liquidation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommercialServicePage;
