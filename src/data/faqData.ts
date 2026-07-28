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
        answer: "A modern Denver estate sale follows 7 steps: (1) free in-home walkthrough, (2) signed commission agreement with no upfront fees, (3) sorting and AI-assisted cataloging, (4) professional photography and online listing, (5) a 7-10 day online auction reaching nationwide buyers, (6) a supervised buyer pickup day, and (7) a final broom-clean cleanout. The full cycle averages 12-14 days for a typical 3-bedroom home in the Denver Metro area or Front Range.",
      },
      {
        question: "How much does an estate sale or liquidation cost in Denver?",
        answer: "JSG Liquidators works on a commission basis — there are no upfront fees. We take a percentage of total auction sales, so our interests are fully aligned with maximizing your returns. Many clients find that auction proceeds offset or completely cover their cleanout and service costs.",
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
        answer: "An estate sale sells the contents of a home for cash through an auction or marketplace. A cleanout empties the home of everything remaining — no selling involved. A pure cleanout costs $3,500-$8,000 out of pocket, while a full estate liquidation (sale plus cleanout combined) typically generates more than enough auction revenue to cover the cleanout cost, leaving the family with a check rather than a bill.",
      },
      {
        question: "Do you handle the entire estate cleanout after the auction?",
        answer: "Yes — JSG Liquidators offers complete estate cleanout and junk removal after every auction. We handle donation coordination with local Colorado charities, responsible recycling, and proper disposal of remaining items, leaving the property broom-clean and ready for its next chapter.",
      },
      {
        question: "Is there really no upfront cost for your junk removal service?",
        answer: "Correct! Unlike traditional junk removal companies that charge flat fees upfront, our revenue-sharing model means you often pay nothing out-of-pocket. We identify valuable items during the clean out, auction them, and apply proceeds to your removal costs. Many clients end up with money back.",
      },
      {
        question: "Do you do hoarder clean outs in Denver?",
        answer: "Yes, we specialize in hoarder clean outs throughout the Denver metro area. Our compassionate, non-judgmental team has experience handling extreme clutter situations with discretion. We systematically sort through all items, rescue valuables for auction, and coordinate proper disposal and cleaning services.",
      },
      {
        question: "How quickly can you schedule a Denver estate clean out?",
        answer: "We offer same-day consultations and can often begin work within 48-72 hours for urgent situations. Emergency clean outs for real estate closings, evictions, or time-sensitive estates are accommodated whenever possible. Contact us to discuss your timeline.",
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
        answer: "We accept antiques, collectibles, art, jewelry, designer items, electronics, vintage clothing, sports memorabilia, coins, and more. If it has value online, we can sell it. We offer free pickup throughout the Denver metro area — schedule a free evaluation to find out what your items are worth.",
      },
      {
        question: "How long does it take to sell consigned items?",
        answer: "Most consigned items sell within 2-4 weeks, though rare collectibles may be listed longer to attract the right buyer and achieve maximum value. There are no upfront costs — we only earn a commission when your item sells, and we provide regular status updates on all your consigned items.",
      },
    ],
  },
  {
    heading: "Getting Started & Service Areas",
    items: [
      {
        question: "What do I do with all my parents' stuff?",
        answer: "Keep what's meaningful, sell what has value, donate what helps others, and remove the rest. JSG Liquidators handles the entire process — sorting, AI-assisted appraisal, online auction sales, donation coordination, and final cleanout — typically with no upfront cost because auction proceeds offset the service.",
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
