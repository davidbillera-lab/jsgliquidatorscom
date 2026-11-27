import { useEffect } from "react";
import { GOOGLE_REVIEW_URL } from "@/data/reviewLink";

export default function ReviewRedirect() {
  useEffect(() => {
    window.location.replace(GOOGLE_REVIEW_URL);
  }, []);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-3 p-6 text-center bg-background text-foreground">
      <p className="text-lg">Taking you to Google to leave a review…</p>
      <a href={GOOGLE_REVIEW_URL} className="text-primary underline">{GOOGLE_REVIEW_URL}</a>
    </main>
  );
}
