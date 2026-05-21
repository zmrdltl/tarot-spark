import type { Topic, TopicId } from "./types";

export function getDefaultTopic(topics: readonly Topic[]): Topic {
  const [topic] = topics;

  if (!topic) {
    throw new Error("No default tarot topic is configured.");
  }

  return topic;
}

export function getTopic(topics: readonly Topic[], topicId: TopicId): Topic {
  return (
    topics.find((topic) => topic.id === topicId) ?? getDefaultTopic(topics)
  );
}
