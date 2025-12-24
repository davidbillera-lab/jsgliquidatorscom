-- Enable required extensions for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function to auto-publish scheduled posts
CREATE OR REPLACE FUNCTION public.auto_publish_scheduled_posts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE blog_posts
  SET published = true
  WHERE published = false
    AND published_at IS NOT NULL
    AND published_at <= now();
END;
$$;

-- Create a cron job that runs every minute to check for posts to publish
SELECT cron.schedule(
  'auto-publish-blog-posts',
  '* * * * *',
  $$SELECT public.auto_publish_scheduled_posts()$$
);