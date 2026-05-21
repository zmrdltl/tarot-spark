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

test("loads Korean localized content", async ({ page }) => {
  await page.goto("/ko");

  await expect(page).toHaveTitle("타로 스파크");
  await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  await expect(
    page.getByRole("heading", {
      name: "세 장의 카드를 뽑고 AI용 타로 프롬프트로 정리하세요.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "카드 뽑기" })).toBeVisible();
});

test("serves Korean html lang before hydration", async ({ request }) => {
  const response = await request.get("/ko");
  const html = await response.text();

  expect(html).toContain('<html lang="ko">');
});

test("returns 404 for unsupported or duplicate locale paths", async ({
  request,
}) => {
  const unsupportedLocaleResponse = await request.get("/fr");
  const duplicateDefaultLocaleResponse = await request.get("/en");

  expect(unsupportedLocaleResponse.status()).toBe(404);
  expect(duplicateDefaultLocaleResponse.status()).toBe(404);
});

test("resets reading state when switching languages", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Draw cards" }).click();
  await expect(page.getByLabel("Generated prompt")).toBeVisible();

  await page.getByRole("link", { name: "한국어" }).click();

  await expect(
    page.getByRole("heading", {
      name: "세 장의 카드를 뽑고 AI용 타로 프롬프트로 정리하세요.",
    }),
  ).toBeVisible();
  await expect(page.getByLabel("Generated prompt")).toBeHidden();
  await expect(page.getByText("시작할 주제를 선택하세요.")).toBeVisible();
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
