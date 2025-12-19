import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

const galleryItems = [
  {
    id: 1,
    title: "Victorian Estate Collection",
    category: "Estate Sale",
    description: "Complete liquidation of a 5,000 sq ft Victorian home featuring antique furniture and collectibles.",
  },
  {
    id: 2,
    title: "Mid-Century Modern Clearance",
    category: "Full Service",
    description: "Curated sale of premium mid-century furniture and décor items.",
  },
  {
    id: 3,
    title: "Antique Collection Auction",
    category: "Auction",
    description: "High-value antique items identified and auctioned for maximum return.",
  },
  {
    id: 4,
    title: "Commercial Office Liquidation",
    category: "Commercial",
    description: "Complete office furniture and equipment liquidation for corporate client.",
  },
  {
    id: 5,
    title: "Art & Collectibles Sale",
    category: "Estate Sale",
    description: "Specialty sale featuring fine art, rare books, and vintage collectibles.",
  },
  {
    id: 6,
    title: "Downsizing Assistance",
    category: "Full Service",
    description: "Comprehensive downsizing service including sorting, selling, and donation coordination.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Gallery = () => {
  return (
    <Layout>
      <SEOHead
        title="Gallery | Our Past Estate Sales & Projects"
        description="Browse our portfolio of successful estate sales, liquidations, and auctions. See the quality and care we bring to every project."
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-navy to-navy/90">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-display font-bold text-background mb-6"
            {...fadeInUp}
          >
            Our Work
          </motion.h1>
          <motion.p
            className="text-xl text-silver max-w-2xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.1 }}
          >
            Browse examples of our successful estate sales and liquidation projects
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-video bg-gradient-to-br from-steel-blue/20 to-navy/20 flex items-center justify-center">
                  <span className="text-steel-blue/50 text-sm">Project Photo</span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-steel-blue/10 text-steel-blue rounded-full mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-steel-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
              Ready to Start Your Project?
            </h2>
            <p className="text-background/80 mb-8 max-w-xl mx-auto">
              Contact us for a free consultation and see how we can help with your estate sale or liquidation needs.
            </p>
            <a
              href="/contact"
              className="inline-block bg-background text-steel-blue font-semibold px-8 py-3 rounded-lg hover:bg-background/90 transition-colors"
            >
              Get a Free Quote
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
