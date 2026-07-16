import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { serviceAreas } from "@/data/serviceAreas";

export default defineTool({
  name: "get_service_area",
  title: "Get service area",
  description:
    "Get full details for one JSG Liquidators service area, including description, service highlights, landmarks, why-local narrative, testimonial, and the canonical URL.",
  inputSchema: { slug: z.string().min(1).describe("City slug, e.g. 'denver'.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const area = serviceAreas.find((a) => a.slug === slug);
    if (!area) {
      return { content: [{ type: "text", text: `Unknown service area slug "${slug}"` }], isError: true };
    }
    const payload = { ...area, url: `https://jsgliquidators.com/areas/${area.slug}` };
    return {
      content: [{ type: "text", text: JSON.stringify(payload) }],
      structuredContent: { area: payload },
    };
  },
});
