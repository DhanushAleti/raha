# TASKS.md — lean build-ordered task list

Commit after each task. `[G]` = quality gate blocks progression. TDD required on all `lib/` tax-math modules.

## Stage 1 — revenue assets
- [x] T1.1 Landing page `/` per SPEC §1 (static-fast, waitlist → Supabase, WhatsApp CTA)
- [x] T1.2 Audit Check `/audit` per SPEC §2 (scoring TDD'd, email gate → `audit_leads`)
- [x] T1.3 (desktop+mobile verified; deep loop folded into Stage 3) Design-review loop on both; fix findings
- [x] T1.4 Outreach kit → `docs/outreach/` (5 agency emails, 3 DM scripts, discovery-call script, closing doc)
- [x] T1.5 Content → `docs/content/` (5 X-threads, 3 short-video scripts)
- [x] T1.6 Gmail drafts for the 5 agency emails (+ follow-up sequences) — drafts only

## Stage 2 — MVP
- [x] T2.1 Scaffold: Next.js 15 + TS + Tailwind + shadcn/ui, ESLint, CI, `.env.example`, README
- [x] T2.2 Supabase schema + migrations + RLS + seed (SPEC §8 tables, demo creator)
- [x] T2.3 Auth: magic link + Google OAuth, protected routes, middleware
- [x] T2.4 Income tracker: TDD `lib/fx`, `lib/income` → manual entry → CSV upload → list/filters
- [x] T2.5 FIRC tracker: TDD `lib/firc/match` → log FIRCs → matching UX → status chips + exposure card
- [x] T2.6 Invoice generator: TDD `lib/gst/calc`, `lib/invoice/number`, `lib/format/inr` → form → PDF → list
- [x] T2.7 Dashboard: TDD `lib/tax/advance`, `lib/tax/gst-liability` → set-aside counter → due dates → breakdowns
- [x] T2.8 Document vault: storage bucket + policies → upload/list/download/delete
- [x] T2.9 Empty/loading/error states everywhere; 360px mobile pass

## Stage 3 — gates (in order)
- [x] T3.1 [G] /code-review high → fix all
- [x] T3.2 [G] security review + /cso: RLS proof per table, no client-side keys, input validation, rate limiting, storage rules → fix all
- [x] T3.3 [G] database review (schema, indexes, query patterns) → fix
- [ ] T3.4 [G] Browser /qa on the signed-in core loop — BLOCKED on Supabase credentials [G] Browser /qa: signup → income → CSV → FIRC match → invoice → liability; loop until clean
- [x] T3.5 [G] silent-failure hunt → fix
- [x] T3.6 [G] /health → resolve red
- [~] T3.7 [G] Playwright e2e written (e2e/core-loop.spec.ts) — run blocked on Supabase credentials [G] Playwright e2e on core loop
- [x] T3.8 [G] a11y pass on landing + dashboard

## Stage 4 — ship
- [ ] T4.1 Vercel deploy — BLOCKED on credentials (docs/DEPLOY.md) Vercel deploy (landing + audit + app) — needs deploy credentials (STOP point)
- [x] T4.2 Release docs + creator how-to + dev reference
- [ ] T4.3 Fresh-clone verification — after credentials Fresh-clone verification (actually run it; loop until green)
- [x] T4.4 Context saved (memory + FINAL.md) Context save
- [x] T4.5 FINAL.md (live URLs, not-built list, next 7 actions)
- [x] T4.6 Connectors: Notion HQ, ClickUp "Raha Launch", Calendar blocks + statutory dates, Drive handoff folder
