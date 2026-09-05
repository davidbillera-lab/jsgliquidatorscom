import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_maps';
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

// Optional override: exact Google Place ID of the business profile.
const PLACE_ID = Deno.env.get('GOOGLE_PLACE_ID') ?? '';
const PLACE_QUERY = Deno.env.get('GOOGLE_PLACE_QUERY') ?? 'JSG Liquidators Denver CO';

interface CachedPayload {
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

let cache: { at: number; data: CachedPayload } | null = null;
const CACHE_MS = 1000 * 60 * 60 * 6; // 6 hours

function gatewayHeaders(extra: Record<string, string> = {}) {
  return {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    'X-Connection-Api-Key': GOOGLE_MAPS_API_KEY as string,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function handleBadResponse(response: Response) {
  const errorBody = await response.text();
  console.error(`Google Maps gateway failed [${response.status}]: ${errorBody}`);
  return new Response(
    JSON.stringify({ error: 'Google reviews request failed', status: response.status, details: errorBody }),
    { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
}

async function resolvePlaceId(): Promise<{ id: string } | Response> {
  if (PLACE_ID) return { id: PLACE_ID };

  const response = await fetch(`${GATEWAY_URL}/places/v1/places:searchText`, {
    method: 'POST',
    headers: gatewayHeaders({ 'X-Goog-FieldMask': 'places.id,places.displayName' }),
    body: JSON.stringify({ textQuery: PLACE_QUERY }),
  });
  if (!response.ok) return await handleBadResponse(response);

  const json = await response.json();
  const id = json?.places?.[0]?.id;
  if (!id) {
    console.warn(`No Google listing matched "${PLACE_QUERY}" — returning empty payload.`);
    return new Response(
      JSON.stringify({
        placeId: '',
        name: 'JSG Liquidators',
        rating: null,
        totalReviews: 0,
        mapsUri: '',
        writeReviewUri: '',
        reviews: [],
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
  return { id };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    if (!LOVABLE_API_KEY || !GOOGLE_MAPS_API_KEY) {
      return new Response(JSON.stringify({ error: 'Google Maps connection is not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (cache && Date.now() - cache.at < CACHE_MS) {
      return new Response(JSON.stringify(cache.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    const resolved = await resolvePlaceId();
    if (resolved instanceof Response) return resolved;

    const fieldMask = [
      'id',
      'displayName',
      'rating',
      'userRatingCount',
      'googleMapsUri',
      'googleMapsLinks.writeAReviewUri',
      'reviews',
    ].join(',');

    const detailsRes = await fetch(`${GATEWAY_URL}/places/v1/places/${resolved.id}`, {
      headers: gatewayHeaders({ 'X-Goog-FieldMask': fieldMask }),
    });
    if (!detailsRes.ok) return await handleBadResponse(detailsRes);

    const place = await detailsRes.json();
    const data: CachedPayload = {
      placeId: place.id ?? resolved.id,
      name: place.displayName?.text ?? 'JSG Liquidators',
      rating: typeof place.rating === 'number' ? place.rating : null,
      totalReviews: place.userRatingCount ?? 0,
      mapsUri: place.googleMapsUri ?? '',
      writeReviewUri: place.googleMapsLinks?.writeAReviewUri ?? '',
      reviews: (place.reviews ?? []).map((r: Record<string, any>) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        profilePhoto: r.authorAttribution?.photoUri ?? '',
        rating: r.rating ?? 5,
        text: r.originalText?.text ?? r.text?.text ?? '',
        relativeTime: r.relativePublishTimeDescription ?? '',
        publishTime: r.publishTime ?? '',
        uri: r.googleMapsUri ?? '',
      })).filter((r: { text: string }) => r.text.length > 0),
    };

    cache = { at: Date.now(), data };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (err) {
    console.error('get-google-reviews error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
