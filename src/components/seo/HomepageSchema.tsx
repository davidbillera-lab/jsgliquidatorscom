// Homepage-only structured data (service catalog + speakable WebPage).
// The sitewide Organization / LocalBusiness / WebSite graph lives in the root route head.

const serviceCatalog = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://jsgliquidators.com/#service",
  name: "Estate Liquidation",
  serviceType: "Estate Liquidation",
  provider: { "@id": "https://jsgliquidators.com/#organization" },
  areaServed: { "@type": "State", name: "Colorado" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "JSG Liquidators Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estate Sales & Online Auctions", description: "Online estate sale planning, item research, photography, listings and buyer coordination." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Liquidation", description: "Custom asset liquidation planning and online sales options for business transitions." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estate Cleanouts", description: "Property cleanouts with a clear upfront quote and optional resale services." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Junk Removal", description: "Quoted removal services with optional evaluation of approved items for resale." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Commerce Consignment", description: "Item evaluation, online listings, buyer communication, packing and shipping." } },
    ],
  },
};

const speakablePage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://jsgliquidators.com/#webpage",
  url: "https://jsgliquidators.com/",
  name: "Denver Estate Sales & Liquidation | JSG Liquidators",
  isPartOf: { "@id": "https://jsgliquidators.com/#website" },
  about: { "@id": "https://jsgliquidators.com/#organization" },
  primaryImageOfPage: { "@type": "ImageObject", url: "https://jsgliquidators.com/hero-estate-sale.webp" },
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-summary"] },
};

export const HomepageSchema = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalog) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakablePage) }} />
  </>
);
