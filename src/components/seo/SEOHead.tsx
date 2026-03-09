import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ReviewSchema {
  author: string;
  reviewBody: string;
  ratingValue: number;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  keywords?: string;
  image?: string;
  noindex?: boolean;
  faqSchema?: Array<{ question: string; answer: string }>;
  breadcrumbs?: BreadcrumbItem[];
  reviews?: ReviewSchema[];
  aggregateRating?: { ratingValue: number; reviewCount: number };
}

export const SEOHead = ({ title, description, canonical, type = "website", keywords, image, noindex, faqSchema }: SEOHeadProps) => {
  const siteTitle = "JSG Liquidators | Estate Sales, Estate Liquidation & Junk Removal Denver Colorado";
  const fullTitle = title === "Home" ? siteTitle : `${title} | JSG Liquidators Denver CO`;
  const siteUrl = "https://jsgliquidators.com";
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const defaultKeywords = "estate sales Denver, estate liquidation Colorado, business liquidation Denver, junk removal Denver, e-commerce consignment, estate sale auctions, estate cleanout Denver, online auctions Colorado";
  const ogImage = image || `${siteUrl}/logo.png`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "JSG Liquidators",
    "description": "Denver's trusted estate sale company offering estate liquidation, business liquidation, junk removal, e-commerce consignment, and online estate auctions throughout Colorado.",
    "url": siteUrl,
    "telephone": ["+1-805-444-4069", "+1-805-340-4817"],
    "email": "jsgliquidators@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Denver",
      "addressRegion": "CO",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.7392",
      "longitude": "-104.9903"
    },
    "areaServed": [
      { "@type": "City", "name": "Denver", "addressRegion": "CO" },
      { "@type": "City", "name": "Highlands Ranch", "addressRegion": "CO" },
      { "@type": "City", "name": "Castle Rock", "addressRegion": "CO" },
      { "@type": "City", "name": "Englewood", "addressRegion": "CO" },
      { "@type": "City", "name": "Littleton", "addressRegion": "CO" },
      { "@type": "City", "name": "Aurora", "addressRegion": "CO" },
      { "@type": "City", "name": "Lakewood", "addressRegion": "CO" },
      { "@type": "City", "name": "Colorado Springs", "addressRegion": "CO" },
      { "@type": "City", "name": "Boulder", "addressRegion": "CO" },
      { "@type": "City", "name": "Fort Collins", "addressRegion": "CO" }
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00",
    "sameAs": [
      "https://blog.jsgliquidators.com",
      "https://denveronlineauctions.com/marketplace/jsg-estate-liquidation",
      "https://ebay.us/m/tsG4b9",
      "https://jsg-liquidators.liveauctioneers.com/"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Estate Liquidation Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estate Sales", "description": "Professional estate sale auctions in Denver and Colorado" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estate Liquidation", "description": "Complete estate liquidation services throughout Colorado" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Liquidation", "description": "Commercial and business asset liquidation in Denver metro" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Commerce Consignment", "description": "Online consignment sales on eBay, Etsy, and specialty marketplaces" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Junk Removal", "description": "Eco-friendly junk removal with auction revenue recovery in Denver" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estate Cleanout", "description": "Full property cleanout services in Denver and surrounding areas" } }
      ]
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Estate Liquidation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "JSG Liquidators"
    },
    "areaServed": {
      "@type": "State",
      "name": "Colorado"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Estate Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estate Sales" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estate Liquidation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Liquidation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Junk Removal" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Commerce Consignment" } }
      ]
    }
  };

  const faqJsonLd = faqSchema && faqSchema.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqSchema.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="JSG Liquidators - Estate Sales & Liquidation Denver" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Geo */}
      <meta name="geo.region" content="US-CO" />
      <meta name="geo.placename" content="Denver" />
      
      {/* LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      {/* Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>

      {/* FAQ Schema */}
      {faqJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      )}
    </Helmet>
  );
};