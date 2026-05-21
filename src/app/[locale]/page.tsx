import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  TarotExperience,
  getTarotReadingMetadata,
} from "@/features/tarot-reading";
import { isPrefixedLocale, prefixedLocales } from "@/i18n/config";

type LocalePageProps = {
  readonly params: Promise<{
    readonly locale: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isPrefixedLocale(rawLocale)) {
    return {};
  }

  return getTarotReadingMetadata(rawLocale);
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params;

  if (!isPrefixedLocale(rawLocale)) {
    notFound();
  }

  return <TarotExperience key={rawLocale} locale={rawLocale} />;
}
