import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { testimonials } from "@/data/testimonials";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Testimonials = () => {
  const { data: google } = useGoogleReviews();

  const items = google?.reviews?.length
    ? google.reviews.map((r, i) => ({
        id: i + 1,
        name: r.author,
        location: r.relativeTime || "Google review",
        rating: r.rating,
        text: r.text,
        photo: r.profilePhoto,
      }))
    : testimonials.map((t) => ({ ...t, photo: "" }));

  const reviewsSchema = items.map(t => ({
    author: t.name,
    reviewBody: t.text,
    ratingValue: t.rating,
  }));


  return (
    <Layout>
      <SEOHead
        title="Estate Sale Reviews & Testimonials Denver"
        description="Read 5-star reviews from JSG Liquidators clients on estate sales, liquidation, junk removal, and auction services across Denver, CO."
        canonical="/testimonials"
        keywords="estate sale reviews Denver, estate liquidation testimonials Colorado, JSG Liquidators reviews, estate sale company reviews Denver CO, junk removal reviews Denver, estate cleanout reviews"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Testimonials", url: "/testimonials" },
        ]}
        reviews={reviewsSchema}
        aggregateRating={{
          ratingValue: google?.rating ?? 5.0,
          reviewCount: google?.totalReviews ?? items.length,
        }}

      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-navy to-navy/90">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-display font-bold text-background mb-6"
            {...fadeInUp}
          >
            Denver Estate Sale Reviews &amp; Testimonials
          </motion.h1>
          <motion.p
            className="text-xl text-silver max-w-2xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.1 }}
          >
            5-star reviews from Denver metro families &amp; businesses for our estate sales, 
            estate liquidation, cleanouts &amp; e-commerce consignment services
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-background" aria-labelledby="reviews-heading">
        <div className="container mx-auto px-4">
          <h2 id="reviews-heading" className="sr-only">Client Reviews</h2>
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
      <section className="py-16 bg-muted/30" aria-labelledby="stats-heading">
        <div className="container mx-auto px-4">
          <h2 id="stats-heading" className="sr-only">By the Numbers</h2>
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
