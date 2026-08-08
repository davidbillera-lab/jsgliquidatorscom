import { useEffect } from "react";
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

interface EventSchema {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  url: string;
  locationName?: string;
  eventAttendanceMode?: "OnlineEventAttendanceMode" | "OfflineEventAttendanceMode" | "MixedEventAttendanceMode";
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
  events?: EventSchema[];
}

export const SEOHead = ({ title, description, canonical, type = "website", keywords, image, noindex, faqSchema, breadcrumbs, reviews, aggregateRating, events }: SEOHeadProps) => {
  const siteTitle = "Estate Sales Denver | JSG Liquidators | Estate Sale Company";
  const fullTitle = title === "Home" ? siteTitle : `${title} | JSG Liquidators`;
  const siteUrl = "https://jsgliquidators.com";
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const defaultKeywords = "estate sales Denver, estate liquidation Colorado, business liquidation Denver, junk removal Denver, e-commerce consignment, estate sale auctions, estate cleanout Denver, online auctions Colorado";
  const ogImage = image || `${siteUrl}/logo.png`;

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

  const breadcrumbJsonLd = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.url}`
    }))
  } : null;

  const reviewJsonLd = reviews && reviews.length > 0 && aggregateRating ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    "name": "JSG Liquidators",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.ratingValue,
        "bestRating": 5
      }
    }))
  } : null;

  const eventsJsonLd = events && events.length > 0 ? events.map(ev => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": ev.name,
    "description": ev.description,
    "startDate": ev.startDate,
    "endDate": ev.endDate,
    "eventAttendanceMode": `https://schema.org/${ev.eventAttendanceMode || "OnlineEventAttendanceMode"}`,
    "eventStatus": "https://schema.org/EventScheduled",
    "url": ev.url,
    "location": ev.eventAttendanceMode === "OfflineEventAttendanceMode" ? {
      "@type": "Place",
      "name": ev.locationName || "Denver, CO",
      "address": { "@type": "PostalAddress", "addressLocality": "Denver", "addressRegion": "CO", "addressCountry": "US" }
    } : {
      "@type": "VirtualLocation",
      "url": ev.url
    },
    "organizer": { "@type": "Organization", "name": "JSG Liquidators", "url": siteUrl }
  })) : null;

  // The prerendered HTML ships a static canonical. Remove it once React takes
  // over so hydration never leaves two <link rel="canonical"> tags in the head.
  useEffect(() => {
    document
      .querySelectorAll('link[rel="canonical"]:not([data-rh])')
      .forEach((el) => el.remove());
  }, [canonicalUrl]);

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
      
      {/* Sitewide Organization / LocalBusiness / WebSite @graph lives in index.html
          so it is present for non-JS crawlers and is never duplicated here. */}

      {/* FAQ Schema */}
      {faqJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      )}

      {/* Breadcrumb Schema */}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}

      {/* Review/AggregateRating Schema */}
      {/* Review/AggregateRating Schema */}
      {reviewJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(reviewJsonLd)}
        </script>
      )}

      {/* Event Schema (recurring auctions) */}
      {eventsJsonLd && eventsJsonLd.map((ev, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ev)}
        </script>
      ))}
    </Helmet>
  );
};