// Ambient shim so tool source typechecks in the Vite app.
// At runtime the emitted Supabase Edge Function runs in Deno,
// where `process.env` is polyfilled for `npm:` imports.
declare const process: { env: Record<string, string | undefined> };
