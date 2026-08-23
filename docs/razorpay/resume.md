# Aleti Dhanush

Chennai / Hyderabad, India · aletidhanush9999@gmail.com · github.com/DhanushAleti

**I build financial software. Shipped, in production, with the tax math unit-tested.**

---

## Shipped

### Raha — GST & tax compliance for Indian creators earning foreign income
**Solo founder and sole engineer · live at [raha.software](https://raha.software) · Feb–Aug 2026**

Indian freelancers and creators who invoice foreign clients must prove each payment is an
*export of service* to claim zero-rated GST. Miss the proof and the revenue is reclassified as
domestic — 18% GST on money already spent. Raha closes that loop.

- **9,200 lines of TypeScript**, 67 commits, in production on Vercel + Supabase (Mumbai region,
  for financial data localisation).
- **Every rupee-affecting calculation is a pure, unit-tested function with no I/O** — RBI
  reference-rate FX conversion, FIRA↔income reconciliation, GST invoice math, advance-tax and
  GST-liability estimation, export-status classification. Money math does not get to be
  probabilistic.
- **FIRA reconciliation engine**: matches foreign bank credits to income entries on a −7/+45 day
  window with ±2% amount tolerance (bank charges and forex spreads move the INR figure), handles
  partial and split allocations, and refuses to assert a match the user has not confirmed.
- **Row-level security on every table**, storage policies for the document vault, Zod validation
  at every boundary, service-role keys server-side only.
- Next.js 15 (App Router) · TypeScript · Supabase (Postgres + RLS + storage) · Zod · Vitest ·
  Playwright · Tailwind + shadcn/ui.
- Wrote the domain research myself — LUT gating, purpose codes, Sec 2(6) IGST export treatment,
  the 2026 creator profession code — and sourced it from primary tax guidance, not vibes.

### NEXUS — provenance-aware persistent memory for AI systems
**Solo · research project · Python · 2026**

Testing whether a structured, provenance-tracked world model beats conversation history and
naive vector retrieval at long-horizon task continuation.

- Memory records, relationship graph, repositories and lexical retrieval implemented and tested.
- **`mypy --strict` clean across the codebase.** Unbuilt subsystems are explicitly reserved as
  empty packages rather than shipped half-done — the status table in the README says exactly what
  is and is not implemented.

---

## How I work with AI

I use AI as an engineering team, not autocomplete — spec, plan, implement, review, ship, with
skill libraries and agent harnesses driving the loop. Both projects above were built this way.

The judgment that matters is knowing where **not** to put a model. In Raha, no LLM touches a
number that becomes a tax liability. Language models parse messy bank narrations and extract PDF
fields; deterministic, tested functions decide what is owed.

---

## Education

**Indian Institute of Technology Madras** — B.Tech, Chemical Engineering · expected Aug 2028
Relevant coursework: Computational Programming & Process Simulation, Computational Techniques,
Statistical Design and Analysis of Experiments, Innovation & Entrepreneurship.

---

## Stack

TypeScript · Python · Next.js · React · Postgres · Supabase · Zod · Vitest · Playwright ·
Tailwind · Git · Vercel · LLM tooling and agent harnesses
