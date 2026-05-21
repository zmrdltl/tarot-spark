import { defaultLocale, type Locale } from "@/i18n/config";
import { getTarotData } from "@/i18n/tarot-data";
import { TarotExperienceClient } from "./TarotExperienceClient";
import { getTarotReadingCopy } from "./i18n";

type TarotExperienceProps = {
  readonly locale?: Locale;
};

export function TarotExperience({
  locale = defaultLocale,
}: TarotExperienceProps) {
  return (
    <TarotExperienceClient
      copy={getTarotReadingCopy(locale)}
      locale={locale}
      tarotData={getTarotData(locale)}
    />
  );
}
