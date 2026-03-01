import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { ExternalLink, Gavel, ShoppingBag, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

const auctionPlatforms = [
  {
    name: "LiveAuctioneers",
    description: "Browse our curated estate collections featuring antiques, fine art, jewelry, and collectibles. Bid from anywhere in the world with real-time online auctions.",
    url: "https://jsg-liquidators.liveauctioneers.com/",
    features: ["Live bidding", "Worldwide shipping", "Buyer protection", "Expert authentication"],
    icon: Gavel,
  },
  {
    name: "Denver Online Auctions",
    description: "Local Colorado auctions featuring household items, furniture, tools, and everyday treasures. Convenient local pickup available.",
    url: "https://denveronlineauctions.com/marketplace/jsg-estate-liquidation",
    features: ["Local pickup", "Weekly auctions", "No buyer's premium", "Preview available"],
    icon: ShoppingBag,
  },
];

const Auctions = () => {
  return (
    <Layout>
      <SEOHead
        title="Online Auctions | Estate Sale Bidding"
        description="Shop JSG Liquidators online auctions for antiques, collectibles, furniture, and estate treasures in Denver CO. Bid on LiveAuctioneers or Denver Online Auctions."
        canonical="/auctions"
        keywords="online auctions Denver, estate sale auctions Colorado, antique auctions, collectible auctions, LiveAuctioneers Denver, estate sale bidding"
        image="https://jsgliquidators.com/hero-estate-sale.jpg"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Shop Our Online Auctions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover unique treasures from Colorado estates. From fine antiques to everyday essentials, 
              find your next great find at our online auction platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auction Platforms */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {auctionPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <platform.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    {platform.name}
                  </h2>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {platform.description}
                </p>

                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {platform.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <Award className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button asChild variant="accent" size="lg" className="w-full">
                  <a href={platform.url} target="_blank" rel="noopener noreferrer">
                    Browse Auctions
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              How Online Auctions Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              New to online auctions? Here's a quick guide to getting started.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Create Account", desc: "Sign up on your preferred auction platform" },
              { step: "2", title: "Browse Items", desc: "Explore our current and upcoming auctions" },
              { step: "3", title: "Place Bids", desc: "Set your maximum bid and let the platform bid for you" },
              { step: "4", title: "Win & Collect", desc: "Pay securely and arrange pickup or shipping" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary rounded-2xl p-8 md:p-12 text-center"
          >
            <Clock className="w-12 h-12 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
              New Auctions Every Week
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              We're constantly adding new items from Colorado estates. Check back regularly 
              or follow us on our auction platforms to get notified of new listings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <a href="https://jsg-liquidators.liveauctioneers.com/" target="_blank" rel="noopener noreferrer">
                  LiveAuctioneers
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="https://denveronlineauctions.com/marketplace/jsg-estate-liquidation" target="_blank" rel="noopener noreferrer">
                  Denver Online Auctions
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Auctions;
