import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Star, CheckCircle2, Gavel, ShoppingCart, Building2, Trash2, Truck, MapPin, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import heroImage from "@/assets/hero-estate-sale.jpg";

const services = [
  {
    icon: Gavel,
    title: "Estate Sale Auctions",
    description: "Maximize your estate's value with our professional online auction platform reaching thousands of buyers.",
    href: "/services#auctions",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Consignment",
    description: "We handle listing, selling, and shipping your valuable items on major marketplaces.",
    href: "/services#consignment",
  },
  {
    icon: Building2,
    title: "Business Liquidation",
    description: "Complete business asset liquidation with expert valuation and maximum returns.",
    href: "/services#business",
  },
  {
    icon: Trash2,
    title: "Estate Cleanout",
    description: "Full property cleanout services to prepare homes for sale or transition.",
    href: "/services#cleanout",
  },
  {
    icon: Truck,
    title: "Junk Removal",
    description: "Efficient, eco-friendly removal of unwanted items with donation coordination.",
    href: "/services#junk",
  },
];

const testimonials = [
  {
    name: "Margaret H.",
    location: "Highlands Ranch, CO",
    text: "JSG Liquidators made the overwhelming task of handling my mother's estate so much easier. Professional, compassionate, and they got great prices at auction.",
    rating: 5,
  },
  {
    name: "Robert & Susan K.",
    location: "Castle Rock, CO",
    text: "We used their business liquidation service when closing our store. They handled everything and we received more than we expected. Highly recommend!",
    rating: 5,
  },
  {
    name: "Jennifer M.",
    location: "Denver, CO",
    text: "The team was respectful of our family's memories while being incredibly efficient. The online auction brought buyers from across the country.",
    rating: 5,
  },
];

const serviceAreas = ["Highlands Ranch", "Denver", "Castle Rock", "Englewood", "Littleton"];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Home"
        description="JSG Liquidators - Colorado's trusted estate liquidation experts. Estate sale auctions, consignment, business liquidation & cleanout services in Denver, Highlands Ranch, Castle Rock. Auction proceeds can offset your costs."
        canonical="/"
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Professional estate sale with antique furniture and collectibles in Colorado"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary-foreground/90 text-primary rounded-full text-sm font-semibold mb-6 shadow-lg">
                Colorado's Trusted Estate Liquidation Experts
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight"
            >
              Denver's Trusted Estate Sale &amp; Liquidation Experts
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-primary-foreground/90 mb-4 leading-relaxed"
            >
              Professional estate liquidation services serving the Denver Metro Area. 
              From estate sale auctions to complete cleanouts, we handle everything with care and expertise.
            </motion.p>

            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Get Your Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <a href="tel:805-444-4069">
                  <Phone className="w-5 h-5" />
                  David (805) 444-4069
                </a>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <a href="tel:805-340-4817">
                  <Phone className="w-5 h-5" />
                  Vinnie (805) 340-4817
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-2 text-primary-foreground/80 text-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Serving:</span>
              {serviceAreas.map((area, i) => (
                <span key={area}>
                  {area}{i < serviceAreas.length - 1 ? "," : ""}
                </span>
              ))}
              <span>& surrounding areas</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
              Complete Estate Liquidation Services
            </h2>
            <p className="text-lg text-muted-foreground">
              From valuable antiques to everyday items, we have the expertise and resources to maximize the value of your estate.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <Link
                  to={service.href}
                  className="group block h-full p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:text-accent transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg">
              <Link to="/services">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-6">
                Zero Risk, Maximum Return
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We understand that liquidating an estate can be overwhelming. That's why we've built our 
                business around making the process stress-free for you.
              </p>
              
              <div className="space-y-4">
                {[
                  "Auction proceeds can offset or cover your costs",
                  "Free property evaluation and consultation",
                  "Professional handling of all items",
                  "Transparent pricing and reporting",
                  "Nationwide buyer network through online auctions",
                  "Compassionate service during difficult times",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button asChild variant="accent" size="lg">
                  <Link to="/about">
                    Learn Our Story
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-primary rounded-2xl p-8 lg:p-12 text-primary-foreground">
                <h3 className="text-2xl font-display font-bold mb-6">Ready to Get Started?</h3>
                <p className="text-primary-foreground/80 mb-8">
                  Contact us today for a free, no-obligation consultation. We'll evaluate your estate 
                  and recommend the best approach to maximize your returns.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:805-444-4069"
                    className="flex items-center gap-3 text-lg font-semibold hover:text-accent transition-colors"
                  >
                    <Phone className="w-6 h-6" />
                    David (805) 444-4069
                  </a>
                  <a
                    href="tel:805-340-4817"
                    className="flex items-center gap-3 text-lg font-semibold hover:text-accent transition-colors"
                  >
                    <Phone className="w-6 h-6" />
                    Vinnie (805) 340-4817
                  </a>
                  <Button asChild variant="hero" size="lg" className="w-full">
                    <Link to="/contact">Request Free Consultation</Link>
                  </Button>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              We take pride in treating every estate with the care and respect it deserves.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-xl p-8 border border-border"
              >
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              Ready to Maximize Your Estate's Value?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Get a free consultation and discover how we can help you achieve the best possible results. 
              Our auction services can help offset or even cover your service costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <a
                  href="https://denveronlineauctions.com/marketplace/jsg-estate-liquidation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Current Auctions
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
