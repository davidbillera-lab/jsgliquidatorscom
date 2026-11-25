CREATE TABLE public.walkthrough_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  property_city TEXT NOT NULL DEFAULT '',
  property_address TEXT NOT NULL DEFAULT '',
  service_interest TEXT NOT NULL DEFAULT '',
  preferred_date DATE NOT NULL,
  preferred_time_window TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.walkthrough_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.walkthrough_requests TO authenticated;
GRANT ALL ON public.walkthrough_requests TO service_role;

ALTER TABLE public.walkthrough_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a walkthrough request"
  ON public.walkthrough_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only server code can read walkthrough requests"
  ON public.walkthrough_requests
  FOR SELECT
  TO service_role
  USING (true);