export const topicIds = [
  "love",
  "reunion",
  "feelings",
  "relationship-flow",
  "career-direction",
] as const;

export type TopicId = (typeof topicIds)[number];

export const spreadPositionIds = ["spark", "shadow", "next-step"] as const;

export type SpreadPositionId = (typeof spreadPositionIds)[number];

export const tarotCardIds = [
  "the-fool",
  "the-magician",
  "the-high-priestess",
  "the-empress",
  "the-emperor",
  "the-lovers",
  "the-chariot",
  "strength",
  "the-hermit",
  "wheel-of-fortune",
  "temperance",
  "the-star",
] as const;

export type TarotCardId = (typeof tarotCardIds)[number];
