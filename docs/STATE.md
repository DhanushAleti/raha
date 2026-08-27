# Raha — state as of 2026-07-28

> **⚠️ A month stale as of 2026-08-27. Read [`NOW.md`](NOW.md) first.**
> Superseded below: the "gated behind 3 paying customers before Phase 1 build starts" framing
> (Phase 1 shipped in July and is live), the ₹20,000/year seat as current pricing (off the front
> door — it returns in April at LUT-renewal time), and the "Current priority order" list
> (replaced by the 7-day queue in `research/decision.md`).
> The wedge, the Layer-2 decision, and the hard rules on voice and disclaimers all still hold.

One page, kept current. Update this after every significant work session — replace, don't append.
This is the single file to upload as Project knowledge; everything else is detail behind it.

## What Raha is

Compliance for **Indians earning foreign currency** — creators, freelancers, consultants, indie SaaS
founders. Wedge: foreign income is a zero-rated GST export (0%) **only** with a bank-issued FIRC and
a filed LUT. Without them it can be assessed as domestic income at 18%, plus penalty, plus 18% annual
interest. Live audit tool at raha.software/audit — 8 questions, no signup, red/amber/green verdict.

**Target layer (decided 2026-07-28): Layer 2.**

| Layer | Who | Rough TAM | Ceiling |
|---|---|---|---|
| 1 — creators only | ~100K | ₹150–450 Cr | ₹15–45 Cr ARR |
| **2 — all foreign-income earners** | **2–3M** | **₹1,000–3,000 Cr** | **₹150–300 Cr ARR** |
| 3 — embedded compliance infra | every cross-border rail | India takes $100B+ service exports | ₹1,000 Cr+ |

Layer 1 was chosen against because the TAM ceiling caps it two orders of magnitude below the stated
ambition. Layer 3 is the long thesis (rails move money but may not own compliance) and is being
tested by research, not committed to.

**What Layer 2 changes — and what it does not.**

Changes: who to contact (freelancer and indie-hacker communities, not talent agencies); the
language in outreach ("foreign income", not "creator"); pricing needs a lower tier for smaller
earners, since ₹20K/yr does not fit someone billing ₹25L.

Does NOT change: the wedge stays **narrow** — FIRC and foreign-income compliance specifically, never
general tax filing. Broadening to "all tax for everyone" is verbatim TaxTap's positioning (30+
professions, 10K+ users) and walking into it with no brand loses. Wide audience, narrow problem.

Does NOT change yet: the brand. "Raha — creator taxes, handled" becomes limiting at Layer 2, but a
rebrand before 3 paying customers is a distraction. Revisit after.

Price: ₹2,000 paid diagnostic (the real entry point), ₹20,000/year founding seat.

Phase 0 delivery is manual: spreadsheets + AI + a partnered CA. Not automated software yet — gated
behind 3 paying customers before Phase 1 build starts.

## Where things actually stand

**Revenue: ₹0. Customers: 0. Calls booked: 0.** Say this plainly to anyone, including future me.

**Outreach sent:** 28 cold emails since 23 Jul (23 agencies, 5 creators), zero bounces, **one reply**
— a UAE-resident creator, correctly out of scope. No audit link was included in any of them
(deliberate deliverability call — see GTM_REVIEW.md for why this means 0/28 tested almost nothing
about message-market fit).

**Product:** live, deployed, tests passing. Fixed this week: the magic-link login was silently
broken (Gmail's link-scanner burned the one-time token before the user could click it — fixed by
moving verification client-side, reading the token from the URL fragment); the audit funnel was
walling the report behind a required email against the site's own "no signup" promise (fixed —
report shows first, email ask is optional and comes after); anonymous audit completions are now
recorded, so completions can finally be counted, not just email captures.

## The open question that matters more than any lead list

A CA on r/IndiaTax sells this exact scope (ITR, GST, LUT, FIRC) for this exact price (₹20,000/yr),
publicly, discoverable in five minutes. Since Phase 0 *is* a partnered CA, Raha currently offers
strictly more risk at the same price. Full reasoning and the way out: **GTM_REVIEW.md §1**.
Short version: stop selling to people whose CA already works: target people whose CA has already
missed the FIRC. Lead with ₹2,000, not ₹20,000, until something is proven with a real human.

## The one test never run

"If nobody will pay ₹2,000, nobody was ever going to pay ₹20,000." — SALES_PLAYBOOK.md.
Not one person has been asked yet. Everything else is downstream of this.

## Current priority order

1. Warm intros (untapped by avoidance, not absence — the highest-converting channel available)
2. Answer live r/IndiaTax threads (warmest cold audience: self-selected, already mid-problem)
3. Segment 2 leads — indie SaaS/newsletter founders, researched, not yet contacted
   (CREATOR_LEADS_RESEARCHED.md — Abhinav Upadhyay is the standout)
4. Day-3/8 follow-ups on the existing 28 (FOLLOWUPS.md)
5. Monday call sheet for the agency batch (CALL_SHEET.md)

## Hard rules — apply to every draft, every session

- Every tax figure carries "estimate — verify with your CA before filing." Never claim automated
  filing.
- Outreach voice: short sentences, contractions, no em-dashes, no "Here's the thing" openers, ask
  about the prospect's *past* ("what do you pay your CA now") never their hypothetical future
  ("would you pay X").
- Never guess an email address or phone number — a bounce costs sender reputation across everything
  else in flight.
- Verify residency before contacting any creator. "Indian" ≠ "India-resident" — burned once on
  C4ETech (UAE), caught 8 more before sending.
- Don't sugarcoat. Real problem first, revenue second.

## Where the detail lives (repo: docs/ and docs/outreach/)

`raha_prd.md` · `SALES_PLAYBOOK.md` · `COMPETITIVE_BRIEF.md` · `GTM_REVIEW.md` · `CALL_SHEET.md` ·
`CREATOR_LEADS_RESEARCHED.md` · `FOLLOWUPS.md` · `CONTENT_LAUNCH.md` (Reddit) · `SEND_LOG.md`
