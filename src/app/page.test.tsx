import "@testing-library/jest-dom/vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TarotExperience } from "@/features/tarot-reading";
import Home from "./(root)/page";

const originalExecCommand = document.execCommand;
const originalShare = navigator.share;

describe("Home", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();

    if (originalExecCommand) {
      document.execCommand = originalExecCommand;
    } else {
      Reflect.deleteProperty(document, "execCommand");
    }

    if (originalShare) {
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: originalShare,
      });
    } else {
      Reflect.deleteProperty(navigator, "share");
    }
  });

  it("renders the app shell", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Draw three cards and turn them into an AI-ready tarot prompt.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/entertainment and self-reflection only/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
  });

  it("renders Korean localized content", () => {
    render(<TarotExperience locale="ko" />);

    expect(
      screen.getByRole("heading", {
        name: "세 장의 카드를 뽑고 AI용 타로 프롬프트로 정리하세요.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "카드 뽑기",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/의료, 법률, 재정/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "개인정보" })).toHaveAttribute(
      "href",
      "/ko/privacy",
    );
  });

  it("draws cards and generates a copyable prompt", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    render(<Home />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Draw cards",
      }),
    );

    expect(screen.getByText("Spark: The Fool")).toBeInTheDocument();
    expect(screen.getByText("Shadow: The Magician")).toBeInTheDocument();
    expect(
      screen.getByText("Next step: The High Priestess"),
    ).toBeInTheDocument();

    const prompt = screen.getByLabelText(
      "Generated prompt",
    ) as HTMLTextAreaElement;

    expect(prompt.value).toContain("Topic: Love");
    expect(prompt.value).toContain("Act as a reflective tarot writing partner");
    expect(
      screen.getByRole("button", {
        name: "Copy prompt",
      }),
    ).toBeInTheDocument();
  });

  it("emits behavior analytics with stable ids", () => {
    const events: {
      readonly name: string;
      readonly payload: Record<string, unknown>;
    }[] = [];
    const listener = (event: Event) => {
      events.push((event as CustomEvent).detail);
    };
    vi.spyOn(Math, "random").mockReturnValue(0);
    window.addEventListener("tarot_spark_event", listener);

    try {
      render(<Home />);

      fireEvent.click(screen.getByRole("button", { name: "Reunion 3 cards" }));
      fireEvent.click(screen.getByRole("button", { name: "Draw cards" }));

      expect(events).toContainEqual({
        name: "topic_click",
        payload: { locale: "en", topic_id: "reunion" },
      });
      expect(events).toContainEqual({
        name: "draw_start",
        payload: { locale: "en", topic_id: "reunion" },
      });
      expect(events).toContainEqual({
        name: "card_selected",
        payload: {
          locale: "en",
          topic_id: "reunion",
          position_id: "spark",
          card_id: "the-fool",
        },
      });
      expect(events).toContainEqual({
        name: "result_view",
        payload: { locale: "en", topic_id: "reunion", card_count: 3 },
      });
    } finally {
      window.removeEventListener("tarot_spark_event", listener);
    }
  });

  it("shows a failure message when prompt copy is blocked", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    document.execCommand = vi.fn(() => false);

    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: "Draw cards" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy prompt" }));

    await waitFor(() => {
      expect(
        screen.getByText(/browser permission blocked that action/i),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", { name: "Copy prompt" }),
    ).toBeInTheDocument();
  });

  it("keeps share idle when native share is cancelled", async () => {
    const share = vi.fn(() =>
      Promise.reject(new DOMException("Share cancelled", "AbortError")),
    );
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: share,
    });

    renderDrawnReading();

    fireEvent.click(screen.getByRole("button", { name: "Share" }));

    await act(async () => {
      await Promise.resolve();
    });

    expect(share).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText(/browser permission blocked that action/i),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
  });

  it("labels fallback share as copied text", async () => {
    Reflect.deleteProperty(navigator, "share");
    document.execCommand = vi.fn(() => true);

    renderDrawnReading();

    fireEvent.click(screen.getByRole("button", { name: "Share" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Copied share text" }),
      ).toBeInTheDocument();
    });
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});

function renderDrawnReading() {
  vi.spyOn(Math, "random").mockReturnValue(0);

  render(<Home />);
  fireEvent.click(screen.getByRole("button", { name: "Draw cards" }));
}
