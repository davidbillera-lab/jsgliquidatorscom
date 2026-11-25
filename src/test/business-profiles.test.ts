import { describe, expect, it } from "vitest";
import { businessProfiles } from "@/data/businessProfiles";
import { BUSINESS_ID, siteSchemaGraph } from "@/data/siteSchema";

describe("Owner-approved business profiles", () => {
  it("uses exactly the six supplied URLs without tracking or pending profiles", () => {
    const expected = [
      "https://www.facebook.com/jsgliquidators",
      "https://www.instagram.com/jsgliquidators1",
      "https://nextdoor.com/page/jsg-estate-liquidators-littleton-co/",
      "https://www.estatesales.net/companies/CO/Littleton/80129/166733",
      "https://www.declutt.com/denver/providers/jsg-estate-liquidators",
      "https://www.yelp.com/biz/jsg-estate-liquidators-littleton",
    ];
    expect(businessProfiles.map((profile) => profile.url)).toEqual(expected);
    const business = siteSchemaGraph["@graph"].find((node) => node["@id"] === BUSINESS_ID);
    expect(business && "sameAs" in business ? business.sameAs : null).toEqual(expected);
  });

  it("keeps one business identity and its existing contact and area details", () => {
    const businesses = siteSchemaGraph["@graph"].filter((node) =>
      Array.isArray(node["@type"]) && node["@type"].includes("LocalBusiness"),
    );
    expect(businesses).toHaveLength(1);
    expect(businesses[0]).toMatchObject({
      "@id": "https://jsgliquidators.com/#business",
      name: "JSG Liquidators",
      telephone: "+1-805-444-4069",
      address: { "@type": "PostalAddress", addressLocality: "Denver", addressRegion: "CO", addressCountry: "US" },
    });
  });
});