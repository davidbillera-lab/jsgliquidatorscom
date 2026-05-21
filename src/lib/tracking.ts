// Conversion + Core Web Vitals tracking for GA4 / Google Ads (gtag) and GTM dataLayer.
// Auto-tracks tel:, mailto:, external auction links, and any element with [data-cta].

import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function emit(event: string, params: Record<string, unknown> = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
  } catch {
    /* no-op */
  }
}

export function trackConversion(action: string, params: Record<string, unknown> = {}) {
  emit(action, params);
}

function handleClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const anchor = target.closest("a") as HTMLAnchorElement | null;
  const ctaEl = target.closest("[data-cta]") as HTMLElement | null;

  if (anchor) {
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("tel:")) {
      emit("phone_click", { phone_number: href.replace("tel:", ""), page: location.pathname });
      return;
    }
    if (href.startsWith("mailto:")) {
      emit("email_click", { email: href.replace("mailto:", ""), page: location.pathname });
      return;
    }
    // Outbound auction marketplace clicks
    if (/liveauctioneers|denveronlineauctions|ebay\./i.test(href)) {
      emit("auction_outbound_click", { url: href, page: location.pathname });
      return;
    }
  }

  if (ctaEl) {
    emit("cta_click", {
      cta_label: ctaEl.getAttribute("data-cta") || ctaEl.textContent?.trim().slice(0, 60),
      page: location.pathname,
    });
  }
}

function reportVital(metric: Metric) {
  emit("web_vitals", {
    metric_name: metric.name,
    metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    metric_rating: metric.rating,
    metric_id: metric.id,
    page: location.pathname,
  });
}

let initialized = false;
export function initTracking() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  document.addEventListener("click", handleClick, { capture: true });
  onCLS(reportVital);
  onINP(reportVital);
  onLCP(reportVital);
  onFCP(reportVital);
  onTTFB(reportVital);
}

// Helper for form submissions
export function trackFormSubmit(formName: string, extra: Record<string, unknown> = {}) {
  emit("form_submit", { form_name: formName, page: location.pathname, ...extra });
}
