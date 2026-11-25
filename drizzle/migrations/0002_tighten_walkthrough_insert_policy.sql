DROP POLICY IF EXISTS "Anyone can submit a walkthrough request" ON public.walkthrough_requests;
CREATE POLICY "Anyone can submit a valid walkthrough request"
ON public.walkthrough_requests FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND char_length(btrim(name)) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(phone) <= 50
  AND char_length(property_city) <= 200
  AND char_length(property_address) <= 500
  AND char_length(service_interest) <= 200
  AND char_length(preferred_time_window) BETWEEN 1 AND 100
  AND char_length(notes) <= 5000
  AND extract(isodow from preferred_date) < 6
);