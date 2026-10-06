import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

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

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsPayload> => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) throw new Error("Google Maps connection is not configured");

    if (cache && Date.now() - cache.at < CACHE_MS) return cache.data;

    const headers = (extra: Record<string, string> = {}) => ({
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": mapsKey,
      "Content-Type": "application/json",
      ...extra,
    });

    let placeId = process.env["GOOGLE_PLACE_ID"] ?? "";
    if (!placeId) {
      const query = process.env["GOOGLE_PLACE_QUERY"] ?? "JSG Liquidators Denver CO";
      const search = await fetch(`${GATEWAY_URL}/places/v1/places:searchText`, {
        method: "POST",
        headers: headers({ "X-Goog-FieldMask": "places.id,places.displayName" }),
        body: JSON.stringify({ textQuery: query }),
      });
      if (!search.ok) {
        console.error(`Google Maps gateway failed [${search.status}]: ${await search.text()}`);
        throw new Error("Google reviews request failed");
      }
      const json = (await search.json()) as { places?: Array<{ id?: string }> };
      const id = json.places?.[0]?.id;
      if (!id) {
        console.warn(`No Google listing matched "${query}" — returning empty payload.`);
        return EMPTY;
      }
      placeId = id;
    }

    const fieldMask = [
      "id",
      "displayName",
      "rating",
      "userRatingCount",
      "googleMapsUri",
      "googleMapsLinks.writeAReviewUri",
      "reviews",
    ].join(",");

    const detailsRes = await fetch(`${GATEWAY_URL}/places/v1/places/${placeId}`, {
      headers: headers({ "X-Goog-FieldMask": fieldMask }),
    });
    if (!detailsRes.ok) {
      console.error(`Google Maps gateway failed [${detailsRes.status}]: ${await detailsRes.text()}`);
      throw new Error("Google reviews request failed");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const place = (await detailsRes.json()) as Record<string, any>;
    const data: GoogleReviewsPayload = {
      placeId: place["id"] ?? placeId,
      name: place["displayName"]?.text ?? "JSG Liquidators",
      rating: typeof place["rating"] === "number" ? place["rating"] : null,
      totalReviews: place["userRatingCount"] ?? 0,
      mapsUri: place["googleMapsUri"] ?? "",
      writeReviewUri: place["googleMapsLinks"]?.writeAReviewUri ?? "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reviews: ((place["reviews"] ?? []) as Array<Record<string, any>>)
        .map((r) => ({
          author: r["authorAttribution"]?.displayName ?? "Google user",
          profilePhoto: r["authorAttribution"]?.photoUri ?? "",
          rating: r["rating"] ?? 5,
          text: r["originalText"]?.text ?? r["text"]?.text ?? "",
          relativeTime: r["relativePublishTimeDescription"] ?? "",
          publishTime: r["publishTime"] ?? "",
          uri: r["googleMapsUri"] ?? "",
        }))
        .filter((r) => r.text.length > 0),
    };

    cache = { at: Date.now(), data };
    return data;
  },
);
