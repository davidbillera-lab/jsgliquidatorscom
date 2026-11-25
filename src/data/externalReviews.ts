// Reviews from review sites other than Google (Yelp, BBB, ...).
// These profiles are not live yet, so both lists are empty and the
// "Reviews from around the web" section on /testimonials stays hidden.
// Once the Yelp and BBB profiles are live, add each review here (ask in
// chat and it will be added for you) and the section appears automatically.

export interface ExternalReview {
  author: string;
  rating: number; // 1-5
  text: string;
  date: string; // e.g. "November 2026"
  sourceUrl: string; // link to the review or profile on the source site
}

export interface ExternalReviewSource {
  name: "Yelp" | "BBB";
  profileUrl: string;
  reviews: ExternalReview[];
}

export const externalReviewSources: ExternalReviewSource[] = [
  {
    name: "Yelp",
    profileUrl: "", // add the live Yelp profile URL here
    reviews: [],
  },
  {
    name: "BBB",
    profileUrl: "", // add the live BBB profile URL here
    reviews: [],
  },
];
