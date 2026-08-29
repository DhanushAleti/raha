# Nirmaan Pratham — application answers, paste-ready

**Submit today, Sat 29 Aug, before EOD.** The portal says 31 Aug; Om Bora said on 28 Aug at 18:38
that the 31st was set only because of the technical fault and *"we will close tomorrow, so please
ensure that you complete before tomorrow eod."* Tomorrow, from that message, is today. **Do not
gamble on the portal date.**

Answers are written to be pasted. Trim to the field's character limit from the bottom up — every
answer's first two sentences carry it alone.

**Two rules applied throughout**, both from `GUIDEBOOK_FINDINGS.md`: nothing is claimed that is not
true (revenue is ₹0 and it says so), and **no funds are requested for marketing or promotion**,
which p.13 excludes outright.

---

## The one-line version

> Raha proves that money Indians earn from foreign clients is a zero-rated GST export — the
> paperwork that makes it 0% instead of 18%, on whatever payment route it arrived by, including the
> routes that cannot produce that paperwork at all.

---

## Problem

An Indian who bills a foreign client is, in law, an exporter. Export of services is zero-rated under
Section 2(6) of the IGST Act — 0% GST — but only if two things exist: a **FIRA** from the bank
proving the money arrived from abroad in convertible foreign exchange, and a **Letter of Undertaking
(LUT)** filed before that year's first export invoice.

Miss either and the same income can be assessed as a domestic supply at **18% IGST, plus interest at
18% a year, plus penalty** — on money earned and spent in a previous year.

Two things make this bite harder than it should:

1. **Physical FIRCs stopped existing in 2016** for export remittances (RBI A.P. (DIR Series)
   Circular 74). Banks now raise an IRM in EDPMS and issue a **FIRA**. Nine years on, "FIRC" is
   still the word used by tax advisors, by platform help pages, and — per our own outreach — by GST
   officers at LUT renewal. Someone who asks their bank for a FIRC is turned away and concludes the
   bank is being difficult.
2. **The LUT resets every financial year.** Solving it once does not solve it.

## Who has it, and who does not

We found the answer is not a property of the person. It is a property of the **payment rail**:

| Rail | Position |
|---|---|
| Skydo, Karbon, Winvesta, Payoneer | FIRA issued automatically, free. **No problem to solve.** |
| **Wise, PayPal, Stripe** | Convert offshore, so the money lands as a domestic transfer. The Indian bank **legally cannot** issue a FIRA — it has no foreign remittance on its books. |
| **Direct bank transfer** (AdSense into SBI, a client wiring you) | No automation either way. Nothing exists unless requested, per remittance. |

Plus the case no rail solves by construction: **anyone with two or three prior years to backfill.**
Every platform works forward from the day you joined.

Our first move in any conversation is to ask which rail, and to **tell the first group they already
have what they need, free.** That disqualification is the reason the other two believe us.

## Solution — what exists today, live

**raha.software**, deployed and in production.

- **Free 9-question audit.** No signup. Returns a red/amber/green verdict, a risk score, and named
  findings — including the Wise/PayPal/Stripe finding above, which almost no one has been told.
- **The Foreign Income Evidence Check, ₹2,000.** Every foreign credit in a period reconciled line by
  line against the document behind it — FIRA, NOC, bank advice, or nothing — with a written
  statement of which stand up as zero-rated exports, the rupee exposure on the ones that do not, and
  the LUT position. 48 hours. Money back if it tells them nothing their CA has not.
- Delivered manually today, to a documented SOP. Software, tests and a production build behind it.

**What we deliberately do not claim:** we do not file returns, we are not a CA, and every figure
carries *"estimate — verify with your CA before filing."* That line is in the product, not just the
pitch.

## Traction — stated honestly

- **Revenue ₹0. Paying customers 0.** The paid offer went live 27 Aug 2026.
- Product live and deployed; free audit working end to end on desktop and mobile.
- **28 outreach conversations** with Indian creators and freelancers, Jun–Aug 2026 — the primary
  data behind the rail finding.
- **Original research**: *FIRC to FIRA: Documentary Evidence Infrastructure and the Uneven
  Compliance Burden on India's Independent Digital Exporters* — the three-tier stratification above
  is, as far as we can find, not documented anywhere else.
- **A queue, not a lead list**: 15 live public threads where someone asked, in public, to hire
  somebody for exactly this scope — FIRA, LUT, GST on foreign income — before they had heard of us.
- Shortlisted and pitched at the VentureArch IITM idea sprint, 22 Aug 2026 (Team A38).

We would rather be shortlisted on an honest zero than a decorated one.

## Market

2–3 million Indians earn in foreign currency — freelancers, consultants, indie software founders,
agencies, creators. India exports over $100 billion of services a year. At a ₹2,000 entry
diagnostic and a ₹20,000 annual compliance seat, the reachable market is on the order of
₹1,000–3,000 crore. We are not attacking it broadly: **wide audience, one narrow problem.**

## Business model — how it makes money, and why it repeats

The entry product is the **₹2,000 evidence check**. It is priced deliberately below the line a
chartered accountant can profitably serve: at ₹20,000 we are compared to a licensed CA who does more
and carries liability, and we lose that comparison. At ₹2,000 there is no comparison set, because no
CA sells a forensic reconciliation at a price that is uneconomic at their hourly rate. **The price
is the positioning.**

Revenue repeats because **the statute makes it repeat, not because we designed a subscription**:

| Obligation | Cadence |
|---|---|
| **LUT** | Re-filed **every financial year**, before that year's first export invoice |
| **FIRA** | **Per payment** |
| FEMA realisation | Per transaction, 9-month window |

So the annual **₹20,000 compliance seat is not the front door — it is what April is.** A customer who
paid ₹2,000 in September has a hard statutory deadline in April, and the renewal is the product's
own calendar rather than a billing trick.

Third layer, later and unproven: cross-border payment rails move the money but do not own the
compliance record. Embedded evidence infrastructure is the long thesis. We are testing it with
research, not committing to it.

## Why now

- Income Tax Act 2025 introduced profession code 16021 for digital content professionals — this
  population is being formalised.
- GST scrutiny of foreign-income earners is documented as intensifying through FY2026-27.
- Every purpose-built payment rail launched since 2022 solves this **forward only**, which grows the
  backfill population every year rather than shrinking it.

## Competition

| Who | Why we are not competing head-on |
|---|---|
| A chartered accountant | Does more, carries liability, costs ~₹20,000/yr. We are not replacing them — the deliverable is **handed to** whoever files. |
| Skydo, Karbon, Payoneer | Solve issuance on their own rail, forward only, free. We send those users away and say so. |
| Broad tax platforms (TaxTap and similar) | 30+ professions, general filing. Walking into that with no brand loses. |

The defensible space is precisely what none of them covers: **evidence reconciliation across rails,
and backwards in time.**

## Team — and the gap, named

Solo founder: **Dhanush Aleti**, IIT Madras. Built and deployed the product; conducted the 28
outreach conversations and wrote the research.

**The honest gap:** no chartered accountant on the team and no co-founder. This was said to us
directly at the 22 Aug pitch, and we agree with it. It is the first thing Pratham would be used to
fix — see the funding request below, where a practising CA's review of the computation logic is line
item one.

---

## Why we need the funds — *the Part 5 answer*

**Total requested: ₹2,00,000. Nothing below is marketing or promotion**, which p.13 of the
guidebook excludes. Every line is product correctness or product delivery, and each is invoiceable.

> **1 · Chartered accountant review of the tax and GST computation logic — ₹60,000.**
> Raha outputs rupee figures a person may act on. Before that logic goes anywhere near a filing, a
> practising CA has to review the audit scoring, the export-evidence rules and the reconciliation
> methodology, and sign off on the disclaimer language. This is the single highest-value spend
> available to us and it is the gap called out at our last review. *(Professional service —
> we will seek prior approval in writing before engaging.)*
>
> **2 · Statement and document processing — ₹40,000.**
> The Evidence Check is a reconciliation of every foreign credit against the document behind it, and
> today it is done by hand: 90–110 minutes per customer. Turning bank statements and remittance
> advices into a structured ledger automatically is the difference between a service and a product.
> Covers document-parsing and currency-reference API costs for the first year.
>
> **3 · Product infrastructure — ₹45,000.**
> Database, hosting, storage and transactional email for a product that holds financial records:
> production tiers, backups and isolation, rather than free plans. Twelve months. We will use the
> AWS credits Nirmaan provides wherever they apply, and claim only the remainder.
>
> **4 · Legal review of scope and disclaimer language — ₹30,000.**
> We tell every user we do not file returns and do not give tax advice. For a compliance product
> that sentence has to actually hold. One review by a lawyer with a tax practice, before volume.
>
> **5 · Customer visits for the first diagnostics — ₹25,000.**
> Our first customers are freelancers and small agencies in Chennai and Bangalore. The first few
> reconciliations should be done sitting with them, because the intake is where the product is
> still wrong. *(Trips — pre-approved case-by-case, per p.13.)*

**What the money buys, in one line:** it turns a manual service that one person delivers in two
hours into a reviewed, correct product — and it removes the two things a reviewer should worry
about, which are that the numbers have never been checked by a CA and that the disclaimer has never
been checked by a lawyer.

**What we are not asking for:** advertising, promotional spend, courses, or interns. Distribution is
our bottleneck and we will solve it the way the guidebook says to (p.11) — by approaching people
directly, ourselves.

---

## What we would use Pratham for

1. **Get a CA onto the team**, not just onto an invoice. The review above is the way in.
2. **Reach the first ten paying customers by hand** and let the intake rewrite the product.
3. **Find a co-founder** — named as our largest structural risk, and a cohort is the only place we
   have ever been in a room full of candidates.
4. **Decide, on evidence, whether the ₹2,000 → ₹20,000 ladder holds** across an April LUT cycle.

## Milestones, if selected

| By | Milestone |
|---|---|
| Month 1 | First 3 paying Evidence Checks delivered; CA review of the computation logic commissioned |
| Month 2 | Statement→ledger processing live; delivery under 45 minutes |
| Month 3 | 10 paying customers; rail-mix data from real intake, not from a survey |
| Month 4 | CA engaged on revenue share; disclaimer language legally reviewed |
| Month 5 | First annual seats sold into the April LUT deadline |
| Month 6 | 25 customers or a documented reason the ladder does not hold — either is a result |

## Risks we are not hiding

- **Distribution is unsolved.** The product works; nobody has paid yet. That is the whole risk.
- **Solo.** One person, and one who has to also be a student.
- **A CA can undercut us** by bundling this into a ₹20,000 annual engagement. Our answer is price
  and proof, not features — which is exactly why the entry point is ₹2,000 and not ₹20,000.
- **Rails may absorb the wedge forward.** They cannot absorb it backwards, and the backfill
  population grows every year.

## Registration status

**No government registration of any kind.** No MCA incorporation, no company, no GST registration.
Operating as an individual below the ₹20 lakh services threshold, taking payment by personal UPI —
which creates no registration. This is deliberate and it keeps us inside Pratham's eligibility rule
on p.9.

---

## Before you hit submit

- [ ] Every figure that appears anywhere carries "estimate — verify with your CA before filing"
- [ ] Nowhere does the application claim we file returns or give tax advice
- [ ] Revenue is stated as **₹0** — do not soften it
- [ ] The funds answer contains **no marketing spend**
- [ ] Registration answer says **none** (this is the eligibility answer, p.9)
- [ ] Link included: **https://raha.software** — and the free audit at /audit works, so let them try it
- [ ] Draft saved, then submitted. Saving is not submitting.
