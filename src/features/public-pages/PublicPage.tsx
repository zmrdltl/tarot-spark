import Link from "next/link";
import {
  getLocalePath,
  localeNames,
  supportedLocales,
  type Locale,
} from "@/i18n/config";
import type { PublicPageId } from "./ids";
import {
  getPublicPageContent,
  getPublicPageLinks,
  getPublicPagePath,
  getPublicPageShellCopy,
} from "./i18n";

type PublicPageProps = {
  readonly locale: Locale;
  readonly pageId: PublicPageId;
};

export function PublicPage({ locale, pageId }: PublicPageProps) {
  const content = getPublicPageContent(locale, pageId);
  const shellCopy = getPublicPageShellCopy(locale);
  const publicPageLinks = getPublicPageLinks(locale);

  return (
    <main className="min-h-screen bg-[#10110f] text-stone-50">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-6 sm:px-8 lg:py-10">
        <header className="flex flex-col gap-4 border-b border-stone-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            className="text-sm font-semibold text-amber-300 transition hover:text-amber-200"
            href={getLocalePath(locale)}
          >
            {shellCopy.brand}
          </Link>
          <nav
            aria-label={shellCopy.languageSwitchLabel}
            className="flex gap-2"
          >
            {supportedLocales.map((targetLocale) => {
              const isActive = targetLocale === locale;

              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-md border px-3 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "border-amber-300 bg-amber-300 text-neutral-950"
                      : "border-stone-700 bg-stone-900 text-stone-100 hover:border-emerald-300 hover:text-emerald-200"
                  }`}
                  href={getPublicPagePath(targetLocale, pageId)}
                  key={targetLocale}
                >
                  {localeNames[targetLocale]}
                </Link>
              );
            })}
          </nav>
        </header>

        <article className="grid flex-1 gap-8 py-10">
          <div className="grid gap-4">
            <p className="text-sm font-semibold text-emerald-300">
              {shellCopy.homeLabel}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-stone-50 sm:text-5xl">
              {content.title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-stone-300">
              {content.intro}
            </p>
          </div>

          <div className="grid gap-7">
            {content.sections.map((section) => (
              <section className="grid gap-3" key={section.heading}>
                <h2 className="text-xl font-semibold text-stone-100">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    className="text-sm leading-7 text-stone-300"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>

        <footer className="border-t border-stone-800 py-6">
          <nav
            aria-label={shellCopy.pageNavigationLabel}
            className="flex flex-wrap gap-3 text-sm"
          >
            {publicPageLinks.map((link) => (
              <Link
                className="text-stone-300 transition hover:text-emerald-200"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </footer>
      </div>
    </main>
  );
}
