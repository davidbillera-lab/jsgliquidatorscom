import { describe, expect, it } from "vitest";
import { profileCheckSchema, summarizeChecks } from "@/lib/seo-profile-report";

describe("SEO profile checks", () => {
  it("tracks the six approved profiles and counts unrecorded checks as unverified", () => {
    expect(summarizeChecks([{ profile_name: "Instagram", status: "confirmed", evidence: "Website link", last_checked_at: "2026-11-25T14:28:00Z" }])).toEqual({ confirmed: 1, unverified: 5, missing: 0 });
  });
  it("rejects future verification dates", () => {
    expect(profileCheckSchema.safeParse({ profile_name: "Yelp", status: "unverified", evidence: "Blocked", last_checked_at: "2999-01-01T00:00:00Z" }).success).toBe(false);
  });
  it("rejects a profile that has not been approved", () => {
    expect(profileCheckSchema.safeParse({ profile_name: "BBB", status: "confirmed", evidence: "", last_checked_at: "2026-11-25T14:28:00Z" }).success).toBe(false);
  });
});