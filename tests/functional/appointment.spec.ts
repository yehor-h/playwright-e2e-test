import { test, expect } from "@playwright/test";

test.describe("Make an appointment functionality", () => {
  test.beforeEach("Go to the website and login", async ({ page }) => {
    // Launch URL and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    await expect(page).toHaveTitle("CURA Healthcare Service");

    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // Succesful Login
    await page.getByRole("link", { name: "Make Appointment" }).click();

    await expect(page.getByText("Please login to make")).toBeVisible();

    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");

    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(
      page.getByRole("heading", { name: "Make Appointment" }),
    ).toBeVisible();
  });

  test("Make succesful appointment", async ({ page }) => {
    // 1. Proceed to appointment screen, assert the header
    await expect(
      page.getByRole("heading", { name: "Make Appointment" }),
    ).toBeVisible();

    // 2. Select the facility from a dropdown
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    // 3. Fill the date
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("cell", { name: "5" }).first().click();

    // 4. Add the comment in the comment box
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("test appointment");

    // 5. Confirm the appointment, assert the text of succesfully created appointment
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(
      page.getByRole("heading", { name: "Appointment Confirmation" }),
    ).toBeVisible();
  });
});
