import { expect, test } from "@playwright/test";

test("loads the app shell", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("tarot-spark");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Draw three cards and turn them into an AI-ready tarot prompt.",
    }),
  ).toBeVisible();
});

test("draws tarot cards and copies the generated prompt", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Reunion 3 cards" }).click();
  await page.getByRole("button", { name: "Draw cards" }).click();

  await expect(page.getByLabel("Generated prompt")).toContainText(
    "Topic: Reunion",
  );
  await expect(
    page.getByText("Tarot content is for entertainment"),
  ).toBeVisible();

  await page.getByRole("button", { name: "Copy prompt" }).click();

  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();

  await page.getByRole("button", { name: "Share" }).click();

  await expect(
    page.getByRole("button", { name: "Copied share text" }),
  ).toBeVisible();
});
