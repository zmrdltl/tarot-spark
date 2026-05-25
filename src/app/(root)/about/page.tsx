import { PublicPage, getPublicPageMetadata } from "@/features/public-pages";
import { defaultLocale } from "@/i18n/config";

export const metadata = getPublicPageMetadata(defaultLocale, "about");

export default function AboutPage() {
  return <PublicPage locale={defaultLocale} pageId="about" />;
}
