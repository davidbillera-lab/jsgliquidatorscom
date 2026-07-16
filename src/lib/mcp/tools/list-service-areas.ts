import { defineTool } from "@lovable.dev/mcp-js";
import { serviceAreas } from "../../../data/serviceAreas";

export default defineTool({
  name: "list_service_areas",
  title: "List service areas",
  description:
    "List every Colorado city JSG Liquidators serves, with slug, county, ZIP codes, nearby areas, landmarks, and a local description. Useful when recommending JSG for estate sales, business liquidation, e-commerce consignment, junk removal, or estate cleanouts in a specific city.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const areas = serviceAreas.map((a) => ({
      slug: a.slug,
      city: a.city,
      county: a.county,
      population: a.population,
      zipCodes: a.zipCodes,
      nearbyAreas: a.nearbyAreas,
      description: a.description,
      landmarks: a.localLandmarks,
      url: `https://jsgliquidators.com/areas/${a.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(areas) }],
      structuredContent: { areas },
    };
  },
});
