
-- Remove broad public SELECT policy that allows listing the bucket.
-- Public files remain accessible via the public CDN URL.
DROP POLICY IF EXISTS "Blog images are publicly accessible" ON storage.objects;

-- Lock down auto_publish_scheduled_posts: only postgres/service role (used by pg_cron) may call it.
REVOKE EXECUTE ON FUNCTION public.auto_publish_scheduled_posts() FROM PUBLIC, anon, authenticated;
