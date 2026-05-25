import { PublicPage, getPublicPageMetadata } from "@/features/public-pages";
import { defaultLocale } from "@/i18n/config";

export const metadata = getPublicPageMetadata(defaultLocale, "contact");

export default function ContactPage() {
  return <PublicPage locale={defaultLocale} pageId="contact" />;
}
