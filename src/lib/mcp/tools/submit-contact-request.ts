import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_contact_request",
  title: "Submit a contact request",
  description:
    "Submit a new lead / contact request for JSG Liquidators. Requires the caller to be signed in via OAuth. Use for estate sale, business liquidation, consignment, or cleanout inquiries.",
  inputSchema: {
    name: z.string().min(1).max(120).describe("Contact's full name."),
    email: z.string().email().describe("Contact email."),
    phone: z.string().min(7).max(30).optional().describe("Phone number (optional)."),
    service: z
      .enum(["estate_sale", "estate_liquidation", "business_liquidation", "consignment", "cleanout", "other"])
      .describe("Which service they need."),
    city: z.string().min(1).max(80).describe("Colorado city or neighborhood."),
    message: z.string().min(1).max(2000).describe("Describe the situation, timeline, and any high-value items."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Sign in required to submit a contact request." }], isError: true };
    }
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        user_id: ctx.getUserId(),
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        service_type: input.service,
        city: input.city,
        message: input.message,
        source: "mcp",
      })
      .select()
      .maybeSingle();
    if (error) {
      return {
        content: [{ type: "text", text: `Could not save contact request: ${error.message}` }],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `Contact request received. JSG Liquidators will reach out at ${input.email}. Ref: ${data?.id ?? "created"}.`,
        },
      ],
      structuredContent: { submission: data },
    };
  },
});
