import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { serviceAreas, allServices } from "@/data/serviceAreas";
import { getServiceLocationContent } from "@/data/serviceLocationContent";

/**
 * Core 30 Category Hub Page
 * Sits between the homepage and the /areas/{city}/{service} pages.
 * Route: /services/:categorySlug
 *
 * Purpose (Caleb Ulku Core 30):
 *   Homepage → Category page → Service+City page
 *   Each city gets 50–70 words on the category page linking down.
 */
const ServiceCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = categorySlug ? getServiceLocationContent(categorySlug) : undefined;
  const catalogEntry = allServices.find((s) => s.slug === categorySlug);

  if (!category || !catalogEntry) {
    return <Navigate to="/services" replace />;
  }

  const pageUrl = `https://jsgliquidators.com/services/${category.serviceSlug}`;
  const heroHeadline = `${category.serviceName} in Denver & the Front Range`;
  const introCopy = category.getIntro("Denver Metro", "Colorado");

  // Statewide FAQ (uses "Colorado" as the geo token)
  const faqData = category.getFaq("Colorado");

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: category.serviceName, url: `/services/${category.serviceSlug}` },
  ];

  // Per-category localized Service schema — enumerates every city served
  const categoryServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": category.serviceName,
    "serviceType": category.serviceName,
    "url": pageUrl,
    "provider": { "@id": "https://jsgliquidators.com/#organization" },
    "areaServed": serviceAreas.map((a) => ({
      "@type": "City",
      "name": a.city,
      "containedInPlace": { "@type": "AdministrativeArea", "name": a.county },
      "address": { "@type": "PostalAddress", "addressLocality": a.city, "addressRegion": "CO", "addressCountry": "US" },
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${category.serviceName} across Colorado`,
      "itemListElement": serviceAreas.map((a) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `${category.serviceName} in ${a.city}, CO`,
          "url": `https://jsgliquidators.com/areas/${a.slug}/${category.serviceSlug}`,
        },
      })),
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${category.serviceName} service areas`,
    "itemListElement": serviceAreas.map((a, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": `${category.serviceName} in ${a.city}, CO`,
      "url": `https://jsgliquidators.com/areas/${a.slug}/${category.serviceSlug}`,
    })),
  };

  return (
    <Layout>
      <SEOHead
        title={`${category.serviceName} Denver & Colorado`}
        description={category.getMetaDescription("Denver, Colorado")}
        keywords={category.getMetaKeywords("Denver Colorado")}
        canonical={`/services/${category.serviceSlug}`}
        faqSchema={faqData}
        breadcrumbs={breadcrumbs}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/95 via-primary to-primary/90 text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="text-sm text-primary-foreground/70 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-accent">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-accent">{category.serviceName}</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl lg:text-6xl mb-6"
          >
            {heroHeadline}
          </motion.h1>
          <p className="speakable-summary text-lg lg:text-xl text-primary-foreground/90 max-w-3xl mb-8">
            <strong>TL;DR:</strong> JSG Liquidators provides {category.serviceName.toLowerCase()} across every
            Denver-metro and Front Range city — Denver, Aurora, Lakewood, Highlands Ranch, Castle Rock, Englewood,
            Littleton, Thornton, Westminster, Arvada, Centennial, Boulder, Fort Collins, and Colorado Springs.
            No upfront cost. Items typically sell in 7–10 days. Call David at (805) 444-4069.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:805-444-4069" className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call (805) 444-4069
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-primary">
              <Link to="/contact">Free Consultation <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <p className="text-lg text-muted-foreground leading-relaxed">{introCopy}</p>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {category.benefits.map((b) => (
              <div key={b} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-sm">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="font-display font-bold text-3xl mb-8 text-center">
            Our {category.serviceName} Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.process.map((step, i) => (
              <div key={step.title} className="bg-card p-6 rounded-lg border">
                <div className="text-accent font-display font-bold text-2xl mb-2">Step {i + 1}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City hub — Core 30 city grid with 50–70 word blurbs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display font-bold text-3xl mb-2 text-center">
            {category.serviceName} — City by City
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Local pages, local phone number, same crew. Pick your city:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((a) => (
              <Link
                key={a.slug}
                to={`/areas/${a.slug}/${category.serviceSlug}`}
                className="block bg-card p-6 rounded-lg border hover:border-accent hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="font-display font-semibold text-xl">
                    {category.serviceName} in {a.city}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.serviceName} throughout {a.city}, {a.county} ({a.population} residents).
                  Serving {a.nearbyAreas.slice(0, 3).join(", ")} and neighborhoods near{" "}
                  {a.localLandmarks.slice(0, 2).join(" and ")}. ZIP codes include{" "}
                  {a.zipCodes.slice(0, 4).join(", ")}. Free on-site consultation, no upfront cost,
                  and auction proceeds offset every fee.
                </p>
                <span className="text-accent text-sm font-medium inline-flex items-center gap-1">
                  See {a.city} details <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sibling categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display font-semibold text-2xl mb-6 text-center">Related Services</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {allServices
              .filter((s) => s.slug !== category.serviceSlug)
              .map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="px-4 py-2 bg-card border rounded-full text-sm hover:border-accent hover:text-accent transition-colors"
                >
                  {s.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-accent" />
            <h2 className="font-display font-bold text-3xl">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="font-display font-bold text-3xl mb-4">
            Ready to talk {category.serviceName.toLowerCase()}?
          </h2>
          <p className="text-primary-foreground/90 mb-6">
            {category.getCta("Colorado")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:805-444-4069" className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> (805) 444-4069
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-primary">
              <Link to="/contact">Request a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceCategoryPage;
