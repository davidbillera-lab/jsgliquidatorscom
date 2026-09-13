import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Phone,
  DollarSign,
  Gavel,
  Globe,
  Trash2,
  Users,
  HelpCircle,
  Scale,
  Handshake,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import whyWorkAppraisal from "@/assets/why-work-appraisal.jpg";

const Pricing = () => {
  const costFactors = [
    { title: "Size of the estate or property", desc: "A one-bedroom downsizing is a very different job than a full family home with a basement, attic, and garage." },
    { title: "Mix of items", desc: "Auction-worthy furniture, jewelry, collectibles, or tools may generate proceeds that help you recoup part or all of your costs, but sale results vary." },
    { title: "Your timeline", desc: "A real-estate closing or emergency cleanout may need a faster crew schedule than a flexible estate settlement." },
    { title: "Cleanout scope", desc: "Donation, recycling, and disposal needs vary by property, and we plan the most cost-effective route for what remains after valuables are removed." },
    { title: "Which sales channels fit best", desc: "Online auctions, our eBay store, and e-commerce consignment each suit different items — we match every item to its highest-paying marketplace." },
  ];

  const modelPillars = [
    {
      icon: Trash2,
      title: "Cleanouts at the core",
      desc: "Most jobs start as a full or partial cleanout. We sort, catalog, and clear the property — but unlike a junk-hauling company, we hunt for value first.",
    },
    {
      icon: Gavel,
      title: "Online auction sales",
      desc: "Auction-worthy items are photographed, researched, and listed online where motivated buyers compete — typically selling within 7–10 days.",
    },
    {
      icon: Globe,
      title: "E-commerce & consignment",
      desc: "Higher-value pieces go to our eBay store and e-commerce consignment channels, reaching collectors nationwide instead of only local buyers.",
    },
    {
      icon: DollarSign,
      title: "Proceeds offset your costs",
      desc: "Cleanout work is paid upfront. Auction and e-commerce proceeds may later help you recoup some or all of that expense, but the amount is not guaranteed.",
    },
  ];

  const comparison = [
    {
      model: "Traditional estate sale companies",
      approach: "Charge a commission on an in-home weekend sale, often with setup fees and minimums.",
      downside: "Limited to local foot traffic; unsold items are still your problem afterward.",
    },
    {
      model: "Junk removal companies",
      approach: "Charge upfront flat fees by the truckload and haul everything away.",
      downside: "You pay full price — and anything valuable goes straight to the landfill.",
    },
    {
      model: "JSG Liquidators",
      approach: "Cleanout, online auctions, and e-commerce consignment in one plan, built around your property and goals.",
      downside: "Cleanout costs are paid upfront. Optional sale proceeds may help recoup that expense, with no guarantee of a specific return.",
    },
  ];

  const howToSteps = [
    {
      name: "Free walkthrough & consultation",
      text: "We walk the property with you, identify items with resale value, and discuss your goals and timeline — free and with no obligation.",
    },
    {
      name: "Custom plan & clear cost structure",
      text: "You receive an itemized plan: what goes to online auction, what fits our eBay store or e-commerce consignment, what is donated or recycled, and the upfront cost of any cleanout work.",
    },
    {
      name: "Online auctions & e-commerce sales",
      text: "Auction-worthy items are photographed, researched, and listed online — typically selling within 7–10 days — while higher-value pieces reach national buyers through e-commerce consignment.",
    },
    {
      name: "Sales settle separately, property left broom-clean",
      text: "After the upfront cleanout is completed, approved sale proceeds are settled according to your agreement. They may help recoup costs, but no amount is promised.",
    },
  ];

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How JSG Liquidators prices an estate sale, cleanout, or liquidation in Denver",
    "description": "Every job is quoted individually: a free walkthrough, clear upfront cleanout pricing when removal is included, and optional online auction or e-commerce sales whose proceeds may help recoup costs.",
    "totalTime": "P14D",
    "step": howToSteps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.name,
      "text": step.text,
    })),
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://jsgliquidators.com/#organization",
    "name": "JSG Liquidators",
    "url": "https://jsgliquidators.com/how-much-do-estate-sale-companies-charge",
    "telephone": "+1-805-444-4069",
    "email": "jsgliquidators@gmail.com",
    "priceRange": "Free consultation — custom quote per job",
    "areaServed": [
      "Denver", "Aurora", "Lakewood", "Westminster", "Arvada", "Boulder",
      "Thornton", "Centennial", "Highlands Ranch", "Castle Rock",
      "Englewood", "Littleton", "Fort Collins", "Colorado Springs",
    ].map((city) => ({ "@type": "City", "name": `${city}, CO` })),
    "makesOffer": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estate Sales" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estate Cleanouts" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Online Auctions & E-Commerce Consignment" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Liquidation" } },
    ],
  };

  const faqs = [
    {
      question: "How much do estate sale companies charge in Denver?",
      answer: "Across the industry, many estate sale companies work on commission, and some add setup fees or sale minimums. JSG Liquidators starts with a free consultation and builds a plan around your property. If a cleanout is included, its quoted cost is paid upfront. Optional auction and e-commerce proceeds may help you recoup some or all of that expense, but results are not guaranteed.",
    },
    {
      question: "Why isn't there a set price for your services?",
      answer: "Because no two estates are alike. A condo downsizing, a full family home, and a commercial liquidation each need a different mix of cleanout labor, auction management, and e-commerce consignment. A flat rate would overcharge some clients and underserve others. Instead, we walk the property with you, discuss your goals and timeline, and give you a clear, itemized plan before any work begins.",
    },
    {
      question: "What happens after the free walkthrough?",
      answer: "After the walkthrough you'll receive a custom plan: what's worth selling at auction, what belongs in our eBay store or e-commerce consignment, what can be donated or recycled, and what needs disposal. The plan includes estimated timelines and the upfront price of any cleanout work. You approve it before work starts.",
    },
    {
      question: "How long does the process take?",
      answer: "Most estates move from signed agreement to broom-clean in 7–14 days. Online auctions typically run 7–10 days, and the cleanout is scheduled around the auction close and buyer pickup. Need it faster? We offer expedited timelines for real estate closings, probate deadlines, and other urgent situations.",
    },
    {
      question: "What sales options are available?",
      answer: "We match each item to the channel that returns the most: online estate auctions for volume and speed, our eBay store and e-commerce consignment for higher-value collectibles and specialty pieces, and direct liquidation for business equipment. Most clients use a combination, and we strategize with you to decide which channels make sense for your property.",
    },
    {
      question: "Can sale proceeds help me recoup my upfront cleanout cost?",
      answer: "They may. With your approval, items with resale potential can be sold through online auctions or our eBay store. Your proceeds are settled according to the agreement and may help you recoup some or all of the upfront cleanout cost. The amount depends on what sells and for how much, so no result is guaranteed.",
    },
    {
      question: "What's the difference between your auction sales and e-commerce consignment?",
      answer: "Online auctions move a large volume of items quickly — most sell within 7–10 days to competitive bidders. E-commerce consignment through our eBay store suits higher-value pieces that benefit from a national or global buyer pool and a set asking price. During your consultation we recommend the right channel for each category of items, and many estates use both.",
    },
    {
      question: "Do you charge for the initial consultation?",
      answer: "No. Consultations are free and carry no obligation. We'll assess the property, identify items with resale value, discuss whether auction, e-commerce consignment, or a combination fits best, and lay out a clear plan with costs and expected offsets before you commit to anything.",
    },
    {
      question: "What if my estate has more junk than valuables?",
      answer: "That's common, and it's exactly why we start with a walkthrough. We'll tell you honestly what has value and what doesn't. Even a few good finds can meaningfully offset cleanout costs, and we'll recommend the most economical path — donation, recycling, or disposal — for everything that remains.",
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="How Much Do Estate Sale Companies Charge in Denver?"
        description="Denver estate sale pricing varies by job. JSG provides custom plans, clear upfront cleanout pricing, and optional auction or e-commerce sales."
        canonical="/how-much-do-estate-sale-companies-charge"
        keywords="how much do estate sale companies charge, estate sale cost Denver, estate sale commission, estate liquidation cost, estate cleanout pricing Denver, estate sale company fees"
        faqSchema={faqs}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Estate Sale Costs", url: "/how-much-do-estate-sale-companies-charge" },
        ]}
      />
      <Helmet>
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Denver" />
        <meta name="geo.position" content="39.7392;-104.9903" />
        <meta name="ICBM" content="39.7392, -104.9903" />
        <script type="application/ld+json">{JSON.stringify(howToJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={whyWorkAppraisal}
            alt="Estate sale professional appraising antiques and valuables during a free Denver consultation"
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
            width={1600}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" aria-hidden="true" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              How Much Do Estate Sale Companies Charge in Denver?
            </h1>
            <p className="speakable-summary text-lg text-foreground/90 mb-8">
              <strong>The honest answer:</strong> every estate is different, so a set price rarely fits. We build a custom plan around your property. If a cleanout is involved, its quoted cost is always paid upfront. Auction and e-commerce proceeds may help you recoup some or all of that expense, but no result is guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="accent" size="lg">
                <Link to="/contact">Get a Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:805-444-4069">
                  <Phone className="w-4 h-4 mr-2" />
                  (805) 444-4069
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why no set price */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Why There's No One-Size-Fits-All Price
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-4xl">
              Any company that quotes a flat rate sight-unseen is guessing. The right cost structure depends on what's actually in the property and what you want out of the process. Here's what shapes a fair quote:
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
              {costFactors.map((factor, index) => (
                <div key={index} className="bg-background rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    {factor.title}
                  </h3>
                  <p className="text-muted-foreground pl-8">{factor.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 rounded-lg p-6 mt-8 max-w-5xl">
              <p className="text-foreground font-medium flex items-start gap-3">
                <Handshake className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <span>
                  <strong>We strategize with you first.</strong> Every JSG engagement starts with a free walkthrough and a conversation about your goals — maximizing proceeds, clearing a property fast for a sale, or both. Then we recommend the mix of services that fits you best, with clear costs upfront.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our model */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Our Model: Cleanouts With Built-In Revenue Recovery
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We quote and collect the cleanout cost upfront, then help you decide whether online auction, e-commerce consignment, or both could recover value from approved items.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {modelPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary rounded-xl p-8"
              >
                <pillar.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="accent" size="lg">
              <Link to="/services/estate-cleanouts">See How Our Cleanouts Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              How It Works: From Walkthrough to Broom-Clean
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Most Denver estates move through these four steps in 7–14 days.
            </p>
          </motion.div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto list-none p-0">
            {howToSteps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold mb-4">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.name}</h3>
                <p className="text-muted-foreground text-sm">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 text-center">
              How the Options Compare
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-12">
              Understanding how each type of company charges helps you compare quotes fairly.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {comparison.map((col, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-8 ${index === 2 ? "bg-primary/10 border-2 border-primary" : "bg-background"}`}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    {index === 2 && <Scale className="w-5 h-5 text-primary" />}
                    {col.model}
                  </h3>
                  <p className="text-foreground/90 mb-4">{col.approach}</p>
                  <p className={`text-sm ${index === 2 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                    {col.downside}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 text-center flex items-center justify-center gap-3">
              <HelpCircle className="w-8 h-8 text-primary" />
              Estate Sale Cost FAQs
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Find Out What Your Estate Could Return
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every plan starts with a free, no-obligation consultation. We'll walk the property, explain the upfront cleanout cost when applicable, identify items with resale potential, and recommend the right mix of auction and e-commerce services. Serving Denver, Aurora, Lakewood, Arvada, Westminster, Boulder, and the entire Front Range.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="accent" size="lg">
                <Link to="/contact">Schedule Your Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/why-work-with-us">Why Families Choose JSG</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
