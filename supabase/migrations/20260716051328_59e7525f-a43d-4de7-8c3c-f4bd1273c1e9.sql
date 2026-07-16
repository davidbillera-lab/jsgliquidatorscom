SELECT cron.unschedule('biweekly-local-seo-post');
SELECT cron.schedule(
  'biweekly-local-seo-post',
  '0 14 1,15 * *',
  $$
  SELECT net.http_post(
    url := 'https://mhclrysmujybkgyibxlo.supabase.co/functions/v1/generate-local-seo-post',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'CRON_SECRET' LIMIT 1)
    ),
    body := jsonb_build_object('trigger','biweekly-cron','time', now()::text),
    timeout_milliseconds := 60000
  );
  $$
);