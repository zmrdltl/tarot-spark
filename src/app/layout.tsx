import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tarot-spark",
  description: "Free tarot card drawing and AI prompt generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
