import Link from "next/link";
import {
  getLocalePath,
  localeNames,
  supportedLocales,
  type Locale,
} from "@/i18n/config";

type LanguageSwitchProps = {
  readonly activeLocale: Locale;
  readonly ariaLabel: string;
};

export function LanguageSwitch({
  activeLocale,
  ariaLabel,
}: LanguageSwitchProps) {
  return (
    <nav aria-label={ariaLabel} className="flex gap-2">
      {supportedLocales.map((locale) => {
        const isActive = locale === activeLocale;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`rounded-md border px-3 py-2 text-xs font-semibold transition ${
              isActive
                ? "border-amber-300 bg-amber-300 text-neutral-950"
                : "border-stone-700 bg-stone-900 text-stone-100 hover:border-emerald-300 hover:text-emerald-200"
            }`}
            href={getLocalePath(locale)}
            key={locale}
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
