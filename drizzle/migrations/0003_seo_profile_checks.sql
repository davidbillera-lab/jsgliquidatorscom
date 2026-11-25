CREATE TABLE public.seo_profile_checks (
 profile_name text PRIMARY KEY CHECK (profile_name IN ('Facebook','Instagram','Nextdoor','EstateSales.net','Declutt','Yelp')),
 status text NOT NULL CHECK (status IN ('confirmed','unverified','missing')),
 evidence text NOT NULL DEFAULT '' CHECK (length(evidence) <= 2000),
 last_checked_at timestamptz NOT NULL,
 CHECK (last_checked_at <= now())
);
GRANT SELECT, INSERT, UPDATE ON public.seo_profile_checks TO authenticated;
GRANT ALL ON public.seo_profile_checks TO service_role;
ALTER TABLE public.seo_profile_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read profile checks" ON public.seo_profile_checks FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert profile checks" ON public.seo_profile_checks FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update profile checks" ON public.seo_profile_checks FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));