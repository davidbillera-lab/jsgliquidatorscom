import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Gavel, ShoppingCart, Building2, Trash2, Truck, Home, CheckCircle2, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

const services = [
  {
    id: "auctions",
    icon: Gavel,
    title: "Estate Sales & Online Auctions",
    tagline: "Denver's Premier Estate Sale Company",
    description: "Looking for estate sales in Denver? Our professional online estate auction platform connects your estate with thousands of collectors, dealers, and buyers nationwide. We handle complete estate sales from cataloging and photography to marketing—maximizing your returns on antiques, collectibles, and household items.",
    features: [
      "Professional estate sale photography and item descriptions",
      "Strategic marketing to targeted buyer groups",
      "Competitive bidding drives up estate sale prices",
      "Secure payment processing and buyer verification",
      "Complete transparency with detailed sales reports",
      "Timing based on the items, platform and buyer demand",
    ],
    cta: "View Our Estate Auctions",
    ctaLink: "https://denveronlineauctions.com/marketplace/jsg-estate-liquidation",
    external: true,
    auctionLinks: [
      { label: "LiveAuctioneers", url: "https://jsg-liquidators.liveauctioneers.com/" },
      { label: "Denver Online Auctions", url: "https://denveronlineauctions.com/marketplace/jsg-estate-liquidation" },
    ],
  },
  {
    id: "consignment",
    icon: ShoppingCart,
    title: "E-Commerce Consignment Services",
    tagline: "Colorado's Trusted Online Consignment Partner",
    description: "Our e-commerce consignment service evaluates approved antiques, collectibles and specialty items for suitable online marketplaces. We handle listings and order coordination under agreed consignment terms.",
    features: [
      "Expert valuation and e-commerce pricing strategy",
      "Professional listings on eBay, Etsy, and specialty sites",
      "High-quality photography and detailed descriptions",
      "Secure packaging and worldwide shipping handled",
      "Regular sales updates and transparent reporting",
      "Selling time depends on item, price, platform and demand",
    ],
    cta: "Visit Our eBay Store",
    ctaLink: "https://ebay.us/m/tsG4b9",
    external: true,
  },
  {
    id: "business",
    icon: Building2,
    title: "Business Liquidation Services Denver",
    tagline: "Complete Commercial Asset Recovery in Colorado",
    description: "Closing, relocating or downsizing a business? We create a custom plan for approved assets, suitable online sales channels and buyer coordination. Property clearing is quoted separately when requested.",
    features: [
      "Full business inventory assessment and valuation",
      "Office furniture and equipment liquidation",
      "Restaurant and retail fixture liquidation sales",
      "Industrial equipment and machinery auctions",
      "Coordinated removal and commercial site clearing",
      "Tax documentation and business asset tracking",
    ],
    cta: "Get Business Liquidation Quote",
    ctaLink: "/contact",
    external: false,
  },
  {
    id: "estate-cleanouts",
    icon: Home,
    title: "Estate Clean Outs",
    tagline: "Comprehensive Estate Clearing Services in Colorado",
    description: "When a loved one passes or you're managing a major life transition, we build a custom property plan. Cleanout work is quoted and paid upfront; optional sales may help recoup costs but are not guaranteed.",
    features: [
      "Complete home and property clearing",
      "Valuable item identification for auction",
      "Sensitive handling of personal belongings",
      "Coordination with family members and executors",
      "Donation drop-off to local Colorado charities",
      "Broom-clean property ready for sale or transition",
    ],
    cta: "Schedule Estate Clean Out",
    ctaLink: "/contact",
    external: false,
  },
  {
    id: "cleanout",
    icon: Trash2,
    title: "Estate Cleanout Services Denver",
    tagline: "Full-Service Property Clearing in Colorado",
    description: "Our Denver estate cleanout service covers the approved sorting and removal scope with a clear upfront quote. Suitable items can be evaluated for separate auction or e-commerce sale.",
    features: [
      "Complete estate property clearing",
      "Professional sorting and organizing belongings",
      "Donation coordination to local Denver charities",
      "Proper disposal of unwanted estate items",
      "Deep cleaning services available",
      "A schedule based on the property's scope and access",
    ],
    cta: "Schedule Estate Cleanout",
    ctaLink: "/contact",
    external: false,
  },
  {
    id: "junk",
    icon: Truck,
    title: "Junk Removal Company Denver Colorado",
    tagline: "Eco-Friendly Junk Removal with Revenue Recovery",
    description: "Looking for junk removal in Denver? We provide a clear upfront quote, identify items with resale potential, and can sell approved items through auction or e-commerce. Proceeds may help you recoup costs, but results are not guaranteed.",
    features: [
      "Optional evaluation of approved items for resale",
      "Transparent junk removal pricing with no hidden fees",
      "Heavy item, furniture, and appliance removal",
      "Recycling and donation coordination",
      "Scheduling based on job scope and current availability",
      "Serving Denver and surrounding Front Range communities",
    ],
    cta: "Get Junk Removal Quote",
    ctaLink: "/contact",
    external: false,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const servicesFaq = [
  {
    question: "How much does an estate sale cost in Denver?",
    answer: "Every job is priced individually after a free consultation. Auction and e-commerce services use agreed sales terms. If a cleanout is included, its quoted cost is paid upfront. Sale proceeds may help you recoup some or all of that cost, but results are not guaranteed."
  },
  {
    question: "How long does an estate liquidation take?",
     answer: "Timing depends on the property, the number and type of items, selected sales channels, buyer demand and any cleanout work. The expected schedule is included in the custom plan."
  },
  {
    question: "What items sell best at estate sales?",
    answer: "Antiques, vintage collectibles, fine art, jewelry, mid-century modern furniture, power tools, and specialty items like Western art and Native American pieces consistently bring strong prices at our Denver estate auctions."
  },
  {
    question: "Do you handle junk removal after an estate sale?",
    answer: "Yes! JSG Liquidators offers complete estate cleanout and junk removal services after every estate sale. We handle donation coordination, recycling, and responsible disposal—and we often find additional valuable items during removal that can be auctioned to offset your costs."
  },
  {
    question: "What areas in Colorado do you serve?",
    answer: "We serve the entire Denver metro area and beyond, including Denver, Aurora, Lakewood, Highlands Ranch, Castle Rock, Englewood, Littleton, Thornton, Westminster, Arvada, Centennial, Boulder, Fort Collins, and Colorado Springs."
  },
  {
    question: "Can you sell items online through e-commerce consignment?",
    answer: "Absolutely. Our e-commerce consignment service lists your valuable items on eBay, Etsy, LiveAuctioneers, and other specialty marketplaces. We handle photography, listing, shipping, and customer service—reaching buyers worldwide for premium prices."
  },
];

const Services = () => {
  return (
    <Layout>
      <SEOHead
        title="Estate Sales & Liquidation Services Denver"
        description="Denver estate sales, liquidation, cleanouts and e-commerce consignment. Custom plans, upfront cleanout quotes and free consultations."
        canonical="/services"
        keywords="estate sales Denver, estate liquidation services Colorado, business liquidation Denver, junk removal company Denver, e-commerce consignment Colorado, estate sale auctions, online estate auctions"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
        faqSchema={servicesFaq}
      />

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
              Estate Sales &amp; Liquidation Services in Denver, Colorado
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Professional estate sales, estate liquidation, business liquidation, junk removal, and e-commerce consignment 
               throughout Denver and Colorado. Cleanout work is quoted and paid upfront, while auction and e-commerce proceeds may help you recoup that expense.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Get Your Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-20 lg:space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <div>
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-accent font-medium text-sm uppercase tracking-wider">
                    {service.tagline}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {(() => {
                    const catMap: Record<string, string> = {
                      auctions: "estate-sales",
                      consignment: "consignment",
                      business: "business-liquidation",
                      "estate-cleanouts": "estate-cleanouts",
                      "junk-removal": "junk-removal",
                    };
                    const catSlug = catMap[service.id];
                    return catSlug ? (
                      <div className="mb-6">
                        <Link
                          to={`/services/${catSlug}`}
                          className="inline-flex items-center gap-1 text-accent hover:underline font-medium text-sm"
                        >
                          See {service.title} in all 14 Colorado cities
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    ) : null;
                  })()}

                  {(service.id === "estate-cleanouts" || service.id === "cleanout") && (
                    <div className="mb-6">
                      <Link
                        to="/services/hoarder-cleanouts"
                        className="inline-flex items-center gap-1 text-accent hover:underline font-medium text-sm"
                      >
                        Need a hoarder cleanout in Denver? See our hoarding cleanup service
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                    {service.auctionLinks ? (
                      <div className="w-full flex flex-col gap-3">
                        <span className="text-base font-bold text-foreground">View Our Auctions</span>
                        <div className="flex flex-col sm:flex-row gap-4">
                          {service.auctionLinks.map((link) => (
                            <Button key={link.label} asChild variant="accent" size="lg">
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.label}
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : service.external ? (
                      <Button asChild variant="accent" size="lg">
                        <a href={service.ctaLink} target="_blank" rel="noopener noreferrer">
                          {service.cta}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button asChild variant="accent" size="lg">
                        <Link to={service.ctaLink}>
                          {service.cta}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="outline" size="lg">
                      <a href="tel:805-444-4069">
                        <Phone className="w-4 h-4" />
                        Call David (805) 444-4069
                      </a>
                    </Button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {servicesFaq.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg border border-border px-6">
                  <AccordionTrigger className="text-left font-semibold text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-8 text-muted-foreground">
              Wondering what estate sale services typically cost? See{" "}
              <Link to="/how-much-do-estate-sale-companies-charge" className="text-primary underline underline-offset-4 hover:text-primary/80">
                how much estate sale companies charge in Denver
              </Link>{" "}
              and how our revenue-recovery model can offset some or all of your costs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary">
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
              Not Sure Which Service You Need?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Contact us for a free consultation. We'll evaluate your situation and recommend 
              the best approach to maximize your returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Get Free Consultation
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

export default Services;
