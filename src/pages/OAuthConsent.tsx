import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";

// Local typed shim: supabase.auth.oauth is beta and not in the generated types.
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};
const oauthApi = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin-auth?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauthApi.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauthApi.approveAuthorization(authorizationId)
      : await oauthApi.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  }

  return (
    <Layout>
      <SEOHead title="Authorize app" description="Authorize an MCP client" canonical="/.lovable/oauth/consent" noindex />
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-lg">
          {error && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-destructive">
              Could not load this authorization request: {error}
            </div>
          )}
          {!error && !details && <p className="text-muted-foreground">Loading authorization request…</p>}
          {!error && details && (
            <div className="rounded-xl border border-border bg-card p-8">
              <h1 className="text-2xl font-display font-bold mb-2">
                Connect {details.client?.name ?? "this app"} to your JSG Liquidators account
              </h1>
              <p className="text-muted-foreground mb-6">
                {details.client?.name ?? "The requesting app"} will be able to act on your behalf using the JSG Liquidators MCP tools.
              </p>
              <div className="flex gap-3">
                <Button disabled={busy} onClick={() => decide(true)}>
                  Approve
                </Button>
                <Button disabled={busy} variant="outline" onClick={() => decide(false)}>
                  Deny
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
