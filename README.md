# Raha — creator taxes, handled

Tax & GST compliance platform for Indian creators earning ₹20L–₹2Cr. Income tracking, FIRC matching (export-of-service proof), GST-compliant invoicing, live tax-liability estimates, and a document vault.

> Every figure Raha computes is an **estimate — verify with your CA before filing**. Raha does not file returns; filings are executed by qualified Chartered Accountants.

## Stack

Next.js 15 (App Router, Turbopack) · TypeScript · Tailwind 4 + shadcn/ui · Supabase (auth, Postgres + RLS, storage) · Zod · Vitest · Vercel.

## Local setup

```bash
git clone <repo> raha && cd raha
npm install
cp .env.example .env.local   # fill in Supabase project keys
# Apply migrations: paste supabase/migrations/*.sql into the Supabase SQL editor
# (or `supabase db push` if you use the Supabase CLI)
npm run seed                 # optional: demo creator data (needs SUPABASE_SERVICE_ROLE_KEY)
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | dev server (Turbopack) |
| `npm run build` | production build |
| `npm test` | unit tests (all tax/FX/matching math) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Architecture (short)

- `src/app/` — routes. Public: `/` (landing), `/audit` (lead-magnet scanner), `/login`. Protected: `/app/*` (dashboard, income, FIRC, invoices, vault).
- `src/lib/` — pure logic modules, all unit-tested, no I/O: `fx/` (RBI reference-rate conversion), `income/` (categorization, CSV), `firc/` (matching), `gst/` (invoice math), `tax/` (advance-tax + GST liability estimates), `format/` (INR lakh/crore + amount-in-words), `audit/` (risk scoring).
- `src/lib/supabase/` — server/client Supabase helpers (`@supabase/ssr`).
- `supabase/migrations/` — schema, RLS policies, storage policies. RLS on **every** table.
- Docs: `docs/raha_prd.md` (ground truth) · `docs/SPEC.md` · `docs/PLAN.md` · `docs/TASKS.md` · `DECISIONS.md`.

## Deploy

Vercel. Set the env vars from `.env.example` (service-role key server-side only). Apply migrations to the production Supabase project before first deploy.
