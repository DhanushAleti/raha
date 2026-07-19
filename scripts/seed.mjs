/**
 * Seed a demo creator that mirrors PRD §1: AdSense USD + Patreon EUR monthly,
 * 3 INR brand deals, FIRCs covering ~60% of foreign income (so the dashboard
 * shows both zero-rated ✓ and at-risk ✗ states out of the box).
 *
 * Usage: npm run seed   (requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)
 * Idempotent: re-running resets the demo user's data.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";

// Minimal .env.local loader — avoids a dotenv dependency.
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey || url.includes("placeholder")) {
  console.error(
    "Seed needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local (real project, not placeholders).",
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const DEMO_EMAIL = "demo@raha-demo.in";
const DEMO_PASSWORD = "raha-demo-1234";

// Indicative monthly reference rates — keep in sync with src/lib/fx/convert.ts.
const RATES = {
  "2026-04": { USD: 84.1, EUR: 91.2 },
  "2026-05": { USD: 84.35, EUR: 91.6 },
  "2026-06": { USD: 84.6, EUR: 92.05 },
  "2026-07": { USD: 84.75, EUR: 92.3 },
};

const inr = (amount, rate) => Math.round((amount * rate + Number.EPSILON) * 100) / 100;

async function findOrCreateUser() {
  const { data: list, error: listErr } = await admin.auth.admin.listUsers();
  if (listErr) throw listErr;
  const existing = list.users.find((u) => u.email === DEMO_EMAIL);
  if (existing) return existing.id;
  const { data, error } = await admin.auth.admin.createUser({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: "Demo Creator" },
  });
  if (error) throw error;
  return data.user.id;
}

async function main() {
  const userId = await findOrCreateUser();
  console.log(`demo user: ${DEMO_EMAIL} (${userId})`);

  // Reset previous demo data (FK cascades clear matches/items).
  for (const table of ["firc_matches", "firc_records", "invoice_items", "invoices", "income_entries", "documents"]) {
    const { error } = await admin.from(table).delete().eq("user_id", userId);
    if (error) throw new Error(`clearing ${table}: ${error.message}`);
  }

  const { error: profileErr } = await admin.from("profiles").upsert({
    id: userId,
    display_name: "Demo Creator",
    state: "Karnataka",
    address: "42 Creator Lane, Indiranagar, Bengaluru 560038",
    pan: "ABCPD1234E",
    gstin: "29ABCPD1234E1Z5",
    lut_arn: "AD290426000123B",
    invoice_prefix: "DEMO",
  });
  if (profileErr) throw profileErr;

  // ── income: 4× AdSense USD, 4× Patreon EUR, 3× INR brand deals ──────────
  const months = ["2026-04", "2026-05", "2026-06", "2026-07"];
  const adsenseUsd = [3180, 3420, 2950, 3610];
  const patreonEur = [1420, 1385, 1510, 1465];

  const incomeRows = [];
  months.forEach((month, i) => {
    const usdRate = RATES[month].USD;
    incomeRows.push({
      user_id: userId,
      entry_date: `${month}-21`,
      platform: "YouTube / AdSense",
      description: `AdSense payout ${month}`,
      category: "ads",
      currency: "USD",
      amount_original: adsenseUsd[i],
      rate_used: usdRate,
      rate_source: "rbi_table",
      amount_inr: inr(adsenseUsd[i], usdRate),
      source: "manual",
    });
    const eurRate = RATES[month].EUR;
    incomeRows.push({
      user_id: userId,
      entry_date: `${month}-05`,
      platform: "Patreon",
      description: `Patreon membership payout ${month}`,
      category: "memberships",
      currency: "EUR",
      amount_original: patreonEur[i],
      rate_used: eurRate,
      rate_source: "rbi_table",
      amount_inr: inr(patreonEur[i], eurRate),
      source: "manual",
    });
  });

  const brandDeals = [
    { date: "2026-05-12", client: "Nimbus Audio", amount: 250000, tds: 25000 },
    { date: "2026-06-18", client: "Kova Fitness", amount: 175000, tds: 17500 },
    { date: "2026-07-08", client: "Zephyr Games", amount: 300000, tds: 30000 },
  ];
  for (const deal of brandDeals) {
    incomeRows.push({
      user_id: userId,
      entry_date: deal.date,
      platform: "Brand deal",
      description: `${deal.client} sponsorship`,
      category: "brand_deal",
      currency: "INR",
      amount_original: deal.amount,
      rate_used: 1,
      rate_source: "native",
      amount_inr: deal.amount,
      tds_inr: deal.tds,
      source: "manual",
    });
  }

  const { data: insertedIncome, error: incomeErr } = await admin
    .from("income_entries")
    .insert(incomeRows)
    .select("id, entry_date, platform, currency, amount_inr");
  if (incomeErr) throw incomeErr;
  console.log(`income entries: ${insertedIncome.length}`);

  // ── FIRCs covering ~60% of foreign entries (Apr+May USD, Apr+May+Jun EUR) ─
  const foreign = insertedIncome.filter((r) => r.currency !== "INR");
  const covered = foreign.filter(
    (r) =>
      (r.currency === "USD" && ["2026-04", "2026-05"].includes(r.entry_date.slice(0, 7))) ||
      (r.currency === "EUR" && ["2026-04", "2026-05", "2026-06"].includes(r.entry_date.slice(0, 7))),
  );

  let refSeq = 1;
  for (const entry of covered) {
    const receivedDate = new Date(entry.entry_date);
    receivedDate.setDate(receivedDate.getDate() + 6);
    const { data: firc, error: fircErr } = await admin
      .from("firc_records")
      .insert({
        user_id: userId,
        received_date: receivedDate.toISOString().slice(0, 10),
        bank: "HDFC Bank",
        reference_no: `FIRC-2026-${String(refSeq++).padStart(4, "0")}`,
        currency: entry.currency,
        amount_foreign: entry.currency === "USD" ? adsenseUsd[0] : patreonEur[0],
        amount_inr: entry.amount_inr,
        document_id: null,
      })
      .select("id")
      .single();
    if (fircErr) throw fircErr;

    const { error: matchErr } = await admin.from("firc_matches").insert({
      user_id: userId,
      firc_id: firc.id,
      income_entry_id: entry.id,
      allocated_inr: entry.amount_inr,
    });
    if (matchErr) throw matchErr;
  }
  console.log(`FIRCs + matches: ${covered.length} (foreign coverage ~${Math.round((covered.length / foreign.length) * 100)}%)`);

  // ── one finalized domestic invoice ───────────────────────────────────────
  const subtotal = 250000;
  const cgst = 22500;
  const sgst = 22500;
  const { data: invoice, error: invErr } = await admin
    .from("invoices")
    .insert({
      user_id: userId,
      status: "final",
      finalized_at: new Date("2026-05-12").toISOString(),
      fy: "2026-27",
      seq: 1,
      invoice_number: "DEMO/2026-27/001",
      issue_date: "2026-05-12",
      supply_type: "domestic",
      client_name: "Nimbus Audio Pvt Ltd",
      client_gstin: "29AABCN1234F1Z9",
      client_address: "8th Floor, MG Road, Bengaluru 560001",
      client_state: "Karnataka",
      subtotal,
      cgst,
      sgst,
      igst: 0,
      total: subtotal + cgst + sgst,
      notes: "Integrated video sponsorship — May 2026.",
    })
    .select("id")
    .single();
  if (invErr) throw invErr;

  const { error: itemErr } = await admin.from("invoice_items").insert({
    user_id: userId,
    invoice_id: invoice.id,
    description: "Dedicated product integration — main channel video",
    sac_code: "998397",
    qty: 1,
    unit_price: subtotal,
    amount: subtotal,
  });
  if (itemErr) throw itemErr;
  console.log("invoice: DEMO/2026-27/001 (final, domestic)");

  console.log("\nSeed complete.");
  console.log(`Login: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
}

main().catch((err) => {
  console.error("Seed failed:", err.message ?? err);
  process.exit(1);
});
