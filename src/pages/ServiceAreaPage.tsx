import { useParams, Link, Navigate } from "@/lib/router-compat";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, CheckCircle2, Star, Quote, Gavel, ShoppingCart, Building2, Trash2, Truck, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Helmet } from "@/components/seo/Helmet";
import { getServiceAreaBySlug, serviceAreas, allServices } from "@/data/serviceAreas";
import { testimonials } from "@/data/testimonials";
import { cityLandingContent } from "@/data/cityLandingContent";
import estateSaleImage from "@/assets/hero-estate-sale.webp";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const serviceIcons = [Gavel, ShoppingCart, Building2, Trash2, Truck, House];

const ServiceAreaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const area = slug ? getServiceAreaBySlug(slug) : undefined;

  if (!area) {
    return <Navigate to="/404" replace />;
  }

  const landing = cityLandingContent[area.slug];
  const otherAreas = serviceAreas.filter((a) => a.slug !== area.slug)
    .sort((a, b) => Number(area.nearbyAreas.includes(b.city)) - Number(area.nearbyAreas.includes(a.city)))
    .slice(0, 6);
  const areaIndex = serviceAreas.findIndex((a) => a.slug === area.slug);
  const review = testimonials[Math.max(areaIndex, 0) % testimonials.length];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://jsgliquidators.com/areas/${area.slug}#service`,
    name: `Estate liquidation services in ${area.city}, CO`,
    description: landing?.description ?? `Professional estate sales, liquidation, junk removal and cleanout services in ${area.city}, Colorado.`,
    url: `https://jsgliquidators.com/areas/${area.slug}`,
    provider: { "@id": "https://jsgliquidators.com/#business" },
    areaServed: {
      "@type": "City",
      name: area.city,
      containedInPlace: { "@type": "State", name: "Colorado" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Estate Liquidation Services in ${area.city}`,
      itemListElement: allServices.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service", name: s.name, areaServed: area.city,
          url: `https://jsgliquidators.com/areas/${area.slug}/${s.slug}`,
          provider: { "@id": "https://jsgliquidators.com/#business" },
        },
      })),
    },
  };

  const faqSchema = [
    {
      question: `What estate liquidation services do you offer in ${area.city}?`,
      answer: `JSG Liquidators provides estate sales and online auctions, e-commerce consignment, business liquidation, estate cleanouts, and junk removal throughout ${area.city} and ${area.county}. Cleanout work is quoted and paid upfront; optional sale proceeds may help you recoup that expense.`,
    },
    {
      question: `How much does estate cleanout cost in ${area.city}?`,
      answer: `Cleanout pricing varies based on the property, volume, access, labor, and disposal needs. After a walkthrough, we provide a clear quote that is paid upfront. Approved items may be sold through auction or e-commerce to help recoup some or all of that cost, but results are not guaranteed.`,
    },
    {
      question: `How soon can you schedule junk removal in ${area.city}?`,
      answer: `Scheduling depends on the project scope and current availability. Call (805) 444-4069 with your preferred timing and we will explain the available options.`,
    },
    {
      question: `What ZIP codes do you serve in ${area.city}?`,
      answer: `We serve all ${area.city} ZIP codes including ${area.zipCodes.join(", ")}, as well as surrounding communities like ${area.nearbyAreas.join(", ")}.`,
    },
  ];

  if (landing) {
    faqSchema.push(
      {
        question: `What is the auction and e-commerce consignment commission in ${area.city}?`,
        answer: "JSG's commission is 35% on items sold through auction or e-commerce consignment; you keep 65% of each sale. Terms are confirmed in writing before listing. Cleanout services are quoted separately after a free walk-through and paid upfront.",
      },
      {
        question: `Do I have to book a cleanout to sell items in ${area.city}?`,
        answer: "No. Auction and e-commerce consignment can be selected without a cleanout. During your free consultation, we review the items you approve for sale and discuss suitable options. If you also need removal work, that has its own scope and upfront quote.",
      },
      {
        question: `What should I prepare for a free ${area.city} consultation?`,
        answer: landing.preparation,
      },
    );
  }

  return (
    <Layout>
      <SEOHead
        title={landing?.title ?? `Estate Liquidation in ${area.city}`}
        description={landing?.description ?? area.metaDescription}
        canonical={`/areas/${area.slug}`}
        keywords={area.metaKeywords}
        faqSchema={faqSchema}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: area.city, url: `/areas/${area.slug}` },
        ]}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section className={landing ? "relative isolate overflow-hidden py-8 sm:py-16 lg:py-20 bg-navy" : "py-20 lg:py-28 bg-gradient-hero"}>
        {landing && <>
          <img src={estateSaleImage} alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-navy/85" />
        </>}
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 text-primary-foreground rounded-full text-sm font-semibold mb-6 border border-primary-foreground/20">
              <MapPin className="w-4 h-4 inline mr-1" />
              Serving {area.city}, {area.county}
            </span>
            <h1 className={`${landing ? "text-3xl sm:text-4xl" : "text-4xl"} md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight`}>
              {landing ? `Estate Sales & Cleanouts in ${area.city}, Colorado` : `Estate Sales & Liquidation Services in ${area.city}, Colorado`}
            </h1>
            <p className={`${landing ? "text-base sm:text-xl" : "text-xl"} text-primary-foreground/80 mb-8 max-w-3xl mx-auto`}>
              {landing?.introduction ?? area.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  {landing ? "Book a Free Walk-Through" : `Get Your Free ${area.city} Consultation`}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <a href="tel:805-444-4069">
                  <Phone className="w-5 h-5" />
                  (805) 444-4069
                </a>
              </Button>
            </div>
            {landing && <p className="mt-6 text-sm text-primary-foreground/80">Fully insured · 35% auction &amp; e-commerce commission · Cleanouts quoted separately</p>}
          </motion.div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={landing ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              Full-Service Estate Liquidation in {area.city}
            </h2>
            <p className="text-lg text-muted-foreground">
               Every service we offer is available to {area.city} residents and businesses, with custom plans that can combine upfront cleanout work with optional auction and e-commerce sales.
            </p>
          </motion.div>

          <motion.div
            initial={landing ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allServices.map((service, i) => {
              const Icon = serviceIcons[i] ?? Gavel;
              return (
                <motion.div key={service.slug} variants={fadeInUp} transition={{ duration: 0.5 }}>
                  <Link
                    to={`/areas/${area.slug}/${service.slug}`}
                    className="group block h-full p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                      {service.name} in {area.city}
                    </h3>
                    {landing && <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.slug === "estate-sales" && "Review approved belongings for an online estate auction, with sale terms confirmed before listing."}
                      {service.slug === "consignment" && "Sell suitable individual items through e-commerce consignment at the same 35% commission as auctions."}
                      {service.slug === "business-liquidation" && "Plan the sale of owned office furniture, equipment and approved business assets around your property needs."}
                      {service.slug === "estate-cleanouts" && "Agree on the rooms, sorting and removal work in a written quote after a free walk-through. Paid upfront."}
                      {service.slug === "junk-removal" && "Discuss unwanted furniture and contents, with any potential sale items reviewed separately from removal."}
                      {service.slug === "hoarder-cleanouts" && "Discuss a respectful, property-specific clearing plan with access, volume and priorities reviewed before work."}
                    </p>}
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:text-accent transition-colors">
                      See {service.name} in {area.city} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {landing && <>
        <section className="py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">{area.city} Pricing: Sales and Cleanouts Are Separate</h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">35% commission on items sold</h3>
                <p className="text-muted-foreground leading-relaxed">Auction and e-commerce consignment carry a 35% commission. You keep 65% of each sale, with terms confirmed in writing before listing. Selling suitable items does not require booking a cleanout.</p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">Cleanouts quoted and paid upfront</h3>
                <p className="text-muted-foreground leading-relaxed">Cleanout pricing is case by case after a free walk-through. The quote reflects contents, access, labor and disposal needs. This upfront charge is separate from sale commissions and is payable regardless of whether items sell.</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-8">Optional sale proceeds may help you recoup some or all of a cleanout expense, but results are never guaranteed. Your sale settlement and cleanout invoice remain separate.</p>
            <Button asChild variant="outline" className="mt-6"><Link to="/pricing">Review Pricing &amp; Commission <ArrowRight className="w-4 h-4" /></Link></Button>
          </div>
        </section>
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl space-y-12">
            {landing.sections.map((section) => <div key={section.heading}>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-5">{section.heading}</h2>
              <div className="space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="text-muted-foreground leading-relaxed">{paragraph}</p>)}</div>
            </div>)}
            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Arrange Your Free {area.city} Walk-Through</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{landing.preparation} David and Vincent Billera can discuss your priorities and explain the next steps. Office hours are Monday–Friday, 8am–6pm Mountain; phone calls are also taken on weekends.</p>
              <Button asChild><Link to="/contact">Book a Free Consultation <ArrowRight className="w-4 h-4" /></Link></Button>
            </div>
          </div>
        </section>
      </>}

      {/* Why Local / Service Highlights */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Local Expertise</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                Why {area.city} Families Choose JSG Liquidators
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {area.whyLocal}
              </p>

              <div className="space-y-3">
                {area.serviceHighlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Testimonial */}
              {review && <div className="bg-card rounded-xl p-8 border border-border">
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed italic">
                  "{review.text}"
                </p>
                <p className="font-semibold text-foreground">{review.name}, {review.location}</p>
                <p className="text-xs text-muted-foreground mt-1">Google review</p>
              </div>}

              {/* Local Info Card */}
              <div className="bg-primary rounded-xl p-8 text-primary-foreground">
                <h3 className="text-xl font-display font-bold mb-4">{area.city} Service Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-primary-foreground/70">County:</span>{" "}
                    <span className="font-medium">{area.county}</span>
                  </div>
                  <div>
                    <span className="text-primary-foreground/70">Population:</span>{" "}
                    <span className="font-medium">{area.population}</span>
                  </div>
                  <div>
                    <span className="text-primary-foreground/70">ZIP Codes Served:</span>{" "}
                    <span className="font-medium">{area.zipCodes.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-primary-foreground/70">Nearby Areas:</span>{" "}
                    <span className="font-medium">{area.nearbyAreas.join(", ")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Landmarks */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Serving All of {area.city}
            </h2>
            <p className="text-lg text-muted-foreground">
              From {area.localLandmarks[0]} to {area.localLandmarks[area.localLandmarks.length - 1]}, we provide estate liquidation services to every {area.city} neighborhood and community.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {area.localLandmarks.map((landmark) => (
              <motion.span
                key={landmark}
                variants={fadeInUp}
                className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground"
              >
                <MapPin className="w-3 h-3 inline mr-1 text-accent" />
                {landmark}
              </motion.span>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
              Frequently Asked Questions About {area.city} Estate Services
            </h3>
            <div className="space-y-4">
              {faqSchema.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border">
                  <h4 className="font-display font-semibold text-foreground mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Service Areas */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Also Serving These Colorado Communities
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {otherAreas.map((other) => (
              <motion.div key={other.slug} variants={fadeInUp}>
                <Link
                  to={`/areas/${other.slug}`}
                  className="block p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 text-center"
                >
                  <MapPin className="w-5 h-5 text-accent mx-auto mb-2" />
                  <span className="font-display font-semibold text-foreground text-sm">{other.city}, CO</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
              Ready for Your Free {area.city} Estate Consultation?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Contact JSG Liquidators today for a free, no-obligation estate evaluation in {area.city}. Cleanout work is quoted and paid upfront; optional auction and e-commerce proceeds may help you recoup that expense.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Get Free {area.city} Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <a href="tel:805-444-4069">
                  <Phone className="w-5 h-5" />
                  David (805) 444-4069
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceAreaPage;
