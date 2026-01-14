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
    title: "Estate Sales & Online Auctions",
    tagline: "Denver's Premier Estate Sale Company",
    description: "Looking for estate sales in Denver? Our professional online estate auction platform connects your estate with thousands of collectors, dealers, and buyers nationwide. We handle complete estate sales from cataloging and photography to marketing—maximizing your returns on antiques, collectibles, and household items.",
    features: [
      "Professional estate sale photography and item descriptions",
      "Strategic marketing to targeted buyer groups",
      "Competitive bidding drives up estate sale prices",
      "Secure payment processing and buyer verification",
      "Complete transparency with detailed sales reports",
      "Estate items sold within 7-10 days typically",
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
    description: "Our e-commerce consignment service turns your valuable antiques, collectibles, and specialty items into cash. We leverage major online marketplaces like eBay, Etsy, and specialty auction sites to reach buyers worldwide and achieve premium prices—with no upfront costs to you.",
    features: [
      "Expert valuation and e-commerce pricing strategy",
      "Professional listings on eBay, Etsy, and specialty sites",
      "High-quality photography and detailed descriptions",
      "Secure packaging and worldwide shipping handled",
      "Regular sales updates and transparent reporting",
      "Higher returns for valuable consignment items",
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
    description: "Need business liquidation in Denver or Colorado? Whether you're closing, relocating, or downsizing your business, we provide comprehensive business liquidation services that maximize asset recovery. From office furniture to industrial equipment, our auction platform reaches buyers who pay top dollar.",
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
    id: "cleanout",
    icon: Trash2,
    title: "Estate Cleanout Services Denver",
    tagline: "Full-Service Property Clearing in Colorado",
    description: "Our complete estate cleanout service in Denver handles everything from sorting and organizing belongings to removal and cleaning. We prepare properties for sale or transition—and identify valuable items for auction to offset your cleanout costs.",
    features: [
      "Complete estate property clearing",
      "Professional sorting and organizing belongings",
      "Donation coordination to local Denver charities",
      "Proper disposal of unwanted estate items",
      "Deep cleaning services available",
      "Quick turnaround to meet your timeline",
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
    description: "Looking for junk removal in Denver? Unlike typical junk haulers, we identify valuable items during removal and auction them—often covering your junk removal costs entirely. Fast, eco-friendly junk removal with donation coordination and responsible recycling throughout the Denver metro area.",
    features: [
      "Auction valuable items to offset junk removal costs",
      "Transparent junk removal pricing with no hidden fees",
      "Heavy item, furniture, and appliance removal",
      "Recycling and donation coordination",
      "Same-day and next-day junk pickup available",
      "Serving Denver, Aurora, Lakewood, and all of Colorado",
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

const Services = () => {
  return (
    <Layout>
      <SEOHead
        title="Estate Sales & Liquidation Services Denver"
        description="Professional estate sales, estate liquidation, business liquidation, junk removal & e-commerce consignment in Denver CO. Online auction platform reaches thousands of buyers. Free consultations available."
        canonical="/services"
        keywords="estate sales Denver, estate liquidation services Colorado, business liquidation Denver, junk removal company Denver, e-commerce consignment Colorado, estate sale auctions, online estate auctions"
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
              throughout Denver and Colorado. Our online auction platform reaches thousands of buyers—often offsetting or covering your costs entirely.
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
