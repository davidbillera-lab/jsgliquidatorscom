import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getServiceAreaBySlug, serviceAreas, allServices } from "@/data/serviceAreas";
import { getServiceLocationContent } from "@/data/serviceLocationContent";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const ServiceLocationPage = () => {
  const { slug, serviceSlug } = useParams<{ slug: string; serviceSlug: string }>();
  const area = slug ? getServiceAreaBySlug(slug) : undefined;
  const serviceContent = serviceSlug ? getServiceLocationContent(serviceSlug) : undefined;

  if (!area || !serviceContent) {
    return <Navigate to="/404" replace />;
  }

  const faqData = serviceContent.getFaq(area.city);
  const otherServices = allServices.filter((s) => s.slug !== serviceContent.serviceSlug);
  const otherAreas = serviceAreas.filter((a) => a.slug !== area.slug).slice(0, 8);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: area.city, url: `/areas/${area.slug}` },
    { name: serviceContent.serviceName, url: `/areas/${area.slug}/${serviceContent.serviceSlug}` },
  ];

  return (
    <Layout>
      <SEOHead
        title={serviceContent.getTitle(area.city)}
        description={serviceContent.getMetaDescription(area.city)}
        canonical={`/areas/${area.slug}/${serviceContent.serviceSlug}`}
        keywords={serviceContent.getMetaKeywords(area.city)}
        faqSchema={faqData}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{area.city}, Colorado — {area.county}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              {serviceContent.getHeroHeadline(area.city)}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
              {serviceContent.getHeroSubheadline(area.city)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <a href="tel:+18054444069"><Phone className="w-5 h-5 mr-2" />(805) 444-4069</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-white/30 text-white hover:bg-white/10">
                <Link to="/contact">Free Consultation <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-foreground">
              {serviceContent.serviceName} in {area.city}, CO
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{serviceContent.getIntro(area.city, area.county)}</p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 font-serif text-foreground">
            Why Choose JSG Liquidators for {serviceContent.serviceName} in {area.city}?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {serviceContent.benefits.map((benefit, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 bg-background rounded-xl shadow-sm border">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 font-serif text-foreground">
            Our {serviceContent.serviceName} Process in {area.city}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceContent.process.map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: i * 0.15 }}
                className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-3 justify-center mb-10">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold font-serif text-foreground">
              {serviceContent.serviceName} FAQ — {area.city}
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqData.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left font-semibold text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">{serviceContent.getCta(area.city)}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <a href="tel:+18054444069"><Phone className="w-5 h-5 mr-2" />(805) 444-4069</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-white/30 text-white hover:bg-white/10">
              <Link to="/contact">Request a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Other Services in This City */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-8 font-serif text-foreground text-center">
            Other Services in {area.city}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((service) => (
              <Link key={service.slug} to={`/areas/${area.slug}/${service.slug}`}
                className="p-4 bg-muted/50 rounded-lg border hover:border-primary transition-colors text-center">
                <span className="font-semibold text-foreground">{service.name}</span>
                <p className="text-sm text-muted-foreground mt-1">in {area.city}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Locations for This Service */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-8 font-serif text-foreground text-center">
            {serviceContent.serviceName} in Other Colorado Cities
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {otherAreas.map((a) => (
              <Link key={a.slug} to={`/areas/${a.slug}/${serviceContent.serviceSlug}`}
                className="p-3 bg-background rounded-lg border hover:border-primary transition-colors text-center">
                <span className="font-medium text-foreground">{serviceContent.serviceName}</span>
                <p className="text-sm text-primary mt-1">{a.city}, CO</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb nav */}
      <section className="py-6 bg-background border-t">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.url} className="flex items-center gap-1">
                  {i > 0 && <span>/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link to={crumb.url} className="hover:text-primary transition-colors">{crumb.name}</Link>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceLocationPage;
