import { generateText, tool, type ModelMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { buildAskJsgInstructions } from "./askJsgContext";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/whatsapp";
const DAVID_PHONE = "18054444069"; // David Billera, (805) 444-4069
const DENVER_TZ = "America/Denver";
const SLOT_MINUTES = 60;

export function getWhatsAppConfig() {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const waKey = process.env.WHATSAPP_API_KEY;
  if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
  if (!waKey) throw new Error("WHATSAPP_API_KEY is not configured");
  return { lovableKey, waKey };
}

export async function sendWhatsAppText(to: string, body: string) {
  const { lovableKey, waKey } = getWhatsAppConfig();
  const response = await fetch(`${GATEWAY_URL}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": waKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    }),
  });
  const responseBody = await response.text();
  if (!response.ok) {
    throw new Error(`WhatsApp send failed (${response.status}): ${responseBody}`);
  }
  return JSON.parse(responseBody) as { messages?: { id: string }[] };
}

// ---- Booking helpers (Denver local time, Mon-Fri 8:00-18:00, 1-hour slots) ----

function denverParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: DENVER_TZ,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts: Record<string, string> = {};
  for (const p of fmt.formatToParts(date)) parts[p.type] = p.value;
  return parts;
}

export function isBookableSlot(startsAt: Date): { ok: boolean; reason?: string } {
  if (startsAt.getTime() < Date.now() + 60 * 60 * 1000) {
    return { ok: false, reason: "Slot must be at least 1 hour in the future." };
  }
  const p = denverParts(startsAt);
  if (p.weekday === "Sat" || p.weekday === "Sun") {
    return { ok: false, reason: "Walk-throughs run Monday to Friday only." };
  }
  const hour = Number(p.hour);
  const minute = Number(p.minute);
  if (minute !== 0 || hour < 8 || hour > 17) {
    return { ok: false, reason: "Slots start on the hour between 8am and 5pm Denver time (last start 5pm)." };
  }
  return { ok: true };
}

export function listOpenSlots(bookedStarts: number[], count = 5): string[] {
  const slots: string[] = [];
  const cursor = new Date(Date.now() + 2 * 60 * 60 * 1000);
  cursor.setMinutes(0, 0, 0);
  for (let i = 0; i < 60 && slots.length < count; i++) {
    const candidate = new Date(cursor.getTime() + i * 60 * 60 * 1000);
    if (isBookableSlot(candidate).ok && !bookedStarts.includes(candidate.getTime())) {
      const label = new Intl.DateTimeFormat("en-US", {
        timeZone: DENVER_TZ,
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(candidate);
      slots.push(`${label} (Denver time) — ISO: ${candidate.toISOString()}`);
    }
  }
  return slots;
}

// ---- Assistant ----

type AdminClient = Awaited<ReturnType<typeof getAdmin>>;

async function getAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export async function getOrCreateConversation(phone: string) {
  const admin = await getAdmin();
  const { data: existing, error: readError } = await admin
    .from("whatsapp_conversations")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();
  if (readError) throw new Error(`Conversation read failed: ${readError.message}`);
  if (existing) return existing;
  const { data: created, error: insertError } = await admin
    .from("whatsapp_conversations")
    .insert({ phone })
    .select("*")
    .single();
  if (insertError || !created) throw new Error(`Conversation create failed: ${insertError?.message}`);
  return created;
}

function buildWhatsAppInstructions(handedOff: boolean) {
  return `${buildAskJsgInstructions()}

WHATSAPP MODE
- You are replying inside WhatsApp, not the website chat. Keep answers short: 1-4 short sentences, no markdown links (write the phone number or say "our contact page at jsgliquidators.com/contact").
- PRICING: the only rate you ever quote is the 35% commission on auction and e-commerce consignment sales (client keeps 65%). Cleanouts have no fixed price — they are quoted case by case after a free walk-through. NEVER quote a dollar amount for a cleanout.
- BOOKING: you can book free 1-hour walk-throughs, Monday-Friday 8am-6pm Denver time. Use the list_open_slots tool when the customer wants to book, then book_walkthrough with their chosen ISO time. Confirm the booked time back in plain words.
- HANDOFF: if the customer asks for something you cannot answer, asks to speak to a person, or seems upset, call the handoff_to_david tool with a short summary, then tell the customer David will text them back shortly.
${handedOff ? "- This conversation is already handed off to David. Do NOT answer service questions; just acknowledge and say David will follow up personally." : ""}`;
}

export async function handleInboundMessage(params: {
  phone: string;
  messageId: string;
  text: string;
  customerName?: string;
}) {
  const { phone, messageId, text, customerName } = params;
  const admin = await getAdmin();
  const conversation = await getOrCreateConversation(phone);

  if (conversation.last_inbound_message_id === messageId) {
    return { skipped: true }; // duplicate delivery of an already-handled message
  }

  const history = (conversation.messages as { role: string; content: string }[]).slice(-20);
  const modelMessages: ModelMessage[] = [
    ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    { role: "user" as const, content: text },
  ];

  let handedOff = conversation.handed_off as boolean;
  let bookedLabel: string | null = null;

  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey },
  });

  const result = await generateText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions: buildWhatsAppInstructions(handedOff),
    messages: modelMessages,
    maxOutputTokens: 400,
    tools: {
      list_open_slots: tool({
        description: "List the next open 1-hour walk-through slots (Mon-Fri 8am-6pm Denver time).",
        inputSchema: z.object({}),
        execute: async () => {
          const { data: bookings } = await admin
            .from("whatsapp_bookings")
            .select("starts_at")
            .eq("status", "booked")
            .gte("starts_at", new Date().toISOString());
          const taken = (bookings ?? []).map((b) => new Date(b.starts_at as string).getTime());
          return { slots: listOpenSlots(taken) };
        },
      }),
      book_walkthrough: tool({
        description: "Book a free 1-hour walk-through at the customer's chosen time (ISO 8601).",
        inputSchema: z.object({
          starts_at_iso: z.string().describe("Chosen slot start, ISO 8601 from list_open_slots"),
          address: z.string().optional().describe("Property address if the customer gave one"),
          notes: z.string().optional(),
        }),
        execute: async ({ starts_at_iso, address, notes }) => {
          const startsAt = new Date(starts_at_iso);
          if (Number.isNaN(startsAt.getTime())) return { booked: false, reason: "Invalid time." };
          const check = isBookableSlot(startsAt);
          if (!check.ok) return { booked: false, reason: check.reason };
          const endsAt = new Date(startsAt.getTime() + SLOT_MINUTES * 60 * 1000);
          const { data: conflict } = await admin
            .from("whatsapp_bookings")
            .select("id")
            .eq("status", "booked")
            .lt("starts_at", endsAt.toISOString())
            .gt("ends_at", startsAt.toISOString())
            .maybeSingle();
          if (conflict) return { booked: false, reason: "That slot was just taken. Offer other slots." };
          const { error } = await admin.from("whatsapp_bookings").insert({
            conversation_id: conversation.id,
            phone,
            customer_name: customerName ?? null,
            starts_at: startsAt.toISOString(),
            ends_at: endsAt.toISOString(),
            address: address ?? null,
            notes: notes ?? null,
          });
          if (error) return { booked: false, reason: `Booking failed: ${error.message}` };
          bookedLabel = new Intl.DateTimeFormat("en-US", {
            timeZone: DENVER_TZ,
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }).format(startsAt);
          // Alert David about the new booking.
          try {
            await sendWhatsAppText(
              DAVID_PHONE,
              `New walk-through booked via WhatsApp: ${bookedLabel} (Denver time). Customer: ${customerName ?? "unknown"}, ${phone}.${address ? ` Address: ${address}.` : ""}${notes ? ` Notes: ${notes}` : ""}`,
            );
          } catch (e) {
            console.error("Booking alert to David failed:", e);
          }
          return { booked: true, when: bookedLabel };
        },
      }),
      handoff_to_david: tool({
        description: "Hand the conversation to David when you cannot help or the customer asks for a person.",
        inputSchema: z.object({ summary: z.string().describe("What the customer needs, in one or two sentences") }),
        execute: async ({ summary }) => {
          handedOff = true;
          try {
            await sendWhatsAppText(
              DAVID_PHONE,
              `WhatsApp lead needs you: ${customerName ?? "unknown"}, ${phone}. ${summary}`,
            );
          } catch (e) {
            console.error("Handoff alert to David failed:", e);
          }
          return { handedOff: true };
        },
      }),
    },
  });

  const reply = result.text.trim() || "Thanks for reaching out to JSG Liquidators! David will follow up with you shortly.";

  await sendWhatsAppText(phone, reply);

  const newHistory = [
    ...history,
    { role: "user", content: text },
    { role: "assistant", content: reply },
  ].slice(-40);
  const { error: updateError } = await admin
    .from("whatsapp_conversations")
    .update({
      messages: newHistory,
      customer_name: customerName ?? conversation.customer_name,
      handed_off: handedOff,
      last_inbound_message_id: messageId,
      last_message_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", conversation.id);
  if (updateError) throw new Error(`Conversation update failed: ${updateError.message}`);

  return { skipped: false, reply, booked: bookedLabel, handedOff };
}
