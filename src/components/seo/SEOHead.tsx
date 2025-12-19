import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
}

export const SEOHead = ({ title, description, canonical, type = "website" }: SEOHeadProps) => {
  const siteTitle = "JSG Liquidators | Estate Liquidation Denver, Colorado";
  const fullTitle = title === "Home" ? siteTitle : `${title} | JSG Liquidators`;
  const siteUrl = "https://jsgliquidators.com";
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "JSG Liquidators",
    "description": "Professional estate liquidation services in Denver, Colorado. Estate sale auctions, consignment, business liquidation, and cleanout services.",
    "url": siteUrl,
    "telephone": ["+1-805-444-4069", "+1-805-340-4817"],
    "email": "jsgliquidators@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Denver",
      "addressRegion": "CO",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Denver", "addressRegion": "CO" },
      { "@type": "City", "name": "Highlands Ranch", "addressRegion": "CO" },
      { "@type": "City", "name": "Castle Rock", "addressRegion": "CO" },
      { "@type": "City", "name": "Englewood", "addressRegion": "CO" },
      { "@type": "City", "name": "Littleton", "addressRegion": "CO" }
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00",
    "sameAs": [
      "https://blog.jsgliquidators.com",
      "https://denveronlineauctions.com/marketplace/jsg-estate-liquidation"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Estate Liquidation Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estate Sale Auctions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Commerce Consignment" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Liquidation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estate Cleanout" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Junk Removal" } }
      ]
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="JSG Liquidators" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* Geo */}
      <meta name="geo.region" content="US-CO" />
      <meta name="geo.placename" content="Denver" />
      
      {/* LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};
