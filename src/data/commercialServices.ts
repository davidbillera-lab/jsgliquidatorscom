// Commercial clean-out pages (hotel, office, commercial parent). Owner-confirmed projects only.
export interface CommercialService {
  slug: string;
  name: string;
  title: string;
  h1: string;
  description: string;
  summary: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  faqs: { question: string; answer: string }[];
  related: string[];
}

const PRICING =
  "Every commercial clean-out is quoted case by case after a walk-through, and the clean-out portion is paid upfront. If furniture, fixtures or equipment are worth selling, an optional auction may help recoup some or all of that cost, but sale results are never guaranteed.";

const PROJECTS =
  "Commercial projects we have liquidated include the Mint House hotel (a full clean-out of every room, with all furniture and equipment sold at auction), the Marina at Pelican Bay, and the Hilton Home2 Suites in Highlands Ranch, along with many other commercial properties.";

export const commercialServices: CommercialService[] = [
  {
    slug: "commercial-cleanouts",
    name: "Commercial Clean-Outs",
    title: "Commercial Clean-Outs Denver | Asset Recovery",
    h1: "Commercial Clean-Outs in Denver",
    description: "Denver commercial clean-outs for hotels, offices, restaurants, retail and warehouses, with optional auctions of usable assets. Call (805) 444-4069 for a walk-through.",
    summary: "We clear hotels, offices, restaurants, retail spaces and warehouses across the Denver metro, and can auction usable furniture, fixtures and equipment.",
    sections: [
      {
        heading: "What a commercial clean-out covers",
        paragraphs: [
          "A commercial clean-out empties a business property so it can be renovated, re-leased, sold or handed back to a landlord. JSG Liquidators handles the sorting, removal and hauling, and we look at what is inside before anything is thrown away.",
          "Usable furniture, fixtures, equipment and bulk inventory can go to auction instead of a dumpster. What does not sell is donated, recycled or disposed of properly.",
        ],
        bullets: [
          "Hotels and lodging: guest rooms, common areas, FF&E and board rooms",
          "Offices: workstations, conference furniture, electronics and files",
          "Restaurants: kitchen equipment, seating, smallwares and decor",
          "Retail: shelving, displays, fixtures and leftover stock",
          "Warehouses: racking, tools, equipment and bulk inventory",
        ],
      },
      {
        heading: "Commercial properties we have cleared",
        paragraphs: [PROJECTS],
      },
      {
        heading: "How commercial asset recovery works",
        paragraphs: [
          "We start with a walk-through to see the property, the deadline and what may have resale value. You get a written quote for the clean-out and, if it makes sense, a plan for auctioning approved assets through Denver Online Auctions or our eBay store.",
          "Work can be phased around operations, tenant move-outs or a renovation schedule. We coordinate buyer pickup windows so you are not managing strangers on site.",
        ],
      },
      { heading: "How pricing works", paragraphs: [PRICING] },
    ],
    faqs: [
      { question: "What types of commercial properties do you clean out?", answer: "We clear hotels, offices, restaurants, retail stores and warehouses across the Denver metro and Front Range." },
      { question: "How much does a commercial clean-out cost?", answer: PRICING },
      { question: "Can you sell the furniture and equipment instead of hauling it away?", answer: "Yes. Approved furniture, fixtures, equipment and inventory can be sold through online auction. Proceeds may help offset the clean-out cost, but results depend on what sells and are not guaranteed." },
      { question: "Have you done large commercial projects before?", answer: PROJECTS },
      { question: "Can you work around a renovation or lease deadline?", answer: "Yes. We plan the clean-out around your deadline and can phase the work floor by floor or area by area." },
      { question: "What happens to items that don't sell?", answer: "Items that don't sell are donated, recycled or disposed of properly as part of the clean-out." },
    ],
    related: ["hotel-cleanouts", "office-cleanouts"],
  },
  {
    slug: "hotel-cleanouts",
    name: "Hotel Clean-Outs",
    title: "Hotel Clean-Outs Denver | FF&E Liquidation",
    h1: "Hotel Clean-Outs & FF&E Liquidation in Denver",
    description: "Full Denver hotel clean-outs: guest rooms, FF&E, common areas and board rooms, phased around renovation, with optional auctions. Call (805) 444-4069 for a walk-through.",
    summary: "We clear entire hotels room by room, including guest rooms, FF&E, common areas and board rooms, and can auction the furniture and equipment.",
    sections: [
      {
        heading: "Full hotel clean-outs",
        paragraphs: [
          "Hotel clean-outs usually come before a renovation, rebrand, sale or demolition. JSG Liquidators clears the whole property: guest rooms, lobbies and common areas, board and meeting rooms, back-of-house storage and equipment.",
          "Furniture, fixtures and equipment (FF&E) such as beds, case goods, seating, lighting, televisions and commercial equipment can be sold at auction rather than sent to a landfill.",
        ],
      },
      {
        heading: "Phased, room-by-room clearing",
        paragraphs: [
          "We work floor by floor or room by room, so clearing can line up with your contractor's renovation or demolition schedule. Multi-floor properties are planned around elevator access, loading areas and the order your crews need.",
          "Anything that is not sold is donated, recycled or disposed of properly.",
        ],
      },
      {
        heading: "Case study: Mint House hotel",
        paragraphs: [
          "At the Mint House hotel we completed a full clean-out of every room and sold all of the furniture and equipment at auction. We have also liquidated the Marina at Pelican Bay and the Hilton Home2 Suites in Highlands Ranch.",
        ],
      },
      { heading: "How pricing works", paragraphs: [PRICING] },
    ],
    faqs: [
      { question: "How long does a hotel clean-out take?", answer: "It depends on the number of rooms, floors, access and your renovation schedule. We set a timeline during the walk-through and can phase the work room by room." },
      { question: "How is a hotel clean-out priced?", answer: PRICING },
      { question: "What happens to the furniture and fixtures?", answer: "Approved FF&E can be sold at online auction, as we did for every room at the Mint House hotel. Items that don't sell are donated, recycled or disposed of." },
      { question: "Do you handle multi-floor properties?", answer: "Yes. We plan multi-floor clean-outs around elevators, loading access and your contractors' sequence." },
      { question: "Can you work around renovation or demolition crews?", answer: "Yes. Clearing is phased to match your renovation or demolition schedule so crews can start on cleared floors." },
      { question: "Which hotels have you worked on?", answer: "We completed a full clean-out and auction of all furniture and equipment at the Mint House hotel, and have liquidated the Marina at Pelican Bay and the Hilton Home2 Suites in Highlands Ranch." },
    ],
    related: ["commercial-cleanouts", "office-cleanouts"],
  },
  {
    slug: "office-cleanouts",
    name: "Office Clean-Outs",
    title: "Office Clean-Outs Denver | Furniture & E-Waste",
    h1: "Office Clean-Outs in Denver",
    description: "Denver office clean-outs: furniture, equipment and inventory cleared around your move-out deadline, with e-waste recycling and optional auctions. Call (805) 444-4069.",
    summary: "We clear office furniture, equipment and inventory around your move-out date, recycle e-waste and can auction usable items.",
    sections: [
      {
        heading: "What we clear from offices",
        paragraphs: [
          "Office clean-outs cover desks and workstations, chairs, conference tables, filing cabinets, break-room appliances, electronics and leftover inventory. We sort what can be sold, what can be donated and what needs recycling.",
        ],
      },
      {
        heading: "Phased around your business",
        paragraphs: [
          "If your team is still working, we can clear in phases by floor or department so operations keep running. We plan the schedule around your lease end or move-out deadline.",
        ],
      },
      {
        heading: "E-waste and recycling",
        paragraphs: [
          "Computers, monitors, printers and other electronics are separated from general waste and sent for recycling. Usable furniture and equipment can be listed at auction to help offset costs.",
        ],
      },
      { heading: "Commercial experience", paragraphs: [PROJECTS] },
      { heading: "How pricing works", paragraphs: [PRICING] },
    ],
    faqs: [
      { question: "How much does an office clean-out cost?", answer: PRICING },
      { question: "Can you clear the office while we are still working?", answer: "Yes. We can phase the clean-out by floor or department to keep your business running." },
      { question: "What do you do with old computers and electronics?", answer: "Electronics are separated and sent for e-waste recycling rather than general disposal." },
      { question: "Can office furniture be sold?", answer: "Usable furniture and equipment can be sold through online auction. Proceeds may help offset costs but are not guaranteed." },
      { question: "Can you meet a lease-end deadline?", answer: "We plan the schedule around your move-out or lease-end date during the walk-through." },
    ],
    related: ["commercial-cleanouts", "hotel-cleanouts"],
  },
];

export const getCommercialService = (slug: string) => commercialServices.find((s) => s.slug === slug);
