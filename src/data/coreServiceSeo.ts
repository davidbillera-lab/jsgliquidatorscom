export interface CoreServiceSeo {
  slug: string;
  name: string;
  /** Page title before the " | JSG Liquidators" suffix. Keep full title under 60 chars. */
  title: string;
  h1: string;
  /** 150-160 characters, includes the phone number and a call to action. */
  description: string;
  summary: string;
  /** Long-form, step-by-step and pricing content for the service hub. */
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
}

const PRICING_RULE =
  "Any cleanout or removal work is quoted after a walkthrough and paid upfront. Optional auction or e-commerce sales may help recoup some or all of that expense, but sale results are never guaranteed.";

export const coreServiceSeo: CoreServiceSeo[] = [
  {
    slug: "estate-sales",
    name: "Estate Sales & Online Auctions",
    title: "Estate Sales Denver | Online Auctions",
    h1: "Estate Sales & Online Auctions in Denver",
    description: "Denver estate sales and online auctions with item research, photos, listings and buyer pickup handled for you. Call (805) 444-4069 for a free consultation.",
    summary: "We research, photograph and list approved estate items through online auction channels, then coordinate buyer payment and pickup.",
    sections: [
      {
        heading: "What a JSG estate sale includes",
        paragraphs: [
          "An estate sale with JSG Liquidators is run online rather than as a weekend crowd in the house. That keeps strangers out of the home, gives each listing time to be seen, and lets buyers outside the Denver metro bid on items that suit them.",
          "We start with a walkthrough. Family members tell us what stays, what goes and what needs a closer look. Approved items are researched, photographed and written up with honest condition notes, then grouped into lots and listed through Denver Online Auctions, our eBay store or another suitable channel.",
          "When the auction closes, we coordinate buyer payment and scheduled pickup windows, so you are not fielding calls or meeting buyers at the door. Afterward you receive a settlement report under the terms we agreed in writing.",
        ],
      },
      {
        heading: "How pricing works",
        paragraphs: [
          "Estate sale services are priced per project after a free consultation, because no two homes hold the same contents. The agreement explains the commission or fees that apply to sold items before anything is listed.",
          `If you also want the house cleared, that is a separate cleanout quote. ${PRICING_RULE}`,
        ],
      },
      {
        heading: "Who we help in the Denver area",
        paragraphs: [
          "Most estate sale clients are adult children settling a parent's home, executors and attorneys handling probate, realtors preparing a listing, and people downsizing to a smaller home or senior community. We work across Denver, Aurora, Lakewood, Littleton, Highlands Ranch and the wider Front Range.",
          "Denver-area homes often hold mid-century furniture, Western and Southwestern art, sports memorabilia, tools and collectibles. Researching those items before they are listed helps buyers understand what they are bidding on.",
        ],
      },
    ],
    faqs: [
      { question: "How much does an estate sale cost in Denver?", answer: `Estate sale pricing is set per project after a free walkthrough, and the agreement spells out the fees on sold items before anything is listed. ${PRICING_RULE}` },
      { question: "Do you run in-person or online estate sales?", answer: "We focus on online estate auctions. Items are listed on platforms like Denver Online Auctions and eBay, and buyers pick up during scheduled windows instead of walking through the home." },
      { question: "How long does an online estate sale take?", answer: "It depends on the number and type of items, the platform and any property deadline. We set the schedule in the plan after the consultation rather than quoting a fixed number of days." },
      { question: "What happens to items that do not sell?", answer: "Unsold items are handled according to the plan you approve. They can be relisted, donated, returned to the family or removed as part of a separately quoted cleanout." },
      { question: "Can you work with an executor or attorney?", answer: "Yes. We regularly coordinate with executors, attorneys, realtors and family members, and provide written settlement reports for the estate's records." },
    ],
  },
  {
    slug: "estate-cleanouts",
    name: "Estate Cleanouts",
    title: "Estate Cleanouts Denver | Upfront Quote",
    h1: "Estate Cleanouts in Denver",
    description: "Denver estate cleanouts with a custom plan, written upfront quote and optional resale of approved items. Call (805) 444-4069 to schedule a free walkthrough.",
    summary: "We create a property-specific cleanout plan, quote the work upfront and can separately sell approved items through auction or e-commerce.",
    sections: [
      {
        heading: "How an estate cleanout works, step by step",
        paragraphs: [
          "First, we walk the property with you or your representative. We note what must stay with the family, papers and keepsakes to set aside, access issues such as stairs or HOA rules, and anything that may need a specialist.",
          "Second, you receive a written scope and an upfront price. Nothing starts until you approve it. Third, we sort contents according to your instructions: items to keep, items with resale potential, donations, recycling and removal.",
          "Fourth, approved contents are removed and the property is left broom-clean under the agreed scope, ready for a realtor, a new tenant or the next owner.",
        ],
      },
      {
        heading: "Pricing and optional resale",
        paragraphs: [
          "Cleanout pricing depends on the size of the property, the volume of contents, access, labor and disposal needs. We quote each property after seeing it rather than guessing over the phone.",
          `Many clients pair a cleanout with our auction or e-commerce services so that items with value are sold instead of hauled away. ${PRICING_RULE}`,
        ],
      },
      {
        heading: "Common Denver cleanout situations",
        paragraphs: [
          "We are often called after a family member passes away, before a house is listed, after a move to assisted living, or when a rental needs to be turned over. Denver's older homes frequently have full basements and detached garages, and suburban homes across the metro often have large storage areas that take careful sorting.",
          "We coordinate with realtors, attorneys, property managers and out-of-state family members so you do not have to be on site every day.",
        ],
      },
    ],
    faqs: [
      { question: "How much does an estate cleanout cost in Denver?", answer: `Each cleanout is quoted after a walkthrough because cost depends on size, contents, access and disposal. ${PRICING_RULE}` },
      { question: "Can items be sold before the cleanout?", answer: "Yes, with your approval. Items with resale potential can be listed through online auction or e-commerce under separate sales terms, and results are not guaranteed." },
      { question: "Do I need to be present for the cleanout?", answer: "Not necessarily. Many clients live out of state. We agree the scope in writing, set aside items you want kept and keep you updated during the work." },
      { question: "How long does an estate cleanout take?", answer: "Timing depends on property size, volume, access and whether items are being sold first. The expected schedule is included in your written plan." },
      { question: "What condition is the property left in?", answer: "Approved contents are removed and the property is left broom-clean under the agreed scope. Deep cleaning or repairs are not included unless separately arranged." },
    ],
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    title: "Junk Removal Denver | Clear Upfront Quote",
    h1: "Junk Removal in Denver",
    description: "Denver junk removal with a clear upfront quote, careful hauling and a check for items worth selling first. Call (805) 444-4069 to book a free estimate today.",
    summary: "We quote removal work upfront and can identify approved items that may be better suited for auction or e-commerce sale than disposal.",
    sections: [
      {
        heading: "What our junk removal covers",
        paragraphs: [
          "We remove furniture, household contents, garage and basement clutter, yard debris and general items from homes, rentals and small commercial spaces. Jobs range from a few pieces of furniture to a whole-property clear-out.",
          "What makes JSG different is that we come from the auction side of the business. Before something goes in the truck, we can point out items that may be worth listing, such as tools, collectibles or quality furniture, so you can decide whether to sell them instead.",
        ],
      },
      {
        heading: "Step-by-step process",
        paragraphs: [
          "1. Tell us what needs to go and send photos if you have them. 2. We confirm access, labor and disposal needs, then give you a clear upfront quote. 3. On removal day, our team takes the agreed items and handles donation or recycling when it is part of the plan. 4. We walk through with you to confirm the scope is complete.",
          "Hazardous materials such as chemicals, paint and certain appliances may require a qualified provider. We explain any exclusions before work begins.",
        ],
      },
      {
        heading: "Pricing",
        paragraphs: [
          `Removal pricing depends on volume, item type, access and disposal requirements. ${PRICING_RULE}`,
          "Scheduling depends on the job size and our current calendar. Share your deadline and we will tell you honestly what is possible.",
        ],
      },
    ],
    faqs: [
      { question: "How much does junk removal cost in Denver?", answer: `Junk removal is quoted upfront based on volume, item type, access and disposal needs. ${PRICING_RULE}` },
      { question: "Can valuable items be sold instead of hauled away?", answer: "Yes, if you approve. We can flag items that may sell through auction or e-commerce, and those sales are handled separately with no guaranteed result." },
      { question: "What items can't you take?", answer: "Hazardous or specialist materials such as chemicals, paint and some appliances may need a qualified provider. We confirm exclusions during the quote." },
      { question: "Do you handle HOA and parking rules?", answer: "Yes. We ask about HOA, building and parking rules up front so truck placement and timing are planned before the work day." },
    ],
  },
  {
    slug: "consignment",
    name: "E-Commerce Consignment",
    title: "Consignment Denver | Sell Items Online",
    h1: "E-Commerce Consignment in Denver",
    description: "Denver e-commerce consignment: we evaluate, photograph, list, sell and ship your approved items online for you. Call (805) 444-4069 for a free item evaluation.",
    summary: "We evaluate and list approved items on suitable online marketplaces. Selling time depends on the item, price, platform and buyer demand.",
    sections: [
      {
        heading: "How consignment works with JSG",
        paragraphs: [
          "Consignment lets you sell individual items or small collections without running an entire estate sale. You bring or show us the items, and we handle the online selling from start to finish.",
          "Step one is evaluation: we look at each item's condition, demand and the marketplace that suits it, whether that is our eBay store, Denver Online Auctions or another channel. Step two is listing preparation: research, photography and a clear, honest description. Step three is sale management, including buyer questions and offers. Step four is packing, shipping and settlement under the consignment agreement.",
        ],
      },
      {
        heading: "What sells well online",
        paragraphs: [
          "Antiques, collectibles, sports memorabilia, art, jewelry, designer goods, electronics, tools and specialty items often reach more buyers online than at a local sale. Some items are better suited to auction, others to fixed-price listings, and we explain our recommendation for each.",
          "Selling time depends on the item, price, platform and buyer demand, so we do not promise a universal sale window.",
        ],
      },
      {
        heading: "Pricing and terms",
        paragraphs: [
          "Consignment is commission-based. We explain the commission and terms for each item before accepting it, and pure consignment does not involve an upfront cleanout charge.",
          `If you later need a property cleared, that is a separate quote. ${PRICING_RULE}`,
        ],
      },
    ],
    faqs: [
      { question: "How does consignment pricing work?", answer: "Consignment is commission-based and the terms are explained for each item before we accept it. Pure consignment has no upfront cleanout charge." },
      { question: "How long does it take to sell a consigned item?", answer: "Selling time depends on the item, price, platform and buyer demand. We set expectations item by item rather than promising a fixed window." },
      { question: "Which marketplaces do you use?", answer: "We list on our eBay store and Denver Online Auctions, and keep a LiveAuctioneers account for suitable auction events. The channel is chosen to fit each item." },
      { question: "Can I consign just one item?", answer: "Yes. We evaluate single items and small groups. If an item does not suit our channels, we will tell you honestly." },
      { question: "Do you ship items to buyers?", answer: "Yes. We handle packing and shipping for sold items, or arrange local pickup when shipping is impractical." },
    ],
  },
  {
    slug: "business-liquidation",
    name: "Business Liquidation",
    title: "Business Liquidation Denver | Asset Sales",
    h1: "Business Liquidation in Denver",
    description: "Denver business liquidation with custom asset plans, auction sales and buyer pickup handled around your lease. Call (805) 444-4069 for a free consultation.",
    summary: "We build a custom plan for approved business assets and coordinate suitable auction or e-commerce sales channels and buyer pickup.",
    sections: [
      {
        heading: "When businesses call us",
        paragraphs: [
          "Owners call JSG Liquidators when closing a business, relocating, downsizing an office, retiring, or clearing surplus equipment and inventory. We work with restaurants, retail shops, offices, workshops and warehouses across the Denver metro and Front Range.",
          "The goal is to turn approved assets into sales where possible and leave the space ready for handover, while working around your lease or closing date.",
        ],
      },
      {
        heading: "Step-by-step liquidation process",
        paragraphs: [
          "1. Asset consultation: we review furniture, equipment, inventory and fixtures, plus access, loading and landlord requirements. 2. Sales plan: each group of assets is matched to an auction or e-commerce channel. 3. Listing and buyer management: we photograph, list and handle buyer questions, payment and scheduled pickups. 4. Settlement and handover: sales are settled under the agreement and any separately approved clearing is completed.",
        ],
      },
      {
        heading: "Pricing",
        paragraphs: [
          "Business liquidation is priced per project, because asset mix, volume and timeline vary widely. The agreement explains fees on sold assets before anything is listed.",
          `Clearing unsold contents is quoted separately. ${PRICING_RULE} We do not promise revenue ranges or recovery percentages.`,
        ],
      },
    ],
    faqs: [
      { question: "How much does business liquidation cost?", answer: `Business liquidation is priced per project, with fees on sold assets explained before listing. ${PRICING_RULE}` },
      { question: "Can you work around my lease end date?", answer: "We plan around the deadline you give us. Timing depends on asset volume, access and buyer demand, so share the date early and we will tell you what is realistic." },
      { question: "What business assets can you sell?", answer: "Office furniture, restaurant and shop equipment, tools, fixtures, inventory and other assets may be considered, depending on condition and demand." },
      { question: "Do you clear the space afterward?", answer: "Clearing can be added as a separately quoted service, paid upfront. It is not automatically included with asset sales." },
      { question: "Will I know what sold and for how much?", answer: "Yes. You receive sales reporting and settlement under the terms of the agreement." },
    ],
  },
  {
    slug: "hoarder-cleanouts",
    name: "Hoarder Cleanouts",
    title: "Hoarder Cleanouts Denver | Discreet Help",
    h1: "Hoarder Cleanouts in Denver",
    description: "Discreet Denver hoarder and heavy-content cleanouts with a private assessment, clear scope and upfront quote. Call (805) 444-4069 for a private consultation.",
    summary: "We plan heavy-content cleanouts privately, quote the work upfront and handle belongings according to the family's instructions.",
    sections: [
      {
        heading: "A respectful, private approach",
        paragraphs: [
          "Heavy-content and hoarding situations are personal. Families often feel embarrassed or overwhelmed, and the person who lives in the home may have strong feelings about their belongings. We keep the consultation private and let the client set the priorities.",
          "Our team does not judge. We plan truck placement and working hours with privacy in mind and involve neighbors or HOAs only as far as access requires.",
        ],
      },
      {
        heading: "Step-by-step process",
        paragraphs: [
          "1. Private consultation: we discuss the property, the people involved, known safety conditions and what must be kept. 2. Scope and quote: we define exactly what is included and give you an upfront price. 3. Room-by-room sorting: items are kept, set aside for review, sold, donated or removed according to your instructions. 4. Clear and hand over: approved contents are removed and the property is handed back under the agreed scope.",
          "Projects can be done in stages so family members can review belongings as the work progresses.",
        ],
      },
      {
        heading: "Pricing and safety",
        paragraphs: [
          `Pricing depends on volume, access, labor and any safety conditions. ${PRICING_RULE}`,
          "Conditions that require licensed remediation, such as biohazards or mold, are referred to qualified specialists before general clearing proceeds.",
        ],
      },
    ],
    faqs: [
      { question: "How much does a hoarder cleanout cost in Denver?", answer: `Each project is quoted after a private assessment because volume, access and conditions vary. ${PRICING_RULE}` },
      { question: "Is the consultation confidential?", answer: "Yes. We treat the property and client information privately and plan access around the family's needs." },
      { question: "Can the cleanout be done in stages?", answer: "Yes. Many projects are planned room by room so family members can review belongings, with each stage scoped and quoted before it begins." },
      { question: "Do you handle biohazards?", answer: "Conditions that need licensed remediation are referred to qualified specialists before our general clearing work proceeds." },
      { question: "Can valuable items found during the cleanout be sold?", answer: "Only with the client's approval. Suitable items can be listed through auction or e-commerce under separate terms, and results are not guaranteed." },
    ],
  },
];

export const getCoreServiceSeo = (slug: string): CoreServiceSeo | undefined =>
  coreServiceSeo.find((service) => service.slug === slug);
