# The answer set, program-agnostic

**Written 2026-08-30.** Source material is `docs/nirmaan/APPLICATION.md`, restripped of everything
that was specific to a student pre-incubator (the ₹2,00,000 ask, the "no marketing spend" rule from
p.13, the registration-is-none eligibility answer, the campus framing). What is left is what every
incubator form asks for, in the order they ask it.

**How to use this.** Application forms differ in field names, not in questions. Paste the block whose
question matches, then trim from the bottom. **Every block's first two sentences carry it alone**, so
a 300-character limit and a 3,000-character limit both work without rewriting.

**Two rules that do not bend, from the Nirmaan pass and worth keeping:** nothing is claimed that is
not true (revenue is ₹0 and it says so), and no figure appears anywhere without
*"estimate, verify with your CA before filing."*

---

## 1 · One line (25 words)

> Raha proves that money Indians earn from foreign clients is a zero-rated GST export, and produces
> the paperwork that makes it 0% instead of 18%, on payment rails that cannot produce it themselves.

## 2 · The problem (120 words)

An Indian billing a foreign client is, in law, an exporter. Export of services is zero-rated under
Section 2(6) of the IGST Act, so 0% GST, but only if two things exist: a **FIRA** from the bank
proving the money arrived from abroad in convertible foreign exchange, and a **Letter of Undertaking**
filed before that financial year's first export invoice.

Miss either and the same income can be assessed as a domestic supply at **18% IGST, plus 18% annual
interest, plus penalty**, on money earned and spent in a previous year.

Two things make it bite harder than it should. Physical FIRCs stopped existing in 2016 for export
remittances (RBI A.P. (DIR Series) Circular 74), yet "FIRC" is still the word used by tax advisors,
platform help pages and GST officers, so anyone who asks their bank for one is turned away. And the
LUT resets every financial year, so solving it once does not solve it.

## 3 · The insight (the thing nobody else has written down)

Who has this problem is **not a property of the person. It is a property of the payment rail.**

| Rail | Position |
|---|---|
| Skydo, Karbon, Winvesta, Payoneer | FIRA issued automatically, free. **No problem to solve.** |
| **Wise, PayPal, Stripe** | Convert offshore, so money lands as a domestic transfer. The Indian bank **legally cannot** issue a FIRA: no foreign remittance on its books. |
| **Direct bank transfer** (AdSense into SBI, a client wiring you) | No automation either way. Nothing exists unless requested, per remittance. |

Plus the case no rail solves by construction: **anyone with two or three prior years to backfill.**
Every platform works forward from the day you joined.

Our first move in any conversation is to ask which rail, and to **tell the first group they already
have what they need, free**. That disqualification is the reason the other two believe us.

## 4 · The solution, live today

**raha.software**, deployed and in production.

- **Free 9-question audit**, no signup. Red / amber / green verdict, risk score, named findings,
  including the Wise/PayPal/Stripe finding almost nobody has been told.
- **Foreign Income Evidence Check, ₹2,000.** Every foreign credit in a period reconciled line by line
  against the document behind it (FIRA, NOC, bank advice, or nothing), with a written statement of
  which credits stand up as zero-rated exports, the rupee exposure on the ones that do not, and the
  LUT position. 48 hours. Money back if it tells them nothing their CA has not.
- Delivered manually today, to a documented SOP, in 90 to 110 minutes. Next.js, Supabase with RLS on
  every table, 68 unit tests, Playwright E2E.

**What we deliberately do not claim:** we do not file returns, we are not a CA, and every figure
carries the estimate disclaimer. That line is in the product, not just the pitch.

## 5 · Traction (state it exactly like this)

- **Revenue ₹0. Paying customers 0.** The paid offer went live 27 Aug 2026.
- Product live and deployed; free audit works end to end, desktop and mobile.
- **28 outreach conversations** with Indian creators and freelancers, Jun to Aug 2026. The primary
  data behind the rail finding.
- **Original research:** *FIRC to FIRA: Documentary Evidence Infrastructure and the Uneven Compliance
  Burden on India's Independent Digital Exporters*. The three-tier stratification above is, as far as
  we can find, documented nowhere else.
- **A queue, not a lead list:** live public threads where someone asked, in public, to hire somebody
  for exactly this scope, before they had heard of us.
- Shortlisted and pitched at the VentureArch IITM idea sprint, 22 Aug 2026 (Team A38).
- Pre-incubation application submitted to IIT Madras Nirmaan (Pratham), 29 Aug 2026.

> We would rather be shortlisted on an honest zero than a decorated one.

**Update this block the day the first ₹2,000 lands.** It is the single line that changes the reading
of everything above it.

## 6 · Market

2 to 3 million Indians earn in foreign currency: freelancers, consultants, indie software founders,
agencies, creators. India exports over $100 billion of services a year. At a ₹2,000 entry diagnostic
and a ₹20,000 annual compliance seat, the reachable market is on the order of ₹1,000 to 3,000 crore.
We are not attacking it broadly: **wide audience, one narrow problem.**

## 7 · Business model, and why it repeats

Entry product is the **₹2,000 evidence check**, priced deliberately below the line a chartered
accountant can profitably serve. At ₹20,000 we are compared to a licensed CA who does more and
carries liability, and we lose that comparison. At ₹2,000 there is no comparison set, because no CA
sells a forensic reconciliation at a price that is economic at their hourly rate. **The price is the
positioning.**

Revenue repeats because the statute makes it repeat, not because we designed a subscription:

| Obligation | Cadence |
|---|---|
| **LUT** | Re-filed **every financial year**, before that year's first export invoice |
| **FIRA** | **Per payment** |
| FEMA realisation | Per transaction, 9-month window |

So the ₹20,000 annual compliance seat is not the front door. **It is what April is.** A customer who
paid ₹2,000 in September has a hard statutory deadline in April, and the renewal is the product's own
calendar rather than a billing trick.

Third layer, later and unproven: cross-border payment rails move the money but do not own the
compliance record. Embedded evidence infrastructure is the long thesis. We are testing it with
research, not committing to it.

## 8 · Why now

- The Income Tax Act 2025 introduced profession code 16021 for digital content professionals. This
  population is being formalised.
- GST scrutiny of foreign-income earners is documented as intensifying through FY2026-27.
- Every purpose-built payment rail launched since 2022 solves this **forward only**, which grows the
  backfill population every year rather than shrinking it.

## 9 · Competition

| Who | Why we are not competing head-on |
|---|---|
| A chartered accountant | Does more, carries liability, costs about ₹20,000/yr. We are not replacing them: the deliverable is **handed to** whoever files. |
| Skydo, Karbon, Payoneer | Solve issuance on their own rail, forward only, free. We send those users away and say so. |
| Broad tax platforms (TaxTap and similar) | 30+ professions, general filing. Walking into that with no brand loses. |

The defensible space is what none of them covers: **evidence reconciliation across rails, and
backwards in time.**

## 10 · Team, and the gap, named

Solo founder: **Dhanush Aleti**, IIT Madras. Built and deployed the product, ran the 28 outreach
conversations, wrote the research.

**The honest gap:** no chartered accountant on the team and no co-founder. This was said to us
directly at the 22 Aug pitch and we agree with it. A CA's review of the computation logic is the
first thing any program support would buy.

## 11 · Risks we are not hiding

- **Distribution is unsolved.** The product works, nobody has paid yet. That is the whole risk.
- **Solo**, and a student.
- **A CA can undercut us** by bundling this into a ₹20,000 annual engagement. The answer is price and
  proof, not features, which is exactly why the entry point is ₹2,000.
- **Rails may absorb the wedge forward.** They cannot absorb it backwards, and the backfill population
  grows every year.

## 12 · Milestones (rewrite the dates per program, keep the shape)

| By | Milestone |
|---|---|
| Month 1 | First 3 paying Evidence Checks delivered; CA review of the computation logic commissioned |
| Month 2 | Statement to ledger processing live; delivery under 45 minutes |
| Month 3 | 10 paying customers; rail-mix data from real intake, not from a survey |
| Month 4 | CA engaged on revenue share; disclaimer language legally reviewed |
| Month 5 | First annual seats sold into the April LUT deadline |
| Month 6 | 25 customers, or a documented reason the ladder does not hold. Either is a result. |

## 13 · Use of funds (adapt the total, keep the lines)

Every line is product correctness or product delivery, and each is invoiceable.

1. **CA review of the tax and GST computation logic.** Raha outputs rupee figures a person may act
   on. A practising CA reviews the audit scoring, the export-evidence rules, the reconciliation
   methodology, and signs off on the disclaimer language. Highest-value spend available.
2. **Statement and document processing.** Turning bank statements and remittance advices into a
   structured ledger automatically is the difference between a service and a product.
3. **Product infrastructure.** Production tiers, backups, isolation, for a product that holds
   financial records.
4. **Legal review of scope and disclaimer language.** We tell every user we do not file returns. For
   a compliance product, that sentence has to actually hold.
5. **Customer visits for the first diagnostics.** The intake is where the product is still wrong.

**Note:** some programs exclude marketing and promotional spend outright (Nirmaan p.13 does). Nothing
above is marketing, which is deliberate and reusable.

---

## Per-program deltas

Same answers, different emphasis. Change these things and nothing else.

| Program | Lead with | Add | Cut |
|---|---|---|---|
| **NSRCEL Launchpad** | Problem clarity through validation (their eligibility wording): 28 conversations, the rail stratification, the public queue | Answer the mentor-panel monetization question in the written application, before it is asked: LUT re-files annually, FIRA is per payment | Campus and student framing. They are sector-agnostic and stage-focused. |
| **NSRCEL Fintech CoE** | **RegTech**, in their words: compliance infrastructure for cross-border service exporters | Regulatory-sandbox relevance, bank and AA-stack partnership angle, the embedded-evidence third layer | The ₹2,000 manual-service framing. This room reads stage, and the stage bar is revenue. |
| **T-Hub Lab32 / T-Angel** | Market readiness and the go-to-market wedge, not the research | Rail-by-rail GTM: who you disqualify and why that converts the rest | Anything that reads pre-product. Lab32 is about readiness to sell. |
| **CIIE.CO Bharat Inclusion** | Financial inclusion: the compliance burden falls hardest on the smallest exporters, who cannot afford a ₹20,000 CA retainer | Who gets hurt at the bottom of the market, in numbers | Enterprise and scale language. |
| **IITMIC (via Nirmaan Akshar)** | Progress against Pratham milestones, not a new pitch | What the ₹2L actually bought and what changed because of it | The whole pitch deck. This is a review, not an application. |

---

## Before you submit anything

- [ ] Revenue stated as the true number. Do not soften it.
- [ ] No claim that Raha files returns or gives tax advice.
- [ ] Every rupee figure carries "estimate, verify with your CA before filing."
- [ ] Registration status stated accurately as of that day (see `docs/incubators/PLAN.md` §2).
- [ ] Link included: **https://raha.software**, and the free audit at `/audit` works, so let them try it.
- [ ] Traction block updated if anything has been paid since it was last edited.
- [ ] Draft saved, then submitted. Saving is not submitting.
