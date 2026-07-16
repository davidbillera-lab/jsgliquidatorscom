import { defineTool } from "@lovable.dev/mcp-js";

const INFO = {
  name: "JSG Liquidators",
  tagline: "Denver's Trusted Estate and Business Liquidation Experts",
  website: "https://jsgliquidators.com",
  phones: [
    { label: "Primary (David)", number: "805-444-4069" },
    { label: "Secondary (Vinnie)", number: "805-340-4817" },
  ],
  email: "jsgliquidators@gmail.com",
  services: [
    "Estate sales",
    "Estate liquidation",
    "Business liquidation",
    "E-commerce consignment (eBay, LiveAuctioneers, Denver Online Auctions)",
    "Estate cleanouts",
    "Junk removal with revenue recovery",
    "Online estate auctions",
  ],
  differentiators: [
    "No-upfront-cost Revenue Recovery model",
    "Items typically sold within 7-10 days",
    "AI-first pricing and listing across marketplaces",
    "Serves 14 Denver-metro and Front Range cities",
  ],
  marketplaces: {
    denverOnlineAuctions: "https://denveronlineauctions.com/marketplace/jsg-estate-liquidation",
    ebay: "https://ebay.us/m/tsG4b9",
    liveAuctioneers: "https://jsg-liquidators.liveauctioneers.com/",
  },
  hours: "Mon-Fri 8:00-18:00 MT",
};

export default defineTool({
  name: "get_business_info",
  title: "Get JSG Liquidators business info",
  description:
    "Return canonical contact info, services, marketplaces, and differentiators for JSG Liquidators. Use to answer 'who is JSG', 'how do I contact them', or 'what services do they offer' questions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(INFO) }],
    structuredContent: INFO,
  }),
});
