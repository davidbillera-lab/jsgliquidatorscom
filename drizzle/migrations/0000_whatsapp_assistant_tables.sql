CREATE TABLE public.whatsapp_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id TEXT NOT NULL UNIQUE,
  event TEXT NOT NULL,
  payload JSONB NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  processing_error TEXT,
  attempts INT NOT NULL DEFAULT 0
);
GRANT ALL ON public.whatsapp_webhook_events TO service_role;
ALTER TABLE public.whatsapp_webhook_events ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.whatsapp_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL UNIQUE,
  customer_name TEXT,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  handed_off BOOLEAN NOT NULL DEFAULT false,
  handoff_reason TEXT,
  last_inbound_message_id TEXT,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.whatsapp_conversations TO service_role;
GRANT SELECT ON public.whatsapp_conversations TO authenticated;
ALTER TABLE public.whatsapp_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read whatsapp conversations" ON public.whatsapp_conversations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.whatsapp_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.whatsapp_conversations(id) ON DELETE SET NULL,
  phone TEXT NOT NULL,
  customer_name TEXT,
  service TEXT NOT NULL DEFAULT 'walkthrough',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  address TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'booked',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX whatsapp_bookings_starts_at_idx ON public.whatsapp_bookings (starts_at) WHERE status = 'booked';
GRANT ALL ON public.whatsapp_bookings TO service_role;
GRANT SELECT ON public.whatsapp_bookings TO authenticated;
ALTER TABLE public.whatsapp_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read whatsapp bookings" ON public.whatsapp_bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));