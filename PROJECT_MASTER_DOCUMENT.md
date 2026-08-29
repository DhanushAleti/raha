# Raha — Project Master Document

> **The single source of truth for Raha.** One place. If you read only one file, read this one.
> Written for a new engineer, a new AI session, or an investor to reach a correct, current
> understanding in fifteen minutes — and to end the "which document do I trust?" problem for good.
>
> **Current as of:** 2026-08-29 · **Repo:** `github.com/DhanushAleti/raha` (private) · **Branch:** `main`
> **Live:** https://raha.software (verified 200) · **Audit:** https://raha.software/audit (verified 200)
>
> **Evidence legend:** `[D]` Documented — verifiable in a file or the running system ·
> `[I]` Inferred — deduced from code or context · `[U]` Unknown — genuinely undetermined, not guessed.

---

## Document map — what is canonical, what is history

This project accumulated planning documents faster than it retired them, and several now contradict
each other. That is the exact problem this file exists to end. **When any document disagrees with
this one, this one wins.** The others are either detail behind it, or dated logs, or history.

| Layer | File(s) | Role |
|---|---|---|
| **Canonical context** | **`PROJECT_MASTER_DOCUMENT.md`** (this file) | The whole picture, kept current. Start here. |
| **Dated tactical truth** | `docs/NOW.md` (2026-08-27) | What was true and what to do, as of its date. Verified against live systems. Still current. |
| **The 30-day plan** | `research/decision.md` | The channel decision, kill criteria, and 7-day queue for 27 Aug → 26 Sep. |
| **The live scoreboard** | `research/pipeline.db` via `scripts/pipeline.py` | The only source for revenue/pipeline numbers. No prose, no judgement. |
| **Ground-truth PRD** | `docs/raha_prd.md` | Product scope. Where strategy has moved past it, this file and NOW.md say so. |
| **Engineering decisions** | `DECISIONS.md` | 16 build-time decisions, all still active. |
| **History — do not act on** | `FINAL.md` (21 Jul), `docs/STATE.md` (28 Jul), `docs/outreach/SEND_LOG.md`, `SEND_TODAY.md`, `SEND_PLAN.md` | Accurate when written, superseded now. They carry banners pointing here. See "The seven contradictions" below. |
| **Vault mirror** | `Dhanush OS/Raha/00 Home/raha-home.md` | The Obsidian knowledge base. Browsable, cross-linked; defers to this file for current status. |

**The seven contradictions, resolved** (full detail in `docs/NOW.md` §3):

1. **The gate is one paid ₹2,000, not three customers at ₹20,000.** The 3-customer gate closed unmet on 27 Aug.
2. **Cold email to agencies is stopped.** Do not send the 50 old drafts or start at `SEND_TODAY.md`.
3. **Phase 1 already shipped** (July) — the "gated behind 3 customers before building" framing is dead. Delivery of the ₹2,000 check is still manual, which is separate and correct.
4. **The ₹20,000 seat is off the front door now** and returns in April at LUT-renewal time. Never quoted as an opener.
5. **The plan of record is `decision.md`'s 7-day queue**, not `STATE.md`'s old priority list.
6. **The scoreboard is `pipeline.db`**, not `SEND_LOG.md` (a July archive).
7. **One hostname: `raha.software`.**

---

## What Raha is

**One sentence.** Raha proves that money Indians earn from foreign clients is a zero-rated GST
export — the paperwork that makes it **0% instead of 18%**, on whatever payment route it arrived by,
including the routes that cannot produce that paperwork at all. `[D docs/nirmaan/APPLICATION.md]`

**The problem.** An Indian who bills a foreign client is, in law, an exporter. Export of services is
zero-rated under §2(6) of the IGST Act — but only with two things: a **FIRA** from the bank proving
the money came from abroad in convertible foreign exchange, and a **Letter of Undertaking (LUT)**
filed before that year's first export invoice. Miss either and the same income can be assessed as a
domestic supply at **18% IGST, plus 18%/yr interest, plus penalty** — on money already earned and
spent. On ₹40L of foreign income that is roughly ₹7L of avoidable exposure. `[D docs/raha_prd.md §1]`

**Why it bites harder than it should.**
1. **Physical FIRCs stopped existing in 2016** for export remittances (RBI A.P. (DIR Series) Circular 74). Banks now raise an IRM in EDPMS and issue a **FIRA**. Nine years on, "FIRC" is still the word used by advisors, platform help pages, and even GST officers at LUT renewal. Someone who asks their bank for a FIRC is turned away and blames the bank. `[D research/decision.md]`
2. **The LUT resets every financial year.** Solving it once does not solve it.

**Mission.** Remove the financial anxiety of cross-border income for people who earn it alone,
without a finance function. `[D PRD §4 — "Raha sells relief"]`

**Vision (long thesis, under test — not committed).** Become the embedded compliance/evidence layer
sitting above every cross-border payment rail in India. `[D docs/nirmaan/APPLICATION.md — "third layer, later and unproven"]`

---

## Current status — 2026-08-29

Verified against live systems (curl on production, `git log`, `python3 scripts/pipeline.py stats`),
not copied from any planning doc.

| | Status |
|---|---|
| **Stage** | Pre-revenue. Product live, paid offer live, **zero paying customers.** |
| **Revenue** | **₹0.** Customers **0**. Paid asks ever made **0**. |
| **Live offer** | **₹2,000 Foreign Income Evidence Check**, UPI payment, live on `raha.software` since 27 Aug. |
| **₹20,000 seat** | **Off the front door.** Returns in April as the LUT-renewal product, never as an opener. |
| **Free audit** | `/audit` — 9 questions, no signup, red/amber/green verdict. Rail question ("how does the money reach you?") live. Evidence Check offer on the result. |
| **Payment** | UPI only (`NEXT_PUBLIC_UPI_ID` set in Vercel prod). No gateway. Correct for now. |
| **Pipeline** | **Day 2 of 30** (window 27 Aug → 26 Sep). 15 threads seeded; **0 answered, 0 DMs, 0 asks, 0 paid.** |
| **Tests** | 68 unit + audit scoring, green at last run. |
| **Product build** | Complete. Distribution and revenue are the entire remaining problem. |

**The scoreboard (run it; don't trust prose):**
```bash
python3 scripts/pipeline.py stats
```
It prints PASS/FAIL against every kill date. As of 2026-08-29 every line reads BEHIND or FAIL because
the plan has not been run yet — day 2 of 30, nothing sent.

**The one gap that is the founder's, still open since 21 Jul:** the live WhatsApp CTA and the UPI VPA
are both the **personal** number (`919666641799` / `9666641799@ybl`). Receiving ₹2,000 personally is
fine; the WhatsApp line is the contact identity on a paid offer and follows him forever. `[D docs/NOW.md]`

**Also open:** no Reddit script app registered (`REDDIT_CLIENT_ID` unset), so `find-prospects.py
--search` cannot run and the "is the room deep enough for weeks 2–4?" assumption is untested. The 15
seeded threads cover week 1 regardless. `[D docs/NOW.md]`

---

## The 30-day plan and the gates

**Window: Thu 27 Aug → Fri 26 Sep 2026.** Full reasoning in `research/decision.md`; corpus behind it
in `research/tactics-filter.md` (+ `-addendum.md`).

**The one channel.** Answer live threads on r/IndiaTax and adjacent Indian freelancer/indie-hacker
forums in public, lead with the FIRC→FIRA correction, qualify on the payment rail, then DM the people
who already asked in public to hire for exactly this scope. Give bespoke value before asking. Ask for
₹2,000 every time. Follow up 3–4 times, then leave it. `[D research/decision.md]`

**The primary 7-day test is the warm network, not Reddit.** YC's strongest finding is that customers
1–3 come from the personal network; Reddit supplies pain without trust and structurally needs 2–3
weeks of public answering before a DM lands. So: **15 warm intro asks** (drafts pre-written in
`docs/outreach/WARM_15_DRAFTS.md`, one per slot, forward pre-composed). Reddit is the long game.
`[D research/decision.md — corrected by docs/PAINKILLER_AUDIT.md]`

**What is explicitly stopped:** cold email to agencies and any new agency sourcing; building more lead
lists and research docs; content (X threads, video scripts, SEO); product feature work (one exception,
already done: the audit rail question); new strategy documents. `[D research/decision.md]`

**The gates:**

| Date | Test | If it fails |
|---|---|---|
| **Wed 3 Sep** — the September allocation gate | One paid ₹2,000 with a logged UPI ref, **or Nostro (Razorpay) takes September.** | Not a verdict on Raha — it forces the September allocation decision that has a real deadline (Razorpay closes 5 Sep). |
| **Wed 10 Sep** (day 14) | ≥24 public answers **and** ≥10 DMs → **≥3 two-way conversations** | Channel is wrong → switch primary to the warm network for days 15–30. |
| **Wed 17 Sep** (day 21) | ≥3 people explicitly asked for ₹2,000 | The ask is missing, not the channel. Ask on the next 5 without exception. Most likely failure mode. |
| **Fri 26 Sep** (day 30) | ≥5 ₹2,000 asks made **and ≥1 paid** | Price/offer wrong, not channel. This is the pivot signal the July gate was waiting for — and it is an answer. |

**The stop-planning rule:** one paid ₹2,000 before day 30 validates the channel. Keep running it. Do
not re-plan, do not write another strategy document, do not rebuild the product. Go get the second one.
`[D research/decision.md]`

---

## The two parallel external bets

Both run inside the 30-day window and both are entangled with the 3 Sep allocation gate. **Neither is
"Raha the product"** — they are how the founder is trying to fund and de-risk it.

### 1 · Nirmaan / Pratham preincubation (IIT Madras IVM) — application submitted 2026-08-29

- **What:** IIT Madras Nirmaan (VentureArch/IVM) preincubation programme. Application + Part-5 pitch
  video due **today, Sat 29 Aug, EOD** (portal said 31 Aug; organiser said EOD today — do not gamble
  on the portal date). Paste-ready answers in `docs/nirmaan/APPLICATION.md`. `[D]`
- **Ask:** **₹2,00,000**, every line product-correctness or delivery, **zero marketing spend** (p.13
  excludes it): CA review of the tax/GST logic ₹60k · statement→ledger processing ₹40k · product
  infra ₹45k · legal review of scope/disclaimer ₹30k · first-customer visits ₹25k. `[D]`
- **Posture:** revenue stated as ₹0 (not softened); no automated-filing claim; registration "none"
  (operating as an individual below the ₹20L services threshold, personal UPI — the eligibility
  answer). The solo-founder / no-CA gap is named as the first thing Pratham would fix. `[D]`
- **History behind it:** shortlisted and pitched at the **VentureArch IITM idea sprint, 22 Aug (Team
  A38)** — the first externally-initiated evaluation on record. The monetization question came up
  three times there and went unanswered; the answer now exists and is the spine of the application:
  *the LUT re-files every FY
  and a FIRA is needed per payment, so ₹2,000 buys the evidence check and April is when the ₹20,000
  annual seat becomes the obvious buy — the statute makes it repeat, not a subscription trick.* `[D docs/NOW.md, ivm memory]`
- **The 20–30 accepted LinkedIn connections** (incl. the four named programme people): a real asset —
  **not** to be spent on customer intros before the cohort decision (reads transactional while being
  judged). Bank it; spend it in October as a pre-incubatee. `[D docs/nirmaan/APPLICATION.md]`

### 2 · Razorpay AI Buildathon — "Nostro" — closes 2026-09-05

- **What:** Razorpay AI Buildathon, **Track 04 (AI Finance Controller)**. No resume screening (which
  matters — 5.12 CGPA, 5 backlogs, graduating 2028 would not clear the normal SDE funnel). Terms:
  ₹75,000/mo, 6 or 12 months, **in-person Bangalore from September**. `[D docs/razorpay/PLAN.md]`
- **Decided 23 Aug: yes** to in-person Bangalore, 6 months. This is why the 3 Sep gate exists — Raha
  and Nostro cannot both be primary in September. `[D docs/razorpay/PLAN.md]`
- **The build, "Nostro":** reuses Raha's tested `src/lib/` as a **deterministic, no-LLM core**
  (`firc/match.ts`, `fx/convert.ts`, `tax/*`, `gst/*`), a narrow **Zod-validated LLM layer** only
  where the deterministic layer structurally cannot work (bank-narration parsing, entity resolution,
  FIRA-PDF extraction, ambiguous ranking), and an **exception queue** with reason codes. The winning
  piece is the **evaluation harness**: 250 synthetic records with known ground truth and 8 noise
  classes, reporting match rate, precision/recall, **false-positive cost in ₹**, throughput, and LLM
  cost per 1,000 records — reproducible with one `npm run evaluate`. `[D docs/razorpay/PLAN.md]`
- **Why it compounds regardless:** it makes FIRA reconciliation work at batch scale — the thing paying
  Raha customers would ask for next — so the engine comes home whether or not the application lands.

**The failure case both plans name:** arriving at 5 Sep having done neither Raha nor Nostro properly.

---

## How we got here — the session arc

The full commit history is in `git log`; this is the shape of it, so a cold reader knows what each
pile of docs was for. `[D git log]`

1. **19–22 Jul — the build.** Entire MVP in one autonomous push: landing + free-audit funnel, income
   tracker (CSV import, FX), FIRC tracker (suggest-then-confirm matching), GST-compliant invoicing +
   PDF, live liability dashboard, document vault, auth (magic link + Google OAuth), 10-table schema
   with RLS on every table, 68 unit tests + Playwright E2E. Deployed to `raha.software`. Command
   center seeded (Notion, ClickUp, Calendar, Gmail drafts, a 50-lead Clay list).
2. **23–28 Jul — first contact with the market.** 28 cold emails (23 agencies, 5 creators) → 1 reply,
   out of scope. Magic-link fix (mail scanners were burning tokens → verify client-side from URL
   fragment). Audit report shown before the email gate. Anonymous completions recorded. Competitor
   brief (TaxTap, CreatorKhata). **Hard GTM review found the CA price-parity problem.** Committed to
   **Layer 2** (all foreign-income earners, not creators alone). Wedge reality check (rails already
   solve half). AdSense/Singapore finding. Acute-pain target list. ₹2,000 diagnostic designed. SEO
   audit (not winnable). First `PROJECT_MASTER_DOCUMENT.md`.
3. **14–22 Aug — reposition and evidence.** Landing + audit rewritten to the Layer-2 foreign-income
   wedge, FIRC→FIRA corrected across the public site. Formal customer/market-discovery write-up (a
   practising CA interview suggested the pain may sit *upstream* of FIRA matching). First investor
   pitch deck. Original research paper *FIRC to FIRA: Documentary Evidence Infrastructure and the
   Uneven Compliance Burden on India's Independent Digital Exporters*. IITM idea-sprint pitch (22 Aug).
4. **23 Aug — the Razorpay bet.** Nostro / Track 04 plan; Bangalore confirmed.
5. **27 Aug — the pivot.** ₹2,000 Evidence Check + UPI live; ₹20,000 seat off the front door; rail
   question shipped into the audit; the Layer-2 correction finished in the audit scoring (with
   regression tests); 30-day channel decision + `pipeline.py` tracker; painkiller audit; tactics
   research; 15 warm slots + drafts; delivery SOPs (Evidence Check SOP, report template, CA-objection
   sequence); `NOW.md` reconciliation of six threads and the seven contradictions.
6. **28–29 Aug — Nirmaan.** Guidebook findings; paste-ready Pratham application; Step-5 funding answer
   field by field; pitch-video script; LinkedIn-connections strategy; research paper exported to PDF;
   submitted answers rewritten against the AI-tells catalog. **This consolidation (29 Aug).**

---

## Product overview

Two surfaces, one deployment.

**Surface 1 — public funnel (unauthenticated).** Landing (`/`) → Free Audit (`/audit`) → report shown
→ optional email capture → ₹2,000 Evidence Check offer + UPI. The audit is 9 questions (rail question
included), no signup, scored server-side into red/amber/green. The report renders **before** any email
ask, honouring the "no signup" promise. `[D]`

**Surface 2 — authenticated app (`/app/*`).**

| Workflow | Route | What it does |
|---|---|---|
| Income tracking | `/app/income` | Manual + CSV, multi-currency, FX-converted to INR with stored rate + source |
| FIRC/FIRA matching | `/app/firc` | Suggest-then-confirm matching of remittances to income (±2% / +45−7d) |
| Invoicing | `/app/invoices` | GST-compliant sequential invoices, PDF export |
| Liability | `/app` | Live "set aside ₹X" (GST + advance tax − TDS) |
| Vault | `/app/vault` | Categorised document storage |
| Settings | `/app/settings` | Profile, GSTIN, LUT ARN, invoice prefix |

**Hard rule, everywhere:** every computed figure carries *"estimate — verify with your CA before
filing."* No automated-filing claim appears anywhere. Not a preference — a licensing boundary.
`[D CLAUDE.md, PRD §10, DECISIONS.md #4]`

---

## Personas

1. **Solo foreign-income earner (primary buyer)** — freelancer, consultant, indie-SaaS founder,
   creator with recurring foreign income and no finance function. Doesn't know FIRA exists; CA has
   rarely handled cross-border income. Wants: no notice, not to overpay, to stop thinking about it.
2. **Chartered Accountant (channel, not competitor)** — receives a reconciled file rather than a
   shoebox. **Status `[U]`: no CA is partnered.** This is the critical dependency and the named gap.
3. **Talent agency (deprioritised)** — was the original GTM; 23 emails → 0 replies; retained only as a
   slow-burn channel. `[D docs/outreach/GTM_REVIEW.md]`

---

## Feature inventory

**Shipped and live:** landing · free audit + server-side scoring · rail question · Evidence Check
offer + UPI · audit lead capture · anonymous completion tracking · magic-link auth · Google OAuth ·
income tracker + CSV + FX · FIRC/FIRA tracker + matching · GST liability · advance tax · invoice
generator + PDF · document vault · waitlist. `[D]`

**Planned — Phase 1 (productise after first paying customers):** statement→ledger auto-processing ·
lower pricing tier for sub-₹20L earners · rail-aware qualification deepened · multi-rail reconciliation
· historical backfill workflow. `[D PRD §5, docs/nirmaan milestones]`

**Future — Phase 2:** income auto-import (AdSense/Stripe/Patreon APIs) · CA portal with Tally/Zoho
export · AI expense categorisation · agency roster dashboard. `[D PRD §5]`

**Cut / never in scope:** agency wedge as primary GTM · automated filing · in-product payments · SEO ·
LinkedIn/X content as a primary channel.

---

## Architecture, stack, and code

| Layer | Choice |
|---|---|
| Frontend | Next.js 15 App Router, React 19, TypeScript (Server Components default) |
| Backend | Next.js Server Actions — 8 actions are the entire write layer; no separate API tier |
| Database | Supabase Postgres — **RLS on all 10 tables** |
| Product AI | **None.** Raha ships no AI. (Nostro is a separate build.) |
| Infra | Vercel, auto-deploy from `main` |
| Auth | Supabase Auth — magic link (fragment-verified) + Google OAuth |
| Storage | Supabase Storage — private bucket, RLS-scoped by user folder, 10MB cap, MIME allow-list |
| Messaging | WhatsApp deep link only |
| Observability | `console.error` only — **genuine gap**, no Sentry/APM |

**Request flow:** `middleware.ts` (session refresh + `/app` gate) → RSC render or Server Action → Zod
parse → Supabase client (RLS) → Postgres → typed result → UI. Failures return `{status:"error",
message}` rather than throwing. `[D]`

**`src/lib/` — the pure, unit-tested core** (this is also Nostro's deterministic engine):
`audit/scoring.ts` · `firc/match.ts` · `fx/convert.ts` · `gst/calc.ts` · `tax/gst-liability.ts` ·
`tax/advance.ts` · `income/csv.ts` + `categorize.ts` · `invoice/number.ts` + `pdf.tsx` ·
`format/inr.ts`. Ten of eleven modules have a co-located `.test.ts`; 68 tests run in ~250ms with no
mocking. **Money math is never probabilistic — every rupee-affecting decision is a pure function with
a test.** `[D]`

**Four Supabase clients, deliberately distinct:** `client.ts` (browser) · `server.ts` (RSC/actions) ·
`middleware.ts` (session refresh) · `admin.ts` (service-role, RLS-bypassing, server-only, guarded).

**Database — 10 tables, all RLS, 16 policies, 10 indexes, 5 idempotent migrations.** `profiles`,
`income_entries`, `firc_records`, `firc_matches` (same-owner composite FKs — prevents cross-user match
forgery), `invoices` / `invoice_items`, `documents`, `waitlist`, `audit_leads`, `audit_completions`.
Lead tables have **no SELECT policy** (read from the dashboard only). `income_entries` stores
`rate_used` **and** `rate_source`, so every INR figure is auditable back to its basis. **Caveat `[U]`:
migration `0005_audit_completions` may not be applied to production — analytics silently no-op until
it is; not verifiable from the repo alone.** `[D migrations, docs/NOW.md]`

---

## Business model

| | |
|---|---|
| Customer | Solo Indian operator, recurring foreign income, no finance function |
| **Entry price** | **₹2,000 — Foreign Income Evidence Check** (a written reconciliation, not a filing, not signed advice) |
| Renewal | **₹20,000/year compliance seat — this is what April is**, not the front door. The LUT re-files every FY and a FIRA is needed per payment, so the statute makes revenue repeat. |
| Revenue today | **₹0** |
| Delivery | Concierge: by hand to a documented SOP, 90–110 min/customer. Software leverage comes with Phase 1. |
| Distribution | Warm intros (primary 7-day test) → r/IndiaTax acute-pain (long game) |
| Positioning | **Wide audience, one narrow problem.** Never general tax filing (that is TaxTap's ground). |

**Why ₹2,000 and not ₹20,000:** at ₹20,000 Raha is compared to a licensed CA who does more and carries
liability, and loses that comparison. At ₹2,000 there is no comparison set — no CA sells a forensic
reconciliation at a price uneconomic at their hourly rate. **The price is the positioning.** `[D docs/nirmaan/APPLICATION.md]`

**Market (order of magnitude):** 2–3M Indians earn in foreign currency; India exports $100B+ of
services a year (services exports $421.3B FY25-26 per PIB); reachable market ≈ ₹1,000–3,000 Cr at the
₹2,000 + ₹20,000 ladder. `[I / partly D]`

---

## Delivery — the ₹2,000 Evidence Check

Manual today, to a fixed SOP so every decision is made once, not per customer.
`docs/delivery/EVIDENCE_CHECK_SOP.md` + `docs/delivery/REPORT_TEMPLATE.md`.

- **What it is:** every foreign credit in a period reconciled line by line against the document behind
  it — FIRA, NOC, bank advice, or nothing — with a written statement of which stand up as zero-rated
  exports, the rupee exposure on those that do not, and the LUT position. 48 hours. **Money back if it
  tells them nothing their CA hasn't.**
- **The three-tier rail matrix** (the core IP): Skydo/Karbon/Winvesta/Payoneer users already get FIRA
  free — told so, and sent away (that disqualification is why the other two believe you);
  Wise/PayPal/Stripe users **structurally cannot** get a FIRA (money lands as a domestic transfer);
  direct-bank + anyone with 2+ years to backfill = the unserved wedge no rail solves.
- **Time budget:** 90–110 minutes. Over 3 hours and the price is wrong — the dry-run against a
  synthetic case exists to learn this *before* someone pays. `[D docs/NOW.md, research/decision.md D6b]`
- **The objection with a script:** "let me ask my CA first" — don't argue the CA; send four checkable
  questions and let the answer convert. `docs/outreach/CA_OBJECTION.md`.

---

## Research summary

- **The wedge correction (most important finding):** FIRCs discontinued 2016 → FIRA; modern rails
  already issue FIRA free and automatically (that half is commoditised); the live wedge is
  Wise/PayPal/Stripe (structurally can't), direct bank transfer, and historical backfill. `[D docs/outreach/WEDGE_REALITY_CHECK.md]`
- **AdSense/Singapore:** AdSense pays Indian creators from Google Asia Pacific Pte. Ltd., Singapore, in
  foreign currency — every monetised Indian creator is exporting a service. `[D]`
- **Demand evidence:** 15 live public threads (queued in `pipeline.db`) where someone asked, in public,
  to hire for exactly this scope before hearing of Raha; a top comment naming ₹20,000/yr for the same
  work (third-party price validation). `[D docs/outreach/ACUTE_PAIN_TARGETS.md]`
- **Original research paper:** *FIRC to FIRA…* — the three-tier rail stratification is, as far as we
  can find, not documented anywhere else. PDF in `docs/nirmaan/`. `[D]`
- **SEO:** not winnable — 12 funded companies own the SERP and monetise payments, so they give content
  away permanently. `[D docs/outreach/SEO_AUDIT.md]`
- **Where the research is thin (stated plainly):** the outreach corpus is US consumer/B2B, not India
  GST — the mechanics transfer, the rates do not; and no source has ever sold to someone who already
  has a CA doing the job, which is the largest obstacle here. `[D research/decision.md]`

---

## Roadmap

- **Done:** landing, audit funnel, full authenticated app, auth, 10-table RLS schema, 68 tests + E2E,
  deployed, Layer-2 reposition, ₹2,000 Evidence Check + UPI live, rail question, delivery SOPs,
  30-day plan + scoreboard, Nirmaan application, Razorpay/Nostro plan.
- **Now (the 30 days):** run the channel — 15 warm asks, public answers, Tier-1 DMs, every one ending
  in the ₹2,000 ask. Get one paid. Partner a CA.
- **Founder's open config items:** swap WhatsApp/UPI off the personal number; register the Reddit
  script app; (unverified) apply migration 0005 + confirm the magic-link email template.
- **Phase 1 (gated on first paying customers):** statement→ledger processing (delivery < 45 min),
  lower price tier, multi-rail reconciliation, historical backfill, observability, `/privacy` + `/terms`.
- **Vision:** Layer 3 — embedded evidence infrastructure under the rails (thesis under test).

---

## Security

Genuinely strong for the stage: RLS on all 10 tables; service-role key server-only and guarded; only
non-secret public env vars; Zod at every action boundary; magic-link fragment-verified; open-redirect
blocked (`safeNext()`); honeypots on both public forms; HSTS + `X-Frame-Options: DENY` + `nosniff` +
Referrer-Policy + Permissions-Policy; private storage bucket with MIME allow-list and path-scoped RLS.
Rate limiting deliberately absent (honeypots + Supabase limits; Vercel Firewall when traffic exists).
`[D DECISIONS.md #13, #14]`

**Real gaps:** no `/privacy` or `/terms` (both 404 — a trust and possibly legal gap for a financial
product) · no audit logging · no CSP · **concierge delivery moves client PAN/GSTIN/bank data into
spreadsheets, outside every control above — the actual risk.** `[D]`

---

## Configuration & deployment

**Env:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
(server only), `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_UPI_ID`.
`[D] — the seat-counter env is retired with the ₹20,000 seat.`

⚠️ **Do not repoint `NEXT_PUBLIC_SITE_URL` at a new hostname without first adding it to Supabase →
Auth → URL Configuration → Redirect URLs** — it feeds `emailRedirectTo` and the OAuth `redirectTo`;
changing it alone breaks sign-in. `[D FINAL.md, src/app/actions/auth.ts]`

**Deploy:** Vercel → `raha.software`. `main` auto-deploys and is in sync with production (the 27 Aug
working-tree drift was pushed and closed). Supabase project ref `xhegzotakpbjltwqnffq`, region Mumbai.
Runbook: `docs/DEPLOY.md`. **CI/CD `[U]`** — gates (`typecheck`, `lint`, `test`) exist as npm scripts
but are not enforced by automation.

---

## Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| 1 | **No CA partnered** — cannot deliver a filing if someone pays for one | Critical | Evidence Check scoped as unsigned risk report; recruiting is Pratham line-item #1 |
| 2 | **Zero revenue; ₹2,000 never tested on one human** | Critical | The 30-day plan exists only to fix this |
| 3 | **Distribution unsolved** — the product works, nobody has paid | Critical | Warm asks + Reddit; the whole plan |
| 4 | **Solo founder, also a student** — named largest structural risk | High | Co-founder search is a stated Pratham goal |
| 5 | Rails commoditise the forward wedge | High | Reposition to backfill / offshore rails / reconciliation |
| 6 | Spreadsheet concierge holds financial PII outside RLS | High | Minimise intake; Pratham funds processing to remove it |
| 7 | Tax logic unaudited by a professional | High | Estimate disclaimer everywhere; CA review is Pratham #1 |
| 8 | No observability / no CI / no staging | Medium | Add when traffic exists |
| 9 | Missing `/privacy` + `/terms` | Medium | Add before volume |
| 10 | Services model ceilings at CA throughput (~50 customers) | Medium | Structural, not now |

---

## Open questions

1. **Will anyone pay ₹2,000?** Never tested on one human. Everything is downstream of this.
2. **Who is the CA?** No name, no terms. `[U]`
3. **Is the tax logic correct?** Written from research, never reviewed by a professional.
4. **Does the ₹2,000 → ₹20,000 ladder hold across an April LUT cycle?** Untested by construction.
5. **Does the unserved wedge have volume?** Backfill/multi-rail are uncontested partly because few search them.
6. **Rails: partner or competitor?** The Layer-3 thesis, unresolved. `[U]`
7. **Raha or Nostro for September?** Decided by the 3 Sep gate.

---

## Decision log

**Engineering (all active) — full detail in `DECISIONS.md`:** standalone repo · PRD as ground truth ·
estimate disclaimer on every figure · no automated filing ever · bundled RBI FX table with
`rate_source` · FIRC matching suggest-then-confirm · advance tax new-regime only · no in-product
payments · RLS on every table · magic link via URL fragment · audit report before email gate · E2E via
real magic-link flow (no test backdoors).

**Strategic (newer, recorded across NOW.md / decision.md / STATE.md):**

| Date | Decision |
|---|---|
| 2026-07-26 | Cut the agency wedge as primary GTM (23 emails → 0 replies) |
| 2026-07-28 | Commit to **Layer 2** — all foreign-income earners, not creators alone |
| 2026-07-28 | Diagnostic as an unsigned risk report; skip SEO |
| 2026-08-23 | **Yes to Razorpay/Nostro** — in-person Bangalore, 6 months, from September |
| 2026-08-27 | **Sell the ₹2,000 Evidence Check; take the ₹20,000 seat off the front door** |
| 2026-08-27 | One channel for 30 days; **warm network is the primary 7-day test**, Reddit is the long game |
| 2026-08-27 | Stop cold email to agencies and all new agency sourcing |
| 2026-08-27 | September allocation gate (3 Sep): one paid ₹2,000 or Nostro takes September |

---

## Project health

| Dimension | Score | Note |
|---|---|---|
| Engineering / code organisation | 9/10 | Pure tested `lib/`, RLS everywhere, clean structure |
| Documentation | 8/10 | Thorough; the drift this file resolves was the weak point |
| Security | 8/10 | Strong for stage; spreadsheet PII + missing legal pages pull it down |
| Commercial validation | 2/10 | ₹0, 0 customers, ₹2,000 gate never tested |
| **Overall** | **6.5/10** | **An unusually well-engineered product attached to an unvalidated business. The engineering is ahead of the evidence — that is the risk.** |

---

## Recommended next steps

**Today / this week (the founder's, and nothing on the list matters more than the last one):**
1. Swap `NEXT_PUBLIC_WHATSAPP_NUMBER` (and ideally the UPI VPA) off the personal number → redeploy.
2. Send the ₹2,000 UPI request to yourself once — confirm it opens a real collect request.
3. **Send all 15 warm asks in one sitting** (`docs/outreach/WARM_15_DRAFTS.md`); log each with `pipeline.py`.
4. 2–3 public r/IndiaTax answers opening with the FIRC→FIRA correction; no mention of Raha.
5. Submit the Nirmaan application before EOD today.
6. **Ask one human for ₹2,000.** This is the whole game.

**The 30 days:** run the queue in `research/decision.md`; hit the weekly floor (12 answers + 5 DMs);
every DM ends in the ₹2,000 ask; partner a CA; dry-run the deliverable once for the real time cost.

**After the first paying customer (only then):** Phase-1 productisation, lower price tier, multi-rail
reconciliation, historical backfill, observability, `/privacy` + `/terms`.

---

## Appendices

**A. Key files** — Current action: `docs/NOW.md` · 30-day plan: `research/decision.md` · Scoreboard:
`scripts/pipeline.py` + `research/pipeline.db` · PRD: `docs/raha_prd.md` · Delivery:
`docs/delivery/` · Objection: `docs/outreach/CA_OBJECTION.md` · Warm asks: `docs/outreach/WARM_15_DRAFTS.md`
· Nirmaan: `docs/nirmaan/APPLICATION.md` · Razorpay/Nostro: `docs/razorpay/PLAN.md` · Engineering
rules: `CLAUDE.md` · Decisions: `DECISIONS.md`.

**B. Commands**
```bash
npm run dev            # Turbopack dev server
npm run build          # production build
npm run typecheck      # tsc --noEmit
npm run lint           # eslint
npm test               # vitest — 68 tests, ~250ms
npm run seed           # demo data (needs SUPABASE_SERVICE_ROLE_KEY)
npx playwright test    # e2e (workers:1 — do not raise; shared magic-link token races)
python3 scripts/pipeline.py stats     # the scoreboard
python3 scripts/pipeline.py log <id> <event> --note "<ref>"   # log a pipeline touch
```

**C. Developer onboarding** — read this file, then `CLAUDE.md`; `npm install`, copy `.env.example` →
`.env.local`, fill Supabase keys; run migrations `0001`–`0005` in order in the Supabase SQL editor;
`npm run seed && npm run dev`; read `src/lib/` first — the business logic lives there and it is all tested.

**D. Live surfaces** — Production `https://raha.software` · Audit `https://raha.software/audit` · Repo
`https://github.com/DhanushAleti/raha` (private) · Vault mirror `Dhanush OS/Raha/00 Home/raha-home.md`.

---

*Kept current as of 2026-08-29. This document is only useful while it is true — regenerate the status,
plan, and scoreboard sections after any significant change. Everything else in the repo is detail
behind it, a dated log, or history.*
