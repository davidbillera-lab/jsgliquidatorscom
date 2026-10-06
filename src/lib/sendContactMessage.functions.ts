import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Resend test mode only delivers to the account owner's address.
// Switch back to jsgliquidators@gmail.com once a sending domain is verified.
const TO_EMAIL = "davidbillera@gmail.com";
const FROM_EMAIL = "JSG Liquidators <onboarding@resend.dev>";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().max(255).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  phone: z.string().trim().max(20).optional().default(""),
  service: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(1).max(2000),
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) throw new Error("RESEND_API_KEY not configured");

    const { name, email, phone, service, message } = data;
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${service ? `<p><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Lead: ${name}${service ? ` — ${service}` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const details = await res.text();
      console.error(`Resend failed [${res.status}]: ${details}`);
      throw new Error("Email send failed");
    }

    return { success: true as const };
  });
