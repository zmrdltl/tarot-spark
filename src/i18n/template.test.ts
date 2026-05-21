import { describe, expect, it } from "vitest";
import { assertTemplatePlaceholders, formatTemplateStrict } from "./template";

describe("template helpers", () => {
  it("formats a template when placeholders exactly match values", () => {
    expect(
      formatTemplateStrict(
        "{topicLabel}: {cardNames}",
        {
          cardNames: "The Fool, The Star",
          topicLabel: "Love",
        },
        "shareText",
      ),
    ).toBe("Love: The Fool, The Star");
  });

  it("rejects values that are not used by the template", () => {
    expect(() =>
      formatTemplateStrict(
        "{topicLabel}",
        {
          cardNames: "The Fool",
          topicLabel: "Love",
        },
        "shareText",
      ),
    ).toThrow("missing: cardNames");
  });

  it("rejects placeholders that are not supplied by values", () => {
    expect(() =>
      formatTemplateStrict(
        "{topicLabel}: {cardNames}",
        {
          topicLabel: "Love",
        },
        "shareText",
      ),
    ).toThrow("unexpected: cardNames");
  });

  it("rejects duplicate placeholders in a template", () => {
    expect(() =>
      assertTemplatePlaceholders(
        "{topicLabel} {topicLabel}",
        ["topicLabel"],
        "shareText",
      ),
    ).toThrow("duplicate actual: topicLabel");
  });

  it("rejects malformed placeholder syntax", () => {
    expect(() =>
      assertTemplatePlaceholders("{topic-label}", ["topicLabel"], "shareText"),
    ).toThrow("malformed template placeholders");
  });
});
