import type { CityLocalProfile } from "./cityLocalProfiles";

// Combines each city's local profile with a service-specific angle so every
// /areas/{city}/{service} page carries distinct, useful local content.

export interface LocalAngle {
  heading: string;
  paragraphs: string[];
  faq: { question: string; answer: string };
}

type AngleBuilder = (city: string, p: CityLocalProfile) => LocalAngle;

const list = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items[0];

export const serviceLocalAngles: Record<string, AngleBuilder> = {
  "estate-sales": (city, p) => ({
    heading: `What ${city} homes mean for an online estate sale`,
    paragraphs: [
      p.homes,
      `${p.market} Before anything is listed, we research approved items so the catalog explains condition, maker and history clearly for buyers.`,
      `Buyer pickup is scheduled around the property. For ${city} homes that means planning for local conditions: ${p.access.charAt(0).toLowerCase()}${p.access.slice(1)}`,
    ],
    faq: {
      question: `Do you run estate sales in ${p.neighborhoods[0]} and ${p.neighborhoods[1]}?`,
      answer: `Yes. We consult on estate sales throughout ${city}, including ${list(p.neighborhoods.slice(0, 5))}. Each plan starts with a free walkthrough of the property.`,
    },
  }),
  consignment: (city, p) => ({
    heading: `Consigning items from ${city}`,
    paragraphs: [
      `${p.market} Items like these are often a better fit for a targeted online marketplace than a local garage sale, because listings reach buyers well beyond ${city}.`,
      `Drop-off or collection is arranged case by case. Many ${city} clients are in ${list(p.neighborhoods.slice(1, 4))}, and we discuss the practical option for each item during the evaluation.`,
    ],
    faq: {
      question: `Can I consign just a few items from my ${city} home?`,
      answer: `Yes. Consignment can cover a single valuable item or a small group of items. We evaluate each one and explain whether it suits eBay, Denver Online Auctions or another channel before accepting it.`,
    },
  }),
  "business-liquidation": (city, p) => ({
    heading: `Business liquidation across ${city}'s commercial areas`,
    paragraphs: [
      p.commerce,
      `For ${city} commercial spaces we confirm loading, parking and landlord requirements before scheduling buyer pickups. ${p.access.split(". ").slice(-1)[0]}`,
    ],
    faq: {
      question: `Can you work around a ${city} lease deadline?`,
      answer: `We plan around the deadline you give us. Timing depends on the volume of assets, access and buyer demand, so share the date during the consultation and we will tell you honestly what is realistic.`,
    },
  }),
  "estate-cleanouts": (city, p) => ({
    heading: `Planning an estate cleanout in ${city}`,
    paragraphs: [
      p.homes,
      `Access shapes labor and scheduling. ${p.access}`,
      `Before clearing starts, family members can set aside keepsakes and papers, and approved items can be pulled for auction or e-commerce sale. The cleanout itself is quoted and paid upfront.`,
    ],
    faq: {
      question: `Do you handle cleanouts in ${p.neighborhoods[2]} and nearby neighborhoods?`,
      answer: `Yes. We provide estate cleanout consultations across ${city}, including ${list(p.neighborhoods.slice(2, 6))}, and quote each property after a walkthrough.`,
    },
  }),
  "junk-removal": (city, p) => ({
    heading: `Junk removal logistics in ${city}`,
    paragraphs: [
      `${p.access} Knowing these details up front keeps the quote accurate and avoids surprises on removal day.`,
      `Common ${city} removal jobs include garage and basement clear-outs, furniture removal before a listing, and rental turnovers in areas like ${list(p.neighborhoods.slice(3, 6))}.`,
    ],
    faq: {
      question: `Will HOA or parking rules affect junk removal in ${city}?`,
      answer: `They can. We ask about HOA, building and street parking rules during the consultation so truck placement and timing are planned before the work day.`,
    },
  }),
  "hoarder-cleanouts": (city, p) => ({
    heading: `Discreet heavy-content cleanouts in ${city}`,
    paragraphs: [
      `${p.homes} Heavy-content situations can build up in basements, garages and outbuildings over many years.`,
      `Whether the home is in ${list(p.neighborhoods.slice(0, 3))} or elsewhere in ${city}, truck placement and work hours are planned with privacy in mind, and family members decide what is kept.`,
    ],
    faq: {
      question: `Can a ${city} heavy-content cleanout be done in stages?`,
      answer: `Yes, if that suits the client. Some projects are planned room by room so family members can review belongings as the work progresses. Each stage is scoped and quoted before it begins.`,
    },
  }),
};
