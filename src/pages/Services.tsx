import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Gavel, ShoppingCart, Building2, Trash2, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

const services = [
  {
    id: "auctions",
    icon: Gavel,
    title: "Estate Sale Auctions",
    tagline: "Reach thousands of buyers nationwide",
    description: "Our online auction platform connects your estate with a vast network of collectors, dealers, and buyers from across the country. We handle everything from cataloging and photography to marketing and sales.",
    features: [
      "Professional photography and item descriptions",
      "Strategic marketing to targeted buyer groups",
      "Competitive bidding drives up prices",
      "Secure payment processing and buyer verification",
      "Complete transparency with detailed sales reports",
      "Items sold within 2-4 weeks typically",
    ],
    cta: "View Our Auctions",
    ctaLink: "https://denveronlineauctions.com/marketplace/jsg-estate-liquidation",
    external: true,
  },
  {
    id: "consignment",
    icon: ShoppingCart,
    title: "E-Commerce Consignment",
    tagline: "Maximize value for high-end items",
    description: "For valuable antiques, collectibles, and specialty items, our consignment service leverages major online marketplaces to reach the right buyers and achieve premium prices.",
    features: [
      "Expert valuation and pricing strategy",
      "Professional listings on eBay, Etsy, and specialty sites",
      "Quality photography and detailed descriptions",
      "Secure packaging and shipping handled",
      "Regular sales updates and reporting",
      "Higher returns for valuable items",
    ],
    cta: "Learn More",
    ctaLink: "/contact",
    external: false,
  },
  {
    id: "business",
    icon: Building2,
    title: "Business Liquidation",
    tagline: "Complete asset recovery solutions",
    description: "Whether you're closing, relocating, or downsizing, we provide comprehensive business liquidation services that maximize asset recovery while minimizing your involvement.",
    features: [
      "Full inventory assessment and valuation",
      "Office furniture and equipment liquidation",
      "Restaurant and retail fixture sales",
      "Industrial equipment and machinery",
      "Coordinated removal and site clearing",
      "Tax documentation and asset tracking",
    ],
    cta: "Get Business Quote",
    ctaLink: "/contact",
    external: false,
  },
  {
    id: "cleanout",
    icon: Trash2,
    title: "Estate Cleanout",
    tagline: "Prepare properties for sale or transition",
    description: "Our complete estate cleanout service handles everything from sorting and organizing to removal and cleaning, leaving properties ready for sale or the next chapter.",
    features: [
      "Complete property clearing",
      "Sorting and organizing belongings",
      "Donation coordination to local charities",
      "Proper disposal of unwanted items",
      "Deep cleaning available",
      "Quick turnaround to meet your timeline",
    ],
    cta: "Schedule Cleanout",
    ctaLink: "/contact",
    external: false,
  },
  {
    id: "junk",
    icon: Truck,
    title: "Junk Removal",
    tagline: "Eco-friendly removal services",
    description: "Fast, efficient junk removal with a focus on responsible disposal. We recycle and donate whenever possible, ensuring minimal environmental impact.",
    features: [
      "Same-day service available",
      "Upfront pricing with no hidden fees",
      "Heavy item and appliance removal",
      "Yard waste and debris clearing",
      "Recycling and donation coordination",
      "Environmentally responsible disposal",
    ],
    cta: "Get Removal Quote",
    ctaLink: "/contact",
    external: false,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Services = () => {
  return (
    <Layout>
      <SEOHead
        title="Estate Liquidation Services"
        description="Complete estate liquidation services in Denver, CO. Estate sale auctions, e-commerce consignment, business liquidation, estate cleanout, and junk removal. No upfront costs."
        canonical="/services"
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
              Our Liquidation Services
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              From estate auctions to complete cleanouts, we offer comprehensive solutions 
              tailored to your specific needs. No upfront costs — ever.
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
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
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

                  <div className="flex flex-col sm:flex-row gap-4">
                    {service.external ? (
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
                      <a href="tel:720-699-5715">
                        <Phone className="w-4 h-4" />
                        Call (720) 699-5715
                      </a>
                    </Button>
                  </div>
                </div>

                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="bg-secondary rounded-2xl p-8 lg:p-12">
                    <div className="bg-card rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-foreground">{service.title}</h3>
                          <p className="text-sm text-muted-foreground">Professional Service</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 bg-muted rounded-full w-full" />
                        <div className="h-2 bg-muted rounded-full w-4/5" />
                        <div className="h-2 bg-muted rounded-full w-3/5" />
                      </div>
                      <div className="mt-6 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">No upfront costs</span>
                          <span className="text-accent font-semibold">$0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
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
                <a href="tel:720-699-5715">
                  <Phone className="w-5 h-5" />
                  (720) 699-5715
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
