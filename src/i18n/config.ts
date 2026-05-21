export const supportedLocales = ["en", "ko"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale = "en" satisfies Locale;

export const prefixedLocales = supportedLocales.filter(
  (locale): locale is Exclude<Locale, typeof defaultLocale> =>
    locale !== defaultLocale,
);

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
};

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function isPrefixedLocale(
  value: string,
): value is (typeof prefixedLocales)[number] {
  return prefixedLocales.includes(value as (typeof prefixedLocales)[number]);
}

export function getLocalePath(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}`;
}
