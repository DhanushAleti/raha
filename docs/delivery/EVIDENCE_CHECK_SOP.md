# Evidence Check — how to actually run one

**The ₹2,000 Foreign Income Evidence Check, start to finish.** Written 2026-08-27, before the
first sale, so the first customer is not also the first draft.

`research/decision.md` D6b asks one question about this deliverable: **how long does it really
take?** Over three hours and the price is wrong. This SOP exists to make the honest answer
**90–120 minutes**, by removing every decision that can be made once instead of per customer.

Regulatory basis: `docs/research/FIRC to FIRA.md`. Every rule below traces to a section there.

---

## The promise you are held to

> Every foreign credit in the period, matched line by line to the document behind it — FIRA, NOC,
> bank advice, or nothing — and a written statement of which ones stand up as zero-rated exports
> and which do not, with the rupee exposure on the ones that do not. Plus whether the LUT is where
> it needs to be. 48 hours. Money back if it tells them nothing their CA hasn't.

Nothing more. **Not a filing. Not a CA opinion. Not tax advice.** If a question needs an opinion,
the answer is "that's a question for whoever files for you, and here is exactly how to ask it."

---

## Step 1 · Intake — 10 minutes, and it is a trust test

Ask for the minimum, say why each item is needed, and stop. Every extra field is a reason to
hesitate, and hesitation at intake is where a ₹2,000 sale dies.

| Ask for | Why you need it — say this out loud |
|---|---|
| The **period** (which FYs) | Sets the scope and the LUT years to check |
| **Bank statement lines for foreign credits only** — date, amount, currency, narration | This is the ledger. Credits only; they can black out everything else |
| **How each stream is paid** — the rail | Decides whether a FIRA can exist at all |
| Any **FIRA / e-FIRC / FIRS / NOC** they already hold | So you count what exists before chasing what doesn't |
| **GST registration status + GSTIN if any** | Decides whether LUT is even in scope |
| **LUT filed?** For which FYs, with ARN if handy | The single most common dated gap |
| Their **invoices** for the period, or a list | Ties each credit to a supply |

**Never ask for, and say so unprompted:** net-banking credentials, OTPs, PAN or Aadhaar images,
full unredacted bank statements, GST portal login. You do not need any of it, and asking is how a
stranger with no credential stays a stranger.

Send this as a plain list in the same thread as the payment. No form, no portal, no NDA.

---

## Step 2 · Build the ledger — 30–40 minutes

One row per foreign credit. This is the whole deliverable in table form; the written report is a
narration of it.

| Column | Notes |
|---|---|
| Date | Credit date on the statement |
| Amount (FCY) + currency | As received |
| Amount (INR) | As credited |
| Payer / source | Client, AdSense, Upwork, whoever |
| Rail | Tier 1 / Tier 2 / Tier 3 — see the matrix |
| Invoice ref | Or `NONE` |
| Evidence held | FIRA · e-FIRC · FIRS · NOC · bank advice · `NONE` |
| Verdict | Stands · At risk · Cannot be evidenced |
| Exposure (INR) | 0 unless At risk / Cannot |

Two rules that save the most time:

1. **Group by rail and stream first, then work each group.** A year of AdSense credits is one
   decision applied 12 times, not 12 decisions.
2. **A credit you cannot classify is `Unknown`, not a guess.** An honest `Unknown` with the exact
   question to ask the branch is worth more than a confident wrong verdict, and it is the thing a
   CA cannot be bothered to do at their hourly rate.

---

## Step 3 · The decision matrix

This is the product. Three rails, from `FIRC to FIRA.md` §6.

### Tier 1 — Skydo, Karbon, Winvesta, Payoneer, PayGlocal

FIRA is issued automatically and free (§6.1).

- **Evidence held → Stands.** Verdict: covered. Exposure ₹0.
- **Not downloaded → Stands, once retrieved.** Not a risk finding, an admin one. Tell them where
  in the dashboard and move on.
- **Say the quiet part:** for a customer who is 100% Tier 1, the honest answer is *"your forward
  paperwork is already solved, for free, by the rail you chose."* Say it. It is the
  send-away that makes everything else you say credible — and it is why the rail question is asked
  before the sale, not after.

### Tier 2 — Wise, PayPal, Stripe

**Structurally cannot produce a FIRA** (§6.2). The money is converted offshore and lands as a
domestic transfer, so the Indian bank has no foreign remittance to certify.

- **Nothing held → Cannot be evidenced as-is.** This is the highest-value finding in the whole
  product, because almost nobody knows it and it is not the customer's fault.
- **Route out:** request an **NOC** from the aggregator, then present it to their own bank, which
  *may* raise the IRM and issue a FIRC/FIRA after the fact. Three conditions, all real: they have
  to know to ask; a second institution has to act on a third party's document; a per-transaction
  fee may apply.
- **Write it per remittance, not per year.** "Ask Wise for an NOC covering these 14 credits, then
  take it to the branch with this sentence" is the deliverable. "Get an NOC" is not.

### Tier 3 — direct bank transfer (AdSense into SBI, a client wiring you)

No automation either way (§6.3). Nothing arrives unless it is asked for, per remittance.

- **Nothing held → At risk, recoverable.** The bank has the transaction; it simply has not been
  asked to raise the IRM in EDPMS and issue the advice against it.
- **The sentence they take to the branch:** *"I need an e-FIRC or FIRA against the inward
  remittance of [amount] on [date]. Please raise the IRM in EDPMS and issue the advice against it."*
- **If the branch says "we don't issue FIRCs any more" — they are right, and it is not a refusal.**
  Physical FIRCs ended for export remittances with RBI A.P. (DIR Series) Circular 74 of 26 May 2016
  (EDPMS live 15 June 2016); FIRCs continue only for FDI/FII. The correct ask is e-FIRC/FIRA.
  **This single correction is the most useful sentence in the report.** (§2.2, §4)

### Cross-cutting — the part no rail solves (§6.4)

- **Backfill.** Rails work forward only. Someone who moved to Skydo last year still has two or
  three prior years with nothing behind them. **No competitor solves this by construction** — it
  is the most defensible part of the offer.
- **Multi-rail.** Three income streams means three formats and no single view. The ledger is the
  single view. That is the deliverable's actual shape.
- **Terminology lag.** Officers still ask for "physical FIRC" at LUT renewal. Give them the
  substitution sentence in writing so they have an answer in the room.

---

## Step 4 · The LUT check — 10 minutes, and it is the dated one

The LUT (Form GST RFD-11) is **re-filed every financial year, before the first export invoice of
that year** (§3.2). It is the only thing in the whole product with a hard recurring date, which is
why it is both the urgency in the sale and the reason April exists as a renewal moment.

| Situation | What to write |
|---|---|
| Filed, before the first export invoice, every FY in scope | Covered. Give the ARN back to them and the next due date. |
| Filed **after** the first export invoice of that FY | Flag it. The gap between the FY's start and the filing date is the exposed window. Name the invoices in it. |
| Not filed, GST-registered, invoicing without IGST | **The expensive one.** Named in the literature as exactly what people discover during a year-end review. Flag as high, with the invoice list. |
| Not GST-registered | LUT is out of scope until registration. Note the aggregate-turnover question and hand it to their CA — do not opine on whether they must register. |

---

## Step 5 · Exposure — how to state a number without pretending it is a ruling

For each credit that cannot be evidenced, the exposed amount is the receipt that would lose
zero-rating. State it as a **range with its assumptions on the same line**, never as a bare figure.

```
Exposure on this credit = INR value of the receipt × 18% (IGST if export treatment is not accepted)
                        + interest, presently 18% p.a. from the date the tax would have been due
                        + any penalty, which is not estimated here
```

**The four things that must appear next to every number:**

1. **"Estimate — verify with your CA before filing."** Non-negotiable, on every figure.
2. This assumes the supply would otherwise be taxable — registration status and aggregate turnover
   change it, and that is their CA's call, not yours.
3. Interest and penalty depend on dates and on the officer. The number is the **order of
   magnitude**, which is the decision-relevant part.
4. **What would remove the exposure entirely**, per credit. A report that only frightens is worth
   ₹0 on the second sale.

Then one line at the top of the report: **total exposure across all unevidenced credits.** That
number is why they paid ₹2,000, and it is usually two orders of magnitude larger.

---

## Step 6 · Write it — 30 minutes

Use `REPORT_TEMPLATE.md`. Fill, do not rewrite. Send as a PDF in the same thread as the payment.

**Then, the same message, three sentences:**

1. What you would do first if it were you.
2. The offer to answer one follow-up question free, whoever files for them.
3. *"Who else do you know dealing with this?"* — asked of every customer, from the first one.

---

## Timing — fill this in after the first real one

| Step | Budgeted | Actual #1 | Actual #2 |
|---|---|---|---|
| Intake | 10 min | | |
| Ledger | 30–40 min | | |
| Matrix + LUT | 20 min | | |
| Writing | 30 min | | |
| **Total** | **90–110 min** | | |

**Over 3 hours twice running and the price is wrong** — that is the plan's own test, and it is
answered here, not in a meeting.

## Related
`docs/research/FIRC to FIRA.md` · `REPORT_TEMPLATE.md` · `docs/PAINKILLER_AUDIT.md` (the offer and
the scripts) · `docs/outreach/CA_OBJECTION.md` (what happens when they say "let me ask my CA")
