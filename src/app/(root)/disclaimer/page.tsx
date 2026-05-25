import { PublicPage, getPublicPageMetadata } from "@/features/public-pages";
import { defaultLocale } from "@/i18n/config";

export const metadata = getPublicPageMetadata(defaultLocale, "disclaimer");

export default function DisclaimerPage() {
  return <PublicPage locale={defaultLocale} pageId="disclaimer" />;
}
