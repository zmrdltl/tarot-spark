import type { DrawnCard, Topic } from "@/domain/tarot";
import type { TarotReadingCopy } from "../i18n";
import type { CopyState, ShareState } from "../types";

type ReadingResultProps = {
  readonly cards: readonly DrawnCard[];
  readonly copy: TarotReadingCopy;
  readonly copyState: CopyState;
  readonly prompt: string;
  readonly selectedTopic: Topic;
  readonly shareState: ShareState;
  readonly onCopyPrompt: () => void;
  readonly onShareReading: () => void;
};

export function ReadingResult({
  cards,
  copy,
  copyState,
  prompt,
  selectedTopic,
  shareState,
  onCopyPrompt,
  onShareReading,
}: ReadingResultProps) {
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              className="min-h-11 rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-amber-200"
              onClick={onCopyPrompt}
              type="button"
            >
              {copyState === "copied" ? copy.copied : copy.copyPrompt}
            </button>
            <button
              className="min-h-11 rounded-md border border-stone-600 px-4 py-2 text-sm font-semibold text-stone-100 transition hover:border-emerald-300 hover:text-emerald-200"
              onClick={onShareReading}
              type="button"
            >
              {getShareButtonLabel(copy, shareState)}
            </button>
          </div>
          {(copyState === "failed" || shareState === "failed") && (
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
