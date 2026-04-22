import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Star, CheckCircle2, Gavel, ShoppingCart, Building2, Trash2, Truck, MapPin, Quote, Recycle, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import heroImage from "@/assets/hero-estate-sale.jpg";

// Shared CTA style for inline "Read the full guide" links — white text on primary blue
const guideLinkClass =
  "inline-flex items-center gap-2 mt-3 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200";

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

const serviceAreas = [
  { name: "Denver", slug: "denver" },
  { name: "Aurora", slug: "aurora" },
  { name: "Lakewood", slug: "lakewood" },
  { name: "Highlands Ranch", slug: "highlands-ranch" },
  { name: "Castle Rock", slug: "castle-rock" },
  { name: "Englewood", slug: "englewood" },
  { name: "Littleton", slug: "littleton" },
  { name: "Colorado Springs", slug: "colorado-springs" },
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

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Home"
        description="Denver's #1 estate sale company & estate liquidation experts. Professional estate sales, business liquidation, junk removal, and e-commerce consignment throughout Colorado. Online auctions offset your costs. Free consultations."
        canonical="/"
        keywords="estate sales Denver, estate liquidation Denver CO, business liquidation Colorado, junk removal Denver, e-commerce consignment, estate sale auctions, estate cleanout services, online auctions Denver, estate sale company Colorado"
        breadcrumbs={[{ name: "Home", url: "/" }]}
        faqSchema={[
          { question: "What do I do with all my parents' stuff?", answer: "Keep what's meaningful, sell what has value, donate what helps others, and remove the rest. JSG Liquidators handles the entire process — sorting, AI-assisted appraisal, online auction sales, donation coordination, and final cleanout — typically with no upfront cost because auction proceeds offset the service." },
          { question: "How do I clear out a house after someone dies?", answer: "Secure important documents and heirlooms, let family choose keepsakes, sell the remaining contents through an estate auction, then complete a full cleanout. JSG Liquidators manages this entire 4-step process for Denver and Front Range families in 7–14 days, using online auction proceeds to offset cleanout costs." },
          { question: "Who buys estate items and removes the junk?", answer: "JSG Liquidators sells your items to the highest bidder through our online auction platform and e-commerce consignment, reaching buyers nationwide for higher returns than a single cash offer. After the auction, we remove unsold items, coordinate donations with Colorado charities, recycle, and haul junk — leaving the property broom-clean." },
          { question: "How much does an estate sale or liquidation cost in Denver?", answer: "JSG Liquidators works on a commission basis — there are no upfront fees. We take a percentage of total auction sales, so our interests are fully aligned with maximizing your returns. Many clients find that auction proceeds offset or completely cover their cleanout and service costs." },
          { question: "How long does the estate liquidation process take?", answer: "Most estate liquidations are completed within 7–14 days from initial consultation to final cleanout. This includes item cataloging, professional photography, online auction listing, and property clearing." },
          { question: "What items sell best at estate auctions in Colorado?", answer: "Antiques, vintage collectibles, fine art, jewelry, mid-century modern furniture, power tools, Western art, Native American pieces, and specialty items consistently achieve strong prices at our Denver estate auctions." },
          { question: "Do you handle the entire estate cleanout after the auction?", answer: "Yes — JSG Liquidators offers complete estate cleanout and junk removal after every auction. We handle donation coordination with local Colorado charities, responsible recycling, and proper disposal of remaining items." },
          { question: "What areas of Colorado do you serve?", answer: "We serve the entire Denver metro area and Front Range, including Denver, Aurora, Lakewood, Highlands Ranch, Castle Rock, Englewood, Littleton, Thornton, Westminster, Arvada, Centennial, Boulder, Fort Collins, and Colorado Springs." },
          { question: "How is JSG Liquidators different from a traditional estate sale company?", answer: "JSG Liquidators uses an online-only auction format that reaches thousands of collectors, dealers, and buyers nationwide — typically achieving higher prices than in-person estate sales limited to local foot traffic." },
          { question: "How do estate sales work in Denver?", answer: "A modern Denver estate sale follows 7 steps: (1) free in-home walkthrough, (2) signed commission agreement with no upfront fees, (3) sorting and AI-assisted cataloging, (4) professional photography and online listing, (5) a 7–10 day online auction reaching nationwide buyers, (6) a supervised buyer pickup day, and (7) a final broom-clean cleanout. The full cycle averages 12–14 days for a typical 3-bedroom home in the Denver Metro area or Front Range." },
          { question: "What is the difference between an estate sale and a cleanout?", answer: "An estate sale sells the contents of a home for cash through an auction or marketplace. A cleanout empties the home of everything remaining — no selling involved. A pure cleanout costs $3,500–$8,000 out of pocket, while a full estate liquidation (sale plus cleanout combined) typically generates more than enough auction revenue to cover the cleanout cost, leaving the family with a check rather than a bill." },
          { question: "What happens to unsold items after an estate sale?", answer: "After a JSG Liquidators auction, unsold items follow four paths: (1) higher-value lots are pulled for our second-chance e-commerce consignment program on eBay, LiveAuctioneers, and Etsy, (2) usable items are donated to local Colorado charities including ARC Thrift, Goodwill, Habitat ReStore, and Denver Rescue Mission, (3) electronics, metals, and recyclables are routed to Denver-area recycling facilities, and (4) only true trash is hauled to a transfer station — leaving the home broom-clean. Less than 15% of contents typically reach a landfill." },
        ]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Professional estate sale auction with antique furniture, collectibles, and valuables being liquidated in Denver Colorado"
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
              <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold mb-6 shadow-lg">
                Colorado's Trusted Estate Liquidation Experts
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight"
            >
              Denver's Trusted Estate and Business Liquidation Experts
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

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg md:text-xl font-semibold text-white mb-6 leading-relaxed"
            >
              We handle everything: estate sales, liquidation, cleanouts, and online resale—so you don't have to.
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
                <Link key={area.slug} to={`/areas/${area.slug}`} className="hover:text-accent underline-offset-2 hover:underline transition-colors">
                  {area.name}{i < serviceAreas.length - 1 ? "," : ""}
                </Link>
              ))}
              <span>& surrounding areas</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Differentiator Section — "We Do Both" */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">The JSG Difference</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-5">
              We Maximize Value First, Then Clear Everything Else
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Most companies force you to choose between two bad options. We're the only Denver liquidator that does both — under one roof, one timeline, one phone call.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {/* Most companies — Sell only */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-7 opacity-90"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-4">
                Most Companies
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Sell the Stuff → Leave the Mess</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Traditional estate sale companies run a weekend sale, take their commission, and hand you back a half-empty house. <strong className="text-foreground">You're left calling junk haulers.</strong>
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-destructive mt-1">✕</span> Auction or sale only</li>
                <li className="flex items-start gap-2"><span className="text-destructive mt-1">✕</span> No cleanout included</li>
                <li className="flex items-start gap-2"><span className="text-destructive mt-1">✕</span> Family pays $3,500–$8,000 extra</li>
              </ul>
            </motion.div>

            {/* Junk haulers — Junk only */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-7 opacity-90"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-4">
                Or Worse
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Remove the Junk → Throw Away Value</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Junk haulers show up with a truck and load everything into it — antiques, collectibles, and tools end up at the dump alongside the trash. <strong className="text-foreground">You pay them to throw away your money.</strong>
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-destructive mt-1">✕</span> No appraisal or auction</li>
                <li className="flex items-start gap-2"><span className="text-destructive mt-1">✕</span> Valuables go to the landfill</li>
                <li className="flex items-start gap-2"><span className="text-destructive mt-1">✕</span> Family pays $4,000–$10,000</li>
              </ul>
            </motion.div>

            {/* JSG — Both */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-7 shadow-2xl md:scale-105 md:-my-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider mb-4">
                ★ The JSG Way
              </div>
              <h3 className="text-xl font-display font-bold text-primary-foreground mb-3">We Do Both</h3>
              <p className="text-primary-foreground/90 leading-relaxed mb-4">
                AI-powered auction sells every item with real value at maximum prices. Then our crew handles donations, recycling, and the final cleanout. <strong className="text-accent">Auction proceeds typically cover the entire service.</strong>
              </p>
              <ul className="space-y-2 text-sm text-primary-foreground/90">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> AI-cataloged online auction (nationwide buyers)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Full broom-clean cleanout included</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /> Typically $0 out of pocket</li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">
                Get Your Free Walkthrough
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
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

      {/* Estate Cleanout Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Full-Service Property Clearing</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-6">
                Estate Clean Out Services in Denver
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                When you're facing the overwhelming task of clearing out a loved one's home or preparing a property for sale, 
                JSG Liquidators provides compassionate, efficient estate cleanout services throughout the Denver Metro Area and Colorado Front Range.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Unlike traditional estate cleanout companies that charge flat fees regardless of item value, our unique 
                auction-backed model means we first identify and sell valuable items—potentially offsetting or even covering 
                your cleanout costs entirely. It's a smarter approach to estate transitions.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Home, text: "Complete home clearing" },
                  { icon: DollarSign, text: "Auction proceeds offset costs" },
                  { icon: Recycle, text: "Eco-friendly disposal" },
                  { icon: Truck, text: "Same-week service available" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/services#cleanout">
                    Learn About Cleanouts
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/blog/estate-liquidation-guide-everything-you-need-to-know">
                    Read Our Complete Guide
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
              <img
                src="/blog-images/estate-liquidation-workflow.webp"
                alt="Professional estate cleanout service sorting items in a Denver Colorado home"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-lg border border-border max-w-xs">
                <p className="text-sm text-muted-foreground mb-2">Serving Colorado</p>
                <p className="font-display font-bold text-foreground">Highlands Ranch • Denver • Castle Rock • Littleton</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Junk Removal Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2 lg:order-1 relative"
            >
              <img
                src="/blog-images/estate-liquidation-sorting.webp"
                alt="Junk removal and donation sorting services in Colorado - items being organized for recycling and charity"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -top-6 -right-6 bg-accent rounded-xl p-6 shadow-lg max-w-xs">
                <p className="font-display font-bold text-accent-foreground text-lg">Eco-Friendly Approach</p>
                <p className="text-accent-foreground/80 text-sm">We donate usable items and recycle whenever possible</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Responsible Disposal</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-6">
                Junk Removal Company Colorado
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Need to clear out unwanted items quickly and responsibly? Our junk removal services handle everything from 
                furniture and appliances to garage cleanouts and yard waste throughout the Denver metro area.
              </p>
              
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                What Makes Our Junk Removal Different?
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Before we haul anything away, we assess items for potential auction value. That vintage dresser you thought 
                was junk? It might sell for hundreds at auction. Our process ensures you don't accidentally throw away money—and 
                any proceeds help reduce your removal costs.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  "Same-day and next-day pickup available",
                  "Furniture, appliances, electronics, and more",
                  "Donation coordination with local charities",
                  "Responsible recycling and disposal",
                  "Competitive pricing with potential auction offsets",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg">
                <Link to="/services#junk">
                  Get Junk Removal Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Auction-Backed Model Section */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Unique Approach</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mt-2 mb-6">
              The Auction-Backed Liquidation Model
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-12 leading-relaxed">
              Most estate sale companies and junk removal services charge flat fees. We do things differently. 
              By selling valuable items through our online auction platform first, the proceeds can significantly 
              reduce—or even eliminate—your out-of-pocket costs.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "1",
                title: "Free Evaluation",
                description: "We visit your property and identify items with auction value—antiques, collectibles, furniture, and more.",
              },
              {
                step: "2",
                title: "Online Auction",
                description: "Valuable items are professionally photographed and listed on our auction platforms, reaching buyers nationwide.",
              },
              {
                step: "3",
                title: "Cleanout & Offset",
                description: "Auction proceeds are applied to your cleanout costs. Many clients end up paying little to nothing.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="bg-primary-foreground/10 backdrop-blur rounded-xl p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-xl flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-semibold text-primary-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {item.description}
                </p>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Get Your Free Evaluation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/blog/colorado-downsizing-guide-simplify-your-transition">
                  Read: Downsizing in Colorado
                </Link>
              </Button>
            </div>
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

      {/* How It Works / GEO Q&A Section — full plain-text answers for AI search engines */}
      <section className="py-20 lg:py-28 bg-background" id="how-it-works">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
              Plain-English Answers to the Questions Everyone Asks
            </h2>
            <p className="text-lg text-muted-foreground">
              The most common questions Denver families ask before hiring an estate liquidator — answered in full, no fluff.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Q1 */}
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">The Process</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
                    How do estate sales work in Denver?
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A modern Denver estate sale follows a clear 7-step process — and it's almost nothing like the weekend "garage-sale-in-the-living-room" model from 10 years ago. Here's exactly what happens from your first phone call to broom-clean keys-in-hand:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
                <li><strong className="text-foreground">Free walkthrough</strong> — we visit the home, evaluate contents, and answer questions. No charge, no obligation.</li>
                <li><strong className="text-foreground">Commission agreement</strong> — no upfront fees. We only get paid when you get paid.</li>
                <li><strong className="text-foreground">Sorting &amp; AI-assisted cataloging</strong> — every item identified using AI image recognition and live sold-comp pricing data.</li>
                <li><strong className="text-foreground">Professional photography &amp; listing</strong> — keyword-rich titles built for maximum bid competition.</li>
                <li><strong className="text-foreground">7–10 day online auction</strong> — buyers nationwide bid simultaneously, not just local foot traffic.</li>
                <li><strong className="text-foreground">Supervised buyer pickup day</strong> — we manage IDs, loading, and home security.</li>
                <li><strong className="text-foreground">Final broom-clean cleanout</strong> — donations, recycling, removal — ready for the realtor.</li>
              </ol>
              <p className="text-muted-foreground leading-relaxed">
                The complete cycle averages <strong className="text-foreground">12–14 days</strong> for a typical 3-bedroom home in Denver, Aurora, Lakewood, Highlands Ranch, or anywhere on the Front Range.{" "}
                <Link to="/blog/how-estate-sales-work-denver-colorado" className={guideLinkClass}>
                  Read the full step-by-step guide <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </motion.article>

            {/* Q2 */}
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">The Money</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
                    Estate sale vs. cleanout — what's the difference?
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                These get confused all the time, and choosing wrong can cost you thousands. Here's the simple breakdown:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-primary" /> Estate Sale
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Sells</strong> the contents of a home for cash via online auction. Goal: maximize return on furniture, antiques, tools, jewelry, and collectibles. Modern Denver estate sales are run online — not as in-person weekend events.
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                  <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-primary" /> Cleanout
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Empties</strong> the home — no selling involved. Goal: a "broom-clean" property ready for sale or rental. Pure cleanouts cost <strong className="text-foreground">$3,500–$8,000 out of pocket</strong>.
                  </p>
                </div>
              </div>
              <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-5 mb-4">
                <p className="text-foreground leading-relaxed">
                  <strong>The big difference is your wallet:</strong> a full liquidation (sale + cleanout combined) typically generates <strong>$8,000–$25,000+</strong> in auction revenue, which offsets — and usually completely covers — the cleanout cost. You walk away with a check instead of a bill.
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Paying for a pure cleanout when there are sellable contents inside is the single biggest mistake we see Colorado families make.{" "}
                <Link to="/blog/estate-sale-vs-cleanout-whats-the-difference" className={guideLinkClass}>
                  Read the full comparison guide <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </motion.article>

            {/* Q3 */}
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">After the Auction</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
                    What happens to unsold items after an estate sale?
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                After a JSG auction closes, unsold items follow four paths — and less than 15% of a typical Denver estate's contents ever reaches a landfill:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Second-Chance Consignment</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Higher-value items go to our e-commerce program on eBay, LiveAuctioneers, and Etsy — recovering an extra 15–25% of value.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Donation</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Usable items go to ARC Thrift, Goodwill of Colorado, Habitat ReStore, Denver Rescue Mission, and local VFW posts.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Recycling</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Electronics, metals, mattresses, batteries, and cardboard routed to certified Denver-area recycling facilities.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Final Removal</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Only true trash is hauled to a transfer station. Home is left broom-clean — ready for the realtor the next day.</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                For most clients, the entire post-auction cleanout costs <strong className="text-foreground">nothing extra</strong> — it's funded by the auction commission.{" "}
                <Link to="/blog/what-happens-to-unsold-items-after-estate-sale" className={guideLinkClass}>
                  Read the full post-auction guide <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Common Questions</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
              Estate Liquidation FAQs
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about working with JSG Liquidators.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: "What do I do with all my parents' stuff?",
                  a: "Start by taking a breath — you don't have to figure it out alone. Most families in Colorado follow a simple path: keep what's meaningful, sell what has value, donate what helps others, and recycle or remove the rest. JSG Liquidators handles the entire process for you. We sort, catalog with AI-assisted appraisal, photograph, and sell valuable items through our online auction platform that reaches buyers nationwide. Anything that doesn't sell is donated to local Colorado charities, recycled, or removed — leaving the home broom-clean. Because we work on commission, there are typically no upfront costs to you, and auction proceeds often cover the entire service."
                },
                {
                  q: "How do I clear out a house after someone dies?",
                  a: "Clearing out a house after a loved one passes usually takes 4 steps: (1) secure important documents, photos, and heirlooms first; (2) let family members choose sentimental keepsakes; (3) have the remaining contents professionally appraised and sold through an estate auction; (4) complete a full cleanout of anything left behind. JSG Liquidators manages steps 2–4 for Denver and Front Range families, typically completing the entire process in 7–14 days. Our 'Auction-Backed Cleanout' model uses online auction proceeds to offset — and often completely cover — the cost of the cleanout, so families aren't paying out of pocket during an already difficult time."
                },
                {
                  q: "Who buys estate items and removes the junk?",
                  a: "JSG Liquidators is a one-stop Denver estate company that does both. We buy nothing directly — instead, we sell your items to the highest bidder through our online auction platform and e-commerce consignment service, which reaches thousands of collectors, dealers, and buyers across the country. This almost always nets more than a cash offer from a single buyer. After the auction closes, our team returns to remove all unsold items, coordinate donations with local Colorado charities, recycle responsibly, and haul away remaining junk. You get one trusted company, one timeline, and one final broom-clean property — no juggling auctioneers, thrift store runs, and junk haulers separately."
                },
                {
                  q: "How much does an estate sale or liquidation cost in Denver?",
                  a: "JSG Liquidators works on a commission basis — there are no upfront fees. We take a percentage of total auction sales, so our interests are fully aligned with maximizing your returns. Many clients find that auction proceeds offset or completely cover their cleanout and service costs. Contact us for a free consultation and custom quote."
                },
                {
                  q: "How long does the estate liquidation process take?",
                  a: "Most estate liquidations are completed within 7–14 days from initial consultation to final cleanout. This includes item cataloging, professional photography, online auction listing, and property clearing. Larger estates or specialty collections may take slightly longer, but we always work around your timeline."
                },
                {
                  q: "What items sell best at estate auctions in Colorado?",
                  a: "Antiques, vintage collectibles, fine art, jewelry, mid-century modern furniture, power tools, Western art, Native American pieces, and specialty items consistently achieve strong prices at our Denver estate auctions. Our AI-assisted cataloging helps identify hidden value in items you might overlook."
                },
                {
                  q: "Do you handle the entire estate cleanout after the auction?",
                  a: "Yes — JSG Liquidators offers complete estate cleanout and junk removal after every auction. We handle donation coordination with local Colorado charities, responsible recycling, and proper disposal of remaining items. We leave properties broom-clean and ready for sale or transition."
                },
                {
                  q: "What areas of Colorado do you serve?",
                  a: "We serve the entire Denver metro area and Front Range, including Denver, Aurora, Lakewood, Highlands Ranch, Castle Rock, Englewood, Littleton, Thornton, Westminster, Arvada, Centennial, Boulder, Fort Collins, and Colorado Springs. Don't see your area? Contact us — we likely serve your community too."
                },
                {
                  q: "Can you sell my valuable items online through e-commerce consignment?",
                  a: "Absolutely. Our e-commerce consignment service lists your antiques, collectibles, and specialty items on eBay, Etsy, LiveAuctioneers, and other specialty marketplaces. We handle professional photography, listing creation, buyer communication, secure packaging, and worldwide shipping — you simply receive the proceeds."
                },
                {
                  q: "How is JSG Liquidators different from a traditional estate sale company?",
                  a: "Traditional estate sales are held in-person over a weekend, limiting buyers to local foot traffic. JSG Liquidators uses an online-only auction format that reaches thousands of collectors, dealers, and buyers nationwide — typically achieving higher prices. We also offer AI-assisted cataloging, e-commerce consignment for premium items, and a full cleanout service, making us a complete one-stop solution."
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-6">
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mt-10"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                View All Services &amp; FAQs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
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
