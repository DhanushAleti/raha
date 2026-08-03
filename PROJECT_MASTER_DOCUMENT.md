# Raha — Project Master Document

> Single source of truth. Written for a new engineer, a new AI session, or an investor to reach
> working understanding in under fifteen minutes.
>
> **Generated:** 2026-07-28 · **Commit:** `b289f77` · **Branch:** `main`
>
> **Evidence legend — applied throughout:**
> `[D]` Documented — verifiable in a file or the running system.
> `[I]` Inferred — deduced from code or context, not explicitly stated anywhere.
> `[U]` Unknown — genuinely undetermined. Not guessed at.

---

## Table of contents

[Project Overview](#project-overview) · [Executive Summary](#executive-summary) ·
[Product Overview](#product-overview) · [User Personas](#user-personas) ·
[Feature Inventory](#feature-inventory) · [Architecture Summary](#architecture-summary) ·
[Technology Stack](#technology-stack) · [Folder Structure](#folder-structure) ·
[Source Code Overview](#source-code-overview) · [Database](#database) · [APIs](#apis) ·
[AI System](#ai-system) · [Integrations](#integrations) · [Business Model](#business-model) ·
[Research Summary](#research-summary) · [Roadmap](#roadmap) · [Design System](#design-system) ·
[Security](#security) · [Deployment](#deployment) · [Configuration](#configuration) ·
[Risks](#risks) · [Open Questions](#open-questions) · [Missing Documentation](#missing-documentation) ·
[AI Collaboration Guide](#ai-collaboration-guide) · [Knowledge Graph](#knowledge-graph) ·
[Glossary](#glossary) · [Decision Log](#decision-log) ·
[Project Health Assessment](#project-health-assessment) ·
[Recommended Next Steps](#recommended-next-steps) · [Appendices](#appendices)

---

## Project Overview

| | |
|---|---|
| **Name** | Raha `[D]` |
| **One sentence** | Compliance for Indians earning foreign currency, proving that income qualifies as a zero-rated GST export. `[D]` |
| **Current stage** | Pre-revenue. Product live, zero paying customers. `[D docs/STATE.md]` |

**Elevator pitch.** When an Indian freelancer, creator or indie founder is paid from abroad, that
money is an export of services — zero-rated at 0% GST. But only if they can prove it came from
abroad. That proof requires a FIRA from the bank plus a Letter of Undertaking filed for the year.
Without both, the same income is assessed as domestic at 18%, plus a penalty equal to the tax, plus
18% annual interest. On ₹40L of foreign income that is roughly ₹7L of avoidable exposure. Raha
produces the proof. `[D docs/raha_prd.md §1]`

**Mission.** Remove the financial anxiety of cross-border income for people who earn it alone,
without a finance function. `[D PRD §4 — "Raha sells relief"]`

**Vision.** Become the compliance layer sitting above every cross-border payment rail in India.
`[D docs/STATE.md — Layer 3 thesis, explicitly not yet committed]`

**Core problem.** Foreign-income compliance is conditional on paperwork most earners have never
heard of, and their CAs have rarely encountered. `[D PRD §1]`

**Proposed solution.** A ₹2,000 written diagnostic establishing FIRA coverage, LUT status and real
exposure, escalating to ₹20,000/year ongoing compliance. Delivery is concierge today; productised
after the first cohort. `[D docs/outreach/DIAGNOSTIC_DELIVERY.md]`

**Why it matters.** India receives over $100B in annual service exports. The compliance layer under
that flow is unowned. `[I — TAM reasoning in docs/STATE.md]`

---

## Executive Summary

**What it does.** Establishes and documents that a person's foreign income legally qualifies for 0%
GST rather than 18%, across whichever payment rails they used, including historical years.

**Who it serves.** Solo Indian operators with recurring foreign-currency income and no finance
function — freelancers, consultants, indie SaaS founders, creators. Roughly 2–3M people.
`[D docs/STATE.md, Layer 2 decision 2026-07-28]`

**Why it exists.** The rules were not written with cross-border solo earners in mind, and the
professionals they hire were trained for domestic businesses.

**Biggest differentiator.** Modern payment rails (Skydo, Karbon, Payoneer) now issue FIRA
automatically — but only for money flowing through them, and only forward. Nobody covers
offshore-converting rails (Wise, Stripe, PayPal) where money lands as a domestic IMPS transfer no
bank can certify, direct bank transfers, historical backfill, or reconciliation across multiple
rails at once. `[D docs/outreach/WEDGE_REALITY_CHECK.md]`

**Current maturity.** Product is live, deployed, tested (68 passing unit tests plus an E2E core
loop) and correct. Commercially it is at zero: 28 cold emails sent, one reply, which was a
disqualification. No human has yet been asked to pay. `[D docs/outreach/SEND_LOG.md]`

**Long-term ambition.** Layer 2 (₹150–300 Cr ARR ceiling) is committed. Layer 3 (embedded
compliance infrastructure) is the thesis under test, not a commitment. `[D docs/STATE.md]`

---

## Product Overview

Two distinct surfaces sharing one deployment.

**Surface 1 — public funnel (unauthenticated).**

```
Landing (/) ──▶ Free Audit (/audit) ──▶ Report shown ──▶ optional email capture
     │                                                          │
     └──────────▶ Waitlist form                                 └──▶ audit_leads
```

The audit is 8 questions, no signup, returning a red/amber/green verdict scored server-side.
The report renders **before** any email is requested — deliberately, to honour the "no signup"
promise made in outreach. `[D commit 633ca9f]`

**Surface 2 — authenticated app (`/app/*`).**

```
Income entry ──▶ FX conversion ──▶ Income ledger
                                        │
FIRC record ──▶ suggest match ──────────┤──▶ confirm ──▶ export proof
                                        │
                                        └──▶ GST liability + advance tax
                                        └──▶ Invoice generation ──▶ PDF
Document vault (FIRC, contracts, PAN, GST cert, LUT)
```

**Core workflows** `[D — from src/app/app/*]`

| Workflow | Route | What it does |
|---|---|---|
| Income tracking | `/app/income` | Manual entry + CSV upload, multi-currency, FX-converted to INR |
| FIRC matching | `/app/firc` | Suggest-then-confirm matching of remittances to income entries |
| Invoicing | `/app/invoices` | GST-compliant sequential invoices, PDF export |
| Liability | `/app` | Live GST + advance-tax "set aside this much" figure |
| Vault | `/app/vault` | Categorised document storage |
| Settings | `/app/settings` | Profile, GSTIN, LUT ARN, invoice prefix |

**Critical dependency.** Every computed figure carries "estimate — verify with your CA before
filing." No automated-filing claim appears anywhere. This is a hard rule, not a preference.
`[D CLAUDE.md, PRD §10, DECISIONS.md #4]`

---

## User Personas

**1. The solo foreign-income earner (primary buyer)** `[D PRD §3, revised by STATE.md]`
- *Goals*: not get a notice; not overpay; stop thinking about it
- *Pain*: doesn't know FIRA exists; CA has never handled cross-border income
- *Workflow*: paid monthly from abroad → does nothing → panics at filing season
- *Permissions*: full owner of their own data, RLS-scoped
- *Value*: a written answer, and someone who understands the question

**2. The Chartered Accountant (channel, not competitor)** `[D PRD §3 Persona 3]`
- *Goals*: file correctly without becoming a cross-border specialist
- *Pain*: client brings foreign income they aren't equipped to assess
- *Value*: receives reconciled files rather than a shoebox
- *Status*: `[U]` — no CA is currently partnered. This is a plan, not a fact. See [Risks](#risks).

**3. The talent agency (deprioritised wedge)** `[D PRD §3 Persona 2 — cut by GTM review]`
- Originally the primary GTM. 23 emails produced zero replies. Retained as a slow-burn channel
  only. `[D docs/outreach/GTM_REVIEW.md]`

---

## Feature Inventory

### Current — shipped and live

| Feature | Status | Priority | Dependencies | Notes |
|---|---|---|---|---|
| Landing page | Live | P0 | — | 8 sections, Fraunces/OKLCH design system |
| Free audit + scoring | Live | P0 | `lib/audit/scoring.ts` | Server-side scored; client never sets verdict |
| Audit lead capture | Live | P0 | `audit_leads` | Optional, post-report |
| Anonymous completion tracking | Live | P1 | `audit_completions` | Migration 0005 — **not yet applied to prod DB** `[D]` |
| Magic-link auth | Live | P0 | Supabase Auth | Fragment-based; needs email-template change `[D]` |
| Google OAuth | Live | P1 | Supabase Auth | `/auth/callback` |
| Income tracker | Live | P0 | `income_entries` | Manual + CSV, 4 currencies |
| FX conversion | Live | P0 | `lib/fx/convert.ts` | Bundled RBI table + manual override |
| FIRC tracker + matching | Live | P0 | `firc_records`, `firc_matches` | ±2% / +45−7d suggest-then-confirm |
| GST liability | Live | P0 | `lib/tax/gst-liability.ts` | CGST/SGST vs IGST by state |
| Advance tax | Live | P1 | `lib/tax/advance.ts` | New-regime slabs, annualised YTD |
| Invoice generator + PDF | Live | P0 | `@react-pdf/renderer` | Sequential numbering |
| Document vault | Live | P1 | Supabase Storage | 7 categories, 10MB cap |
| Waitlist | Live | P2 | `waitlist` | Honeypot-protected |

### Planned — Phase 1, gated behind 3 paying customers `[D PRD §5]`

| Feature | Priority | Notes |
|---|---|---|
| Lower pricing tier for sub-₹20L earners | P0 | Layer 2 requires it; ₹20K/yr misfits a ₹25L freelancer |
| Rail-aware qualification | P0 | "How are you paid?" decides whether a problem exists at all |
| Multi-rail reconciliation | P1 | The actual unserved wedge |
| Historical backfill workflow | P1 | Also unserved |

### Future — Phase 2 `[D PRD §5]`

Income auto-import (AdSense/Stripe/Patreon APIs) · CA portal with Tally/Zoho export ·
AI expense categorisation · Agency roster dashboard

### Deprecated / cut

| Item | Why |
|---|---|
| Agency wedge as primary GTM | 23 emails → 0 replies `[D GTM_REVIEW.md]` |
| Automated filing | Never in scope. Legal and licensing boundary `[D PRD §10]` |
| In-product payments | Hard stop; concierge routes to WhatsApp `[D DECISIONS.md #9]` |
| SEO as a growth channel | 12 funded competitors own the SERP `[D SEO_AUDIT.md]` |
| LinkedIn / X content | Declined by founder `[D]` |

---

## Architecture Summary

| Layer | Choice | Notes |
|---|---|---|
| **Frontend** | Next.js 15 App Router, React 19, TypeScript | Server Components default; `"use client"` only where needed |
| **Backend** | Next.js Server Actions | No separate API tier `[I — no server framework in deps]` |
| **Database** | Supabase Postgres | RLS on all 10 tables |
| **AI** | **None in product** | See [AI System](#ai-system) |
| **Infrastructure** | Vercel | Auto-deploy from `main` |
| **Auth** | Supabase Auth | Magic link (fragment-verified) + Google OAuth |
| **Storage** | Supabase Storage | Private bucket, RLS-scoped by user folder |
| **Messaging** | WhatsApp deep link | `lib/whatsapp.ts` — no messaging infra |
| **Caching** | Next.js defaults only | No Redis, no explicit cache layer `[D]` |
| **Security** | RLS + security headers + Zod | See [Security](#security) |
| **Observability** | `console.error` only | **Genuine gap** — no Sentry, no APM `[D]` |
| **Integrations** | Supabase only | No third-party APIs in the product `[D package.json]` |

**Request flow**

```
Browser ──▶ middleware.ts (session refresh + /app gate)
              │
              ├─ public route ──▶ RSC render ──▶ HTML
              │
              └─ /app/* ──▶ authed? ──no──▶ 307 /login
                              │yes
                              ▼
                     RSC + Server Action ──▶ supabase/server.ts ──▶ Postgres (RLS)
```

**Single points of failure:** Supabase (auth + data + storage), Vercel (hosting), and — for
delivery, not software — the unpartnered CA. `[I]`

**Rollback:** `git revert` + redeploy. Migrations are additive and idempotent, so no down-migration
path exists. `[I — from migration structure]`

---

## Technology Stack

| Technology | Purpose | Reason chosen | Alternatives |
|---|---|---|---|
| Next.js 15 (Turbopack) | App framework | RSC + Server Actions remove a whole API tier `[I]` | Remix, SvelteKit |
| React 19 | UI | Next default | — |
| TypeScript | Type safety | Repo-wide, `tsc --noEmit` gate `[D]` | — |
| Tailwind v4 | Styling | Utility-first, OKLCH tokens `[D globals.css]` | CSS Modules |
| shadcn/ui + Radix | Components | Accessible primitives, owned source `[D]` | MUI, Chakra |
| Supabase | DB + auth + storage | One vendor for three needs; RLS is the security model `[I]` | Firebase, Neon+Clerk |
| `@supabase/ssr` | Cookie-based sessions | Required for RSC auth | — |
| Zod | Boundary validation | Mandated by CLAUDE.md `[D]` | Yup, Valibot |
| `@react-pdf/renderer` | Invoice PDFs | React-native PDF generation | Puppeteer |
| PapaParse | CSV import | Battle-tested | Hand-rolled |
| Vitest | Unit tests | 68 tests, ~250ms `[D]` | Jest |
| Playwright | E2E | Real magic-link flow, no test backdoors `[D DECISIONS.md #15]` | Cypress |
| Vercel | Hosting | Zero-config Next deploys | Netlify, Fly |

---

## Folder Structure

```
raha/
├── src/
│   ├── app/              Next App Router — routes, layouts, server actions
│   │   ├── actions/      8 server actions: the entire write layer
│   │   ├── app/          Authenticated product (gated by middleware)
│   │   ├── audit/        Public funnel: the free check
│   │   ├── auth/         confirm (magic link) + callback (OAuth)
│   │   └── login/        Sign-in
│   ├── components/
│   │   ├── ui/           19 shadcn primitives — owned, not imported
│   │   ├── landing/      8 marketing sections
│   │   ├── audit/        Wizard + report + question bank
│   │   └── {app,firc,income,invoices,settings,vault,auth}/  feature components
│   ├── lib/              Pure business logic — the testable core
│   │   ├── audit/        Risk scoring
│   │   ├── firc/         Matching algorithm
│   │   ├── fx/           Currency conversion
│   │   ├── gst/ tax/     GST calc, liability, advance tax
│   │   ├── income/       Categorisation, CSV parsing
│   │   ├── invoice/      Numbering, PDF
│   │   └── supabase/     4 clients: browser, server, admin, middleware
│   └── middleware.ts     Session refresh + route gate
├── supabase/migrations/  5 idempotent SQL migrations
├── e2e/                  Playwright core-loop spec
├── scripts/seed.mjs      Demo data seeding
└── docs/                 29 files, 3,102 lines
    └── outreach/         Sales assets, research, reviews
```

**Why `lib/` is separate from `components/`:** every file in `lib/` is pure and unit-tested. Ten of
eleven logic modules have a co-located `.test.ts`. This is the deliberate seam that makes 68 tests
run in 250ms with no mocking. `[I — inferred from consistent structure]`

---

## Source Code Overview

**Entry points:** `src/app/layout.tsx` (root shell) · `src/middleware.ts` (every request) ·
`src/app/page.tsx` (landing).

**Core business logic — `src/lib/`, all unit-tested:**

| Module | Responsibility |
|---|---|
| `audit/scoring.ts` | Risk score → red/amber/green + flags. Server-authoritative. |
| `firc/match.ts` | Candidate matching: ±2% amount, +45/−7 day window |
| `fx/convert.ts` | RBI reference table + manual override; records `rate_source` |
| `gst/calc.ts` | CGST/SGST vs IGST by state |
| `tax/gst-liability.ts` | Aggregate GST position |
| `tax/advance.ts` | New-regime slabs, annualised YTD, minus TDS |
| `income/csv.ts` · `categorize.ts` | Import parsing and classification |
| `invoice/number.ts` · `pdf.tsx` | Sequential numbering, PDF render |
| `format/inr.ts` | Indian numbering (lakh/crore) |

**Write layer — `src/app/actions/` (8 server actions):** `audit`, `auth`, `documents`, `firc`,
`income`, `invoice`, `profile`, `waitlist`. Each validates with Zod before touching the database.

**Supabase clients — four, deliberately distinct:**
`client.ts` (browser) · `server.ts` (RSC/actions) · `middleware.ts` (session refresh) ·
`admin.ts` (**service-role, RLS-bypassing, server-only, guarded with an explicit warning comment**).

---

## Database

Postgres via Supabase. **10 tables, all with RLS enabled.** 16 policies, 10 indexes across 5
idempotent migrations. `[D — verified by scan]`

| Table | Purpose | Access model |
|---|---|---|
| `profiles` | GSTIN, PAN, state, LUT ARN, invoice prefix | Self only; auto-created by `handle_new_user` trigger |
| `income_entries` | Multi-currency ledger with FX provenance | Owner only |
| `firc_records` | Foreign inward remittances | Owner only |
| `firc_matches` | Join table — one FIRC covers many entries | Owner only, same-owner composite FKs |
| `invoices` / `invoice_items` | GST invoices | Owner only |
| `documents` | Vault metadata | Owner only |
| `waitlist` | Public capture | Anon INSERT only, no read |
| `audit_leads` | Audit lead capture | Anon INSERT only, no read |
| `audit_completions` | Anonymous funnel measurement, **no PII** | Anon INSERT only, no read |

**Design notes** `[D migrations]`
- Lead tables have **no SELECT policy** — read from the Supabase dashboard only. Deliberate.
- `firc_matches` uses same-owner composite foreign keys, preventing cross-user match forgery.
- `income_entries` stores `rate_used` **and** `rate_source`, so every INR figure is auditable back
  to its conversion basis. This is the schema's best decision.
- Storage: private bucket, 10MB cap, MIME allow-list, RLS scoped by user-id folder prefix.

**⚠ Migration `0005_audit_completions.sql` has not been applied to the production database.**
Analytics silently no-op until it is. `[D]`

---

## APIs

**No public API exists.** `[D]`

| Type | Present? | Detail |
|---|---|---|
| REST | Partial | Two Route Handlers only: `/auth/callback` (OAuth code exchange), `/app/invoices/[id]/pdf` (PDF stream) |
| GraphQL | No | — |
| RPC | No | — |
| Internal | Yes | 8 Server Actions — the real write layer |
| External consumed | Supabase only | No third-party API calls in product code |

**Request flow (action):** client form → Server Action → Zod parse → Supabase client (RLS) →
Postgres → typed result → UI. Failures return `{status:"error", message}` rather than throwing.
`[D — pattern consistent across actions]`

---

## AI System

**Raha ships no AI.** `[D — no AI SDK in package.json]`

This is the most commonly mis-assumed thing about the project, so it is stated plainly. The PRD
mentions AI in Phase 0 delivery ("spreadsheets + AI + a partnered CA") and Phase 2 ("AI expense
categorisation") — both refer to the **founder using AI tools manually**, not to product features.
`[D PRD §5]`

**Where AI does appear:**

| Use | Detail |
|---|---|
| Development | Built with Claude Code. See [AI Collaboration Guide](#ai-collaboration-guide). |
| Diagnostic delivery | Founder uses AI while producing the ₹2,000 report by hand `[D DIAGNOSTIC_DELIVERY.md]` |
| Research | Subagents used for lead research, GTM review, competitive analysis `[D]` |

**If AI is added later**, the guardrail already exists and is non-negotiable: every computed tax
figure carries the estimate disclaimer, and no automated-filing claim is permitted. An LLM
generating tax figures without those constraints would violate the project's core safety rule.

---

## Integrations

| Integration | Purpose | Data exchanged | Auth | Failure handling |
|---|---|---|---|---|
| Supabase Auth | Sign-in | Email, OAuth identity | Anon key + JWT | Redirect to `/login?error=` |
| Supabase Postgres | All data | Financial records | RLS via JWT | Error logged, user-safe message |
| Supabase Storage | Vault | Documents ≤10MB | RLS by path | Upload rejected on type/size |
| WhatsApp | Concierge conversion | Deep link only | None | N/A — plain link |
| Vercel | Hosting | — | CLI/Git | Platform-managed |

**Operational connectors (not product):** Gmail, Google Calendar, Drive, Notion, ClickUp are live
for founder workflow. Slack (empty), Canva and Figma (view-only seat) were assessed and skipped.
`[D CAPABILITIES.md]`

---

## Business Model

| | |
|---|---|
| **Customer** | Solo Indian operator, recurring foreign income, no finance function |
| **Entry price** | ₹2,000 — written diagnostic (not a filing, not signed advice) |
| **Core price** | ₹20,000/year founding seat (₹40,000 standard) |
| **Revenue today** | **₹0** `[D]` |
| **Delivery** | Concierge: spreadsheets + partnered CA. No software leverage yet. |
| **Distribution** | Direct outreach → Reddit acute-pain targeting → warm intros |
| **Positioning** | Wide audience, narrow wedge. Never general tax filing. |

**Unit economics as modelled** `[D PRD §7]`: 10 customers × ₹20K ≈ ₹2L against near-zero fixed
cost. 100 × ₹30K = ₹30L ARR before software leverage. CAC target < ₹2,000.

**Known pricing problem** `[D GTM_REVIEW.md §1]`: a licensed CA publicly sells the same scope
(ITR + GST + LUT + FIRC) at the same ₹20,000, discoverable in a five-minute search. Since Phase 0
delivery *is* a partnered CA, Raha currently offers more risk at equal price. The strategic answer
is to target people whose CA has already missed the FIRA, and to lead with ₹2,000.

**Market sizing** `[I — order of magnitude, not researched precision]`

| Layer | Audience | TAM | ARR ceiling |
|---|---|---|---|
| 1 — creators only | ~100K | ₹150–450 Cr | ₹15–45 Cr |
| **2 — all foreign-income earners (committed)** | **2–3M** | **₹1,000–3,000 Cr** | **₹150–300 Cr** |
| 3 — embedded infrastructure | every rail | $100B+ flow | ₹1,000 Cr+ |

---

## Research Summary

**Competitors** `[D COMPETITIVE_BRIEF.md]`
- **TaxTap** — real overlap. Filing service, 10K+ users, handles FIRC. Generalist across 30+
  professions, season-time rather than continuous.
- **CreatorKhata** — broad creator business app; tax is one feature. No CA-signed filing. Closer to
  complementary than competitive.
- **Payment rails** (Skydo, Karbon, Winvesta, Payoneer, BriskPE) — not product competitors, but they
  own the education and half the problem.

**The AdSense finding** `[D — verified at Google's own support page]`: AdSense pays Indian creators
from Google Asia Pacific Pte. Ltd., **Singapore**, in foreign currency. Every monetised Indian
creator is therefore exporting a service, regardless of audience geography.

**The wedge correction** `[D WEDGE_REALITY_CHECK.md]` — the single most important research finding:
1. Physical FIRCs were **discontinued for exports in 2016**. Banks issue FIRA. Saying "FIRC" alone
   marks the speaker as half-informed to any CA. This terminology error is present in all 28 sent
   emails and in current site copy.
2. Modern rails already issue FIRA free and automatically. That half is commoditised.
3. The unserved half: offshore-converting rails (Wise/Stripe/PayPal land as domestic IMPS —
   uncertifiable), direct bank transfers, historical backfill, cross-rail reconciliation.

**Demand evidence** `[D ACUTE_PAIN_TARGETS.md]`: 12 months of r/IndiaTax threads. Five people
publicly asking to *hire* someone for exactly this scope. One top comment naming ₹20,000/year for
the same work — third-party price validation.

**SEO** `[D SEO_AUDIT.md]`: not winnable. Twelve funded companies own the SERP and monetise payments,
so they can give the content away permanently.

---

## Roadmap

**Completed** — landing, audit funnel, full authenticated app, auth (magic link + OAuth), 10-table
schema with RLS, 68 unit tests + E2E, deployed to `raha.software`, sales machine documented.

**Current (this week)** — apply migration 0005; change the Supabase magic-link email template;
verify sign-in end-to-end; send five acute-pain DMs; ask one human for ₹2,000.

**Next (30 days)** — clear the PRD validation gate: **3 paying customers or pivot** `[D PRD §6]`.
Partner a CA. Correct FIRC→FIRA terminology everywhere. Add rail-aware qualification.

**Future** — Phase 1 dashboard productisation (gated on 3 customers), lower pricing tier, multi-rail
reconciliation, historical backfill.

**Vision** — Layer 3: embedded compliance under the payment rails.

---

## Design System

`[D src/app/globals.css, src/components/landing/*]`

| Token | Value | Role |
|---|---|---|
| `--raha-ink` | `oklch(0.22 0.02 165)` | Primary text |
| `--raha-cream` | `oklch(0.975 0.012 90)` | Page surface |
| `--raha-green` | `oklch(0.32 0.06 165)` | Primary action |
| `--raha-amber` | `oklch(0.78 0.14 75)` | Highlight, amber verdict |
| `--raha-red` | `oklch(0.55 0.19 25)` | Red verdict |

**Typography:** Fraunces (serif display) + Inter (body) + Geist Mono. **Philosophy:** editorial and
restrained — deliberately calm, because the product sells reassurance to anxious people. Colour is
semantic (red/amber/green mirrors the audit verdict), never decorative. OKLCH throughout for
perceptual consistency. `[I — inferred from consistent application]`

---

## Security

**Posture is genuinely strong.** `[D — verified by audit]`

| Control | State |
|---|---|
| RLS | All 10 tables. Zero unprotected. |
| Service-role key | Server-only, guarded, never in a client-reachable import |
| Public env vars | Only URL, anon key, site URL, WhatsApp number — no secrets |
| Input validation | Zod at every server-action boundary |
| Auth | Supabase-managed; magic-link token now fragment-verified |
| Open redirect | Blocked — `safeNext()` rejects absolute and protocol-relative URLs |
| Honeypots | On both public forms |
| Security headers | HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy |
| Storage | Private bucket, MIME allow-list, 10MB cap, path-scoped RLS |
| Rate limiting | **Deliberately absent.** Honeypots + Supabase auth limits; Vercel Firewall recommended when traffic exists `[D DECISIONS.md #14]` |

**Gaps:** no `/privacy` or `/terms` (both 404 — a trust and possibly legal gap for a financial
product) · no audit logging · no CSP header · Phase 0 concierge delivery moves client PAN, GSTIN and
bank data into **spreadsheets, outside every control above**. That last one is the real risk.

---

## Deployment

| Environment | State |
|---|---|
| Development | `npm run dev` (Turbopack), `.claude/launch.json` for the browser tool |
| Staging | **None** `[D]` |
| Production | Vercel → `raha.software` (also `raha-iota.vercel.app`) |

**CI/CD:** `[U]` — no workflow files found. Deploys appear to be CLI (`vercel --prod`) and/or Vercel
Git integration. Quality gates (`typecheck`, `lint`, `test`) exist as npm scripts but are **not
enforced by automation**.

**Post-deploy verification** (used in practice): `curl` status on `/`, `/audit`, `/auth/confirm`;
confirm `/auth/confirm` returns 200 rendering the client page, not a 307.

**Manual steps not yet done** `[D docs/DEPLOY.md]`: apply migration 0005 · change the Supabase
magic-link email template from `?token_hash=` to `#token_hash=` (**the auth fix is inert without
it**) · verify sign-in end to end.

---

## Configuration

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | RLS-safe client key |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Admin client; never client-reachable |
| `NEXT_PUBLIC_SITE_URL` | public | Auth redirect base + metadata |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | public | Concierge deep link |
| `NEXT_PUBLIC_FOUNDING_SEATS_TAKEN` | public | Scarcity counter |

**Files:** `next.config.ts` (security headers) · `tsconfig.json` · `eslint.config.mjs` ·
`components.json` (shadcn) · `.claude/launch.json` · `.env.local` (gitignored).

**Build:** `next build --turbopack`. **Gates:** `npm run typecheck && npm run lint && npm test`.

---

## Risks

| # | Risk | Type | Severity | Mitigation |
|---|---|---|---|---|
| 1 | **No CA partnered.** Cannot deliver a filing if someone pays for one. | Business | **Critical** | Diagnostic scoped as unsigned risk report; recruit in parallel `[D]` |
| 2 | **Zero revenue, 30-day self-imposed gate.** | Business | **Critical** | Only fix is asking humans for money |
| 3 | **Price parity with a human CA at ₹20,000.** | Business | High | Lead with ₹2,000; target CA-failed prospects |
| 4 | Rails commoditising the forward-looking wedge | Business | High | Reposition to backfill / offshore rails / reconciliation |
| 5 | Terminology error (FIRC vs FIRA) in all sent material | Product | High | Correct everywhere before further sending |
| 6 | Spreadsheet-based concierge holds financial PII outside RLS | Security | High | Minimise intake; formalise handling |
| 7 | No observability — failures are invisible | Technical | Medium | Add Sentry when traffic exists |
| 8 | No CI enforcement of gates | Technical | Medium | Add GitHub Actions |
| 9 | Supabase is a total SPOF | Scalability | Medium | Accepted at this stage |
| 10 | Services model ceilings at CA throughput | Scalability | Medium | Structural at ~50 customers, not now |
| 11 | Missing privacy policy / terms | Legal | Medium | Add before real volume |
| 12 | Tax logic could be wrong and is unaudited by a professional | Product | High | Estimate disclaimer everywhere; CA review needed |

---

## Open Questions

Genuine uncertainties only.

1. **Will anyone pay ₹2,000?** Never tested on a single human. Everything downstream depends on it.
2. **Who is the CA?** No name, no terms, no agreement. `[U]`
3. **Is the tax logic correct?** Written from research, never reviewed by a qualified professional.
4. **What is the right Layer 2 price?** ₹20K/yr misfits a ₹25L freelancer. Unmodelled. `[U]`
5. **Does the unserved wedge have volume?** Backfill and multi-rail are uncontested in search partly
   because few people search them.
6. **Rails: partner or competitor?** Research launched, never completed. `[U]`
7. **Does the brand survive Layer 2?** "Creator taxes, handled" is now narrower than the strategy.
8. **Is a services business acceptable?** Phase 0 does not scale like software. Ceiling unaddressed.

---

## Missing Documentation

| Gap | Priority | Why |
|---|---|---|
| `/privacy` and `/terms` pages | **High** | Both 404. Financial product handling PII. |
| CA partnership agreement | **High** | Delivery depends on an undefined relationship |
| Tax-logic provenance | **High** | No document cites which rule each calculation implements |
| API/action reference | Medium | 8 server actions, none documented |
| Runbook | Medium | No procedure for "audit is down" or "user reports wrong figure" |
| CI configuration | Medium | Gates exist but are unenforced |
| Data-retention policy | Medium | Financial records with no stated retention |
| Onboarding README | Low | `README.md` exists; freshness unverified `[U]` |
| ADR directory | Low | `DECISIONS.md` is good but flat and chronological |

---

## AI Collaboration Guide

Recommendations from what actually worked building this project, not vendor preference. All model
choices are `[I]`.

| Category | Preferred | Why | Input format | Expected output | Review checklist |
|---|---|---|---|---|---|
| **Architecture** | Claude Opus (extended thinking) | Holds whole-system constraints; challenges premises | PRD + current structure + constraint | Options with trade-offs, one recommendation | Does it respect RLS? Reversible? |
| **Coding** | Claude Code (Sonnet/Opus) | Repo access, runs tests, verifies | Task + file paths + acceptance criteria | Diff + passing tests | typecheck, lint, tests, no `any` |
| **Debugging** | Claude Code | Reads logs, reproduces, verifies fix | Error + repro + expected | Root cause + minimal fix | Verified live, not asserted |
| **Research** | Claude with web search, or Perplexity | Citations matter more than prose | Question + what would change the answer | Sourced findings, uncertainty flagged | Every claim has a URL |
| **Writing (outreach)** | Claude with explicit anti-AI-tell rules | Default LLM prose is detectable | Recipient context + one real detail | Short, no em-dashes, no "Here's the thing" | Would a human write this? |
| **Marketing strategy** | Claude Opus, instructed to be blunt | Sycophancy is the failure mode | Real numbers including bad ones | Ranked, with a stop-doing list | Did it tell me something I didn't want to hear? |
| **Design** | Claude + a design skill | Needs a system, not vibes | Tokens + reference direction | Component code using existing tokens | Uses `--raha-*`? Both themes? |
| **Business/finance** | Claude Opus | Order-of-magnitude modelling | Real numbers, honest baselines | Ranges, not false precision | Are assumptions stated? |
| **Legal/tax** | **None — use a professional** | Highest-stakes area. Do not ship model output as advice. | — | — | Was a qualified human involved? |
| **Planning** | Claude Opus + gstack `/plan-ceo-review` | Structured challenge beats free-form | Current plan + evidence | Scope decision with rationale | Did it cut anything? |
| **Testing** | Claude Code | Runs the suite | Module + edge cases | Tests that fail before the fix | Do they fail without the fix? |
| **Deployment** | Claude Code | Verifies against live URLs | Target + verification command | Deploy + curl proof | Did it check production, or assume? |
| **Automation** | Claude Code + subagents | Parallel research | Precise brief + source rules | Report with citations | Sources checked? Invented contacts? |

**Three rules learned the hard way in this project:**
1. **Verify deployment, don't assume it.** Work sat committed on a branch for a day while production
   served broken code. Always `curl` the live URL.
2. **Demand sources.** A research agent produced 30 leads; the useful ones were the ones with URLs.
3. **Instruct against flattery explicitly.** The blunt GTM review found the pricing-parity problem
   that four polite analyses had missed.

---

## Knowledge Graph

```
                        ┌──────────────────┐
                        │  raha_prd.md     │  ground truth
                        └────────┬─────────┘
                                 │ superseded in parts by
                    ┌────────────▼─────────────┐
                    │       STATE.md           │  current truth (Layer 2)
                    └──┬─────────┬──────────┬──┘
           informed by │         │          │ drives
       ┌───────────────▼──┐  ┌───▼──────┐ ┌─▼────────────────┐
       │ GTM_REVIEW.md    │  │ WEDGE_   │ │ SALES_PLAYBOOK   │
       │ (CA parity)      │  │ REALITY  │ │        │         │
       └──────────────────┘  │ _CHECK   │ │        ▼         │
                             └────┬─────┘ │ DIAGNOSTIC_      │
                                  │       │ DELIVERY (₹2k)   │
                     corrects     │       └──────────────────┘
                                  ▼
                        ┌──────────────────┐
                        │ all outreach     │  ← FIRC→FIRA fix pending
                        └──────────────────┘

  PRODUCT
  middleware.ts ──gate──▶ /app/* ──▶ actions/*.ts ──Zod──▶ lib/*.ts (pure, tested)
                                          │
                                          ▼
                              supabase/{server,admin}.ts
                                          │
                                          ▼
                            Postgres (RLS) + Storage (RLS)

  audit/page.tsx ──▶ audit-wizard ──▶ lib/audit/scoring.ts ──▶ audit_completions
                                                   │                (anonymous)
                                                   └──▶ audit_leads (opt-in, PII)
```

---

## Glossary

| Term | Meaning |
|---|---|
| **FIRC** | Foreign Inward Remittance Certificate. **Discontinued for exports in 2016**; survives only for FDI/FII. |
| **FIRA** | Foreign Inward Remittance Advice. The document that actually applies today. |
| **FIRS** | Foreign Inward Remittance Statement. Bank-specific variant of FIRA. |
| **LUT** | Letter of Undertaking. Filed annually on the GST portal; permits export without paying IGST upfront. Free. |
| **Zero-rated** | Taxed at 0% but **not exempt** — registration and compliance still apply. The distinction most people miss. |
| **Export of services** | Supply to a recipient outside India, paid in convertible foreign exchange. |
| **IGST / CGST / SGST** | Inter-state / central / state GST. Determined by supplier state vs place of supply. |
| **44ADA** | Presumptive taxation for professionals. Flagged in-product as "ask your CA", never computed. |
| **RLS** | Row Level Security. Postgres-enforced per-row access. Raha's entire authorisation model. |
| **eBRC** | Electronic Bank Realisation Certificate. Ties exports to realised proceeds. |
| **Layer 1/2/3** | Market ambition tiers: creators / all foreign-income earners / embedded infrastructure. |
| **Phase 0/1/2** | Product stages: concierge / MVP dashboard / automation. Gated on paying customers. |
| **Diagnostic** | The ₹2,000 written risk report. Explicitly not a filing or signed advice. |

---

## Decision Log

Reasons marked `[inferred]` were not recorded at the time.

| # | Decision | Reason | Trade-off | Impact |
|---|---|---|---|---|
| 1 | Standalone git repo | Matches existing nested-repo pattern `[D]` | Vault history split | Clean isolation |
| 2 | PRD is ground truth | Prevents relitigating scope `[D]` | Can ossify | Later reviews must argue explicitly |
| 3 | Estimate disclaimer on every figure | Founder is not a CA `[D]` | Weakens confidence of copy | Legal safety |
| 4 | No automated filing, ever | Licensing boundary `[D]` | Caps product ambition | Defines category |
| 5 | Bundled RBI FX table, no API | Removes external dependency `[D]` | Manual updates | `rate_source` makes it auditable |
| 6 | FIRC matching suggest-then-confirm | Never auto-confirm financial records `[D]` | More user effort | Correct default |
| 7 | `firc_matches` join table | One FIRC covers many entries `[D]` | Extra table | Enables partial allocation |
| 8 | Advance tax = new regime only | Conservative `[D]` | Incomplete for old-regime users | 44ADA deferred to CA |
| 9 | No in-product payments | Concierge phase; hard operating stop `[D]` | Manual collection | UPI instead |
| 10 | Landing built inside Next app | One deploy, no later port `[D]` | Couples marketing to app | Correct |
| 11 | No hand-rolled rate limiting | In-memory throttles are theatre on serverless `[D]` | Exposed until Vercel Firewall | Honest |
| 12 | E2E uses real magic-link flow | No test backdoors in app code `[D]` | Needs service-role key | Strong |
| 13 | RLS on every table | Security model is the database `[inferred]` | Policy complexity | Best decision in the codebase |
| 14 | Store `rate_used` + `rate_source` | Auditability `[inferred]` | Extra columns | Every INR figure traceable |
| 15 | Magic link via URL fragment | Mail scanners were burning one-time tokens `[D]` | Needs client JS + template change | Fixed a total auth failure |
| 16 | Audit report before email gate | Site promised "no signup" `[D]` | Fewer emails captured | Honours the promise |
| 17 | Cut agency wedge as primary GTM | 23 emails → 0 replies `[D]` | Loses aggregator leverage | Refocus on acute pain |
| 18 | Commit to Layer 2 | Layer 1 caps ~₹45 Cr, below ambition `[D]` | Broader, less focused audience | Wedge stays narrow |
| 19 | Skip SEO | 12 funded competitors own the SERP `[D]` | Forgoes compounding channel | Honest |
| 20 | Diagnostic as unsigned risk report | Ships before a CA is partnered `[D]` | Lower perceived value | Unblocks first sale |

---

## Project Health Assessment

| Dimension | Score | Justification |
|---|---|---|
| Documentation completeness | **8/10** | 29 docs, 3,102 lines, decision log maintained. Missing: privacy/terms, tax provenance, runbook. |
| Architecture maturity | **7/10** | Clean RSC + Server Actions + RLS. No observability, no CI, no staging. |
| Technical debt | **8/10** | Low. Pure-logic seam is well kept, tests fast, no dead code found. |
| Code organisation | **9/10** | Exemplary. `lib/` pure and tested, 4 distinct Supabase clients, feature-grouped components. |
| Maintainability | **8/10** | Strong typing, Zod boundaries, 68 fast tests. Solo bus factor of 1. |
| Scalability (technical) | **7/10** | Fine to thousands. Supabase SPOF, no caching, PDF generation unbounded. |
| Scalability (business) | **4/10** | Concierge delivery ceilings at one CA's throughput. Structural at ~50 customers. |
| Security | **8/10** | RLS everywhere, key hygiene clean, headers set. Spreadsheet PII and missing legal pages pull it down. |
| Commercial validation | **2/10** | Zero revenue, zero customers, one reply from 28 sends, ₹2,000 gate never tested. |
| **Overall** | **6.5/10** | **An unusually well-engineered product attached to an unvalidated business.** The engineering is ahead of the evidence — which is the actual risk. |

---

## Recommended Next Steps

**Immediate (today, ~30 min)**
1. Apply migration `0005_audit_completions.sql` — analytics are dead until then
2. Change the Supabase magic-link template `?token_hash=` → `#token_hash=` — the auth fix is inert
3. Request a magic link and click it, end to end
4. Send the five acute-pain Reddit DMs `[D ACUTE_PAIN_TARGETS.md]`

**Short-term (this week)**
5. Ask one human for ₹2,000. Nothing else on this list matters more.
6. Correct FIRC → FIRA across site copy, audit questions, and all outreach templates
7. Add rail qualification ("how are you paid?") to intake and audit — it decides whether a problem exists
8. Add `/privacy` and `/terms`

**Medium-term (30 days — the PRD gate)**
9. **3 paying customers, or pivot** `[D PRD §6]`
10. Partner a CA with written terms
11. Have a qualified professional review the tax logic
12. Add CI enforcing typecheck + lint + test
13. Model Layer 2 pricing for sub-₹20L earners

**Long-term**
14. Phase 1 productisation (only after 3 customers)
15. Multi-rail reconciliation and historical backfill — the actual defensible wedge
16. Add observability before real traffic
17. Test the Layer 3 thesis: are rails partners or competitors?

---

## Appendices

### A. Key files

| Purpose | Path |
|---|---|
| Current status | [docs/STATE.md](docs/STATE.md) |
| Ground truth | [docs/raha_prd.md](docs/raha_prd.md) |
| Hardest strategic finding | [docs/outreach/GTM_REVIEW.md](docs/outreach/GTM_REVIEW.md) |
| Wedge correction | [docs/outreach/WEDGE_REALITY_CHECK.md](docs/outreach/WEDGE_REALITY_CHECK.md) |
| What we sell | [docs/outreach/DIAGNOSTIC_DELIVERY.md](docs/outreach/DIAGNOSTIC_DELIVERY.md) |
| Who to contact | [docs/outreach/ACUTE_PAIN_TARGETS.md](docs/outreach/ACUTE_PAIN_TARGETS.md) |
| Deploy + manual steps | [docs/DEPLOY.md](docs/DEPLOY.md) |
| Decision history | [DECISIONS.md](DECISIONS.md) |
| Engineering rules | [CLAUDE.md](CLAUDE.md) |

### B. Commands

```bash
npm run dev        # Turbopack dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm test           # vitest run — 68 tests, ~250ms
npm run seed       # demo data (needs SUPABASE_SERVICE_ROLE_KEY)
npx playwright test
vercel --prod --yes
```

### C. Developer onboarding

1. Read [docs/STATE.md](docs/STATE.md) — five minutes, current reality
2. Read [CLAUDE.md](CLAUDE.md) — the non-negotiable rules
3. `npm install`, copy `.env.example` → `.env.local`, fill Supabase keys
4. Run migrations `0001`–`0005` in order in the Supabase SQL editor
5. `npm run seed && npm run dev`
6. Read `src/lib/` first — the business logic lives there, and it is all tested

### D. Live surfaces

Production `https://raha.software` · Audit `https://raha.software/audit` ·
Repo `https://github.com/Dhanush9999279/raha`

---

*Generated 2026-07-28 at commit `b289f77`. Regenerate after any significant strategic or
architectural change — this document is only useful while it is true.*
