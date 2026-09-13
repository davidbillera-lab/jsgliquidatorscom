// Single source of truth for the consolidated /faq page.
// Consumed by src/pages/Faq.tsx and scripts/prerender.ts.

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  heading: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    heading: "Estate Sales & Online Auctions",
    items: [
      {
        question: "How do estate sales work in Denver?",
        answer: "A modern Denver estate sale begins with a free in-home walkthrough and a custom plan. We sort and catalog approved items, photograph and list them through online auction or e-commerce channels, manage buyers and pickup, and coordinate any remaining property work. If a cleanout is included, its quoted cost is paid upfront.",
      },
      {
        question: "How much does an estate sale or liquidation cost in Denver?",
        answer: "Every estate is different, so JSG Liquidators provides a custom plan after a free walkthrough. If the plan includes a cleanout, its quoted cost is paid upfront. Auction and e-commerce proceeds may help you recoup some or all of that expense, but results depend on what sells and are not guaranteed.",
      },
      {
        question: "How long does the estate liquidation process take?",
        answer: "Most estate liquidations are completed within 7-14 days from initial consultation to final cleanout. This includes item cataloging, professional photography, online auction listing, and property clearing. For urgent situations like real estate closings or probate deadlines, we offer expedited timelines.",
      },
      {
        question: "What items sell best at estate auctions in Colorado?",
        answer: "Antiques, vintage collectibles, fine art, jewelry, mid-century modern furniture, power tools, Western art, Native American pieces, and specialty items consistently achieve strong prices at our Denver estate auctions. Everyday household items also perform well — online bidders are looking for far more than antiques.",
      },
      {
        question: "What happens to unsold items after an estate sale?",
        answer: "After a JSG Liquidators auction, unsold items follow four paths: (1) higher-value lots are pulled for our second-chance e-commerce consignment program on eBay, LiveAuctioneers, and Etsy, (2) usable items are donated to local Colorado charities including ARC Thrift, Goodwill, Habitat ReStore, and Denver Rescue Mission, (3) electronics, metals, and recyclables are routed to Denver-area recycling facilities, and (4) only true trash is hauled to a transfer station — leaving the home broom-clean. Less than 15% of contents typically reach a landfill.",
      },
      {
        question: "How is JSG Liquidators different from a traditional estate sale company?",
        answer: "Traditional estate sales are held in-person over a weekend, limiting buyers to local foot traffic. JSG Liquidators uses an online-only auction format that reaches thousands of collectors, dealers, and buyers nationwide — typically achieving higher prices. We also offer AI-assisted cataloging, e-commerce consignment for premium items, and a full cleanout service, making us a complete one-stop solution.",
      },
    ],
  },
  {
    heading: "Estate Cleanouts & Junk Removal",
    items: [
      {
        question: "How do I clear out a house after someone dies?",
        answer: "Secure important documents and heirlooms, let family choose keepsakes, sell the remaining contents through an estate auction, then complete a full cleanout. JSG Liquidators manages this entire 4-step process for Denver and Front Range families in 7-14 days, using online auction proceeds to offset cleanout costs.",
      },
      {
        question: "What is the difference between an estate sale and a cleanout?",
        answer: "An estate sale sells approved items through an auction or marketplace. A cleanout empties the property and has an upfront quoted cost based on the scope of work. When the services are combined, sale proceeds may help you recoup some or all of the cleanout cost, but the amount is not guaranteed.",
      },
      {
        question: "Do you handle the entire estate cleanout after the auction?",
        answer: "Yes — JSG Liquidators offers complete estate cleanout and junk removal after every auction. We handle donation coordination with local Colorado charities, responsible recycling, and proper disposal of remaining items, leaving the property broom-clean and ready for its next chapter.",
      },
      {
        question: "Is there an upfront cost for a cleanout or junk removal?",
        answer: "Yes. If a cleanout or junk removal is part of your plan, we provide a clear quote and collect that cost upfront before work begins. Approved items can also be sold through auction or e-commerce, and those proceeds may help you recoup some or all of the cleanout cost, but no sale result is guaranteed.",
      },
      {
        question: "Do you do hoarder clean outs in Denver?",
        answer: "Yes, we specialize in hoarder clean outs throughout the Denver metro area. Our compassionate, non-judgmental team has experience handling extreme clutter situations with discretion. We systematically sort through all items, rescue valuables for auction, and coordinate proper disposal and cleaning services.",
      },
      {
        question: "How quickly can you schedule a Denver estate clean out?",
        answer: "Scheduling depends on the property's scope, access and our current availability. Contact us with your deadline and we will explain the available options without promising a fixed turnaround.",
      },
    ],
  },
  {
    heading: "E-Commerce Consignment",
    items: [
      {
        question: "Can you sell my valuable items online through e-commerce consignment?",
        answer: "Absolutely. Our e-commerce consignment service lists your antiques, collectibles, and specialty items on eBay, Etsy, LiveAuctioneers, and other specialty marketplaces. We handle professional photography, listing creation, buyer communication, secure packaging, and worldwide shipping — you simply receive the proceeds.",
      },
      {
        question: "What items can I consign in Denver?",
        answer: "Antiques, collectibles, art, jewelry, designer items, electronics and other specialty goods may be considered. Acceptance and pickup arrangements depend on condition, demand, location and project scope.",
      },
      {
        question: "How long does it take to sell consigned items?",
        answer: "Selling time depends on the item, price, platform and buyer demand. We explain the applicable commission and terms before accepting an item; pure consignment does not include an upfront cleanout charge.",
      },
    ],
  },
  {
    heading: "Getting Started & Service Areas",
    items: [
      {
        question: "What do I do with all my parents' stuff?",
        answer: "Keep what's meaningful, sell what has value, donate what helps others, and remove the rest. JSG Liquidators can coordinate the entire process — sorting, AI-assisted appraisal, online auction and e-commerce sales, donation coordination, and final cleanout. Cleanout work is quoted and paid upfront; later sale proceeds may help you recoup that expense.",
      },
      {
        question: "Who buys estate items and removes the junk?",
        answer: "JSG Liquidators sells your items to the highest bidder through our online auction platform and e-commerce consignment, reaching buyers nationwide for higher returns than a single cash offer. After the auction, we remove unsold items, coordinate donations with Colorado charities, recycle, and haul junk — leaving the property broom-clean.",
      },
      {
        question: "What areas of Colorado do you serve?",
        answer: "We serve the entire Denver metro area and Front Range, including Denver, Aurora, Lakewood, Highlands Ranch, Castle Rock, Englewood, Littleton, Thornton, Westminster, Arvada, Centennial, Boulder, Fort Collins, and Colorado Springs. Don't see your area? Contact us — we likely serve your community too.",
      },
      {
        question: "Do you serve areas outside of Denver?",
        answer: "Absolutely! While Denver is our primary service area, we regularly serve the entire Front Range including Colorado Springs, Fort Collins, Boulder, and all surrounding communities. Travel accommodations are available for larger estates throughout Colorado.",
      },
    ],
  },
];

export const allFaqs: FaqItem[] = faqGroups.flatMap((g) => g.items);
