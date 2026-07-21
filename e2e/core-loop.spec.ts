import { test, expect, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

/**
 * Core loop: sign in → add income → match FIRC → generate invoice → liability.
 * Sign-in uses the REAL magic-link route: the admin API mints a link for the
 * seeded demo user (scripts/seed.mjs) and the browser visits /auth/confirm
 * exactly like a creator clicking the email. Needs SUPABASE_SERVICE_ROLE_KEY.
 */
const DEMO_EMAIL = "demo@raha-demo.in";

async function signIn(page: Page) {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: DEMO_EMAIL,
  });
  if (error || !data.properties?.hashed_token) {
    throw new Error(`Couldn't mint a sign-in link: ${error?.message}`);
  }
  await page.goto(
    `/auth/confirm?token_hash=${data.properties.hashed_token}&type=magiclink&next=/app`,
  );
  await page.waitForURL("**/app");
}

test.describe("public funnel", () => {
  test("landing page renders hero, offer and waitlist", async ({ page }) => {
    await page.goto("/");
    // Scoped to the h1: "Four ways creator taxes go wrong" also matches the text.
    await expect(page.getByRole("heading", { level: 1, name: /creator taxes/i })).toBeVisible();
    // exact: the FAQ answer also contains "₹20,000/year".
    await expect(page.getByText("₹20,000", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /join the waitlist/i })).toBeVisible();
  });

  test("audit check completes to the email gate", async ({ page }) => {
    await page.goto("/audit");
    await expect(page.getByText("Question 1 of 8")).toBeVisible();
    await page.getByRole("button", { name: "₹20–50 lakh" }).click();
    await page.getByRole("button", { name: "YouTube / AdSense" }).click();
    await page.getByRole("button", { name: "Continue →" }).click();
    await page.getByRole("button", { name: "Yes", exact: true }).click();
    await page.getByRole("button", { name: "Honestly, not sure" }).click();
    await page.getByRole("button", { name: "What's an LUT?" }).click();
    await page.getByRole("button", { name: "Never", exact: true }).click();
    await page.getByRole("button", { name: /Ad-hoc PDFs/ }).click();
    await page.getByRole("button", { name: /No idea/ }).click();
    await expect(page.getByText("Your report is ready.")).toBeVisible();
  });
});

test.describe("core loop (needs seeded Supabase)", () => {
  test.skip(
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY,
    "Set up .env.local with a real Supabase project (incl. service key) and run `npm run seed` first.",
  );

  test.beforeEach(async ({ page }) => {
    await signIn(page);
  });

  test("dashboard shows the set-aside counter", async ({ page }) => {
    await page.goto("/app");
    await expect(page.getByText(/set aside, as of today/i)).toBeVisible();
    await expect(page.getByText(/estimate — verify with your ca/i).first()).toBeVisible();
  });

  test("income: add a manual INR entry", async ({ page }) => {
    await page.goto("/app/income");
    await page.getByRole("button", { name: "Add income" }).first().click();
    await page.getByLabel("Date received").fill("2026-07-15");
    await page.getByLabel("Platform / source").fill("Brand deal");
    await page.getByLabel(/Amount \(INR\)/).fill("50000");
    await page.getByRole("button", { name: "Save entry" }).click();
    await expect(page.getByText("Income entry added")).toBeVisible();
  });

  test("FIRC page shows coverage and matching panel", async ({ page }) => {
    await page.goto("/app/firc");
    await expect(page.getByText(/FIRC coverage/i)).toBeVisible();
    await expect(page.getByText(/needs matching/i)).toBeVisible();
  });

  test("invoices: seeded final invoice renders and PDF responds", async ({ page }) => {
    await page.goto("/app/invoices");
    await expect(page.getByText("DEMO/2026-27/001")).toBeVisible();
    // The link is target="_blank", so the response lands on a popup page, not
    // `page`. Fetch it through the page's request context instead — same cookie
    // jar, so the authenticated route resolves exactly as a click would.
    const href = await page.getByRole("link", { name: "PDF" }).first().getAttribute("href");
    expect(href).toBeTruthy();
    const response = await page.request.get(href!);
    expect(response.status()).toBe(200);
  });
});
