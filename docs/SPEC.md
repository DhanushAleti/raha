# SPEC.md — Phase 1 P0 executable spec

Scope: Stage 1 revenue assets + PRD §5 Phase 1 P0 features. Everything else is OUT (see §9). Every computed tax figure everywhere carries: **"Estimate — verify with your CA before filing."**

---

## 1. Landing page (`/`, static-fast, mobile-first)

Sections, in order:
1. **Hero** — "Creator taxes, handled." Sub: for Indian creators earning ₹20L–₹2Cr. CTAs: "Reserve a Founding Creator seat" (WhatsApp deep link `wa.me` with prefilled text) + "Free Audit Check" (→ `/audit`).
2. **The 4 failure modes** (PRD §1): misclassified income · mishandled foreign income · invoicing panic · zero visibility. One card each, concrete cost stated.
3. **Creator Economy Bill urgency block** — registration is now law (Rajya Sabha, Apr 2026); enforcement on foreign remittances is active. Factual, no scare-mongering fabrications.
4. **Founding Creator offer** — ₹20,000/yr, ~~₹40,000~~, first 10 only, price-locked for life. Seat counter is a static placeholder ("X of 10 taken") — update manually; never fake.
5. **Social proof placeholder** — "Trusted by creators from …" grayscale row, clearly placeholder until real.
6. **FAQ** — 6–8 questions (GST threshold, FIRC meaning, export zero-rating, what Raha does/doesn't do, CA sign-off, data security).
7. **Waitlist form** — name, email, income range (select), platforms (multi); POST → Supabase `waitlist`. Zod-validated; success + duplicate-email + failure states.
8. **Footer trust bar** — ₹ pricing · data localized in India · AES-256 at rest · "All filings reviewed and signed by qualified Chartered Accountants. Raha is not a substitute for professional tax advice."

Acceptance: Lighthouse mobile ≥ 90 perf/a11y; form writes a row; WhatsApp link opens chat with prefilled message; renders correctly at 360px width.

## 2. Free Audit Check (`/audit`, lead magnet)

8 questions, one screen at a time, client-side state:
1. Annual creator income range (<₹20L / ₹20–50L / ₹50L–1Cr / ₹1–2Cr / >₹2Cr)
2. Platforms earning from (multi: YouTube/AdSense, Patreon, Twitch, Instagram/brand deals, Substack, other)
3. Any foreign-currency income? (Y/N)
4. GST registered? (Y/N/not sure)
5. Filing LUT for exports? (Y/N/what's that)
6. Do you collect FIRCs for foreign remittances? (always/sometimes/never/what's that)
7. Invoice practice for brand deals (GST-compliant sequence / ad-hoc PDFs / none)
8. Do you know your current tax set-aside number? (yes exact / rough guess / no)

**Scoring (client-side, pure function, TDD):** each answer maps to 0–2 risk points per rubric in `lib/audit/scoring.ts`. Total → verdict: 0–4 **GREEN**, 5–9 **AMBER**, ≥10 **RED**. Foreign income + never-FIRC + no-GST forces RED regardless of total (floor rule).

**Email gate:** after Q8, show blurred report + email capture (name, email, optional handle) → Supabase `audit_leads` (answers JSON + score + verdict stored). Then reveal: verdict banner, top 3 personalized risk flags with plain-language explanation + what-to-do, CTA to Founding Creator offer/WhatsApp. Disclaimer: "Indicative self-assessment, not tax advice."

Acceptance: scoring function 100% unit-tested against rubric table; refresh mid-quiz preserves answers (localStorage); duplicate email allowed (upsert, keep latest answers).

## 3. Income tracker (core loop)

- **Manual entry:** date, platform (select+custom), description, gross amount, currency (INR/USD/EUR/GBP), category (`ads` | `memberships` | `brand_deal` | `digital_products` | `other`), TDS withheld (INR, optional).
- **INR conversion:** non-INR entries convert at bundled RBI reference rate for entry date (nearest prior business day); rate shown + editable. Store `amount_inr`, `rate_used`, `rate_source` (`rbi_table`|`manual`). INR entries: rate 1, source `native`.
- **CSV upload:** presets for AdSense + Patreon exports, plus generic mapper (user maps columns → fields). Zod row validation; import report (n imported / n failed with reasons); failed rows never partially written.
- **Categorization:** preset platform→category defaults (AdSense→ads, Patreon→memberships, manual brand deals→brand_deal), always user-overridable.
- List view: filter by FY/quarter/platform/currency; totals in INR; each foreign entry shows export-status chip (from §4).

TDD modules: `lib/fx/convert.ts` (rate lookup incl. weekend/holiday fallback, missing-rate error), `lib/income/categorize.ts`, `lib/income/csv.ts` (parse+validate).

## 4. FIRC tracker (differentiator)

- Log FIRC: date received, bank, FIRC/IRM reference no., currency, foreign amount, INR credited, linked document (vault upload optional).
- **Matching UX:** for each foreign income entry, suggest FIRCs where |FIRC INR − entry INR| ≤ 2% and date within +45/−7 days of entry (money arrives after earning). One FIRC may cover multiple entries (partial allocation tracked); user confirms/removes matches — never auto-confirmed.
- **Per-entry status chip:** `✓ Zero-rated (FIRC matched)` green · `✗ At risk — no FIRC` red · `— Domestic` neutral.
- Summary card: total foreign income, % FIRC-covered, "₹X of GST exposure if unmatched" (18% of unmatched foreign income) with CA disclaimer.

TDD module: `lib/firc/match.ts` (suggestion scoring, allocation math, status derivation).

## 5. Invoice generator

- Form: client name, client GSTIN (optional, validated format), client address + state, line items (description, SAC — default 998397 editable, qty, rate), supply type: **domestic** or **export**.
- **Domestic:** 18% GST — intra-state (client state == creator state): CGST 9% + SGST 9%; inter-state: IGST 18%.
- **Export:** zero-rated; invoice prints: "Supply meant for export of services under LUT without payment of IGST." LUT ARN field on creator profile; warn if empty.
- **Numbering:** `PREFIX/FY/NNN` (prefix from profile, FY = e.g. 2026-27, NNN sequential per user per FY, transaction-allocated, no gaps on happy path, never reused).
- Creator branding: display name, logo (vault upload), address, PAN, GSTIN on invoice.
- **PDF download:** server-rendered, A4, ₹ formatting with lakh/crore grouping, amount-in-words line. Estimate disclaimer NOT on invoice (invoices are documents, not estimates) — but "Generated with Raha" footer.
- Invoice list: status (draft/final), final locks number + content.

TDD module: `lib/gst/calc.ts` (split logic, rounding: per-line half-up to 2dp, totals from rounded lines), `lib/invoice/number.ts`, `lib/format/inr.ts` (incl. amount-in-words).

## 6. Tax-liability dashboard

- **Hero counter: "Set aside ₹X"** = GST liability + advance-tax estimate, YTD.
  - GST liability = 18% × domestic taxable income (est., before ITC) + 18% × at-risk unmatched foreign income (worst case shown separately as "at-risk exposure").
  - Advance tax = new-regime FY26-27 slabs on annualized (YTD net × 12/months-elapsed) income, minus TDS recorded, × cumulative installment % for next due date.
- Quarterly due-date reminders: advance tax 15 Jun/15 Sep/15 Dec/15 Mar; GSTR-1 11th + GSTR-3B 20th monthly (QRMP alternative noted). Next 2 upcoming dates surfaced with countdown.
- Breakdown cards: income by platform/category, foreign vs domestic, FIRC coverage.
- **Every figure** carries the CA disclaimer line.

TDD module: `lib/tax/advance.ts` (slabs, annualization, installment math), `lib/tax/gst-liability.ts`.

## 7. Document vault

- Supabase Storage bucket `documents`, path `{user_id}/…`, RLS: user reads/writes own path only.
- Categories: `firc` | `contract` | `pan` | `gst_cert` | `lut` | `invoice` | `other`; metadata row in `documents` table.
- Upload (≤10MB, pdf/png/jpg), list by category, download via short-lived signed URL, delete (confirm dialog).

## 8. Cross-cutting

- **Auth:** Supabase email magic link + Google OAuth. All `/app/*` routes protected (middleware). RLS on every table.
- **Validation:** Zod on every server action/route input.
- **States:** every list/page has empty (with guidance CTA), loading (skeleton), and error (retry) states.
- **Responsive:** 360px-first; tables collapse to cards on mobile.
- **Tables:** `profiles` (extends auth.users), `income_entries`, `firc_records`, `firc_matches` (allocation join), `invoices`, `invoice_items`, `documents`, `waitlist`, `audit_leads`. (Join table added beyond mission list — required for partial FIRC allocation; logged in DECISIONS.md.)
- **Seed:** demo creator with AdSense USD (monthly), Patreon EUR (monthly), 3 INR brand deals, FIRCs covering ~60% of foreign income → dashboard shows both ✓ and ✗ states.

## 9. Explicitly OUT (Phase 2 — build nothing, stub nothing)

API imports (AdSense/Patreon/Stripe/Razorpay) · automated GSTR filing · CA portal / Tally-Zoho export · agency dashboard · AI expense categorization · payments in-product · ITC computation · multi-user/team access.
