import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PublicPage, getPublicPageMetadata, getPublicPagePath } from ".";

describe("PublicPage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders English privacy content and public navigation", () => {
    render(<PublicPage locale="en" pageId="privacy" />);

    expect(
      screen.getByRole("heading", {
        name: "Privacy Policy",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not require an account/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute(
      "href",
      "/ko/privacy",
    );
  });

  it("renders Korean disclaimer content", () => {
    render(<PublicPage locale="ko" pageId="disclaimer" />);

    expect(
      screen.getByRole("heading", {
        name: "면책 고지",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/자격을 갖춘 전문가/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/disclaimer",
    );
  });

  it("keeps metadata and paths localized", () => {
    expect(getPublicPageMetadata("en", "contact")).toMatchObject({
      title: "Contact tarot-spark",
    });
    expect(getPublicPageMetadata("ko", "contact")).toMatchObject({
      title: "tarot-spark 문의",
    });
    expect(getPublicPagePath("en", "contact")).toBe("/contact");
    expect(getPublicPagePath("ko", "contact")).toBe("/ko/contact");
  });
});
