import { z } from "zod";
import { businessProfiles } from "@/data/businessProfiles";

export const profileCheckSchema = z.object({
  profile_name: z.string().refine((name) => businessProfiles.some((profile) => profile.name === name), "Unknown profile"),
  status: z.enum(["confirmed", "unverified", "missing"]),
  evidence: z.string().max(2000),
  last_checked_at: z.string().datetime().refine((date) => Date.parse(date) <= Date.now(), "The check date cannot be in the future"),
});

export type ProfileCheck = z.infer<typeof profileCheckSchema>;

export function summarizeChecks(checks: ProfileCheck[]) {
  return {
    confirmed: checks.filter((check) => check.status === "confirmed").length,
    unverified: businessProfiles.filter((profile) => !checks.some((check) => check.profile_name === profile.name && check.status !== "unverified")).length,
    missing: checks.filter((check) => check.status === "missing").length,
  };
}