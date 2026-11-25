// Sitewide single LocalBusiness (#business) + WebSite structured data, rendered in the root route head.
import { businessProfiles } from "./businessProfiles";

export const BUSINESS_ID = "https://jsgliquidators.com/#business";
export const businessAreaServed = [
  {
    "@type": "City",
    "name": "Denver",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Aurora",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Lakewood",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Highlands Ranch",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Castle Rock",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Englewood",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Littleton",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Centennial",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Parker",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Arvada",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Westminster",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Thornton",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Wheat Ridge",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Golden",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Boulder",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Colorado Springs",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Fort Collins",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  },
  {
    "@type": "City",
    "name": "Lone Tree",
    "containedInPlace": {
      "@type": "State",
      "name": "Colorado"
    }
  }
];

export const siteSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": [
        "LocalBusiness",
        "HomeAndConstructionBusiness"
      ],
      "@id": "https://jsgliquidators.com/#business",
      "additionalType": "https://en.wikipedia.org/wiki/Estate_liquidation",
      "name": "JSG Liquidators",
      "legalName": "JSG Liquidators LLC",
      "description": "Denver estate sale company offering online estate auctions, e-commerce consignment, estate cleanouts, junk removal and business liquidation across the Denver metro and Colorado Front Range.",
      "url": "https://jsgliquidators.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jsgliquidators.com/logo.png",
        "width": 240,
        "height": 72
      },
      "image": "https://jsgliquidators.com/logo.png",
      "telephone": "+1-805-444-4069",
      "email": "jsgliquidators@jsgliquidators.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Denver",
        "addressRegion": "CO",
        "addressCountry": "US"
      },
      "openingHours": "Mo-Fr 08:00-18:00",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "hasMap": "https://www.google.com/maps?cid=11342591244856020758",
      "areaServed": businessAreaServed,
      "sameAs": businessProfiles.map((profile) => profile.url),
      "alternateName": [
        "JSG Estate Liquidation",
        "JSG Liquidators Denver"
      ],
      "slogan": "Denver's Trusted Estate and Business Liquidation Experts",
      "founder": {
        "@type": "Person",
        "name": "David Billera",
        "jobTitle": "Founder & Lead Liquidator",
        "telephone": "+1-805-444-4069"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-805-444-4069",
          "contactType": "customer service",
          "name": "David Billera",
          "areaServed": "CO",
          "availableLanguage": "English"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+1-805-340-4817",
          "contactType": "customer service",
          "name": "Vincent Billera",
          "areaServed": "CO",
          "availableLanguage": "English"
        }
      ],
      "knowsAbout": [
        "Estate sales",
        "Online estate auctions",
        "E-commerce consignment",
        "Business liquidation",
        "Estate cleanouts",
        "Junk removal",
        "Hoarder cleanouts"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "JSG Liquidators services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Estate sales",
              "url": "https://jsgliquidators.com/services/estate-sales"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Online estate auctions",
              "url": "https://jsgliquidators.com/auctions"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-commerce consignment",
              "url": "https://jsgliquidators.com/services/consignment"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Business liquidation",
              "url": "https://jsgliquidators.com/services/business-liquidation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Estate cleanouts",
              "url": "https://jsgliquidators.com/services/estate-cleanouts"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Junk removal",
              "url": "https://jsgliquidators.com/services/junk-removal"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hoarder cleanouts",
              "url": "https://jsgliquidators.com/services/hoarder-cleanouts"
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://jsgliquidators.com/#website",
      "url": "https://jsgliquidators.com",
      "name": "JSG Liquidators",
      "description": "Colorado's trusted estate sale and liquidation company",
      "publisher": {
        "@id": "https://jsgliquidators.com/#business"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://jsgliquidators.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
} as const;

// Google Tag Manager + Google Ads tag. Loads after the page has rendered (or on first interaction)
// to protect mobile page speed.
export const googleTagsBootstrap = "window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n      gtag('config', 'AW-17733654300');\n      dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});\n      (function () {\n        var loaded = false;\n        function loadTags() {\n          if (loaded) return; loaded = true;\n          ['https://www.googletagmanager.com/gtm.js?id=GTM-MW8N2GCG', 'https://www.googletagmanager.com/gtag/js?id=AW-17733654300'].forEach(function (src) {\n            var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s);\n          });\n        }\n        window.addEventListener('load', function () { setTimeout(loadTags, 2500); });\n        ['scroll', 'pointerdown', 'keydown', 'touchstart'].forEach(function (e) { window.addEventListener(e, loadTags, { once: true, passive: true }); });\n      })();";
