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
      "Items sold within 7-10 days typically",
    ],
    cta: "View Our Auctions",
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
    cta: "Visit Our eBay Store",
    ctaLink: "https://ebay.us/m/tsG4b9",
    external: true,
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
    description: "Fast, efficient junk removal with a focus on responsible disposal. We identify items of value that can be auctioned off to potentially offset your upfront costs. We recycle and donate whenever possible, ensuring minimal environmental impact.",
    features: [
      "We identify valuable items to auction and offset costs",
      "Transparent pricing with no hidden fees",
      "Heavy item and appliance removal",
      "Recycling and donation coordination",
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
        description="Complete estate liquidation services in Denver, CO. Estate sale auctions, e-commerce consignment, business liquidation, estate cleanout, and junk removal. Auction proceeds can offset your costs."
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
              tailored to your specific needs. Our auction services can help offset or even cover your costs.
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
