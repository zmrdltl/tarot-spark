"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  buildPrompt,
  drawCards,
  getDefaultTopic,
  getTopic,
  type DrawnCard,
  type LocaleTarotData,
  type TopicId,
} from "@/domain/tarot";
import type { Locale } from "@/i18n/config";
import { formatTemplateStrict } from "@/i18n/template";
import { trackEvent } from "./analytics";
import { CardSpread } from "./components/CardSpread";
import { LanguageSwitch } from "./components/LanguageSwitch";
import { ReadingResult } from "./components/ReadingResult";
import { TopicSelector } from "./components/TopicSelector";
import type { TarotReadingCopy } from "./i18n";
import type { CopyState, ShareState } from "./types";

type PublicPageLink = {
  readonly href: string;
  readonly label: string;
};

type TarotExperienceClientProps = {
  readonly locale: Locale;
  readonly copy: TarotReadingCopy;
  readonly publicPageLinks: readonly PublicPageLink[];
  readonly publicPageNavigationLabel: string;
  readonly tarotData: LocaleTarotData;
};

export function TarotExperienceClient({
  locale,
  copy,
  publicPageLinks,
  publicPageNavigationLabel,
  tarotData,
}: TarotExperienceClientProps) {
  const defaultTopic = getDefaultTopic(tarotData.topics);
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>(
    defaultTopic.id,
  );
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [shareState, setShareState] = useState<ShareState>("idle");

  const selectedTopic = getTopic(tarotData.topics, selectedTopicId);
  const prompt = useMemo(
    () =>
      cards.length > 0
        ? buildPrompt(
            tarotData.promptTemplate,
            selectedTopic,
            cards,
            `${locale} tarot promptTemplate`,
          )
        : "",
    [cards, locale, selectedTopic, tarotData.promptTemplate],
  );
  const cardCountLabel = useMemo(
    () =>
      formatTemplateStrict(
        copy.cardCountLabel,
        {
          count: String(tarotData.spreadPositions.length),
        },
        `${locale} tarot-reading.cardCountLabel`,
      ),
    [copy.cardCountLabel, locale, tarotData.spreadPositions.length],
  );

  function chooseTopic(topicId: TopicId) {
    setSelectedTopicId(topicId);
    setCards([]);
    setCopyState("idle");
    setShareState("idle");
    trackEvent("topic_click", { locale, topic_id: topicId });
  }

  function startDraw() {
    trackEvent("draw_start", { locale, topic_id: selectedTopic.id });

    const drawnCards = drawCards(tarotData.cards, tarotData.spreadPositions);
    setCards(drawnCards);
    setCopyState("idle");
    setShareState("idle");

    drawnCards.forEach(({ position, card }) => {
      trackEvent("card_selected", {
        locale,
        topic_id: selectedTopic.id,
        position_id: position.id,
        card_id: card.id,
      });
    });
    trackEvent("result_view", {
      locale,
      topic_id: selectedTopic.id,
      card_count: drawnCards.length,
    });
  }

  async function copyPrompt() {
    if (!prompt) {
      return;
    }

    try {
      await writeClipboard(prompt);
      setCopyState("copied");
      trackEvent("prompt_copy", {
        locale,
        topic_id: selectedTopic.id,
        card_count: cards.length,
      });
    } catch {
      setCopyState("failed");
    }
  }

  async function shareReading() {
    if (cards.length === 0) {
      return;
    }

    const shareText = formatTemplateStrict(
      copy.shareText,
      {
        cardNames: cards.map(({ card }) => card.name).join(", "),
        topicLabel: selectedTopic.label,
      },
      `${locale} tarot-reading.shareText`,
    );
    const canNativeShare = Boolean(navigator.share);

    setShareState("idle");
    trackEvent("share_click", {
      locale,
      topic_id: selectedTopic.id,
      card_count: cards.length,
      method: canNativeShare ? "native" : "clipboard",
    });

    try {
      if (canNativeShare) {
        await navigator.share({
          title: copy.shareTitle,
          text: shareText,
          url: window.location.href,
        });
        setShareState("shared");
      } else {
        await writeClipboard(`${shareText}\n${window.location.href}`);
        setShareState("copied");
      }
    } catch (error) {
      if (isShareCancel(error)) {
        setShareState("idle");
        return;
      }

      setShareState("failed");
    }
  }

  return (
    <main className="min-h-screen bg-[#10110f] text-stone-50">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl gap-8 px-5 py-6 sm:px-8 lg:grid-cols-[0.95fr_1.25fr] lg:items-center lg:py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-amber-300">
                {copy.brand}
              </p>
              <LanguageSwitch
                activeLocale={locale}
                ariaLabel={copy.languageSwitchLabel}
              />
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-stone-50 sm:text-5xl">
              {copy.heading}
            </h1>
            <p className="max-w-xl text-base leading-7 text-stone-300">
              {copy.intro}
            </p>
          </div>

          <TopicSelector
            ariaLabel={copy.topicSelectorLabel}
            cardCountLabel={cardCountLabel}
            onSelect={chooseTopic}
            selectedTopicId={selectedTopicId}
            topics={tarotData.topics}
          />

          <button
            className="min-h-12 rounded-md bg-emerald-400 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-[#10110f]"
            onClick={startDraw}
            type="button"
          >
            {copy.drawButton}
          </button>
        </div>

        <section
          aria-label={copy.workspaceLabel}
          className="grid gap-5 rounded-md border border-stone-700 bg-stone-950 p-4 shadow-2xl shadow-black/30 sm:p-5"
        >
          <CardSpread
            cardMarkLabel={copy.cardMarkLabel}
            cards={cards}
            placeholders={copy.placeholders}
          />

          <ReadingResult
            cards={cards}
            copy={copy}
            copyState={copyState}
            onCopyPrompt={copyPrompt}
            onShareReading={shareReading}
            prompt={prompt}
            selectedTopic={selectedTopic}
            shareState={shareState}
          />

          <p className="text-xs leading-5 text-stone-400">{copy.disclaimer}</p>
        </section>
      </section>
      <footer className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
        <nav
          aria-label={publicPageNavigationLabel}
          className="flex flex-wrap justify-center gap-3 text-xs text-stone-400 sm:justify-start"
        >
          {publicPageLinks.map((link) => (
            <Link
              className="transition hover:text-emerald-200"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </footer>
    </main>
  );
}

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      fallbackCopy(text);
      return;
    }
  }

  fallbackCopy(text);
}

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";

  try {
    document.body.append(textarea);
    textarea.select();

    if (!document.execCommand("copy")) {
      throw new Error("Clipboard copy command was rejected.");
    }
  } finally {
    textarea.remove();
  }
}

function isShareCancel(error: unknown) {
  return getErrorName(error) === "AbortError";
}

function getErrorName(error: unknown) {
  if (typeof error !== "object" || error === null || !("name" in error)) {
    return "";
  }

  const { name } = error;
  return typeof name === "string" ? name : "";
}
