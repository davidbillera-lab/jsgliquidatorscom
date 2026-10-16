import { createServerFn } from "@tanstack/react-start";

// Reviews are read from the Google Business Profile API through the Lovable
// gateway, against the verified "JSG Liquidators LLC" listing. The Places API
// searchText lookup previously returned no match for the business, so the
// account/location IDs are pinned here (overridable via env) instead of searched.
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_business_profile";
const GBP_ACCOUNT_ID = process.env["GBP_ACCOUNT_ID"] ?? "accounts/111646186357730567850";
const GBP_LOCATION_ID = process.env["GBP_LOCATION_ID"] ?? "locations/13496775699988242285";

export interface GoogleReviewsPayload {
  placeId: string;
  name: string;
  rating: number | null;
  totalReviews: number;
  mapsUri: string;
  writeReviewUri: string;
  reviews: Array<{
    author: string;
    profilePhoto: string;
    rating: number;
    text: string;
    relativeTime: string;
    publishTime: string;
    uri: string;
  }>;
}

const EMPTY: GoogleReviewsPayload = {
  placeId: "",
  name: "JSG Liquidators",
  rating: null,
  totalReviews: 0,
  mapsUri: "",
  writeReviewUri: "",
  reviews: [],
};

let cache: { at: number; data: GoogleReviewsPayload } | null = null;
const CACHE_MS = 1000 * 60 * 60 * 6; // 6 hours

const STAR_RATINGS: Record<string, number> = {
  FIVE: 5,
  FOUR: 4,
  THREE: 3,
  TWO: 2,
  ONE: 1,
};

function relativeTime(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "Google review";
  const days = Math.max(0, Math.floor((Date.now() - t) / 86_400_000));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${days < 14 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsPayload> => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const gbpKey = process.env["GOOGLE_BUSINESS_PROFILE_API_KEY"];
    if (!lovableKey || !gbpKey) throw new Error("Google Business Profile connection is not configured");

    if (cache && Date.now() - cache.at < CACHE_MS) return cache.data;

    const headers = (extra: Record<string, string> = {}) => ({
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gbpKey,
      "Content-Type": "application/json",
      ...extra,
    });

    // Location metadata gives the Place ID, Maps link and "write a review" link.
    let meta: Record<string, unknown> = {};
    const metaRes = await fetch(
      `${GATEWAY_URL}/business_information/v1/${GBP_LOCATION_ID}?readMask=metadata,title`,
      { headers: headers() },
    );
    if (metaRes.ok) {
      meta = (await metaRes.json()) as Record<string, unknown>;
    } else {
      console.error(`GBP metadata request failed [${metaRes.status}]: ${await metaRes.text()}`);
    }
    const metadata = (meta["metadata"] ?? {}) as Record<string, unknown>;

    // Reviews for managed locations come from the My Business v4 API.
    const reviewsRes = await fetch(
      `${GATEWAY_URL}/my_business/v4/${GBP_ACCOUNT_ID}/${GBP_LOCATION_ID}/reviews?pageSize=50`,
      { headers: headers() },
    );
    if (!reviewsRes.ok) {
      console.error(`GBP reviews request failed [${reviewsRes.status}]: ${await reviewsRes.text()}`);
      throw new Error("Google reviews request failed");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (await reviewsRes.json()) as Record<string, any>;

    const data: GoogleReviewsPayload = {
      placeId: (metadata["placeId"] as string) ?? "",
      name: (meta["title"] as string) ?? "JSG Liquidators",
      rating: typeof body["averageRating"] === "number" ? body["averageRating"] : null,
      totalReviews: body["totalReviewCount"] ?? 0,
      mapsUri: (metadata["mapsUri"] as string) ?? "",
      writeReviewUri: (metadata["newReviewUri"] as string) ?? "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reviews: ((body["reviews"] ?? []) as Array<Record<string, any>>)
        .map((r) => {
          const publishTime: string = r["createTime"] ?? r["updateTime"] ?? "";
          return {
            author: r["reviewer"]?.displayName ?? "Google user",
            profilePhoto: r["reviewer"]?.profilePhotoUrl ?? "",
            rating: STAR_RATINGS[r["starRating"]] ?? 5,
            text: r["comment"] ?? "",
            relativeTime: relativeTime(publishTime),
            publishTime,
            uri: r["reviewReplyUrl"]?.startsWith("http")
              ? r["reviewReplyUrl"]
              : `https://search.google.com/local/writereview?placeid=${metadata["placeId"] ?? ""}`,
          };
        })
        .filter((r) => r.text.length > 0),
    };

    cache = { at: Date.now(), data };
    return data;
  },
);
