import type { DrawnCard, SpreadPosition, TarotCard } from "./types";

export function drawCards(
  cards: readonly TarotCard[],
  spreadPositions: readonly SpreadPosition[],
  random: () => number = Math.random,
): DrawnCard[] {
  const pool = [...cards];

  return spreadPositions.map((position) => {
    const index = Math.min(Math.floor(random() * pool.length), pool.length - 1);
    const [card] = pool.splice(index, 1);

    if (!card) {
      throw new Error("Unable to draw a tarot card.");
    }

    return { position, card };
  });
}
