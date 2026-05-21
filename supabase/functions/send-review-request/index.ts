// Sends a Google review request email via Resend.
// POST { customerName, customerEmail, jobType?, reviewUrl? }
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const DEFAULT_REVIEW_URL = "https://g.page/r/JSG-Liquidators/review"; // replace with actual Google review link

const BodySchema = z.object({
  customerName: z.string().min(1).max(120),
  customerEmail: z.string().email(),
  jobType: z.string().max(120).optional(),
  reviewUrl: z.string().url().optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Resend not configured. Connect the Resend connector." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { customerName, customerEmail, jobType, reviewUrl } = parsed.data;
    const link = reviewUrl || DEFAULT_REVIEW_URL;
    const job = jobType ? ` for your ${jobType}` : "";

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
        <h2 style="color:#1e3a5f">Thanks for choosing JSG Liquidators, ${customerName}!</h2>
        <p>It was our pleasure helping you${job}. If we earned it, would you take 60 seconds to leave us a Google review? It genuinely helps other Denver families find us when they need help.</p>
        <p style="text-align:center;margin:32px 0">
          <a href="${link}" style="background:#1e3a5f;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Leave a Google Review</a>
        </p>
        <p>If anything wasn't perfect, just reply to this email — David reads every response.</p>
        <p style="color:#64748b;font-size:13px;margin-top:32px">
          JSG Liquidators &middot; Denver, CO &middot; (805) 444-4069<br/>
          Denver's trusted estate &amp; business liquidation experts
        </p>
      </div>
    `;

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "JSG Liquidators <onboarding@resend.dev>",
        to: [customerEmail],
        reply_to: "jsgliquidators@gmail.com",
        subject: `${customerName}, would you share a quick review?`,
        html,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: resp.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
