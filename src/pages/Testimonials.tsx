import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

const testimonials = [
  {
    id: 1,
    name: "Margaret Thompson",
    location: "Westchester County, NY",
    rating: 5,
    text: "After my mother passed, I was overwhelmed with decades of belongings. This team handled everything with such care and professionalism. They maximized the value of her collection and made a difficult time much easier.",
  },
  {
    id: 2,
    name: "Robert & Susan Chen",
    location: "Greenwich, CT",
    rating: 5,
    text: "We were downsizing from our family home of 35 years. They identified valuable antiques we didn't even know we had and got us top dollar at auction. Highly recommend their expertise!",
  },
  {
    id: 3,
    name: "James Mitchell",
    location: "Bergen County, NJ",
    rating: 5,
    text: "Professional, punctual, and thorough. They handled my father's estate sale from start to finish. The junk removal service even found items worth auctioning that offset our costs significantly.",
  },
  {
    id: 4,
    name: "Patricia Gonzalez",
    location: "Fairfield County, CT",
    rating: 5,
    text: "I've used their services twice now - once for my own downsizing and once for a family member's estate. Both times exceeded expectations. They truly care about their clients.",
  },
  {
    id: 5,
    name: "William & Nancy Clark",
    location: "Rockland County, NY",
    rating: 5,
    text: "The auction service was fantastic. Items we thought would be hard to sell went for great prices. Their knowledge of antiques and collectibles is impressive.",
  },
  {
    id: 6,
    name: "Helen Rodriguez",
    location: "Passaic County, NJ",
    rating: 5,
    text: "Compassionate and efficient. They understood the emotional difficulty of clearing my late husband's workshop and handled everything with respect. Thank you for making this process bearable.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Testimonials = () => {
  return (
    <Layout>
      <SEOHead
        title="Testimonials | What Our Clients Say"
        description="Read reviews from satisfied clients about our estate sale, liquidation, and auction services. See why families trust us during difficult transitions."
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-navy to-navy/90">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-display font-bold text-background mb-6"
            {...fadeInUp}
          >
            Client Testimonials
          </motion.h1>
          <motion.p
            className="text-xl text-silver max-w-2xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.1 }}
          >
            Hear from families we've helped through estate sales and liquidations
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-card rounded-lg p-6 shadow-lg border border-border relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-steel-blue/20" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-display font-bold text-steel-blue mb-2">500+</p>
              <p className="text-muted-foreground">Estate Sales Completed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-4xl font-display font-bold text-steel-blue mb-2">98%</p>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-4xl font-display font-bold text-steel-blue mb-2">25+</p>
              <p className="text-muted-foreground">Years Experience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-4xl font-display font-bold text-steel-blue mb-2">3</p>
              <p className="text-muted-foreground">States Served</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-steel-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-background mb-4">
              Join Our Satisfied Clients
            </h2>
            <p className="text-background/80 mb-8 max-w-xl mx-auto">
              Let us help you with your estate sale or liquidation needs. Contact us for a free consultation.
            </p>
            <a
              href="/contact"
              className="inline-block bg-background text-steel-blue font-semibold px-8 py-3 rounded-lg hover:bg-background/90 transition-colors"
            >
              Get Started Today
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
