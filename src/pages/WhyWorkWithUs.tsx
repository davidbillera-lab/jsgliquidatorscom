import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Phone, 
  Mail, 
  Globe, 
  MessageSquare,
  DollarSign,
  Shield,
  Leaf,
  MapPin,
  Clock,
  Star,
  Users,
  HelpCircle
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import whyWorkHero from "@/assets/why-work-hero.jpg";
import whyWorkAppraisal from "@/assets/why-work-appraisal.jpg";
import whyWorkAuction from "@/assets/why-work-auction.jpg";
import whyWorkColorado from "@/assets/why-work-colorado.jpg";

const WhyWorkWithUs = () => {
  const cleanOutServices = [
    "Complete property assessment: We evaluate every room, basement, attic, and garage to identify valuable items worth auctioning",
    "Systematic sorting and cataloging: Items are categorized for auction, donation, recycling, or disposal",
    "Professional packing and removal: Fragile items receive proper protection during transport",
    "Deep cleaning coordination: We work with trusted cleaning partners to leave properties market-ready",
    "Documentation and receipts: Full transparency on all items removed and their disposition"
  ];

  const junkRemovalFeatures = [
    "No upfront costs: You pay nothing until valuable items are identified and auctioned",
    "Revenue sharing model: Auction proceeds offset removal costs, often resulting in net profit",
    "Environmentally responsible: Items go to new homes instead of landfills",
    "Licensed and insured: Full protection for your property and peace of mind",
    "Same-day availability: Emergency clean outs handled quickly and professionally"
  ];

  const valuableFinds = [
    "Antique furniture",
    "Vintage jewelry",
    "Collectibles",
    "Artwork",
    "Tools",
    "Electronics",
    "Musical instruments",
    "China sets",
    "Specialty sporting equipment"
  ];

  const auctionProcess = [
    { step: "Initial assessment", desc: "Our team identifies potentially valuable items during the clean out walkthrough" },
    { step: "Professional photography", desc: "Valuable pieces receive high-quality photos for maximum auction appeal" },
    { step: "Research and pricing", desc: "We determine fair market values and set appropriate starting bids" },
    { step: "Online auction listing", desc: "Items go live on our established auction platform with detailed descriptions" },
    { step: "Sale completion", desc: "Winning bidders handle pickup or arrange shipping" },
    { step: "Revenue distribution", desc: "Auction proceeds are applied to clean out costs, with surplus returned to clients" }
  ];

  const whyChooseUs = [
    { icon: Clock, title: "Stress-free process from start to finish", desc: "Estate clean outs are emotionally challenging enough without worrying about logistics, costs, and disposal. We handle every detail while keeping you informed throughout the entire process." },
    { icon: DollarSign, title: "Transparent pricing with no hidden fees", desc: "You know exactly what you're paying before we begin work. Our revenue-sharing model means you often pay nothing out-of-pocket." },
    { icon: MapPin, title: "Local expertise and community connections", desc: "As a Denver estate liquidation company, we understand Colorado real estate markets, local donation centers, recycling programs, and buyer preferences." },
    { icon: Shield, title: "Fully licensed and insured", desc: "Your property and belongings receive complete protection throughout the clean out process." },
    { icon: Leaf, title: "Environmentally conscious approach", desc: "We prioritize donation and resale over disposal, keeping usable items out of landfills and in the hands of people who need them." }
  ];

  const primaryAreas = [
    "Denver metro area including all surrounding suburbs",
    "Colorado Springs and El Paso County",
    "Fort Collins and Northern Colorado",
    "Boulder and Broomfield County",
    "Greeley and Weld County"
  ];

  const additionalAreas = "Highlands Ranch, Littleton, Englewood, Wheat Ridge, Golden, Broomfield, Louisville, Lafayette, Longmont, Loveland, Castle Rock, Parker";

  const processSteps = [
    { step: 1, title: "Free consultation and walkthrough", desc: "We assess your property and discuss your timeline, concerns, and goals." },
    { step: 2, title: "Comprehensive sorting", desc: "Every item is categorized for auction, donation, recycling, or disposal based on condition and value." },
    { step: 3, title: "Valuable item preparation", desc: "Auction-worthy pieces receive professional photography and detailed descriptions." },
    { step: 4, title: "Systematic removal", desc: "Non-valuable items are removed first, leaving space for careful handling of valuable pieces." },
    { step: 5, title: "Final cleaning coordination", desc: "We arrange deep cleaning services to leave your property ready for sale or new occupants." },
    { step: 6, title: "Auction management", desc: "We handle all aspects of online sales, from listing to buyer communication." },
    { step: 7, title: "Revenue distribution", desc: "Auction proceeds are applied to your account, often resulting in zero out-of-pocket costs." }
  ];

  const testimonials = [
    { quote: "JSG turned what we thought would be a $2,000 clean out into a $500 profit. They found valuable antiques in my grandmother's basement that we never knew existed.", author: "Sarah M.", location: "Denver" },
    { quote: "Professional, respectful, and incredibly thorough. They handled my father's estate with the care and attention our family needed during a difficult time.", author: "Robert K.", location: "Aurora" },
    { quote: "I called six different junk removal companies. JSG was the only one that offered to auction valuable items instead of throwing everything away. Smart business model.", author: "Linda T.", location: "Westminster" }
  ];

  const faqs = [
    {
      question: "Do you do hoarder clean outs in Denver?",
      answer: "Yes, we specialize in hoarder clean outs throughout the Denver metro area. Our compassionate, non-judgmental team has experience handling extreme clutter situations with discretion. We systematically sort through all items, rescue valuables for auction, and coordinate proper disposal and cleaning services."
    },
    {
      question: "What items are best for auction during an estate clean out?",
      answer: "The best items for auction include antique furniture, vintage jewelry, fine art, collectibles (coins, stamps, sports memorabilia), mid-century modern pieces, sterling silver, quality tools, musical instruments, vintage electronics, designer items, and specialty sporting equipment. Our appraisers often find hidden value in items families overlook."
    },
    {
      question: "How quickly can you schedule a Denver estate clean out?",
      answer: "We offer same-day consultations and can often begin work within 48-72 hours for urgent situations. Emergency clean outs for real estate closings, evictions, or time-sensitive estates are accommodated whenever possible. Contact us to discuss your timeline."
    },
    {
      question: "Do you serve areas outside of Denver?",
      answer: "Absolutely! While Denver is our primary service area, we regularly serve the entire Front Range including Colorado Springs, Fort Collins, Boulder, and all surrounding communities. Travel accommodations are available for larger estates throughout Colorado."
    },
    {
      question: "What happens to items that don't sell at auction?",
      answer: "Items that don't sell or aren't suitable for auction are handled responsibly. We coordinate donations to local charities, arrange recycling for appropriate materials, and only dispose of items that truly have no remaining value. Our goal is to minimize landfill waste."
    },
    {
      question: "Is there really no upfront cost for your junk removal service?",
      answer: "Correct! Unlike traditional junk removal companies that charge flat fees upfront, our revenue-sharing model means you often pay nothing out-of-pocket. We identify valuable items during the clean out, auction them, and apply proceeds to your removal costs. Many clients end up with money back."
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="Why Work With Us | Denver Estate Clean Outs & Junk Removal"
        description="Denver's full-service estate clean outs, junk removal & auctions. Our unique auction-backed model often covers your removal costs and puts money back in your pocket."
        canonical="/why-work-with-us"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={whyWorkHero} 
            alt="Denver estate clean out and junk removal team sorting antiques and valuables for auction in Colorado home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Denver's Full-Service Estate Clean Outs, Junk Removal & Auctions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              All Under One Roof
            </p>
            <p className="text-lg text-foreground/90 mb-8">
              JSG ESTATE LIQUIDATORS transforms overwhelming estate clean outs and junk removal projects across Denver and Colorado into stress-free, cost-effective solutions. Unlike traditional junk removal companies that simply haul everything away for a flat fee, we identify valuable items during the clean out process and auction them online—often covering your entire removal costs and putting money back in your pocket.
            </p>
            <Button asChild variant="accent" size="lg">
              <Link to="/contact">Get Your Free Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Estate Clean Out Services Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Comprehensive Estate Clean Out Services in Denver
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-4xl">
              Estate clean outs involve much more than standard junk removal. When families face the daunting task of clearing deceased loved ones' homes or downsizing parents into senior care, they need experienced professionals who understand both the emotional weight and practical challenges involved.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">Our Denver estate clean out service includes:</h3>
            <ul className="space-y-3 mb-8">
              {cleanOutServices.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground/90">{service}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary/10 rounded-lg p-6">
              <p className="text-foreground font-medium">
                <strong>Service areas include:</strong> Denver, Aurora, Lakewood, Thornton, Westminster, Arvada, Centennial, Boulder, Fort Collins, Colorado Springs, and all surrounding Colorado communities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Appraisal Image Break */}
      <section className="relative h-64 md:h-80 lg:h-96">
        <img 
          src={whyWorkAppraisal} 
          alt="Professional estate liquidation appraisers evaluating antiques jewelry and collectibles during Denver junk removal service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </section>

      {/* Junk Removal Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Expert Junk Removal with Revenue Recovery
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Traditional junk removal Denver companies charge upfront fees and haul everything to landfills. JSG ESTATE LIQUIDATORS takes a different approach: we're Denver's only junk removal company that actively seeks valuable items during clean outs and turns them into auction revenue for our clients.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">What sets our junk removal service apart:</h3>
              <ul className="space-y-3">
                {junkRemovalFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-secondary rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Common valuable finds during Colorado estate clean outs:
              </h3>
              <div className="flex flex-wrap gap-2">
                {valuableFinds.map((item, index) => (
                  <span 
                    key={index}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Auction Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Online Auctions That Offset Clean Out Costs
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Here's where JSG ESTATE LIQUIDATORS revolutionizes the estate clean out industry. Instead of treating your belongings as "junk," our experienced appraisers identify items with resale value and list them in our proven online auction platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {auctionProcess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-lg p-6 shadow-sm"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.step}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Success Story Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary text-primary-foreground rounded-xl p-8 text-center"
          >
            <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">Recent Success Story</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              A Lakewood estate clean out generated <strong>$3,200 in auction revenue</strong> from items the family considered "junk," completely covering the $800 removal fee and putting <strong>$2,400 back in their pockets</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auction Image Break */}
      <section className="relative h-64 md:h-80 lg:h-96">
        <img 
          src={whyWorkAuction} 
          alt="Colorado estate sale online auction platform displaying vintage furniture antiques and collectibles from Denver clean outs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Denver Families Choose JSG Estate Liquidators
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary rounded-xl p-6"
              >
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Colorado Coverage Section */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={whyWorkColorado} 
            alt="Estate clean out and junk removal service areas across Denver metro Boulder Fort Collins Colorado Springs and Front Range communities"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 text-center">
              Complete Coverage Across Colorado
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-background/90 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Primary Service Areas:</h3>
                <ul className="space-y-2">
                  {primaryAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2 text-foreground/90">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-background/90 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">We Regularly Serve:</h3>
                <p className="text-foreground/90 mb-4">{additionalAreas}, and dozens of other Colorado communities.</p>
                <p className="text-muted-foreground text-sm italic">
                  Travel accommodations available for larger estates and special circumstances throughout Colorado.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Proven Clean Out Process
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 mb-6"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Client Success Stories
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 shadow-sm"
              >
                <p className="text-foreground/90 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-primary font-semibold">— {testimonial.author}, {testimonial.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Meet the JSG Estate Liquidators Team
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're a Denver-based family business with deep roots in Colorado's estate sale and auction community. Our team combines decades of experience in antique appraisal, auction management, and compassionate customer service.
            </p>
            <p className="text-foreground/90 mb-4">
              Every member of our crew understands that estate clean outs are more than just a job—they're about helping families through significant life transitions. Whether you're downsizing, handling a loved one's estate, or clearing a property for sale, we approach each project with respect, professionalism, and genuine care.
            </p>
            <p className="text-muted-foreground">
              Our appraisers have handled everything from rare coin collections to vintage automobiles, and our removal teams are trained to protect both your property and the items we're cataloging. We're not just a junk removal company—we're your partners in turning overwhelming situations into positive outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common questions about our Denver estate clean out, junk removal, and auction services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* FAQ Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Transform Your Estate Clean Out?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Don't let estate clean outs overwhelm you or drain your finances. JSG ESTATE LIQUIDATORS combines professional Denver junk removal with revenue-generating auctions, delivering stress-free solutions that often put money back in your pocket.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <a 
                href="tel:805-444-4069" 
                className="flex items-center justify-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors rounded-lg p-4"
              >
                <Phone className="w-5 h-5" />
                <span>(805) 444-4069</span>
              </a>
              <a 
                href="mailto:jsgliquidators@gmail.com" 
                className="flex items-center justify-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors rounded-lg p-4"
              >
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
              <Link 
                to="/contact"
                className="flex items-center justify-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors rounded-lg p-4"
              >
                <Globe className="w-5 h-5" />
                <span>Schedule Online</span>
              </Link>
              <a 
                href="sms:805-444-4069" 
                className="flex items-center justify-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors rounded-lg p-4"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Text Photos</span>
              </a>
            </div>

            <p className="text-sm opacity-80 mb-6">
              Same-day consultations available. Emergency clean outs accommodated. Licensed, insured, and trusted throughout Colorado.
            </p>

            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/contact">Get Your Free Consultation Today</Link>
            </Button>

            <p className="mt-6 text-lg font-medium">
              Contact JSG ESTATE LIQUIDATORS — where your estate clean out becomes a smart financial decision, not just another expense.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyWorkWithUs;
