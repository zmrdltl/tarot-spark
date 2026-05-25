import { defaultLocale, type Locale } from "@/i18n/config";
import { getTarotData } from "@/i18n/tarot-data";
import {
  getPublicPageLinks,
  getPublicPageShellCopy,
} from "@/features/public-pages";
import { TarotExperienceClient } from "./TarotExperienceClient";
import { getTarotReadingCopy } from "./i18n";

type TarotExperienceProps = {
  readonly locale?: Locale;
};

export function TarotExperience({
  locale = defaultLocale,
}: TarotExperienceProps) {
  const publicPageShellCopy = getPublicPageShellCopy(locale);

  return (
    <TarotExperienceClient
      copy={getTarotReadingCopy(locale)}
      locale={locale}
      publicPageLinks={getPublicPageLinks(locale)}
      publicPageNavigationLabel={publicPageShellCopy.pageNavigationLabel}
      tarotData={getTarotData(locale)}
    />
  );
}
