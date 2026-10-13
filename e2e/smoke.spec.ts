import { test, expect } from "@playwright/test";

test.describe("locales", () => {
  test("english home renders with the right lang", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Presence, operations and custom tools",
    );
  });

  test("dutch home renders with lang nl", async ({ page }) => {
    await page.goto("/nl");
    await expect(page.locator("html")).toHaveAttribute("lang", "nl");
  });

  test("arabic home is right-to-left", async ({ page }) => {
    await page.goto("/ar");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
});

test.describe("navigation and 404", () => {
  test("an unknown path shows the translated not-found page", async ({ page }) => {
    const response = await page.goto("/en/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "This page moved on",
    );
  });
});

test.describe("lead form", () => {
  test("shows validation errors before sending", async ({ page }) => {
    await page.goto("/en/contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(
      page.getByText("Please enter a valid email address."),
    ).toBeVisible();
  });
});

test.describe("lead API", () => {
  test("rejects a malformed submission", async ({ request }) => {
    const response = await request.post("/api/leads", {
      data: { kind: "contact", locale: "en", name: "x" },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
  });

  test("accepts a complete submission", async ({ request }) => {
    const response = await request.post("/api/leads", {
      data: {
        kind: "contact",
        locale: "en",
        name: "Playwright Tester",
        email: "playwright@example.com",
        message: "Automated smoke test enquiry for the lead form.",
        consent: true,
      },
    });
    expect(response.status()).toBe(200);
    expect((await response.json()).ok).toBe(true);
  });
});
