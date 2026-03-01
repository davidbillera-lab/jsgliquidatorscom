import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

const testimonials = [
  {
    id: 1,
    name: "Harriet Ivker",
    location: "Denver, CO",
    rating: 5,
    text: "I highly recommend JSG liquidators. They were professional, honest, easy to work with and I received more than expected from the estate sale. You won't be sorry.",
  },
  {
    id: 2,
    name: "Brandon Johnson",
    location: "Denver, CO",
    rating: 5,
    text: "If you're looking for a good auction to auction off your items, look no further! JSG Estate will take care of you. Fast and easy service, they can get you a return on your investment. The items you think are not worth anything, they have an eye for value. Professional and driven. Easy to work with and down to earth.",
  },
  {
    id: 3,
    name: "Sarah Booras",
    location: "Denver, CO",
    rating: 5,
    text: "I have known the Billera Brothers for a while now, I have used their help more than once! They are hard working, honest, professional and a great choice to help with estate liquidations, junk removal, whatever you need. They get it done! Highly recommend!",
  },
  {
    id: 4,
    name: "Mary Brs",
    location: "Denver, CO",
    rating: 5,
    text: "David and Vincent with JSG Liquidators run smooth, well organized auctions. They offer a great mix of new items, vintage finds, and quality antiques. I love shopping their auctions! Pickup is straightforward and well managed, and communication is solid from start to finish. They're dependable, professional, and a welcome part of the Denver Online Auctions community.",
  },
  {
    id: 5,
    name: "Erin H",
    location: "Denver, CO",
    rating: 5,
    text: "David has been a dream come true. He carries himself with integrity, and the way he has helped me reflects his strong character. My life feels back in order again and I truly appreciate you! I will recommend David any chance I get!",
  },
  {
    id: 6,
    name: "John Krueger",
    location: "Denver, CO",
    rating: 5,
    text: "Dave and Vince were very professional in going over what could be used for the estate auction and what they have to move to our new residence.",
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
        title="Client Testimonials & Reviews"
        description="Read reviews from satisfied clients about JSG Liquidators estate sale, liquidation, and auction services in Denver CO. See why Colorado families trust us."
        canonical="/testimonials"
        keywords="estate sale reviews Denver, estate liquidation testimonials, JSG Liquidators reviews, estate sale company reviews Colorado, junk removal reviews Denver"
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
