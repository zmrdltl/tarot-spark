import { expect, test } from "@playwright/test";

test("loads the app shell", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("tarot-spark");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Draw cards. Shape the reading into a prompt.",
    }),
  ).toBeVisible();
});
