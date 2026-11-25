import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, CircleHelp, ExternalLink, FileSearch, Pencil, Save, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { businessProfiles } from "@/data/businessProfiles";
import { profileCheckSchema, summarizeChecks, type ProfileCheck } from "@/lib/seo-profile-report";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const statusLabels = { confirmed: "Confirmed", unverified: "Not verified", missing: "No backlink found" };

export default function SeoReport() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [access, setAccess] = useState<"loading" | "admin" | "denied">("loading");
  const [editing, setEditing] = useState<ProfileCheck | null>(null);

  useEffect(() => {
    let active = true;
    async function checkAccess() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) {
        void navigate({ to: "/admin-auth", search: { next: "/seo-report" } });
        return;
      }
      const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (active) setAccess(!error && data ? "admin" : "denied");
    }
    void checkAccess();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setAccess("loading");
      setTimeout(() => { if (active) void checkAccess(); }, 0);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, [navigate]);

  const checks = useQuery({
    queryKey: ["seo-profile-checks"],
    enabled: access === "admin",
    queryFn: async () => {
      const { data, error } = await supabase.from("seo_profile_checks").select("profile_name,status,evidence,last_checked_at");
      if (error) throw error;
      return (data ?? []).map((row) => profileCheckSchema.parse(row));
    },
  });

  const save = useMutation({
    mutationFn: async (input: ProfileCheck) => {
      const row = profileCheckSchema.parse(input);
      const { data, error } = await supabase.from("seo_profile_checks").upsert(row).select("profile_name").single();
      if (error || !data) throw error ?? new Error("The check was not saved");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["seo-profile-checks"] });
      setEditing(null);
      toast.success("Profile check saved");
    },
    onError: () => toast.error("Could not save this check. Please try again."),
  });

  const summary = summarizeChecks(checks.data ?? []);
  return (
    <Layout>
      <section className="min-h-screen bg-background pb-20 pt-32">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"><FileSearch className="size-4" /> JSG Liquidators · Private report</div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">SEO profile links</h1>
              <p className="mt-2 text-muted-foreground">jsgliquidators.com</p>
            </div>
            <Button variant="outline" asChild><Link to="/blog-admin">Back to admin</Link></Button>
          </div>
          {access === "loading" && <p role="status">Checking access…</p>}
          {access === "denied" && <p role="alert" className="text-destructive">This report is available to administrators only.</p>}
          {access === "admin" && <>
            {checks.isPending ? <p role="status">Loading profile checks…</p> : checks.isError ? <div role="alert" className="space-y-3"><p>Could not load the report.</p><Button variant="outline" onClick={() => void checks.refetch()}>Try again</Button></div> : <>
              <dl className="mb-8 grid grid-cols-3 gap-4 border-y border-border py-5">
                {[{ label: "Confirmed", value: summary.confirmed }, { label: "Not verified", value: summary.unverified }, { label: "No backlink", value: summary.missing }].map((item) => <div key={item.label}><dt className="text-sm text-muted-foreground">{item.label}</dt><dd className="mt-1 text-3xl font-semibold text-foreground">{item.value}</dd></div>)}
              </dl>
              <div className="grid gap-4 md:grid-cols-2">
                {businessProfiles.map((profile) => {
                  const check = checks.data.find((row) => row.profile_name === profile.name);
                  const status = check?.status ?? "unverified";
                  const Icon = status === "confirmed" ? CheckCircle2 : status === "missing" ? AlertCircle : CircleHelp;
                  return <article key={profile.name} className="flex flex-col rounded-lg border border-border bg-card p-5">
                    <div className="flex items-center justify-between gap-3"><h2 className="font-display text-xl font-semibold text-foreground">{profile.name}</h2><span className="flex items-center gap-1.5 text-sm text-primary"><Icon className="size-4 shrink-0" />{statusLabels[status]}</span></div>
                    <a href={profile.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-start gap-2 break-all text-sm text-primary underline underline-offset-4">{profile.url}<ExternalLink className="mt-0.5 size-4 shrink-0" /></a>
                    <p className="my-4 text-sm leading-relaxed text-muted-foreground">{check?.evidence || "No check recorded yet."}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"><p className="text-sm text-muted-foreground">Last checked: <span className="font-medium text-foreground">{check ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(check.last_checked_at)) : "Never"}</span></p><Button variant="outline" size="sm" onClick={() => setEditing(check ?? { profile_name: profile.name, status: "unverified", evidence: "", last_checked_at: new Date().toISOString() })}><Pencil />Update check</Button></div>
                  </article>;
                })}
              </div>
            </>}
          </>}
        </div>
      </section>
      <Dialog open={editing !== null} onOpenChange={(open) => { if (!open && !save.isPending) setEditing(null); }}>
        <DialogContent><DialogHeader><DialogTitle>{editing?.profile_name} · Record a check</DialogTitle></DialogHeader>
          {editing && <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); save.mutate(editing); }}>
            <div className="space-y-2"><Label htmlFor="backlink-status">Backlink status</Label><Select value={editing.status} onValueChange={(value) => { const result = profileCheckSchema.shape.status.safeParse(value); if (result.success) setEditing({ ...editing, status: result.data }); }}><SelectTrigger id="backlink-status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="confirmed">Confirmed</SelectItem><SelectItem value="unverified">Not verified</SelectItem><SelectItem value="missing">No backlink found</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label htmlFor="check-date">Last checked date (UTC)</Label><Input id="check-date" type="date" required max={new Date().toISOString().slice(0, 10)} value={editing.last_checked_at.slice(0, 10)} onChange={(event) => { if (event.target.value) setEditing({ ...editing, last_checked_at: `${event.target.value}T00:00:00.000Z` }); }} /></div>
            <div className="space-y-2"><Label htmlFor="check-evidence">Evidence / notes</Label><Textarea id="check-evidence" maxLength={2000} rows={5} value={editing.evidence} onChange={(event) => setEditing({ ...editing, evidence: event.target.value })} /></div>
            <div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={save.isPending} onClick={() => setEditing(null)}>Cancel</Button><Button type="submit" disabled={save.isPending}><Save />{save.isPending ? "Saving…" : "Save check"}</Button></div>
          </form>}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}