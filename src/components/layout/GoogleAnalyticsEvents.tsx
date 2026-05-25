"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type AnalyticsPayload = Record<string, string | number | boolean>;

type GtagArguments =
  | [
      command: "config",
      targetId: string,
      config?: Record<string, string | boolean>,
    ]
  | [command: "event", eventName: string, eventParams?: AnalyticsPayload];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArguments) => void;
  }
}

type GoogleAnalyticsEventsProps = {
  readonly measurementId: string;
};

export function GoogleAnalyticsEvents({
  measurementId,
}: GoogleAnalyticsEventsProps) {
  const pathname = usePathname();

  useEffect(() => {
    sendGtag("config", measurementId, {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
      send_page_view: true,
    });
  }, [measurementId, pathname]);

  useEffect(() => {
    const listener = (event: Event) => {
      const detail = getAnalyticsEventDetail(event);

      if (!detail) {
        return;
      }

      sendGtag("event", detail.name, detail.payload);
    };

    window.addEventListener("tarot_spark_event", listener);

    return () => {
      window.removeEventListener("tarot_spark_event", listener);
    };
  }, []);

  return null;
}

function sendGtag(...args: GtagArguments) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    ((...gtagArgs: GtagArguments) => {
      window.dataLayer?.push(gtagArgs);
    });

  window.gtag(...args);
}

function getAnalyticsEventDetail(event: Event) {
  if (!(event instanceof CustomEvent) || !isRecord(event.detail)) {
    return undefined;
  }

  const { name, payload } = event.detail;

  if (typeof name !== "string") {
    return undefined;
  }

  if (payload !== undefined && !isAnalyticsPayload(payload)) {
    return undefined;
  }

  return {
    name,
    payload: payload ?? {},
  };
}

function isAnalyticsPayload(value: unknown): value is AnalyticsPayload {
  return (
    isRecord(value) &&
    Object.values(value).every(
      (item) =>
        typeof item === "string" ||
        typeof item === "number" ||
        typeof item === "boolean",
    )
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
