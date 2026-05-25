import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  PublicPage,
  getPublicPageMetadata,
  isPublicPageId,
  publicPageIds,
} from "@/features/public-pages";
import { isPrefixedLocale, prefixedLocales } from "@/i18n/config";

type LocalePublicPageProps = {
  readonly params: Promise<{
    readonly locale: string;
    readonly page: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.flatMap((locale) =>
    publicPageIds.map((page) => ({
      locale,
      page,
    })),
  );
}

export async function generateMetadata({
  params,
}: LocalePublicPageProps): Promise<Metadata> {
  const { locale: rawLocale, page: rawPage } = await params;

  if (!isPrefixedLocale(rawLocale) || !isPublicPageId(rawPage)) {
    return {};
  }

  return getPublicPageMetadata(rawLocale, rawPage);
}

export default async function LocalePublicPage({
  params,
}: LocalePublicPageProps) {
  const { locale: rawLocale, page: rawPage } = await params;

  if (!isPrefixedLocale(rawLocale) || !isPublicPageId(rawPage)) {
    notFound();
  }

  return <PublicPage locale={rawLocale} pageId={rawPage} />;
}
