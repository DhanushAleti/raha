# FINAL.md — where Raha stands

Built in one autonomous session, 2026-07-19. Deployed and verified live 2026-07-21.

## Live

**https://raha-iota.vercel.app** — landing `/`, free audit `/audit`, signed-in app `/app/*`.

| | |
|---|---|
| Supabase | project ref `xhegzotakpbjltwqnffq`, region Mumbai |
| Vercel | project `raha`, scope `dhanushs-projects-33bdf6aa` |
| GitHub | `github.com/Dhanush9999279/raha` — push to `main` auto-deploys |

Deploy runbook (env vars, migrations, seed): `docs/DEPLOY.md`.

## What exists and works

**Revenue machine (Phase 0)**
- Landing page (`/`) — hero, 4 failure modes, Creator Bill urgency, ₹20,000 founding offer (honest seat counter via env), FAQ, waitlist → Supabase, WhatsApp CTAs, trust bar. Verified in-browser, desktop + 375px mobile.
- Free Audit Check (`/audit`) — 8-question wizard, TDD'd red/amber/green scoring (11 tests), blurred-report email gate → `audit_leads`. Full flow verified in-browser.
- Outreach kit — `docs/outreach/`: 5 agency emails, 3 DM scripts + objection handling, discovery-call script, closing one-pager.
- Content — `docs/content/`: 5 X-threads, 3 video scripts.
- **15 Gmail drafts** sitting in your drafts folder (5 agency emails + day-3 + day-8 follow-ups). Addresses are `.example` placeholders — swap real contacts, then send. Nothing was auto-sent.

**Phase 1 MVP (all five P0 features)**
- Income tracker: manual entry + AdSense/Patreon/generic CSV import, INR conversion with stored rate + source, category defaults, export-status chips.
- FIRC tracker: log FIRCs, suggest-then-confirm matching (±2%, +45/−7d), partial allocations, coverage % + "GST exposure if unmatched" card.
- Invoice generator: 18% domestic (CGST/SGST vs IGST by state) or zero-rated export with LUT note, per-FY sequential numbering, PDF download, draft→final locking, creator branding via Settings.
- Live dashboard: "Set aside ₹X" (GST estimate + next advance-tax installment − TDS), due-date countdowns, platform breakdown, at-risk callout.
- Document vault: private storage, per-user folder isolation, categories, signed-URL downloads.
- Auth: magic link + Google OAuth, middleware-protected `/app/*`, RLS on **every** table (+ same-owner FK hardening). 68 unit tests green, production build green, security headers on.
- Every computed figure carries "estimate — verify with your CA before filing." No automated-filing claims anywhere.

## Command center (already populated)

- **Notion — Raha HQ**: https://app.notion.com/p/3a26f2ca879c81e28a0acb178dc671cc (seat tracker 0/10, daily-ops checklist, pipeline database with all 5 agencies seeded)
- **ClickUp — Raha Launch**: https://app.clickup.com/90161706212/v/l/li/901615981424 (11 tasks, due-dated across 14 days)
- **Calendar**: "Raha outreach" 10:00–11:00 daily ×14 from tomorrow + GSTR-1/3B monthly dates + advance-tax installments (Sep 15, Dec 15)
- **Gmail**: 15 original drafts + **50 personalised drafts to real Clay-sourced leads** (2026-07-20) — sequencing in `docs/outreach/SEND_PLAN.md`, 3 address corrections noted there
- **Leads**: `docs/outreach/raha-leads-2026-07-20.xlsx` (60 rows, 50 with verified emails; also in the Drive Handoff folder) · demand evidence: `docs/DEMAND_EVIDENCE.md`

## Deliberately NOT built (Phase 2 — PRD §5, out of scope by order)

API imports (AdSense/Patreon/Stripe/Razorpay) · automated GSTR-1/3B filing · CA portal / Tally-Zoho export · AI expense categorization · agency dashboard · in-product payments · ITC computation.

## Gates that remain (all of them are yours — the build is done)

Infra is no longer a blocker. What's left is distribution, revenue, and one config swap:

1. **Send the 50 Gmail drafts** — they are written and sitting in drafts. Nothing sends itself. **Start at `docs/outreach/SEND_TODAY.md`** (click-by-click Day-1 list, verified against the real drafts folder 2026-07-22); `docs/outreach/SEND_PLAN.md` has the full 5-wave schedule. Three things that bite before the first send: the drafts folder also holds ~15 dead `.example` placeholder drafts (never send those); **no draft contains a link to the site** because they predate the deploy — paste the audit link in; and 3 addresses need fixing or skipping (Rahul Mahato → `barcodeent.com`; Rahul Khanna → third-party PR domain; **do not send** Shivam Sharma, wrong company).
2. **Book and run discovery calls** — reply → call the same day, run `docs/outreach/discovery-call-script.md`, send `founding-customer-closing-doc.md` within 2 hours of any yes/maybe.
3. **Close 3 founding customers at ₹20,000** — the validation gate. The MVP is live and waiting for them.
4. **Line up the revenue-share CA** — they review `src/lib/tax/` and `src/lib/gst/` before anyone's first filing. Every figure ships as an estimate until a CA has signed off.
5. **Swap `NEXT_PUBLIC_WHATSAPP_NUMBER`** — production still points at the personal number `919666641799`. Move it to a business line in Vercel env and redeploy **before real traffic arrives** (i.e. before the Day-1 wave lands).

## Your next 7 actions (PRD §11, updated)

1. Swap `NEXT_PUBLIC_WHATSAPP_NUMBER` to a business line in Vercel → redeploy. Do this before anything below reaches a stranger.
2. Send the Day-1 wave — open `docs/outreach/SEND_TODAY.md` and work down the 12 rows; then Days 2–5 per `SEND_PLAN.md`.
3. Start the daily 10:00 outreach hour: 15–20 DMs/day from the scripts; log every reply in Notion and mark the xlsx `Status` column.
4. Post X-thread #1 with the live audit link (https://raha-iota.vercel.app/audit).
5. Book 10 discovery calls; run the script; send the closing one-pager same day.
6. Close 3 founding creators at ₹20,000 → tick seats in Notion. That's the validation gate.
7. Line up the revenue-share CA (they review `src/lib/tax/` + `src/lib/gst/` before the first filing).

## For future dev sessions

Ground truth docs: `docs/raha_prd.md`, `docs/SPEC.md`, `docs/PLAN.md`, `DECISIONS.md` (all 16 decisions), `docs/DEPLOY.md`, `docs/creator-guide.md`.

Test suites: `npm test` (68 unit) · `npx playwright test` (e2e, needs `.env.local` + `npm run seed`).

**Playwright must run with `workers: 1`.** Every signed-in test mints a magic link for the same seeded demo user, and Supabase invalidates the previous token each time one is issued — parallel workers race and burn each other's tokens. This is pinned in `playwright.config.ts`; do not raise it to chase speed.
