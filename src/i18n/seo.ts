import type { Metadata } from "next";
import {
  defaultLocale,
  getLocalePath,
  supportedLocales,
  type Locale,
} from "./config";

const fallbackSiteOrigin = "http://localhost:3000";

type AlternateLanguageUrls = Record<Locale | "x-default", string>;

export function getSiteUrl(): URL {
  return normalizeSiteUrl(
    process.env["NEXT_PUBLIC_SITE_URL"] ??
      getVercelSiteOrigin(process.env["VERCEL_URL"]) ??
      fallbackSiteOrigin,
  );
}

export function getAbsoluteSiteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl()).toString();
}

export function getAbsoluteLocaleUrl(locale: Locale) {
  return getAbsoluteSiteUrl(getLocalePath(locale));
}

export function getAbsoluteAlternateLanguageUrls(): AlternateLanguageUrls {
  return {
    ...Object.fromEntries(
      supportedLocales.map((locale) => [locale, getAbsoluteLocaleUrl(locale)]),
    ),
    "x-default": getAbsoluteLocaleUrl(defaultLocale),
  } as AlternateLanguageUrls;
}

export function withLocalizedAlternates(
  metadata: Metadata,
  locale: Locale,
): Metadata {
  return {
    ...metadata,
    metadataBase: getSiteUrl(),
    alternates: {
      ...metadata.alternates,
      canonical: getAbsoluteLocaleUrl(locale),
      languages: getAbsoluteAlternateLanguageUrls(),
    },
  };
}

function getVercelSiteOrigin(vercelUrl: string | undefined) {
  return vercelUrl ? `https://${vercelUrl}` : undefined;
}

function normalizeSiteUrl(value: string) {
  try {
    const url = new URL(value);
    url.pathname = normalizePathname(url.pathname);
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return new URL(fallbackSiteOrigin);
  }
}

function normalizePathname(pathname: string) {
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}
