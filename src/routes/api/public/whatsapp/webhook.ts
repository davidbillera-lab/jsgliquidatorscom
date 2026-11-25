import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhookRequest } from "@lovable.dev/webhooks-js";
import { handleInboundMessage } from "@/server/ai/whatsappAssistant";

type WhatsAppMessage = {
  id?: string;
  from?: string;
  type?: string;
  text?: { body?: string };
};

type WhatsAppValue = {
  messages?: WhatsAppMessage[];
  contacts?: { profile?: { name?: string } }[];
  statuses?: unknown[];
};

function extractMessages(payload: unknown): { messages: WhatsAppMessage[]; name?: string } {
  const body = payload as { entry?: { changes?: { value?: WhatsAppValue }[] }[] };
  const value = body?.entry?.[0]?.changes?.[0]?.value ?? {};
  const name = value.contacts?.[0]?.profile?.name;
  return { messages: value.messages ?? [], ...(name ? { name } : {}) };
}

async function processEvent(eventRow: { id: string; event: string; payload: unknown }) {
  if (eventRow.event === "whatsapp.message") {
    const { messages, name } = extractMessages(eventRow.payload);
    for (const msg of messages) {
      if (!msg.id || !msg.from) continue;
      const text = msg.text?.body?.trim();
      if (msg.type !== "text" || !text) {
        // Non-text message: acknowledge and hand to David via a simple note.
        await handleInboundMessage({
          phone: msg.from,
          messageId: msg.id,
          text: "[Customer sent a photo, document or other media that I cannot view]",
          ...(name ? { customerName: name } : {}),
        });
        continue;
      }
      await handleInboundMessage({
        phone: msg.from,
        messageId: msg.id,
        text,
        ...(name ? { customerName: name } : {}),
      });
    }
  }
  // Other events (statuses, template updates, account updates) are stored in the
  // inbox for the record; no processing needed for the assistant.
}

export const Route = createFileRoute("/api/public/whatsapp/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.WHATSAPP_API_KEY;
        if (!secret) {
          return Response.json({ error: "WhatsApp is not configured." }, { status: 500 });
        }

        let payload: unknown;
        try {
          const verified = await verifyWebhookRequest({
            req: request,
            secret,
            maxBodyBytes: 4 * 1024 * 1024,
            parser: (body: string) => JSON.parse(body) as unknown,
          });
          payload = verified.payload;
        } catch {
          return Response.json({ error: "Invalid signature." }, { status: 401 });
        }

        const deliveryId = request.headers.get("X-Lovable-Delivery")?.trim();
        const event = request.headers.get("X-Lovable-Event")?.trim();
        if (!deliveryId || !event) {
          return Response.json({ error: "Missing delivery headers." }, { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Durable inbox: insert first, dedupe on delivery_id.
        const { data: existing } = await supabaseAdmin
          .from("whatsapp_webhook_events")
          .select("id, processed_at")
          .eq("delivery_id", deliveryId)
          .maybeSingle();

        let eventRow: { id: string; event: string; payload: unknown } | null = null;
        if (existing) {
          if (existing.processed_at) return Response.json({ ok: true, duplicate: true });
          eventRow = { id: existing.id, event, payload };
        } else {
          const { data: inserted, error: insertError } = await supabaseAdmin
            .from("whatsapp_webhook_events")
            .insert({ delivery_id: deliveryId, event, payload: payload as never })
            .select("id")
            .single();
          if (insertError || !inserted) {
            return Response.json({ error: `Inbox write failed: ${insertError?.message}` }, { status: 500 });
          }
          eventRow = { id: inserted.id, event, payload };
        }

        try {
          await processEvent(eventRow);
          const { error: markError } = await supabaseAdmin
            .from("whatsapp_webhook_events")
            .update({ processed_at: new Date().toISOString(), processing_error: null })
            .eq("id", eventRow.id);
          if (markError) throw new Error(markError.message);
          return Response.json({ ok: true });
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          await supabaseAdmin
            .from("whatsapp_webhook_events")
            .update({ processing_error: message, attempts: 1 })
            .eq("id", eventRow.id);
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
