import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, HelpCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqGroups, allFaqs } from "@/data/faqData";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Faq = () => {
  return (
    <Layout>
      <SEOHead
        title="Estate Sale & Liquidation FAQs Denver"
        description="Answers to Denver estate sale, liquidation, cleanout & consignment questions — costs, timelines, service areas & our no-upfront-fee Revenue Recovery model."
        canonical="/faq"
        faqSchema={allFaqs}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-semibold mb-6 border border-primary-foreground/20">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Denver Estate Sale &amp; Liquidation FAQs
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Straight answers about estate sales, online auctions, business liquidation, estate cleanouts 
              &amp; e-commerce consignment across Denver and the Front Range — costs, timelines, and how our 
              no-upfront-cost Revenue Recovery model works.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Ask Us Directly — Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Groups */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {faqGroups.map((group, groupIndex) => (
            <motion.div
              key={group.heading}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className={groupIndex > 0 ? "mt-14" : ""}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                {group.heading}
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {group.items.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${groupIndex}-${i}`}
                    className="bg-card rounded-xl border border-border px-6"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Still Have Questions About Your Denver Estate?
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Every estate is different. Call David for a free, no-obligation consultation about your 
              estate sale, cleanout, or consignment needs anywhere in the Denver metro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <a href="tel:805-444-4069">
                  <Phone className="w-5 h-5" />
                  (805) 444-4069
                </a>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/contact">
                  Get Your Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Faq;
