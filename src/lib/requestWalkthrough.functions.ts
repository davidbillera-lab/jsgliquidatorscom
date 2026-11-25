import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Resend test mode only delivers to the account owner's address.
// Switch back to jsgliquidators@gmail.com once a sending domain is verified.
const TO_EMAIL = "davidbillera@gmail.com";
const FROM_EMAIL = "JSG Liquidators <onboarding@resend.dev>";

export const TIME_WINDOWS = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
] as const;

const WalkthroughSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().max(255).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  phone: z.string().trim().min(7).max(20),
  propertyCity: z.string().trim().min(1).max(100),
  propertyAddress: z.string().trim().max(200).optional().default(""),
  serviceInterest: z.string().trim().max(100).optional().default(""),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((d) => {
      const date = new Date(`${d}T12:00:00`);
      const day = date.getDay();
      return day >= 1 && day <= 5;
    }, "Walk-throughs are scheduled Monday through Friday"),
  preferredTimeWindow: z.enum(TIME_WINDOWS),
  notes: z.string().trim().max(2000).optional().default(""),
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const requestWalkthrough = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => WalkthroughSchema.parse(input))
  .handler(async ({ data }) => {
    const {
      name,
      email,
      phone,
      propertyCity,
      propertyAddress,
      serviceInterest,
      preferredDate,
      preferredTimeWindow,
      notes,
    } = data;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: insertError } = await supabaseAdmin.from("walkthrough_requests").insert({
      name,
      email,
      phone,
      property_city: propertyCity,
      property_address: propertyAddress,
      service_interest: serviceInterest,
      preferred_date: preferredDate,
      preferred_time_window: preferredTimeWindow,
      notes,
    });
    if (insertError) {
      console.error("Walkthrough insert failed:", insertError.message);
      throw new Error("Could not save request");
    }

    const formattedDate = new Date(`${preferredDate}T12:00:00`).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const html = `
      <h2>New Walk-Through Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Property city:</strong> ${escapeHtml(propertyCity)}</p>
      ${propertyAddress ? `<p><strong>Property address:</strong> ${escapeHtml(propertyAddress)}</p>` : ""}
      ${serviceInterest ? `<p><strong>Service interest:</strong> ${escapeHtml(serviceInterest)}</p>` : ""}
      <p><strong>Preferred date:</strong> ${escapeHtml(formattedDate)}</p>
      <p><strong>Preferred time:</strong> ${escapeHtml(preferredTimeWindow)}</p>
      ${notes ? `<p><strong>Notes:</strong></p><p style="white-space:pre-wrap">${escapeHtml(notes)}</p>` : ""}
    `;

    const apiKey = process.env["RESEND_API_KEY"];
    if (apiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: [TO_EMAIL],
            reply_to: email,
            subject: `Walk-Through Request: ${name} — ${formattedDate} ${preferredTimeWindow}`,
            html,
          }),
        });
        if (!res.ok) {
          console.error(`Resend failed [${res.status}]: ${await res.text()}`);
        }
      } catch (err) {
        // Request is stored; never surface an email failure to the visitor.
        console.error("Walkthrough email failed:", err);
      }
    }

    return { success: true as const };
  });
