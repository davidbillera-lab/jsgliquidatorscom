import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

    (async () => {
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
    })();

    return () => {
      active = false;
    };
  }, [data]);

  return { data, loading };
}
