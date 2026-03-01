import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, CheckCircle2, Users, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

const serviceAreas = [
  { name: "Highlands Ranch", description: "Serving families throughout Highlands Ranch and Douglas County" },
  { name: "Denver", description: "Complete coverage of Denver metro neighborhoods" },
  { name: "Castle Rock", description: "Expert service for Castle Rock and surrounding areas" },
  { name: "Englewood", description: "Trusted partner for Englewood residents and businesses" },
  { name: "Littleton", description: "Comprehensive service throughout Littleton" },
];

const values = [
  {
    icon: Users,
    title: "Family First",
    description: "We understand that every estate tells a story. Our team treats your belongings with the same care and respect we'd give our own family's treasures.",
  },
  {
    icon: Award,
    title: "Expert Knowledge",
    description: "With years of experience in estate sales, antiques, and collectibles, we know how to identify value and reach the right buyers.",
  },
  {
    icon: Heart,
    title: "Compassionate Service",
    description: "Whether you're downsizing, managing a loved one's estate, or handling a difficult transition, we provide support every step of the way.",
  },
];

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

const About = () => {
  return (
    <Layout>
      <SEOHead
        title="About Us"
        description="Learn about JSG Liquidators - Colorado's trusted estate liquidation company serving Denver, Highlands Ranch, Castle Rock, Englewood, and Littleton. Professional, compassionate service."
        canonical="/about"
        keywords="about JSG Liquidators, estate liquidation company Denver, estate sale experts Colorado, Denver estate sale company, trusted liquidators Colorado"
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
              Colorado's Estate Liquidation Experts
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Helping families and businesses maximize the value of their estates with 
              professional, compassionate service since day one.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                Built on Trust, Driven by Results
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  JSG Liquidators was founded with a simple mission: to help Colorado families and 
                  businesses navigate the often overwhelming process of estate liquidation with 
                  professionalism, transparency, and care.
                </p>
                <p>
                  We've seen firsthand how stressful it can be to manage an estate, whether due to 
                  the loss of a loved one, downsizing, or closing a business. That's why we've built 
                  our company around making this process as smooth as possible for our clients.
                </p>
                <p>
                  Our auction services can help offset or even cover your service costs. We're fully 
                  invested in maximizing value for you — the better your items sell, the more you save.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-secondary rounded-xl border-l-4 border-accent">
                <p className="text-lg font-display font-semibold text-foreground mb-2">
                  "Our auction services can offset or even cover your service costs."
                </p>
                <p className="text-sm text-muted-foreground">
                  Our commitment to you
                </p>
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
                <h3 className="text-2xl font-display font-bold mb-8">Why Clients Choose Us</h3>
                <div className="space-y-6">
                  {[
                    "Auction proceeds can offset your costs",
                    "Complete transparency throughout the process",
                    "Nationwide buyer network through online auctions",
                    "Expert valuation of antiques and collectibles",
                    "Comprehensive services from auction to cleanout",
                    "Compassionate handling of family estates",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <span className="text-primary-foreground/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              What Guides Everything We Do
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-xl p-8 border border-border text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Areas */}
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
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Service Areas</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              Proudly Serving the Denver Metro Area
            </h2>
            <p className="text-lg text-muted-foreground">
              We provide comprehensive estate liquidation services throughout the greater Denver area 
              and surrounding communities.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {serviceAreas.map((area) => (
              <motion.div
                key={area.name}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                      {area.name}, CO
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="bg-primary rounded-xl p-6 text-primary-foreground"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold mb-1">
                    & Surrounding Areas
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    Don't see your area? Contact us — we likely serve your community too.
                  </p>
                </div>
              </div>
            </motion.div>
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
              Ready to Work Together?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Contact us today for a free, no-obligation consultation. We're here to help you 
              navigate your estate liquidation with confidence.
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
                  (805) 444-4069
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
