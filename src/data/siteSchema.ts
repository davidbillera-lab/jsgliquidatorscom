// Sitewide Organization + LocalBusiness + WebSite structured data, rendered in the root route head.
export const siteSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://jsgliquidators.com/#organization",
      "name": "JSG Liquidators",
      "legalName": "JSG Liquidators LLC",
      "alternateName": [
        "JSG Estate Liquidation",
        "JSG Liquidators Denver"
      ],
      "url": "https://jsgliquidators.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jsgliquidators.com/logo.png",
        "width": 240,
        "height": 72
      },
      "image": "https://jsgliquidators.com/logo.png",
      "description": "Colorado's trusted estate sale company offering estate liquidation, business liquidation, junk removal, e-commerce consignment, and online estate auctions throughout Denver and the Front Range.",
      "slogan": "Denver's Trusted Estate and Business Liquidation Experts",
      "founder": {
        "@type": "Person",
        "name": "David Billera",
        "jobTitle": "Founder & Lead Liquidator",
        "telephone": "+1-805-444-4069"
      },
      "knowsAbout": [
        "Estate sales",
        "Estate liquidation",
        "Online estate auctions",
        "E-commerce consignment",
        "eBay consignment",
        "LiveAuctioneers listings",
        "Business liquidation",
        "Commercial asset recovery",
        "Estate cleanouts",
        "Bereavement house clearance",
        "Junk removal",
        "Downsizing",
        "Probate liquidation",
        "Denver Colorado real estate transitions"
      ],
      "keywords": "estate sales Denver, estate liquidation Colorado, e-commerce consignment, eBay consignment Denver, business liquidation Denver, estate cleanout Denver, junk removal Denver, online estate auctions",
      "areaServed": [
        {
          "@type": "City",
          "name": "Denver",
          "addressRegion": "CO"
        },
        {
          "@type": "City",
          "name": "Aurora",
          "addressRegion": "CO"
        },
        {
          "@type": "City",
          "name": "Lakewood",
          "addressRegion": "CO"
        },
        {
          "@type": "City",
          "name": "Boulder",
          "addressRegion": "CO"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Colorado Front Range"
        }
      ],
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
          "name": "Vincent",
          "areaServed": "CO",
          "availableLanguage": "English"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/jsgliquidators1/",
        "https://www.google.com/maps?cid=11342591244856020758"
      ]
    },
    {
      "@type": [
        "LocalBusiness",
        "HomeAndConstructionBusiness"
      ],
      "@id": "https://jsgliquidators.com/#localbusiness",
      "name": "JSG Liquidators",
      "legalName": "JSG Liquidators LLC",
      "description": "Denver estate sale company offering online estate auctions, e-commerce consignment, estate cleanouts, junk removal and business liquidation across the Denver metro and Colorado Front Range.",
      "url": "https://jsgliquidators.com",
      "logo": "https://jsgliquidators.com/logo.png",
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
      "areaServed": [
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
        }
      ],
      "sameAs": [
        "https://www.instagram.com/jsgliquidators1/",
        "https://www.google.com/maps?cid=11342591244856020758"
      ],
      "parentOrganization": {
        "@id": "https://jsgliquidators.com/#organization"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://jsgliquidators.com/#website",
      "url": "https://jsgliquidators.com",
      "name": "JSG Liquidators",
      "description": "Colorado's trusted estate sale and liquidation company",
      "publisher": {
        "@id": "https://jsgliquidators.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://jsgliquidators.com/blog?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
} as const;

// Google Tag Manager + Google Ads tag. Loads after the page has rendered (or on first interaction)
// to protect mobile page speed.
export const googleTagsBootstrap = "window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n      gtag('config', 'AW-17733654300');\n      dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});\n      (function () {\n        var loaded = false;\n        function loadTags() {\n          if (loaded) return; loaded = true;\n          ['https://www.googletagmanager.com/gtm.js?id=GTM-MW8N2GCG', 'https://www.googletagmanager.com/gtag/js?id=AW-17733654300'].forEach(function (src) {\n            var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s);\n          });\n        }\n        window.addEventListener('load', function () { setTimeout(loadTags, 2500); });\n        ['scroll', 'pointerdown', 'keydown', 'touchstart'].forEach(function (e) { window.addEventListener(e, loadTags, { once: true, passive: true }); });\n      })();";
