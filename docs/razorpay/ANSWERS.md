# Form answers — drafts

Form: https://forms.gle/d9r2gvxp8cmoZhon9 · closes 5 September 2026

---

## Fields 1–8 (settled)

| Field | Answer |
|---|---|
| Full name | Aleti Dhanush |
| College | Indian Institute of Technology Madras |
| Graduation year | 2028 |
| In-person from September | **Yes** — confirmed 23 Aug 2026 |
| 6 or 12 months | 6 |
| Resume | `resume.md` → PDF |
| Track | 04 — AI Finance Controller |
| Project name | Nostro |

---

## Field 9 — What it solves

> An Indian business that exports services has to prove it. Every foreign bank credit must be
> tied to an invoice and to a FIRA before it counts as a zero-rated export. Break that chain and
> the revenue is reclassified as domestic supply — 18% GST on money that was collected and spent
> a year ago, plus interest.
>
> Today that reconciliation is a spreadsheet, done by hand, once a year, under deadline. It fails
> in boring ways: a bank shaves 1.5% in charges so the amounts stop matching, one invoice arrives
> as three remittances, four invoices arrive as one, the payer's name is spelled differently in
> every narration.
>
> Nostro runs it as a batch job. It reconciles bank credits against invoices and FIRAs, classifies
> each one's export status, and — the part that matters — hands back an honest list of what it
> could not resolve and why. Over a 250-record synthetic batch with known ground truth it reports
> match rate, precision, recall, throughput, and false-positive cost in rupees, because a wrong
> zero-rating is not a wrong label, it is an 18% liability.
>
> The deterministic core is lifted from Raha, a GST compliance product I built and run in
> production. This is the batch engine underneath it, measured properly.

*(Trim to the form's limit if there is one. Keep paragraphs 1, 3, and the last line — those carry
the problem, the measurement, and the credibility.)*

---

## Field 12 — What broke, and how you got out

**Razorpay reads this first. Do not write it on Day 12.**

Keep `BREAKAGE.md` open from Day 1. Log every real failure with a timestamp as it happens: what
you expected, what actually happened, what you tried that did not work, and what the fix was.
On Day 12 you pick the best one and write it up.

A strong answer has four parts:

1. **The symptom** — precise, with the number that was wrong
2. **The wrong hypothesis** — what you chased first, and why it was reasonable
3. **The actual cause** — usually one layer below where you were looking
4. **What changed permanently** — a test, an invariant, a design change, not just a patch

What makes it weak: "I had a bug and I fixed it with Stack Overflow." What makes it strong:
evidence you can debug a system you built, under a wrong assumption, and leave it more robust
than before.

Failures worth watching for on this build — these are where it will actually break:

- The ±2% tolerance interacting with split remittances to produce **many-to-many ambiguity**
  the greedy matcher resolves confidently and wrongly
- FX conversion applied at the **invoice date instead of the value date**, producing a drift that
  looks like a bank charge
- An LLM returning **schema-valid but semantically wrong** structured output — a parsed
  counterparty that passes Zod and is still the wrong entity
- Ground truth in the generator being **subtly wrong**, so the harness scores the matcher against
  a broken answer key and you trust a number that is fiction

That last one is the best possible story if it happens: discovering your own evaluation was lying
to you, and how you caught it. Watch for it.

---

## Checklist before submitting

- [ ] Repo is **public** and a clean clone actually runs from the README
- [ ] `npm run evaluate` prints the scorecard, and the README shows that table
- [ ] Architecture doc explains the three layers and **where an LLM was deliberately not used**
- [ ] Exception list is complete and honest — no quietly dropped hard cases
- [ ] Video is under 5:00, unlisted, and shows the batch running, not slides
- [ ] Resume exported to PDF
- [ ] Submit **4 September**. Not the 5th.
