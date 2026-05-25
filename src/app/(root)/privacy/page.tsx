import { PublicPage, getPublicPageMetadata } from "@/features/public-pages";
import { defaultLocale } from "@/i18n/config";

export const metadata = getPublicPageMetadata(defaultLocale, "privacy");

export default function PrivacyPage() {
  return <PublicPage locale={defaultLocale} pageId="privacy" />;
}
