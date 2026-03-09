// Unique content templates for service × location pages
// Each service has localized copy generators for every city

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

export const serviceLocationData: ServiceLocationContent[] = [
  {
    serviceSlug: "estate-sales",
    serviceName: "Estate Sales & Online Auctions",
    getTitle: (city) => `Estate Sales ${city} CO`,
    getMetaDescription: (city) => `Professional estate sales in ${city}, Colorado. Online auctions, full-service estate liquidation & maximum returns. Free consultation. Call JSG Liquidators (805) 444-4069.`,
    getMetaKeywords: (city) => `estate sales ${city}, estate sale company ${city} CO, online estate auctions ${city}, estate liquidation ${city} Colorado, estate sale services ${city}`,
    getHeroHeadline: (city) => `${city}'s Trusted Estate Sale Company`,
    getHeroSubheadline: (city) => `Professional online estate auctions maximizing value for ${city} families since day one.`,
    getIntro: (city, county) => `JSG Liquidators is ${city}'s premier estate sale company, serving families and attorneys throughout ${county} with professional online auction services. Unlike traditional tag sales that limit your buyer pool to local foot traffic, our online estate auctions attract bidders from across Colorado and nationwide — consistently achieving 20-40% higher returns than garage sales or in-person-only events. Every ${city} estate sale we manage includes professional photography, detailed item descriptions, strategic pricing, and full marketing to our established bidder network.`,
    benefits: [
      "Online auctions reaching thousands of qualified bidders beyond just local shoppers",
      "Professional photography and cataloging of every item for maximum appeal",
      "Complete estate handling — from initial walkthrough to broom-clean property",
      "Transparent real-time bidding so you see exactly what each item sells for",
      "No upfront costs — our commission-based model means we only earn when you do",
      "Coordination with attorneys, realtors, and family members throughout the process",
    ],
    process: [
      { title: "Free In-Home Consultation", description: "We visit the property, assess all contents, and create a custom plan tailored to the estate's unique items and your timeline." },
      { title: "Professional Cataloging", description: "Our team photographs, describes, and researches every item to ensure accurate valuations and maximum bidder interest." },
      { title: "Online Auction Launch", description: "Items go live on our auction platforms with full marketing to our bidder network, social channels, and collector communities." },
      { title: "Settlement & Cleanout", description: "After the auction closes, we handle buyer pickup, payment collection, and leave the property broom-clean and ready for its next chapter." },
    ],
    getFaq: (city) => [
      { question: `How much does an estate sale cost in ${city}?`, answer: `JSG Liquidators charges zero upfront fees for estate sales in ${city}. We work on a commission basis, meaning we only earn when your items sell at auction. This ensures our interests are fully aligned with yours — we're motivated to get the highest possible prices.` },
      { question: `How long does an estate sale take in ${city}?`, answer: `A typical ${city} estate sale takes 2-3 weeks from initial consultation to property cleanout. For urgent situations like real estate closings or probate deadlines, we offer expedited timelines as fast as 7-10 days.` },
      { question: `Do you handle the entire estate or just valuable items in ${city}?`, answer: `We handle everything. Valuable items go to auction, usable items are donated to ${city}-area charities, and remaining items are responsibly removed. You get a completely broom-clean property at the end.` },
      { question: `What types of items sell best at ${city} estate auctions?`, answer: `Antiques, collectibles, art, jewelry, tools, furniture, and vintage items perform exceptionally well. However, we regularly achieve strong results on everyday household items too — you'd be surprised what bidders are looking for.` },
    ],
    getCta: (city) => `Ready to get started with your ${city} estate sale? Call us at (805) 444-4069 for a free, no-obligation consultation.`,
  },
  {
    serviceSlug: "consignment",
    serviceName: "E-Commerce Consignment",
    getTitle: (city) => `E-Commerce Consignment ${city} CO`,
    getMetaDescription: (city) => `E-commerce consignment in ${city}, CO. We sell your valuables on eBay, Etsy & specialty marketplaces for maximum returns. Free pickup. Call JSG Liquidators.`,
    getMetaKeywords: (city) => `consignment ${city}, e-commerce consignment ${city} CO, sell items online ${city}, eBay consignment ${city}, consignment services ${city} Colorado`,
    getHeroHeadline: (city) => `E-Commerce Consignment in ${city}`,
    getHeroSubheadline: (city) => `We sell your valuables on eBay, Etsy, and specialty marketplaces — so you don't have to.`,
    getIntro: (city, county) => `Have valuable items but no time to sell them online? JSG Liquidators' e-commerce consignment service in ${city} handles everything for ${county} residents — from professional photography and listing creation to shipping and customer service. We sell on eBay, Etsy, LiveAuctioneers, and specialty collector marketplaces, reaching millions of potential buyers worldwide. Our expertise in pricing, keywords, and marketplace algorithms means your items sell faster and for more than you'd get on your own.`,
    benefits: [
      "Multi-platform exposure on eBay, Etsy, LiveAuctioneers, and specialty marketplaces",
      "Professional product photography and detailed, SEO-optimized listings",
      "Expert pricing based on completed sales data and market trends",
      "Full shipping and handling — we pack and ship every item securely",
      "Customer service management — we handle all buyer questions and returns",
      "Free pickup from your home in the greater metro area",
    ],
    process: [
      { title: "Item Evaluation", description: "Bring items to us or schedule a free pickup. We assess each piece for market value and the best platform to maximize your return." },
      { title: "Professional Listing", description: "We photograph, research, and list your items with optimized titles, descriptions, and pricing strategies." },
      { title: "Sale & Shipping", description: "When items sell, we handle payment processing, professional packing, and shipping to the buyer anywhere in the world." },
      { title: "You Get Paid", description: "We send your proceeds promptly after each sale, with full transparency on what sold and for how much." },
    ],
    getFaq: (city) => [
      { question: `What items can I consign in ${city}?`, answer: `We accept antiques, collectibles, art, jewelry, designer items, electronics, vintage clothing, sports memorabilia, coins, and more. If it has value online, we can sell it. Schedule a free evaluation to find out what your items are worth.` },
      { question: `How much do you charge for consignment in ${city}?`, answer: `Our consignment fees are competitive and depend on item value and category. There are no upfront costs — we only earn a commission when your item sells. Contact us for a personalized quote.` },
      { question: `How long does it take to sell consigned items from ${city}?`, answer: `Most items sell within 2-4 weeks, though rare collectibles may be listed longer to attract the right buyer and achieve maximum value. We provide regular status updates on all your consigned items.` },
      { question: `Do you offer pickup for consignment items in ${city}?`, answer: `Yes! We offer free pickup for consignment items throughout ${city} and the surrounding metro area. Just schedule a time that works for you.` },
    ],
    getCta: (city) => `Have items to consign in ${city}? Call (805) 444-4069 or schedule a free evaluation today.`,
  },
  {
    serviceSlug: "business-liquidation",
    serviceName: "Business Liquidation",
    getTitle: (city) => `Business Liquidation ${city} CO`,
    getMetaDescription: (city) => `Business liquidation services in ${city}, Colorado. Office, restaurant, retail & commercial asset liquidation. Maximize recovery. Call JSG Liquidators (805) 444-4069.`,
    getMetaKeywords: (city) => `business liquidation ${city}, commercial liquidation ${city} CO, office liquidation ${city}, restaurant liquidation ${city}, asset recovery ${city} Colorado`,
    getHeroHeadline: (city) => `Business Liquidation Services in ${city}`,
    getHeroSubheadline: (city) => `Maximize asset recovery for your ${city} business closure, downsizing, or relocation.`,
    getIntro: (city, county) => `When a ${city} business closes, relocates, or downsizes, the remaining assets — furniture, equipment, inventory, and fixtures — still hold significant value. JSG Liquidators provides professional business liquidation throughout ${county}, converting your commercial assets into cash through our established auction platform. We've liquidated restaurants, offices, retail stores, warehouses, and medical practices across ${city}, consistently recovering more value than traditional "everything must go" sales.`,
    benefits: [
      "Rapid turnaround to meet lease deadlines and closing timelines",
      "Online auctions reaching commercial buyers, resellers, and contractors",
      "Complete property clearout included — we leave the space broom-clean",
      "Experience with restaurants, offices, retail, medical, and industrial assets",
      "Coordination with landlords, attorneys, and bankruptcy trustees",
      "Detailed asset inventory and sales reporting for tax and legal records",
    ],
    process: [
      { title: "Commercial Assessment", description: "We inspect the property and create a complete asset inventory with estimated values, giving you a clear picture of recovery potential." },
      { title: "Strategic Auction Setup", description: "Assets are photographed, cataloged, and listed on our auction platforms with targeted marketing to commercial buyers in the industry." },
      { title: "Managed Sale Period", description: "Our team handles all buyer inquiries, coordinates previews, and manages the competitive bidding process for maximum recovery." },
      { title: "Clearout & Handover", description: "After the sale, we manage buyer pickup, remove unsold items, and deliver the space broom-clean and ready for the landlord or new tenant." },
    ],
    getFaq: (city) => [
      { question: `How quickly can you liquidate a business in ${city}?`, answer: `We can typically complete a ${city} business liquidation in 2-4 weeks, including marketing, auction, buyer pickup, and final cleanout. For urgent lease deadlines, we offer expedited timelines.` },
      { question: `What types of businesses do you liquidate in ${city}?`, answer: `We handle all types: restaurants, offices, retail stores, warehouses, medical practices, salons, gyms, and more. If your ${city} business has physical assets, we can liquidate them.` },
      { question: `Do you handle the cleanout after a business liquidation in ${city}?`, answer: `Yes — every business liquidation includes complete property clearout. We remove all remaining items and leave the space broom-clean, ready for the landlord or next tenant.` },
      { question: `How much can I expect to recover from a ${city} business liquidation?`, answer: `Recovery varies based on asset type and condition, but our auction format consistently outperforms bulk buyers and "everything must go" sales. We provide a free assessment with estimated recovery ranges before you commit.` },
    ],
    getCta: (city) => `Need to liquidate a ${city} business? Call (805) 444-4069 for a free commercial asset assessment.`,
  },
  {
    serviceSlug: "estate-cleanouts",
    serviceName: "Estate Clean Outs",
    getTitle: (city) => `Estate Cleanouts ${city} CO`,
    getMetaDescription: (city) => `Estate cleanout services in ${city}, CO. Complete property clearout with auction revenue recovery. Broom-clean guarantee. Call JSG Liquidators (805) 444-4069.`,
    getMetaKeywords: (city) => `estate cleanout ${city}, estate cleanout services ${city} CO, property cleanout ${city}, house cleanout ${city} Colorado, estate clearing ${city}`,
    getHeroHeadline: (city) => `Estate Cleanout Services in ${city}`,
    getHeroSubheadline: (city) => `Complete property cleanouts with built-in revenue recovery — not just removal.`,
    getIntro: (city, county) => `JSG Liquidators' estate cleanout service in ${city} is different from ordinary junk removal. Before we remove anything, we identify items with auction value — antiques, collectibles, tools, furniture, and more — and sell them through our online auction platform. This "Revenue Recovery" approach means your ${county} estate cleanout can actually generate income instead of just costing money. A recent cleanout near ${city} generated over $3,200 in auction revenue from items the family initially considered worthless, completely covering the removal fee and returning $2,400 in profit.`,
    benefits: [
      "Revenue Recovery model — valuables are auctioned before anything is removed",
      "Broom-clean guarantee — property left ready for sale, renovation, or new tenants",
      "Donation coordination with local charities for tax-deductible contributions",
      "Eco-friendly disposal — we recycle and donate before landfilling",
      "Single point of contact for the entire process from start to finish",
      "Coordination with realtors, attorneys, and property managers on timelines",
    ],
    process: [
      { title: "Property Walkthrough", description: "We assess the entire property, identifying items for auction, donation, recycling, and removal — giving you a complete plan and quote." },
      { title: "Revenue Recovery Auction", description: "Valuable items are photographed, cataloged, and sold through our online auction platform to maximize your return before any removal begins." },
      { title: "Donation & Recycling", description: "Usable items go to local charities (with tax receipts provided) and recyclable materials are properly processed." },
      { title: "Complete Cleanout", description: "Everything remaining is removed and the property is left broom-clean, ready for its next chapter." },
    ],
    getFaq: (city) => [
      { question: `How much does an estate cleanout cost in ${city}?`, answer: `Estate cleanout costs in ${city} depend on property size and contents. However, our Revenue Recovery model often significantly reduces or eliminates the cost — and can even generate profit. We provide a free on-site estimate with no obligation.` },
      { question: `How long does an estate cleanout take in ${city}?`, answer: `Most ${city} estate cleanouts are completed in 1-3 weeks, including the auction phase. For urgent timelines, we can expedite the process to meet real estate closing or lease deadlines.` },
      { question: `What happens to items that don't sell at auction during a ${city} cleanout?`, answer: `Unsold items with utility are donated to ${city}-area charities (we provide tax receipts). Remaining items are recycled when possible, with only truly unusable items going to the landfill.` },
      { question: `Do you provide estate cleanouts for hoarder homes in ${city}?`, answer: `Yes. We have extensive experience with heavy-content and hoarder cleanouts in ${city}. Our team handles these situations with sensitivity and professionalism, following all safety protocols.` },
    ],
    getCta: (city) => `Need an estate cleanout in ${city}? Call (805) 444-4069 for a free on-site estimate.`,
  },
  {
    serviceSlug: "junk-removal",
    serviceName: "Junk Removal",
    getTitle: (city) => `Junk Removal ${city} CO`,
    getMetaDescription: (city) => `Junk removal in ${city}, Colorado with auction-backed revenue recovery. Eco-friendly disposal, donation coordination & broom-clean results. Call JSG Liquidators.`,
    getMetaKeywords: (city) => `junk removal ${city}, junk removal services ${city} CO, junk hauling ${city}, trash removal ${city} Colorado, eco friendly junk removal ${city}`,
    getHeroHeadline: (city) => `Junk Removal in ${city} — With a Twist`,
    getHeroSubheadline: (city) => `We don't just haul — we recover value from your "junk" through our auction platform first.`,
    getIntro: (city, county) => `Most junk removal companies in ${city} throw everything in a truck and charge you for it. JSG Liquidators takes a smarter approach: before removing anything from your ${county} property, our team identifies items that still have value — tools, furniture, appliances, collectibles — and sells them through our online auction platform. The result? Your junk removal bill shrinks, and you might even profit. A recent ${city}-area job generated $3,200 in auction revenue from items the homeowner was ready to throw away, turning an $800 removal cost into $2,400 in profit.`,
    benefits: [
      "Auction-backed Revenue Recovery reduces or eliminates your removal costs",
      "Same-day and next-day service available throughout the metro area",
      "Eco-friendly approach — we donate and recycle before landfilling",
      "Transparent pricing with no hidden fees or surprise charges",
      "Full property cleanout capability — garages, basements, attics, whole homes",
      "Licensed, insured, and experienced with all property types",
    ],
    process: [
      { title: "Free Estimate", description: "We assess the job on-site (or via photos for quick quotes) and provide a transparent price — often reduced by Revenue Recovery potential." },
      { title: "Value Identification", description: "Our team separates items with auction value from true junk, maximizing recovery and minimizing waste." },
      { title: "Removal Day", description: "Our crew efficiently removes everything, handling all heavy lifting, loading, and transport." },
      { title: "Responsible Disposal", description: "Valuables go to auction, usable items to charity, recyclables to processing — only true waste hits the landfill." },
    ],
    getFaq: (city) => [
      { question: `How much does junk removal cost in ${city}?`, answer: `Junk removal pricing in ${city} depends on volume and accessibility. Our Revenue Recovery model often significantly reduces costs. We provide free on-site estimates with no obligation — call (805) 444-4069.` },
      { question: `Do you offer same-day junk removal in ${city}?`, answer: `Yes! We offer same-day and next-day junk removal throughout ${city} and the surrounding area, subject to availability. Call early in the day for the best same-day availability.` },
      { question: `What items won't you take for junk removal in ${city}?`, answer: `We handle almost everything including furniture, appliances, electronics, yard waste, and construction debris. We cannot accept hazardous materials like chemicals, paint, or asbestos. Contact us with questions about specific items.` },
      { question: `Is your ${city} junk removal service eco-friendly?`, answer: `Absolutely. Our process prioritizes auction recovery, donation, and recycling before any landfill disposal. Typically less than 30% of what we remove actually ends up in a landfill.` },
    ],
    getCta: (city) => `Ready for junk removal in ${city}? Call (805) 444-4069 for a free estimate.`,
  },
];

export const getServiceLocationContent = (serviceSlug: string): ServiceLocationContent | undefined =>
  serviceLocationData.find((s) => s.serviceSlug === serviceSlug);
