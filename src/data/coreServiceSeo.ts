export interface CoreServiceSeo {
  slug: string;
  name: string;
  title: string;
  h1: string;
  description: string;
  summary: string;
}

export const coreServiceSeo: CoreServiceSeo[] = [
  {
    slug: "estate-sales",
    name: "Estate Sales & Online Auctions",
    title: "Denver Estate Sales & Online Auctions",
    h1: "JSG Liquidators | Estate Sales & Online Auctions in Denver",
    description: "Denver estate sales and online auctions with item research, photography, listings, buyer coordination and a free consultation.",
    summary: "We research, photograph and list approved estate items through online auction channels, then coordinate buyer payment and pickup.",
  },
  {
    slug: "estate-cleanouts",
    name: "Estate Cleanouts",
    title: "Denver Estate Cleanouts",
    h1: "JSG Liquidators | Estate Cleanouts in Denver",
    description: "Denver estate cleanouts with a custom property plan, an upfront cleanout quote and optional auction or e-commerce resale services.",
    summary: "We create a property-specific cleanout plan, quote the work upfront and can separately sell approved items through auction or e-commerce.",
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    title: "Denver Junk Removal",
    h1: "JSG Liquidators | Junk Removal in Denver",
    description: "Denver junk removal with a clear upfront quote, property clearing and optional evaluation of approved items for resale.",
    summary: "We quote removal work upfront and can identify approved items that may be better suited for auction or e-commerce sale than disposal.",
  },
  {
    slug: "consignment",
    name: "E-Commerce Consignment",
    title: "Denver E-Commerce Consignment",
    h1: "JSG Liquidators | E-Commerce Consignment in Denver",
    description: "Denver e-commerce consignment with item evaluation, photography, online listings, buyer communication, packing and shipping.",
    summary: "We evaluate and list approved items on suitable online marketplaces. Selling time depends on the item, price, platform and buyer demand.",
  },
  {
    slug: "business-liquidation",
    name: "Business Liquidation",
    title: "Denver Business Liquidation",
    h1: "JSG Liquidators | Business Liquidation in Denver",
    description: "Denver business liquidation with custom asset planning, online sales options, buyer coordination and a free consultation.",
    summary: "We build a custom plan for approved business assets and coordinate suitable auction or e-commerce sales channels and buyer pickup.",
  },
];

export const getCoreServiceSeo = (slug: string): CoreServiceSeo | undefined =>
  coreServiceSeo.find((service) => service.slug === slug);