import Image from "next/image";
import type { DrawnCard, Topic } from "@/domain/tarot";
import type { TarotReadingCopy } from "../i18n";
import type { CopyState, KakaoShareState, ShareState } from "../types";

type ReadingResultProps = {
  readonly cards: readonly DrawnCard[];
  readonly copy: TarotReadingCopy;
  readonly copyState: CopyState;
  readonly hasKakaoShare: boolean;
  readonly instagramCopyState: CopyState;
  readonly kakaoShareState: KakaoShareState;
  readonly prompt: string;
  readonly selectedTopic: Topic;
  readonly shareState: ShareState;
  readonly urlCopyState: CopyState;
  readonly onInstagramShare: () => void;
  readonly onKakaoShare: () => void;
  readonly onCopyPrompt: () => void;
  readonly onCopyUrl: () => void;
  readonly onShareReading: () => void;
};

export function ReadingResult({
  cards,
  copy,
  copyState,
  hasKakaoShare,
  instagramCopyState,
  kakaoShareState,
  prompt,
  selectedTopic,
  shareState,
  urlCopyState,
  onInstagramShare,
  onKakaoShare,
  onCopyPrompt,
  onCopyUrl,
  onShareReading,
}: ReadingResultProps) {
  const actionGridClassName =
    "grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]";
  const primaryActionButtonClassName =
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-amber-300 bg-amber-300 px-3 py-2 text-center text-sm font-semibold leading-5 text-neutral-950 transition hover:border-amber-200 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-stone-950";
  const secondaryActionButtonClassName =
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-stone-700 bg-neutral-950 px-3 py-2 text-center text-sm font-semibold leading-5 text-stone-100 transition hover:border-stone-500 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-stone-950";

  return (
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
                key={`${position.id}-${card.id}`}
              >
                <h3 className="text-sm font-semibold text-stone-50">
                  {position.label}: {card.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  {card.reflection}
                </p>
              </article>
            ))}
          </div>

          <label className="grid gap-2 text-sm font-semibold text-stone-100">
            {copy.generatedPromptLabel}
            <textarea
              className="min-h-56 resize-y rounded-md border border-stone-700 bg-neutral-950 p-4 font-mono text-xs leading-5 text-stone-200 outline-none focus:border-emerald-300"
              readOnly
              value={prompt}
            />
          </label>

          <div className={actionGridClassName}>
            <button
              className={primaryActionButtonClassName}
              onClick={onCopyPrompt}
              type="button"
            >
              <span className="whitespace-nowrap">
                {copyState === "copied" ? copy.copied : copy.copyPrompt}
              </span>
            </button>
            {hasKakaoShare && (
              <button
                className={`${secondaryActionButtonClassName} hover:border-[#FEE500]`}
                onClick={onKakaoShare}
                type="button"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#FEE500]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4"
                    height={16}
                    src="/brand/kakaotalk-symbol.svg"
                    width={16}
                  />
                </span>
                <span className="whitespace-nowrap">
                  {kakaoShareState === "opened"
                    ? copy.kakaoShared
                    : copy.kakaoShare}
                </span>
              </button>
            )}
            <button
              className={`${secondaryActionButtonClassName} hover:border-pink-300 hover:text-pink-100`}
              onClick={onInstagramShare}
              type="button"
            >
              <Image
                alt=""
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
                height={20}
                src="/brand/instagram-glyph-gradient.png"
                width={20}
              />
              <span className="whitespace-nowrap">
                {instagramCopyState === "copied"
                  ? copy.instagramCopied
                  : copy.instagramShare}
              </span>
            </button>
            <button
              className={`${secondaryActionButtonClassName} hover:border-emerald-300 hover:text-emerald-200`}
              onClick={onShareReading}
              type="button"
            >
              <span className="whitespace-nowrap">
                {getShareButtonLabel(copy, shareState)}
              </span>
            </button>
            <button
              className={`${secondaryActionButtonClassName} hover:border-emerald-300 hover:text-emerald-200`}
              onClick={onCopyUrl}
              type="button"
            >
              <span className="whitespace-nowrap">
                {urlCopyState === "copied" ? copy.copiedUrl : copy.copyUrl}
              </span>
            </button>
          </div>
          {(copyState === "failed" ||
            instagramCopyState === "failed" ||
            kakaoShareState === "failed" ||
            shareState === "failed" ||
            urlCopyState === "failed") && (
            <p className="text-sm text-rose-200">{copy.blockedAction}</p>
          )}
        </>
      ) : (
        <div className="rounded-md border border-stone-700 bg-stone-900 p-4">
          <h2 className="text-lg font-semibold text-stone-50">
            {copy.emptyHeading}
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            {copy.emptyBody}
          </p>
        </div>
      )}
    </div>
  );
}

function getShareButtonLabel(copy: TarotReadingCopy, shareState: ShareState) {
  if (shareState === "shared") {
    return copy.shared;
  }

  if (shareState === "copied") {
    return copy.copiedShareText;
  }

  return copy.share;
}
