import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, CheckCircle2, Star, Quote, Gavel, ShoppingCart, Building2, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { getServiceAreaBySlug, serviceAreas, allServices } from "@/data/serviceAreas";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const serviceIcons = [Gavel, ShoppingCart, Building2, Trash2, Truck];

const ServiceAreaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const area = slug ? getServiceAreaBySlug(slug) : undefined;

  if (!area) {
    return <Navigate to="/404" replace />;
  }

  const otherAreas = serviceAreas.filter((a) => a.slug !== area.slug).slice(0, 6);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JSG Liquidators",
    description: `Professional estate sales, liquidation, junk removal and cleanout services in ${area.city}, Colorado.`,
    url: `https://jsgliquidators.com/areas/${area.slug}`,
    telephone: ["+1-805-444-4069", "+1-805-340-4817"],
    email: "jsgliquidators@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: area.city,
      addressRegion: "CO",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: area.city,
      containedInPlace: { "@type": "State", name: "Colorado" },
    },
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Estate Liquidation Services in ${area.city}`,
      itemListElement: allServices.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, areaServed: area.city },
      })),
    },
  };

  const faqSchema = [
    {
      question: `What estate liquidation services do you offer in ${area.city}?`,
      answer: `JSG Liquidators provides estate sales & online auctions, e-commerce consignment, business liquidation, estate clean outs, and junk removal throughout ${area.city} and ${area.county}. Our auction-backed model often offsets or covers your service costs.`,
    },
    {
      question: `How much does estate cleanout cost in ${area.city}?`,
      answer: `Our unique auction-backed approach means the cost varies—and often you pay nothing out-of-pocket. We identify valuable items during the cleanout, auction them online, and apply proceeds to your removal costs. Many ${area.city} clients end up with money back.`,
    },
    {
      question: `Do you offer same-day junk removal in ${area.city}?`,
      answer: `Yes! We offer same-day and next-day junk removal throughout ${area.city} and nearby areas including ${area.nearbyAreas.join(", ")}. Call us at (805) 444-4069 for emergency service.`,
    },
    {
      question: `What ZIP codes do you serve in ${area.city}?`,
      answer: `We serve all ${area.city} ZIP codes including ${area.zipCodes.join(", ")}, as well as surrounding communities like ${area.nearbyAreas.join(", ")}.`,
    },
  ];

  return (
    <Layout>
      <SEOHead
        title={`Estate Sales & Liquidation in ${area.city} CO`}
        description={area.metaDescription}
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
      <section className="py-20 lg:py-28 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 text-primary-foreground rounded-full text-sm font-semibold mb-6 border border-primary-foreground/20">
              <MapPin className="w-4 h-4 inline mr-1" />
              Serving {area.city}, {area.county}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              Estate Sales &amp; Liquidation Services in {area.city}, Colorado
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
              {area.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Get Your Free {area.city} Consultation
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
          </motion.div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
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
              Every service we offer is available to {area.city} residents and businesses, backed by our unique auction model that puts money back in your pocket.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allServices.map((service, i) => {
              const Icon = serviceIcons[i];
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
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:text-accent transition-colors">
                      Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

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
              <div className="bg-card rounded-xl p-8 border border-border">
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed italic">
                  "{area.testimonialSnippet.text}"
                </p>
                <p className="font-semibold text-foreground">{area.testimonialSnippet.author}</p>
              </div>

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
              Contact JSG Liquidators today for a free, no-obligation estate evaluation in {area.city}. Our auction services can offset or cover your cleanout costs entirely.
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
