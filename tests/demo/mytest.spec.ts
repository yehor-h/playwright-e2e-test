import { test, expect } from "@playwright/test";

test("Should load home page with correct title", async ({ page }) => {
  // 1. Go to the home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // 3. assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Should click 'make appointment' button", { tag: "@smoke" }, async ({ page }, testInfo) => {
  // steps..
});
