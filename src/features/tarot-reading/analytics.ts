"use client";

export type AnalyticsEventName =
  | "topic_click"
  | "draw_start"
  | "card_selected"
  | "result_view"
  | "prompt_copy"
  | "share_click";

export type AnalyticsPayload = Record<string, string | number | boolean>;

export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("tarot_spark_event", {
      detail: {
        name,
        payload,
      },
    }),
  );
}
