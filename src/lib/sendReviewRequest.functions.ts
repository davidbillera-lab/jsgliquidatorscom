import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Sends a Google review request email via Resend. Admin-only.
const DEFAULT_REVIEW_URL = "https://g.page/r/JSG-Liquidators/review";
const REVIEW_URL_ALLOWLIST =
  /^https:\/\/(g\.page\/|(?:www\.)?google\.com\/|maps\.google\.com\/|search\.google\.com\/local\/writereview)/i;

const BodySchema = z.object({
  accessToken: z.string().min(1),
  customerName: z.string().min(1).max(120),
  customerEmail: z.string().email(),
  jobType: z.string().max(120).optional(),
  reviewUrl: z.string().url().regex(REVIEW_URL_ALLOWLIST, "reviewUrl must be a Google review URL").optional(),
});

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export const sendReviewRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => BodySchema.parse(input))
  .handler(async ({ data }) => {
    const resendKey = process.env["RESEND_API_KEY"];
    const supabaseUrl = process.env["SUPABASE_URL"] ?? import.meta.env.VITE_SUPABASE_URL;
    const anonKey =
      process.env["SUPABASE_PUBLISHABLE_KEY"] ??
      process.env["SUPABASE_ANON_KEY"] ??
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!resendKey || !supabaseUrl || !anonKey) throw new Error("Server not configured.");

    // Verify the caller's session, then check the admin role as that user (RLS applies).
    const sb = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${data.accessToken}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: userRes, error: userErr } = await sb.auth.getUser(data.accessToken);
    if (userErr || !userRes.user) throw new Error("Unauthorized");

    const { data: role } = await sb
      .from("user_roles")
      .select("role")
      .eq("user_id", userRes.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!role) throw new Error("Forbidden");

    const { customerName, customerEmail, jobType, reviewUrl } = data;
    const link = reviewUrl || DEFAULT_REVIEW_URL;
    const name = escapeHtml(customerName);
    const job = jobType ? ` for your ${escapeHtml(jobType)}` : "";

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
        <h2 style="color:#1e3a5f">Thanks for choosing JSG Liquidators, ${name}!</h2>
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

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "JSG Liquidators <onboarding@resend.dev>",
        to: [customerEmail],
        reply_to: "jsgliquidators@jsgliquidators.com",
        subject: `${customerName}, would you share a quick review?`,
        html,
      }),
    });

    const result = (await resp.json()) as { id?: string; message?: string };
    if (!resp.ok) throw new Error(result.message ?? `Email send failed (${resp.status})`);
    return { ok: true as const, id: result.id ?? "" };
  });
