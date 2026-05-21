import type { Topic, TopicId } from "@/domain/tarot";

type TopicSelectorProps = {
  readonly topics: readonly Topic[];
  readonly selectedTopicId: TopicId;
  readonly ariaLabel: string;
  readonly cardCountLabel: string;
  readonly onSelect: (topicId: TopicId) => void;
};

export function TopicSelector({
  topics,
  selectedTopicId,
  ariaLabel,
  cardCountLabel,
  onSelect,
}: TopicSelectorProps) {
  return (
    <div aria-label={ariaLabel} className="grid gap-3">
      {topics.map((topic) => {
        const isSelected = topic.id === selectedTopicId;

        return (
          <button
            aria-label={`${topic.label} ${cardCountLabel}`}
            aria-pressed={isSelected}
            className={`flex min-h-14 items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition ${
              isSelected
                ? "border-amber-300 bg-amber-300 text-neutral-950"
                : "border-stone-700 bg-stone-900 text-stone-100 hover:border-emerald-300 hover:bg-stone-800"
            }`}
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            type="button"
          >
            <span className="font-semibold">{topic.label}</span>
            <span className="text-xs opacity-80">{cardCountLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
