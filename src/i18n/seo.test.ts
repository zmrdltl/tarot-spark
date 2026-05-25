import { afterEach, describe, expect, it } from "vitest";
import {
  getAbsoluteAlternateLanguageUrls,
  getAbsoluteLocaleUrl,
  getSiteUrl,
  withLocalizedAlternates,
} from "./seo";

const originalSiteUrl = process.env["NEXT_PUBLIC_SITE_URL"];
const originalVercelUrl = process.env["VERCEL_URL"];

describe("i18n SEO", () => {
  afterEach(() => {
    restoreEnv("NEXT_PUBLIC_SITE_URL", originalSiteUrl);
    restoreEnv("VERCEL_URL", originalVercelUrl);
  });

  it("falls back to the local origin when no site origin is configured", () => {
    delete process.env["NEXT_PUBLIC_SITE_URL"];
    delete process.env["VERCEL_URL"];

    expect(getSiteUrl().toString()).toBe("http://localhost:3000/");
    expect(getAbsoluteLocaleUrl("ko")).toBe("http://localhost:3000/ko");
  });

  it("normalizes configured site origins for locale urls", () => {
    process.env["NEXT_PUBLIC_SITE_URL"] =
      "https://example.com///?draft=true#top";
    delete process.env["VERCEL_URL"];

    expect(getSiteUrl().toString()).toBe("https://example.com/");
    expect(getAbsoluteLocaleUrl("en")).toBe("https://example.com/");
    expect(getAbsoluteLocaleUrl("ko")).toBe("https://example.com/ko");
  });

  it("uses Vercel's deployment origin when a site origin is not configured", () => {
    delete process.env["NEXT_PUBLIC_SITE_URL"];
    process.env["VERCEL_URL"] = "tarot-spark.vercel.app";

    expect(getAbsoluteLocaleUrl("ko")).toBe(
      "https://tarot-spark.vercel.app/ko",
    );
  });

  it("builds absolute alternate language urls", () => {
    process.env["NEXT_PUBLIC_SITE_URL"] = "https://example.com";
    delete process.env["VERCEL_URL"];

    expect(getAbsoluteAlternateLanguageUrls()).toEqual({
      en: "https://example.com/",
      ko: "https://example.com/ko",
      "x-default": "https://example.com/",
    });
  });

  it("adds canonical and hreflang metadata to localized pages", () => {
    process.env["NEXT_PUBLIC_SITE_URL"] = "https://example.com";
    delete process.env["VERCEL_URL"];

    expect(
      withLocalizedAlternates(
        {
          title: "Localized title",
          description: "Localized description",
        },
        "ko",
      ),
    ).toMatchObject({
      metadataBase: new URL("https://example.com"),
      alternates: {
        canonical: "https://example.com/ko",
        languages: {
          en: "https://example.com/",
          ko: "https://example.com/ko",
          "x-default": "https://example.com/",
        },
      },
    });
  });
});

function restoreEnv(key: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[key];
    return;
  }

  process.env[key] = value;
}
