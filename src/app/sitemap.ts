import type { MetadataRoute } from "next";
import { defaultLocale, supportedLocales } from "@/i18n/config";
import {
  getAbsoluteAlternateLanguageUrls,
  getAbsoluteLocaleUrl,
} from "@/i18n/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = getAbsoluteAlternateLanguageUrls();

  return supportedLocales.map((locale) => ({
    url: getAbsoluteLocaleUrl(locale),
    alternates: {
      languages,
    },
    changeFrequency: "weekly",
    priority: locale === defaultLocale ? 1 : 0.9,
  }));
}
