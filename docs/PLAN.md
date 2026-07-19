# PLAN.md — consolidated planning output

Produced by /office-hours + /autoplan (CEO → design → eng → DX) run in auto-decide mode (no interactive stops; operator rule: decide, log, continue). PRD (`docs/raha_prd.md`) is ground truth; conflicts noted, not relitigated.

---

## 1. Office-hours diagnostic (startup mode, pre-product)

**Demand reality.** Strongest evidence: creators already pay ₹20K–₹50K/yr for this job and are actively unhappy (PRD §1). This is existing spend being reallocated, not new budget being conjured — the best kind of demand signal short of a signed cheque. The Phase 0 gate (≥3 paying creators in 30 days or pivot, PRD §6) is the real test; nothing in software substitutes for it.

**Status quo.** A generic CA + spreadsheets + panic. Concrete costs: 18% GST overpaid on foreign income when zero-rating isn't claimed (FIRCs untracked), notices from misclassified SAC codes, brand payments delayed by non-compliant invoices, zero visibility on what to set aside.

**Desperate specificity.** The persona: a YouTuber at ~₹40L/yr — AdSense USD, Patreon EUR, 3 INR brand deals in the same month — whose CA doesn't know what a FIRC is. What keeps them up: an IT/GST notice under the Creator Economy Bill's registration mandate. July = ITR season; the pain is live now.

**Narrowest wedge.** FIRC matching → export-of-service proof. It's the one job no generic CA does, it maps to immediate rupees saved (18% of foreign income), and it's sellable as a concierge service this week without software. The MVP's FIRC tracker is this wedge, productized.

**Observation.** None yet — by design. Phase 0 concierge IS the observation program: every repeated manual step becomes Phase 1 spec.

**Future-fit.** Creator Bill enforcement only ramps up. Compliance moves from optional to law-with-deadlines; Raha gets more essential in 3 years, not less.

**Premises (auto-confirmed):**
1. Creators earning ₹20L+ must handle GST/FIRC/invoicing and their current providers do it badly — supported by PRD evidence.
2. FIRC-backed zero-rating is the differentiator; everything else is table stakes.
3. Sell relief, not software — every surface must reduce anxiety, not add dashboard noise.

**Noted disagreement (PRD wins on scope, mission wins on sequencing).** PRD §5 says "do not build software before customers pay." The mission explicitly orders the Phase 1 MVP build now. Resolution: Stage 1 revenue assets ship FIRST (the Phase 0 machine), MVP second, and scope stays locked to Phase 1 P0 — no Phase 2 items, stubbed or otherwise.

**Approaches considered.**
- A) Minimal: landing + audit tool only, concierge everything (PRD-purist).
- B) Ordered build: Stage 1 revenue assets → full Phase 1 P0 MVP (mission order). **← chosen**
- C) Concierge-tooling: internal-only spreadsheet automations. Rejected: produces nothing sellable or durable.

**The assignment (human, unchanged from PRD §11):** send 5 agency emails, 15–20 creator DMs/day, book 10 discovery calls, close 3 founding creators.

---

## 2. CEO review (auto-decisions)

- **10-star framing:** the product is one number — "set aside ₹X" — and one feeling: "someone competent is watching this." Every screen serves that.
- The landing page sells the *Founding Creator* scarcity honestly: 10 seats, ₹20,000/yr struck from ₹40,000, price-locked. Counter is manual/placeholder until real (no fake urgency).
- WhatsApp CTA is the primary conversion path for Indian creators; waitlist form is secondary.
- Audit tool is the funnel centerpiece: email gate before full results, red/amber/green verdict, shareable.
- **Decision:** no payments in-product (Phase 0 is concierge invoicing); "Reserve seat" routes to WhatsApp/email. Stops before payment credentials per operating rules.

## 3. Design review (auto-decisions)

- Mobile-first everywhere; creators live on phones (PRD/mission).
- Trust signals: ₹ pricing, "data stored in India" mention, "filings signed by qualified CAs" disclaimer, AES-256 note — visible, not buried.
- Tone: premium-calm fintech (relief, not fear) — fear lives in the content drafts, not the app.
- One accent color, generous whitespace, real INR formatting (₹12,34,567 lakh/crore grouping — build a formatter util).
- Dimension targets (0–10): hierarchy 9, trust 9, mobile 9, speed 8, delight 7. /design-review loop in Stage 1 verifies.

## 4. Eng review (auto-decisions — the load-bearing ones)

1. **FX rates (RBI reference rate at entry date):** no free official realtime API. Ship a bundled daily reference-rate table (USD/EUR/GBP → INR, FY 2026-27 to date) + editable rate field on entry. **Always store `rate_used`, `rate_source` (`rbi_table` | `manual`) on the row.** Figures remain estimates; CA disclaimer applies.
2. **FIRC matching:** auto-suggest matches within ±2% amount (post-forex-spread) and ±14 days; user confirms — never auto-confirm. Per-entry status: `zero_rated ✓` (matched FIRC) / `at_risk ✗` (foreign income, no FIRC) / `domestic` (n/a).
3. **Invoice numbering:** per-user sequential (`RAHA/{FY}/{seq}` style, user-prefixable), allocated in a Postgres transaction to guarantee no gaps/dupes.
4. **GST math:** pure TS module, TDD'd. Domestic: 18% (CGST 9 + SGST 9 intra-state, IGST 18 inter-state). Export with LUT: zero-rated, mandatory LUT declaration line on invoice. SAC default 998397 (editable).
5. **Advance tax estimate:** annualize YTD net income, apply FY 2026-27 new-regime slabs, subtract TDS entered, split by statutory due dates (15 Jun/15 Sep/15 Dec/15 Mar cumulative 15/45/75/100%). Conservative, labeled estimate. No 44ADA auto-election — flagged as "ask your CA" note.
6. **RLS:** every table `user_id = auth.uid()`; storage bucket policies per-user path. No service-role key in client bundle — server-only.
7. **CSV import:** platform presets (AdSense, Patreon) + generic column mapper; Zod-validated; row-level error reporting, partial-import allowed with explicit report.
8. Pure tax-math modules live in `lib/tax/` with no I/O — unit-testable, CA-reviewable.

## 5. DX review (auto-decisions)

- TTHW target: fresh clone → running core loop < 10 min. `.env.example` complete, seed script one command, README exact.
- Supabase local (CLI) for dev; migrations checked in; `npm run db:reset && npm run seed` deterministic.
- CI: lint + typecheck + unit tests on push (GitHub Actions).
- Demo creator seed mirrors PRD §1: AdSense USD, Patreon EUR, 3 INR brand deals, partial FIRCs (so the at-risk state is visible out of the box).

## 6. Execution order

Stage 1 (landing + audit tool + outreach + content) → Stage 2 MVP (scaffold → schema → auth → income → FIRC → invoices → dashboard → vault → polish) → Stage 3 gates → Stage 4 ship. Commit per step. Details: `docs/TASKS.md`; behavior contract: `docs/SPEC.md`.
