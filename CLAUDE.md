# Raha — creator taxes, handled

Tax/GST compliance platform for Indian creators (₹20L–₹2Cr). PRD at `docs/raha_prd.md` is ground truth.

## Stack (Stage 2+)
- Next.js 15 + TypeScript + Tailwind + shadcn/ui
- Supabase: auth, Postgres (RLS on every table), storage
- Zod validation at every boundary; Vercel deploy

## Commands (once scaffolded)
- dev: `npm run dev` · build: `npm run build` · test: `npm test` · lint: `npm run lint`

## Hard rules
- Every computed tax figure carries: "estimate — verify with your CA before filing."
- No automated-filing claims anywhere (PRD §10).
- Phase 1 P0 scope only. No API imports, no auto-filing, no agency dashboard (Phase 2 — out).
- RLS on every table; no service keys client-side.
- Conventional commits; commit after every completed step.

## Key docs
- `docs/raha_prd.md` — PRD (ground truth)
- `docs/PLAN.md` · `docs/SPEC.md` · `docs/TASKS.md`
- `DECISIONS.md` — autonomous decision log
- `CAPABILITIES.md` — connector status
