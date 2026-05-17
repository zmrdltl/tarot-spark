"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "./analytics";
import {
  buildPrompt,
  defaultTopic,
  drawCards,
  getTopic,
  topics,
  type DrawnCard,
  type TopicId,
} from "./tarot-data";

type CopyState = "idle" | "copied" | "failed";
type ShareState = "idle" | "shared" | "copied" | "failed";

export function TarotExperience() {
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>(
    defaultTopic.id,
  );
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [shareState, setShareState] = useState<ShareState>("idle");

  const selectedTopic = getTopic(selectedTopicId);
  const prompt = useMemo(
    () => (cards.length > 0 ? buildPrompt(selectedTopic, cards) : ""),
    [cards, selectedTopic],
  );

  function chooseTopic(topicId: TopicId) {
    setSelectedTopicId(topicId);
    setCards([]);
    setCopyState("idle");
    setShareState("idle");
    trackEvent("topic_click", { topic_id: topicId });
  }

  function startDraw() {
    trackEvent("draw_start", { topic_id: selectedTopic.id });

    const drawnCards = drawCards();
    setCards(drawnCards);
    setCopyState("idle");
    setShareState("idle");

    drawnCards.forEach(({ position, card }) => {
      trackEvent("card_selected", {
        topic_id: selectedTopic.id,
        position,
        card_id: card.id,
      });
    });
    trackEvent("result_view", {
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

    const shareText = `${selectedTopic.label} tarot prompt: ${cards
      .map(({ card }) => card.name)
      .join(", ")}`;
    const canNativeShare = Boolean(navigator.share);

    setShareState("idle");
    trackEvent("share_click", {
      topic_id: selectedTopic.id,
      card_count: cards.length,
      method: canNativeShare ? "native" : "clipboard",
    });

    try {
      if (canNativeShare) {
        await navigator.share({
          title: "tarot-spark reading",
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
            <p className="text-sm font-semibold text-amber-300">tarot-spark</p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-stone-50 sm:text-5xl">
              Draw three cards and turn them into an AI-ready tarot prompt.
            </h1>
            <p className="max-w-xl text-base leading-7 text-stone-300">
              Pick a topic, draw a compact spread, then copy a prompt designed
              for reflective tarot writing.
            </p>
          </div>

          <div aria-label="Choose a tarot topic" className="grid gap-3">
            {topics.map((topic) => {
              const isSelected = topic.id === selectedTopicId;

              return (
                <button
                  aria-pressed={isSelected}
                  className={`flex min-h-14 items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition ${
                    isSelected
                      ? "border-amber-300 bg-amber-300 text-neutral-950"
                      : "border-stone-700 bg-stone-900 text-stone-100 hover:border-emerald-300 hover:bg-stone-800"
                  }`}
                  key={topic.id}
                  onClick={() => chooseTopic(topic.id)}
                  type="button"
                >
                  <span className="font-semibold">{topic.label}</span>
                  <span className="text-xs opacity-80">3 cards</span>
                </button>
              );
            })}
          </div>

          <button
            className="min-h-12 rounded-md bg-emerald-400 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-[#10110f]"
            onClick={startDraw}
            type="button"
          >
            Draw cards
          </button>
        </div>

        <section
          aria-label="Tarot reading workspace"
          className="grid gap-5 rounded-md border border-stone-700 bg-stone-950 p-4 shadow-2xl shadow-black/30 sm:p-5"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {(cards.length > 0 ? cards : placeholderCards).map(
              (drawnCard, index) => (
                <article
                  className="grid min-h-56 grid-rows-[auto_1fr_auto] rounded-md border border-stone-700 bg-[#efe6d0] p-4 text-neutral-950"
                  key={drawnCard.position}
                >
                  <div className="flex items-start justify-between gap-3 text-xs font-semibold">
                    <span>{drawnCard.position}</span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="grid h-24 w-16 place-items-center rounded-md border border-neutral-950 bg-[radial-gradient(circle_at_center,#f6c453_0_18%,#164e3f_19%_42%,#1f1f1f_43%_100%)]">
                      <span className="sr-only">
                        Decorative tarot card mark
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {drawnCard.card.name}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-700">
                      {drawnCard.card.tone}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>

          <div aria-live="polite" className="grid gap-4">
            {cards.length > 0 ? (
              <>
                <div className="grid gap-3">
                  <p className="text-sm font-semibold text-amber-300">
                    {selectedTopic.label}
                  </p>
                  <p className="text-base leading-7 text-stone-200">
                    {selectedTopic.resultFrame}
                  </p>
                </div>

                <div className="grid gap-3">
                  {cards.map(({ position, card }) => (
                    <article
                      className="rounded-md border border-stone-700 bg-stone-900 p-4"
                      key={`${position}-${card.id}`}
                    >
                      <h3 className="text-sm font-semibold text-stone-50">
                        {position}: {card.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-stone-300">
                        {card.reflection}
                      </p>
                    </article>
                  ))}
                </div>

                <label className="grid gap-2 text-sm font-semibold text-stone-100">
                  Generated prompt
                  <textarea
                    className="min-h-56 resize-y rounded-md border border-stone-700 bg-neutral-950 p-4 font-mono text-xs leading-5 text-stone-200 outline-none focus:border-emerald-300"
                    readOnly
                    value={prompt}
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    className="min-h-11 rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-amber-200"
                    onClick={copyPrompt}
                    type="button"
                  >
                    {copyState === "copied" ? "Copied" : "Copy prompt"}
                  </button>
                  <button
                    className="min-h-11 rounded-md border border-stone-600 px-4 py-2 text-sm font-semibold text-stone-100 transition hover:border-emerald-300 hover:text-emerald-200"
                    onClick={shareReading}
                    type="button"
                  >
                    {getShareButtonLabel(shareState)}
                  </button>
                </div>
                {(copyState === "failed" || shareState === "failed") && (
                  <p className="text-sm text-rose-200">
                    Browser permission blocked that action. You can still select
                    and copy the prompt manually.
                  </p>
                )}
              </>
            ) : (
              <div className="rounded-md border border-stone-700 bg-stone-900 p-4">
                <h2 className="text-lg font-semibold text-stone-50">
                  Choose a topic to begin.
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  The first draw creates a three-card spread and a prompt you
                  can use with an AI writing tool.
                </p>
              </div>
            )}
          </div>

          <p className="text-xs leading-5 text-stone-400">
            Tarot content is for entertainment and self-reflection only. It is
            not medical, legal, financial, investment, or mental-health advice.
          </p>
        </section>
      </section>
    </main>
  );
}

const placeholderCards: DrawnCard[] = [
  {
    position: "Spark",
    card: {
      id: "placeholder-spark",
      name: "Ready",
      tone: "Pick a topic",
      upright: "",
      reflection: "",
      promptAngle: "",
    },
  },
  {
    position: "Shadow",
    card: {
      id: "placeholder-shadow",
      name: "Set",
      tone: "Draw cards",
      upright: "",
      reflection: "",
      promptAngle: "",
    },
  },
  {
    position: "Next step",
    card: {
      id: "placeholder-next",
      name: "Prompt",
      tone: "Copy result",
      upright: "",
      reflection: "",
      promptAngle: "",
    },
  },
];

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

function getShareButtonLabel(shareState: ShareState) {
  if (shareState === "shared") {
    return "Shared";
  }

  if (shareState === "copied") {
    return "Copied share text";
  }

  return "Share";
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
