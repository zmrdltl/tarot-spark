import type { SpreadPositionId, TarotCardId, TopicId } from "./ids";

export type { SpreadPositionId, TarotCardId, TopicId } from "./ids";

export type Topic = {
  readonly id: TopicId;
  readonly label: string;
  readonly promptLead: string;
  readonly resultFrame: string;
};

export type SpreadPosition = {
  readonly id: SpreadPositionId;
  readonly label: string;
};

export type TarotCard = {
  readonly id: TarotCardId;
  readonly name: string;
  readonly tone: string;
  readonly upright: string;
  readonly reflection: string;
  readonly promptAngle: string;
};

export type PromptTemplate = {
  readonly spreadLine: string;
  readonly lines: readonly string[];
};

export type DrawnCard = {
  readonly position: SpreadPosition;
  readonly card: TarotCard;
};

export type LocaleTarotData = {
  readonly topics: readonly Topic[];
  readonly spreadPositions: readonly SpreadPosition[];
  readonly promptTemplate: PromptTemplate;
  readonly cards: readonly TarotCard[];
};
