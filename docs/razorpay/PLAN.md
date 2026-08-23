# Razorpay AI Buildathon — application plan

**Deadline: 5 September 2026.** Today is 23 August. You have **13 days**.

Form: https://forms.gle/d9r2gvxp8cmoZhon9 · Brief: https://razorpay.com/buildathon/

---

## Why this specific opening, and not the normal internship

Razorpay's regular SDE internship funnel screens on resume and CGPA and mostly wants
final-year students. You would not clear that filter — 5.12 CGPA, 5 backlogs, graduating
Aug 2028.

The Buildathon is a different door, and it is open:

> "No resume screening. No long application."
> "We still take the resume. We just don't screen on it."

Their own landing page puts **"9.1 CGPA, top 5% of batch"** in the *"what we don't read"*
column, and **"a repo that actually runs / a 5-minute video of it working / what broke at
2 AM, and how you got out"** in the *"what we do read"* column.

This is the rare posting where the thing you are weak on is explicitly not measured, and the
thing you are strong on is the entire evaluation.

**Terms:** ₹75,000/month · 6 or 12 months (your pick) · in-person Bangalore, from September ·
students only (you qualify — currently enrolled, no final-year requirement).

---

## The Bangalore question — **decided: yes**

The offer is **in-person Bangalore, 6–12 months, starting September**. That collides directly
with:

- Sem 5 (Jul–Nov 2026), in progress, 63 credits registered
- 5 open backlogs, with CH2014 + EE1100 due for re-registration in Sem 6 (Jan–May 2027)
- Your own Sem 5 rule: *"Attend every class — no P attendance ever again"*

You cannot do a 6-month in-person Bangalore internship and Sem 5 simultaneously. Realistically
this needs a semester deferral, or it does not happen.

**Decided 23 August 2026: yes to in-person Bangalore, 6 months, from September.**

That closes the only blocking question. The remaining work is the build, the video, and the
form. Outstanding logistics that are yours to handle, none of which block the submission:
semester deferral or leave with the institute, and the Sem 6 backlog plan for CH2014 and
EE1100 on the other side of the internship.

**It does not block the build.** Everything below is a Raha feature you should ship anyway:
it makes FIRA reconciliation actually work at batch scale, which is the thing paying customers
have been asking about. Worst case you get a shipped Raha module and a portfolio piece. Decide
the Bangalore question by ~30 August, before the video and form go in.

---

## Track choice: **04 — AI Finance Controller**

The brief:

> Run the books and the cash position.
> Build an agent that closes one finance-ops loop across a **50+ record batch of synthetic
> data**, reporting its **match rate** and the **exceptions it could not resolve**.
>
> *Example directions:* Multi-source reconciliation · Settlement Q&A agent · Forward cash
> forecaster · **Tax-line matcher**
>
> **The bar:** Throughput plus measured accuracy plus an honest exception list. One
> cherry-picked match proves nothing.

Two of their four example directions — *multi-source reconciliation* and *tax-line matcher* —
are literally what `src/lib/firc/match.ts` already does. You are not starting from zero on a
track you half-understand; you are starting from a tested engine in a domain you have spent
months in and have talked to real users about.

**Tracks rejected:**

- **02 Risk Manager** — needs labelled fraud data you do not have; you would be inventing a
  test set and the bar is "honest metrics including false-positive cost."
- **03 Revenue Recovery** — bar is "measured money *recovered*", which needs live merchant
  payment data. Not reachable in 13 days.
- **01 Agentic Commerce** — most crowded track (it is the flashy one), and you would be
  learning UAP/ACP/AP2/x402 from scratch while everyone else does the same.
- **05 Open Track** — "Open doesn't mean easier." Same bar, no domain scaffolding. Strictly
  worse than 04 when 04 fits this well.

---

## The build: **Nostro**

*(alt names if Nostro reads too obscure: `Zero-Rated`, `Inward`. A nostro account is a bank's
foreign-currency account held abroad — it signals domain fluency to a payments panel.)*

### What it solves — the one-liner

> An Indian freelancer or agency that exports services must tie every foreign bank credit to
> an invoice **and** to a FIRA before it counts as a zero-rated export. Miss the link and the
> revenue is reclassified as domestic — **18% GST on money already spent**, plus interest.
> Today this is done by hand in a spreadsheet, once a year, in a panic.
>
> Nostro closes that loop as a batch job and tells you exactly what it could not resolve.

Real money, real stakes, a real user you have actually spoken to. That is the "problem taste"
criterion answered before the panel asks.

### Architecture — three layers

The whole design exists to answer their **"AI judgment"** criterion: *"the right tool in the
right place, and where you chose not to use one."*

**Layer 1 — deterministic core. No LLM. Already built.**
`src/lib/firc/match.ts` · `src/lib/fx/convert.ts` · `src/lib/tax/*` · `src/lib/gst/*`
Date-window matching (−7/+45 days), ±2% amount tolerance, currency equality, partial
allocation, RBI reference-rate FX, export-status classification.

> **Money math is never probabilistic.** An LLM does not get to decide whether ₹2.4L is
> zero-rated. Every rupee-affecting decision is a pure function with a unit test. This is the
> single strongest thing you can say in the panel, and most submissions will fail it.

**Layer 2 — LLM, only where the deterministic layer structurally cannot work.**
Four narrow jobs, each returning Zod-validated structured output that is re-checked before it
touches Layer 1:
1. Bank narration parsing — `NEFT/UTR8837/UPWRK ESCRW INC/REF...` → counterparty, rail, ref
2. Entity resolution — `Upwork Escrow Inc` / `UPWRK ESCRW` / `Upwork Global` → one payer
3. FIRA PDF field extraction — purpose code, remitter, value date, foreign amount
4. Ranking genuinely ambiguous many-to-many candidate sets, with a written reason

**Layer 3 — exception queue.** Anything neither layer resolves at confidence → human review,
with a reason code (`no_fira`, `outside_window`, `split_remittance`, `amount_drift`,
`duplicate_candidate`, `unparseable_narration`). Their bar demands this be honest and complete.

### Evaluation harness — the part that actually wins

Their bar: *"Throughput plus measured accuracy plus an honest exception list. One cherry-picked
match proves nothing."* So the harness is the deliverable, not a nice-to-have.

**Synthetic generator, 250 records** (they asked for 50+ — clear it by 5×), with **known ground
truth**, seeded and reproducible, containing deliberate real-world noise:

| Noise class | Why it's in there |
|---|---|
| Bank charges shaving 1–3% | the ±2% tolerance boundary, tested from both sides |
| Split remittances (1 invoice → 3 credits) | partial allocation |
| Merged remittances (4 invoices → 1 credit) | the genuinely hard case |
| FX drift between invoice and value date | why RBI reference rate matters |
| Missing FIRA | must land in exceptions, never guessed |
| Credit outside the 45-day window | boundary condition |
| Duplicate/near-duplicate narrations | entity-resolution trap |
| Domestic INR credits mixed in | must never be classified zero-rated |

**Reported metrics:** match rate · precision · recall · **false-positive cost in ₹** (a wrong
zero-rating is an 18% liability — that is the number a payments company cares about) ·
throughput (records/sec) · **LLM cost per 1,000 records** · exception count by reason code.

Ship a `npm run evaluate` that prints the scorecard, and put that table in the README. A panel
can reproduce your numbers in one command.

---

## 13-day schedule

| Days | Dates | Work |
|---|---|---|
| 1–2 | Aug 23–24 | Repo scaffold, extract Raha's `lib/` into a clean standalone core, wire CI |
| 3–4 | Aug 25–26 | Synthetic generator + ground truth + the 8 noise classes |
| 5–6 | Aug 27–28 | Evaluation harness, scorecard output, baseline run (deterministic only) |
| 7–9 | Aug 29–31 | Layer 2: the four LLM jobs, Zod-validated, with cost accounting |
| 10 | Sep 1 | Exception queue + reason codes + review UI |
| 11 | Sep 2 | README, architecture doc, final metrics run |
| 12 | Sep 3 | Record and cut the 5-minute video |
| 13 | Sep 4 | Buffer, then submit — **do not** use Sep 5 |

**Decision gates:** none outstanding — Bangalore is confirmed, so the build runs to submission.

---

## The form — 12 fields

| # | Field | Answer |
|---|---|---|
| 1 | Full name | Aleti Dhanush |
| 2 | College | Indian Institute of Technology Madras |
| 3 | Graduation year | 2028 |
| 4 | In-person from September | **Yes** |
| 5 | 6 or 12 months | 6 — revisit at conversion |
| 6 | Resume file | `docs/razorpay/resume.md` → export to PDF |
| 7 | Track | 04 — AI Finance Controller |
| 8 | Project name | Nostro |
| 9 | What it solves | see draft in `ANSWERS.md` |
| 10 | GitHub repo URL | public, created Day 1 |
| 11 | 5-min pitch video | unlisted YouTube, Day 12 |
| 12 | **What broke, and how you got out** | see `ANSWERS.md` — write this *as it happens* |

**Field 12 is the one they read first.** Keep a running `BREAKAGE.md` from Day 1. Do not try to
reconstruct a good failure story on Day 12 — you will write something generic and it will read
as generic. Log the real ones with timestamps as they happen.

---

## What makes this submission beat the median

Most submissions will be a chatbot over a CSV with a demo of one happy path.

1. **A measured scorecard** anyone can reproduce with one command
2. **An explicit "where I did not use an LLM" argument**, which is the exact thing their AI
   judgment criterion is fishing for
3. **False-positive cost in rupees**, not just precision/recall — speaking their language
4. **Real domain knowledge**, from a product with actual users, not a weekend's Googling
5. **An honest exception list** that says "these 14 I could not resolve, here is why"
