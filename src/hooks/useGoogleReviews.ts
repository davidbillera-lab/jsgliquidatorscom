import { useEffect, useState } from "react";

export interface GoogleReview {
  author: string;
  profilePhoto: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
  uri: string;
}

export interface GoogleReviewsData {
  placeId: string;
  name: string;
  rating: number | null;
  totalReviews: number;
  mapsUri: string;
  writeReviewUri: string;
  reviews: GoogleReview[];
}

const CACHE_KEY = "jsg_google_reviews_v1";
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

function readCache(): GoogleReviewsData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; data: GoogleReviewsData };
    if (Date.now() - parsed.at > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function useGoogleReviews() {
  const [data, setData] = useState<GoogleReviewsData | null>(() =>
    typeof window === "undefined" ? null : readCache()
  );
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    let active = true;
    if (data) return;

    const run = async () => {
      // Loaded on demand so the backend client stays out of the first download.
      const { supabase } = await import("@/integrations/supabase/client");
      const { data: result, error } = await supabase.functions.invoke("get-google-reviews");
      if (!active) return;
      if (error || !result || (result as { error?: string }).error) {
        setLoading(false);
        return;
      }
      const payload = result as GoogleReviewsData;
      if (payload.reviews?.length) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: payload }));
        } catch {
          /* ignore quota errors */
        }
        setData(payload);
      }
      setLoading(false);
    };
    // Wait until the page has painted so this request never slows the first view.
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const t = w.requestIdleCallback ? w.requestIdleCallback(() => void run()) : window.setTimeout(() => void run(), 2000);
    void t;

    return () => {
      active = false;
    };
  }, [data]);

  return { data, loading };
}
