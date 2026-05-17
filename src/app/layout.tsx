import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tarot-spark",
  description: "Draw tarot cards and create an AI-ready reflection prompt.",
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
