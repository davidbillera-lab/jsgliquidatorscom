// Shared content for service × location pages.
// Keep these claims factual and suitable for every listed service area.

export interface ServiceLocationContent {
  serviceSlug: string;
  serviceName: string;
  getTitle: (city: string) => string;
  getMetaDescription: (city: string) => string;
  getMetaKeywords: (city: string) => string;
  getHeroHeadline: (city: string) => string;
  getHeroSubheadline: (city: string) => string;
  getIntro: (city: string, county: string) => string;
  benefits: string[];
  process: { title: string; description: string }[];
  getFaq: (city: string) => { question: string; answer: string }[];
  getCta: (city: string) => string;
}

const pricingAnswer = (city: string, service: string) =>
  `${service} pricing in ${city} depends on the property, approved scope and services selected. We provide a custom plan after a free consultation. If cleanout or removal work is included, its quoted cost is paid upfront. Optional sale proceeds may help recoup some or all of that expense, but results are not guaranteed.`;

export const serviceLocationData: ServiceLocationContent[] = [
  {
    serviceSlug: "estate-sales",
    serviceName: "Estate Sales & Online Auctions",
    getTitle: (city) => `Estate Sales ${city} CO`,
    getMetaDescription: (city) => `Professional estate sales and online auctions in ${city}, Colorado. Item research, photography, listings and buyer coordination. Free consultation.`,
    getMetaKeywords: (city) => `estate sales ${city}, estate sale company ${city} CO, online estate auctions ${city}, estate liquidation ${city} Colorado`,
    getHeroHeadline: (city) => `Estate Sales & Online Auctions in ${city}`,
    getHeroSubheadline: (city) => `Custom online estate sale plans for ${city} families, estates and property transitions.`,
    getIntro: (city, county) => `JSG Liquidators provides online estate sale services in ${city} and throughout ${county}. We research, photograph and list approved items through suitable auction channels, then coordinate buyer communication, payment and pickup. Each project begins with a free consultation and a plan based on the property, the items and the client's goals.`,
    benefits: [
      "Online auction access beyond local in-person shoppers",
      "Item research, photography and detailed catalog descriptions",
      "Agreed sales terms and transparent settlement reporting",
      "Buyer communication, payment and pickup coordination",
      "Optional cleanout service with a separate upfront quote",
      "Coordination with clients, attorneys, realtors and family members",
    ],
    process: [
      { title: "Free Consultation", description: "We review the property, approved items, goals and timing before recommending a plan." },
      { title: "Research & Cataloging", description: "Approved items are researched, photographed and described for the selected sales channel." },
      { title: "Online Sale", description: "Listings are published and managed according to the agreed auction or marketplace strategy." },
      { title: "Settlement & Pickup", description: "We coordinate buyer payment and pickup, then settle sales according to the agreement." },
    ],
    getFaq: (city) => [
      { question: `How much does an estate sale cost in ${city}?`, answer: pricingAnswer(city, "Estate sale") },
      { question: `How long does an estate sale take in ${city}?`, answer: `Timing depends on the number and type of items, the selected platform, buyer demand and any property deadlines. We discuss the schedule during the ${city} consultation and include it in the plan.` },
      { question: `Do you also provide cleanouts in ${city}?`, answer: `Yes. Cleanout work can be included as a separately quoted service. Its approved cost is paid upfront; optional sale proceeds may help recoup that expense but are not guaranteed.` },
      { question: `What items can be considered for an online estate sale?`, answer: `Antiques, collectibles, art, jewelry, furniture, tools and other items may be considered. Acceptance and the recommended sales channel depend on condition, demand and the project plan.` },
    ],
    getCta: (city) => `Discuss an online estate sale in ${city}. Call (805) 444-4069 for a free consultation.`,
  },
  {
    serviceSlug: "consignment",
    serviceName: "E-Commerce Consignment",
    getTitle: (city) => `E-Commerce Consignment ${city} CO`,
    getMetaDescription: (city) => `E-commerce consignment in ${city}, Colorado with item evaluation, photography, online listings, buyer communication, packing and shipping.`,
    getMetaKeywords: (city) => `consignment ${city}, e-commerce consignment ${city} CO, sell items online ${city}, eBay consignment ${city}`,
    getHeroHeadline: (city) => `E-Commerce Consignment in ${city}`,
    getHeroSubheadline: (city) => `Item evaluation, online listings and order handling for approved ${city} consignments.`,
    getIntro: (city, county) => `JSG Liquidators provides e-commerce consignment for approved items in ${city} and throughout ${county}. We evaluate each item, select a suitable marketplace, create the listing and manage buyer communication, packing and shipping. Selling time depends on the item, price, platform and buyer demand.`,
    benefits: [
      "Item-by-item evaluation and marketplace selection",
      "Product photography and detailed listings",
      "Pricing informed by current marketplace information",
      "Buyer communication and order management",
      "Packing and shipping coordination for sold items",
      "Sales reporting and settlement under agreed terms",
    ],
    process: [
      { title: "Item Evaluation", description: "We review each item and explain whether it fits our consignment channels." },
      { title: "Listing Preparation", description: "Accepted items are researched, photographed and prepared for the selected marketplace." },
      { title: "Sale Management", description: "We manage listings and buyer communication. Selling time depends on the item, price, platform and demand." },
      { title: "Packing & Settlement", description: "After a sale, we coordinate packing, shipping and settlement according to the consignment agreement." },
    ],
    getFaq: (city) => [
      { question: `What items can I consign in ${city}?`, answer: `Antiques, collectibles, art, jewelry, designer items, electronics and other specialty goods may be considered. Acceptance depends on condition, expected demand and the appropriate marketplace.` },
      { question: `How much do you charge for consignment in ${city}?`, answer: `Consignment terms depend on the item and sales channel. We explain the applicable commission and terms before accepting an item; pure consignment does not include an upfront cleanout charge.` },
      { question: `How long does it take to sell consigned items from ${city}?`, answer: `Selling time depends on the item, price, platform and buyer demand. We do not promise a universal sale window.` },
      { question: `Do you pick up consignment items in ${city}?`, answer: `Pickup or delivery arrangements depend on the item, location and project scope. Contact us to discuss the practical options before assuming pickup is included.` },
    ],
    getCta: (city) => `Have items to consign in ${city}? Call (805) 444-4069 for an evaluation.`,
  },
  {
    serviceSlug: "business-liquidation",
    serviceName: "Business Liquidation",
    getTitle: (city) => `Business Liquidation ${city} CO`,
    getMetaDescription: (city) => `Business liquidation services in ${city}, Colorado with custom asset planning, online sales options and buyer coordination. Free consultation.`,
    getMetaKeywords: (city) => `business liquidation ${city}, commercial liquidation ${city} CO, office liquidation ${city}, asset liquidation ${city} Colorado`,
    getHeroHeadline: (city) => `Business Liquidation in ${city}`,
    getHeroSubheadline: (city) => `A custom sales and property plan for approved assets from a closure, relocation or downsizing.`,
    getIntro: (city, county) => `JSG Liquidators creates custom business liquidation plans in ${city} and throughout ${county}. We review the approved assets, recommend suitable auction or e-commerce channels, prepare listings and coordinate buyers. Removal or property clearing, when requested, is scoped and quoted separately.`,
    benefits: [
      "Custom inventory and sales-channel planning",
      "Online listings for approved furniture, equipment, inventory and fixtures",
      "Buyer communication, payment and pickup coordination",
      "Sales reporting under the agreed terms",
      "Property clearing available as a separately quoted service",
      "Coordination around the client's lease or transition schedule",
    ],
    process: [
      { title: "Asset Consultation", description: "We review the approved assets, access requirements, goals and schedule." },
      { title: "Sales Plan", description: "Suitable assets are matched with an auction or e-commerce channel." },
      { title: "Listing & Buyer Management", description: "We prepare listings and coordinate buyer questions, payment and pickup." },
      { title: "Settlement & Handover", description: "Sales are settled under the agreement and separately approved clearing work is completed." },
    ],
    getFaq: (city) => [
      { question: `How quickly can you liquidate a business in ${city}?`, answer: `Timing depends on the assets, access, selected sales channels, buyer demand and the client's property deadline. We set expectations in the custom plan.` },
      { question: `What business assets can you sell in ${city}?`, answer: `Furniture, equipment, inventory, fixtures, tools and other assets may be considered. Acceptance depends on condition, demand and the selected marketplace.` },
      { question: `Do you handle property clearing after a business liquidation?`, answer: `Property clearing can be included as a separately scoped service. Its quoted cost is paid upfront and is not automatically included with asset sales.` },
      { question: `How much will my business assets recover?`, answer: `Sale results depend on the assets, condition, pricing, platform and buyer demand. We do not promise a revenue range or guaranteed return.` },
    ],
    getCta: (city) => `Discuss a business liquidation in ${city}. Call (805) 444-4069 for a free consultation.`,
  },
  {
    serviceSlug: "estate-cleanouts",
    serviceName: "Estate Cleanouts",
    getTitle: (city) => `Estate Cleanouts ${city} CO`,
    getMetaDescription: (city) => `Estate cleanouts in ${city}, Colorado with a custom property plan, an upfront quote and optional auction or e-commerce resale services.`,
    getMetaKeywords: (city) => `estate cleanout ${city}, estate cleanout services ${city} CO, property cleanout ${city}, house cleanout ${city} Colorado`,
    getHeroHeadline: (city) => `Estate Cleanouts in ${city}`,
    getHeroSubheadline: (city) => `A clearly scoped ${city} cleanout plan with upfront pricing and optional resale services.`,
    getIntro: (city, county) => `JSG Liquidators provides estate cleanouts in ${city} and throughout ${county}. We walk the property, discuss what must remain, identify approved items for possible sale and provide a clear cleanout quote. The cleanout cost is paid upfront. Optional sale proceeds may help recoup some or all of that expense, but results are not guaranteed.`,
    benefits: [
      "Property walkthrough and written scope before work begins",
      "Cleanout cost quoted and paid upfront",
      "Client-approved sorting for sale, donation and removal",
      "Optional auction or e-commerce services under separate sales terms",
      "Property left broom-clean under the agreed scope",
      "Coordination with clients, realtors, attorneys and property managers",
    ],
    process: [
      { title: "Property Walkthrough", description: "We review the property, access, priorities and items that must remain." },
      { title: "Custom Quote", description: "You receive a clear cleanout scope and upfront price before work begins." },
      { title: "Approved Sorting", description: "Items are handled according to the agreed plan for sale, donation or removal." },
      { title: "Cleanout Completion", description: "The approved contents are removed and the property is left broom-clean." },
    ],
    getFaq: (city) => [
      { question: `How much does an estate cleanout cost in ${city}?`, answer: pricingAnswer(city, "Estate cleanout") },
      { question: `How long does an estate cleanout take in ${city}?`, answer: `Timing depends on property size, contents, access, labor, disposal needs and any separately approved sale services. We include the expected schedule in the custom plan.` },
      { question: `What happens to items during a ${city} cleanout?`, answer: `Items are handled according to the client-approved plan. Suitable items may be sold, while others may be donated, recycled or removed within the quoted scope.` },
      { question: `Do you provide heavy-content cleanouts in ${city}?`, answer: `We evaluate heavy-content properties case by case. The consultation identifies the scope, access and any specialist work needed before we provide a quote.` },
    ],
    getCta: (city) => `Need an estate cleanout in ${city}? Call (805) 444-4069 for a free consultation.`,
  },
  {
    serviceSlug: "junk-removal",
    serviceName: "Junk Removal",
    getTitle: (city) => `Junk Removal ${city} CO`,
    getMetaDescription: (city) => `Junk removal in ${city}, Colorado with a clear upfront quote, property clearing and optional evaluation of approved items for resale.`,
    getMetaKeywords: (city) => `junk removal ${city}, junk removal services ${city} CO, junk hauling ${city}, property clearing ${city} Colorado`,
    getHeroHeadline: (city) => `Junk Removal in ${city}`,
    getHeroSubheadline: (city) => `Removal work quoted upfront, with optional evaluation of approved items for resale.`,
    getIntro: (city, county) => `JSG Liquidators provides quoted junk removal in ${city} and throughout ${county}. We assess the scope, access, labor and disposal needs before work begins. With the client's approval, items with resale potential can be evaluated for auction or e-commerce sale. Those sales are separate and are never guaranteed to cover removal costs.`,
    benefits: [
      "Upfront removal quote based on the approved scope",
      "Furniture, household contents and general property clearing",
      "Optional evaluation of approved items for resale",
      "Donation or recycling coordination when included in the plan",
      "Clear explanation of excluded or specialist materials",
      "Whole-property and partial removal options",
    ],
    process: [
      { title: "Consultation", description: "We review the items, access, labor and disposal requirements." },
      { title: "Scope & Quote", description: "You receive a clear scope and upfront removal price before work begins." },
      { title: "Approved Removal", description: "Our team removes the agreed contents and handles them according to the plan." },
      { title: "Property Handover", description: "We confirm the quoted scope is complete before handing the property back." },
    ],
    getFaq: (city) => [
      { question: `How much does junk removal cost in ${city}?`, answer: pricingAnswer(city, "Junk removal") },
      { question: `How soon can junk removal be scheduled in ${city}?`, answer: `Availability depends on the job scope and current schedule. Contact us with your deadline and we will explain the available options without promising same-day service.` },
      { question: `What items can you remove in ${city}?`, answer: `We evaluate furniture, household contents and other general items during the consultation. Hazardous or specialist materials may require a qualified provider and are not assumed to be included.` },
      { question: `Can items be sold instead of removed?`, answer: `With your approval, suitable items can be evaluated for auction or e-commerce sale. Sale results depend on the item, price, platform and buyer demand.` },
    ],
    getCta: (city) => `Discuss junk removal in ${city}. Call (805) 444-4069 for a free consultation.`,
  },
  {
    serviceSlug: "hoarder-cleanouts",
    serviceName: "Hoarder Cleanouts",
    getTitle: (city) => `Hoarder Cleanout ${city} CO`,
    getMetaDescription: (city) => `Discreet heavy-content cleanout planning in ${city}, Colorado with a property assessment, clear scope and upfront quote.`,
    getMetaKeywords: (city) => `hoarder cleanout ${city}, hoarding cleanup ${city} CO, heavy content cleanout ${city}, clutter removal ${city}`,
    getHeroHeadline: (city) => `Hoarder Cleanout Planning in ${city}`,
    getHeroSubheadline: (city) => `A discreet property assessment, clear scope and upfront cleanout quote.`,
    getIntro: (city, county) => `JSG Liquidators evaluates heavy-content and hoarder cleanouts in ${city} and throughout ${county} with discretion. We review the property, access, client priorities and any specialist conditions before proposing a scope. Cleanout work is quoted and paid upfront. Approved items may be considered for separate resale, but no sale result is guaranteed.`,
    benefits: [
      "Private consultation and property-specific planning",
      "Room-by-room handling based on client instructions",
      "Clear cleanout scope and upfront quote",
      "Optional evaluation of approved items for resale",
      "Coordination with family or property representatives",
      "Referral to qualified specialists when conditions require it",
    ],
    process: [
      { title: "Private Consultation", description: "We discuss the property, priorities, access and any known conditions." },
      { title: "Scope & Quote", description: "We define what is included and provide the upfront cleanout price." },
      { title: "Approved Sorting", description: "Items are handled according to the client's instructions and agreed plan." },
      { title: "Clear & Hand Over", description: "The approved contents are removed and the property is handed back under the agreed scope." },
    ],
    getFaq: (city) => [
      { question: `How much does a hoarder cleanout cost in ${city}?`, answer: pricingAnswer(city, "Heavy-content cleanout") },
      { question: `Is your ${city} cleanout consultation discreet?`, answer: `Yes. We treat the property and client information privately and plan access around the client's needs.` },
      { question: `How long does a heavy-content cleanout take?`, answer: `Timing depends on volume, access, labor, safety conditions and any specialist work. We provide an expected schedule after evaluating the property.` },
      { question: `Can you sell items found during the cleanout?`, answer: `Only with the client's approval. Suitable items may be evaluated for auction or e-commerce sale under separate terms; results are not guaranteed.` },
      { question: `Can you handle hazardous conditions?`, answer: `Conditions requiring licensed remediation are referred to qualified specialists before general clearing work proceeds.` },
    ],
    getCta: (city) => `Request a private cleanout consultation in ${city} at (805) 444-4069.`,
  },
];

export const getServiceLocationContent = (serviceSlug: string): ServiceLocationContent | undefined =>
  serviceLocationData.find((service) => service.serviceSlug === serviceSlug);
