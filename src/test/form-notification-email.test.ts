import { describe, expect, it } from "vitest";
import { FORM_NOTIFICATION_FROM, FORM_NOTIFICATION_TO } from "@/lib/formNotificationEmail";

describe("form notification email delivery", () => {
  it("sends both form notifications from the verified leads address", () => {
    expect(FORM_NOTIFICATION_FROM).toBe("JSG Liquidators <leads@jsgliquidators.com>");
  });

  it("delivers both form notifications to the business inbox", () => {
    expect(FORM_NOTIFICATION_TO).toBe("jsgliquidators@jsgliquidators.com");
  });
});
