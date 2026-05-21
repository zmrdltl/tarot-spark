import type { DrawnCard } from "@/domain/tarot";
import type { TarotReadingCopy } from "../i18n";

type DisplayCard = {
  readonly positionLabel: string;
  readonly cardName: string;
  readonly cardTone: string;
};

type CardSpreadProps = {
  readonly cards: readonly DrawnCard[];
  readonly placeholders: TarotReadingCopy["placeholders"];
  readonly cardMarkLabel: string;
};

export function CardSpread({
  cards,
  placeholders,
  cardMarkLabel,
}: CardSpreadProps) {
  const displayCards: readonly DisplayCard[] =
    cards.length > 0
      ? cards.map(({ position, card }) => ({
          positionLabel: position.label,
          cardName: card.name,
          cardTone: card.tone,
        }))
      : placeholders;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {displayCards.map((displayCard, index) => (
        <article
          className="grid min-h-56 grid-rows-[auto_1fr_auto] rounded-md border border-stone-700 bg-[#efe6d0] p-4 text-neutral-950"
          key={displayCard.positionLabel}
        >
          <div className="flex items-start justify-between gap-3 text-xs font-semibold">
            <span>{displayCard.positionLabel}</span>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid h-24 w-16 place-items-center rounded-md border border-neutral-950 bg-[radial-gradient(circle_at_center,#f6c453_0_18%,#164e3f_19%_42%,#1f1f1f_43%_100%)]">
              <span className="sr-only">{cardMarkLabel}</span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{displayCard.cardName}</h2>
            <p className="mt-1 text-sm text-neutral-700">
              {displayCard.cardTone}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
