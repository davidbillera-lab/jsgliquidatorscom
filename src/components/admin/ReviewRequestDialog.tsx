import { useState } from "react";
import { MessageSquareHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ReviewRequestDialog = () => {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    jobType: "",
    reviewUrl: "",
  });

  const handleSend = async () => {
    if (!form.customerName.trim() || !form.customerEmail.trim()) {
      toast.error("Customer name and email are required");
      return;
    }
    setSending(true);
    try {
      const payload: Record<string, string> = {
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim(),
      };
      if (form.jobType.trim()) payload.jobType = form.jobType.trim();
      if (form.reviewUrl.trim()) payload.reviewUrl = form.reviewUrl.trim();

      const { data, error } = await supabase.functions.invoke("send-review-request", {
        body: payload,
      });
      if (error) throw error;
      if ((data as { error?: unknown })?.error) throw new Error(JSON.stringify((data as { error: unknown }).error));

      toast.success(`Review request sent to ${form.customerName}`);
      setForm({ customerName: "", customerEmail: "", jobType: "", reviewUrl: "" });
      setOpen(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(`Failed to send: ${msg}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <MessageSquareHeart className="w-4 h-4 mr-2" />
          Send Review Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send Google Review Request</DialogTitle>
          <DialogDescription>
            Emails the customer a friendly request to leave a Google review. Requires the Resend connector.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="customerName">Customer name *</Label>
            <Input
              id="customerName"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              placeholder="Margaret H."
            />
          </div>
          <div>
            <Label htmlFor="customerEmail">Customer email *</Label>
            <Input
              id="customerEmail"
              type="email"
              value={form.customerEmail}
              onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
              placeholder="customer@example.com"
            />
          </div>
          <div>
            <Label htmlFor="jobType">Job type (optional)</Label>
            <Input
              id="jobType"
              value={form.jobType}
              onChange={(e) => setForm({ ...form, jobType: e.target.value })}
              placeholder="estate cleanout in Lakewood"
            />
          </div>
          <div>
            <Label htmlFor="reviewUrl">Google review URL (optional)</Label>
            <Input
              id="reviewUrl"
              value={form.reviewUrl}
              onChange={(e) => setForm({ ...form, reviewUrl: e.target.value })}
              placeholder="https://g.page/r/.../review"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank to use the default link configured in the edge function.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending}>
            {sending ? "Sending..." : "Send Review Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
