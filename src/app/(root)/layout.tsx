import type { Metadata } from "next";
import { getTarotReadingMetadata } from "@/features/tarot-reading";
import { defaultLocale } from "@/i18n/config";
import "../globals.css";

export const metadata: Metadata = getTarotReadingMetadata(defaultLocale);

export default function RootHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
