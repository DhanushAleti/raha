# Razorpay AI Buildathon — final submission

**Canonical answer text lives in `docs/PASTE_READY.md`** (plain text, no markdown, rewritten
against the AI-tells catalog) and on the published submission console. This page is the working
record behind it.

**Written 2026-09-02, updated 2026-09-03. Deadline Fri 5 Sep. Submit Thu 4 Sep.**
Form: https://forms.gle/d9r2gvxp8cmoZhon9 · Track 04, AI Finance Controller · Project: **Nostro**

**The build is done.** `~/Desktop/obsedian/nostro`, 5 commits, **110 tests passing**, strict
typecheck clean. `npm run evaluate` produces the scorecard below in 13-16ms. Everything on this page
is copied from a real run, not projected.

**Corrected 2026-09-02:** `src/llm/` was an empty directory that the README described as working,
and `npm run generate` pointed at a file that did not exist. Both were found by checking the repo
against its own README before writing this page, and both are now built (commit `c213d82`). A panel
that cloned the repo would have found them in under a minute.

**Two blockers, both mechanical:**

| # | Blocker | Fix |
|---|---|---|
| 1 | **No GitHub remote.** `git remote -v` is empty, so field 10 has no URL. | Push public. `gh` is authenticated as `Dhanush9999279`; the Raha repo lives under `DhanushAleti`. Pick one and I push in 60 seconds. |
| 2 | **No video.** Field 11 needs 5 minutes, unlisted. | Script and shot list in §3. Record Wed 3 Sep. |

---

## 1 · The scorecard (seed 20260905, reproducible)

```
npm run evaluate
```

| Metric | Value |
|---|---|
| Allocation precision | **96.52%** |
| Allocation recall | 81.62% |
| Allocation F1 | 88.45% |
| Status accuracy | 85.2% (213/250) |
| Exposure present in batch | ₹42,93,601.16 |
| Exposure correctly flagged | ₹40,95,654.98 |
| **Under-declared (false-positive cost)** | **₹0.00, 0 invoices** |
| Over-provisioned | ₹0.00, 0 invoices |
| Exceptions raised | 151, across 7 reason codes |
| Throughput | 717 records in 13-16ms (~51,000 rec/s) |
| Tests | **110 passing**, strict typecheck clean, none require an API key |

Batch is 250 invoices against their brief's floor of 50. Twelve noise classes; barely a third of
the mix is a clean 1:1 match.

---

## 2 · The twelve fields

**1. Full name** → `Aleti Dhanush`
**2. College** → `Indian Institute of Technology Madras`
**3. Graduation year** → `2028`
**4. In person in Bangalore from September** → `Yes`
**5. Duration** → `6 months`
**6. Resume** → export `docs/razorpay/resume.md` to PDF
**7. Track** → `04 — AI Finance Controller`
**8. Project name** → `Nostro`

**9. What it solves**

> An Indian business that exports services has to prove it. Every foreign bank credit must be tied
> to an invoice **and** to a FIRA before the revenue counts as a zero-rated export. Break that chain
> and the supply is reclassified as domestic: 18% GST on money collected and spent a year ago, plus
> interest. Today it is a spreadsheet, done by hand, once a year, under deadline.
>
> Nostro runs that reconciliation as a batch job and reports both what it matched and what it could
> not resolve, with a reason code and a rupee number attached to each unresolved item.
>
> On 250 invoices with twelve noise classes: **96.52% allocation precision, 81.62% recall, ₹0.00
> under-declared**, 151 exceptions, 44,813 records/sec. One command reproduces every number.
>
> **Under-declared is the metric I built the system around.** It is the rupee value of invoices
> Nostro called zero-rated that are not: real liability, found late, with interest running. A run
> that under-declares anything exits non-zero regardless of its F1. Recall is 81.6% because I would
> rather hand back an honest exception than a confident wrong allocation, and the gap is visible in
> the queue rather than hidden in the score.
>
> On where a model belongs: **no LLM touches a number that becomes a tax figure.** `src/core/` has
> no network dependency and cannot import `src/llm/`, enforced structurally. Bank narrations are
> machine-generated and mostly regex-readable, so a regex reads them, for free and identically every
> run. The LLM only ever sees the mangled minority the parser flags `needsReview`, returns a
> Zod-validated hint, never an allocation, and that hint still has to clear the same tolerance and
> date window as everything else. Cost scales with difficulty, not batch size.
>
> On the word agent, since the track asks for one. Nostro is a pipeline with a narrow model layer
> rather than an autonomous loop, and that is deliberate for this domain. The finance-ops loop it
> closes is the one in the brief: a batch goes in, it decides what it can prove, and it hands back
> what it cannot with a reason code and a rupee figure attached. An agent that retries and
> re-reasons its way to a confident answer is the wrong shape when the output is a tax figure. The
> failure mode here is not a slow answer. It is a wrong one that nobody catches until a notice
> arrives eighteen months later.

**10. GitHub repo URL** → `https://github.com/DhanushAleti/nostro` (public, 5 commits, verified live)

**11. Video** → unlisted YouTube. Script word for word in `docs/razorpay/VIDEO.md`. **The only open item.**

**12. What broke, and how you got out**

> Split remittances scored 39.1% recall while the unit test for that exact path passed. I assumed
> later legs were falling outside the 45-day window, since the generator can push a three-leg split
> to day 64, and built an anchored wide window that searches to 120 days when one leg sits inside
> the normal one. It typechecked, all 83 tests stayed green, **and it made the number worse: 39.1%
> to 29.7%.** A wider window multiplies the candidate pool, subset-sum finds more coincidental
> totals, the ambiguity guard sees near-equal fits and refuses all of them. Precision fell too, and
> one noise class went from refusing everything to confidently allocating wrong.
>
> What found it was dumping a batch and reading raw records instead of reasoning from the
> generator's parameter ranges. Actual lags on the first three split invoices: 24d, 29d / 26d, 31d,
> 38d / 4d, 9d. **Every leg was inside the original window. The premise of my fix was false.**
>
> The real cause was pass ordering. Pass 1 matches unique 1:1 pairs over a global candidate pool
> before the split pass runs, so across 250 records some unrelated credit lands within 2% of some
> invoice by coincidence, consumes a credit that belonged to a split, and leaves the right invoice
> permanently short. The bug was never in the split logic. It was that a coincidence of amounts got
> to move before a written reference did.
>
> Fix: a new pass 0 that commits reference-named matches first, strongest evidence before any
> amount heuristic, and the wide horizon now belongs only to pass 0 where an explicit invoice
> reference makes it safe. **F1 77.2% to 85.1%; split recall 39.1% to 70.3%.**
>
> What I changed permanently: the wrong fix survived a typecheck and 83 green tests because every
> test checked one pass in isolation and the failure lived between passes. Running the harness one
> noise class at a time is now the first thing I reach for, not the last. Full log with timestamps
> in `BREAKAGE.md`, written as it happened rather than reconstructed.

---

## 3 · The video, 5 minutes

Unlisted YouTube. Screen recording with voice. No slides, no intro music, no logo. They said they
read the repo and the video; a founder-style demo of the terminal beats a produced pitch.

| Time | Shot | Say |
|---|---|---|
| 0:00-0:35 | Blank terminal | The problem in three sentences. Foreign credit, invoice, FIRA. Break the chain and it is 18% on money already spent. Say a real number: a ₹40L batch carries ₹7L+ of exposure. |
| 0:35-1:10 | `npm test` running, 101 pass | Every rupee-affecting decision is a pure function with a test. Money math is never probabilistic. |
| 1:10-2:30 | `npm run evaluate`, full scorecard on screen | Read precision, recall, and then stop on **under-declared ₹0.00**. Explain why that is the metric, not F1. |
| 2:30-3:10 | Scroll to the exception queue and TOP OF THE QUEUE | 151 exceptions, sorted by what it costs to be wrong. Read the ₹1,98,547 purpose-code line aloud. |
| 3:10-4:00 | `src/core/` then `src/llm/` side by side | The boundary: core has no network import and cannot import llm. Regex reads the well-formed majority. The model sees only `needsReview` and returns a hint, never an allocation. |
| 4:00-4:40 | `npm run evaluate -- --only split_remittance`, then BREAKAGE.md | The failure story from field 12, compressed to thirty seconds. Say the wrong fix out loud: 39.1 to 29.7. |
| 4:40-5:00 | `npm run evaluate -- --count 1000 --seed 42` | Reproduce anything with one command. Stop talking. |

**Do not** open with who you are. Open with the money. The panel watches many of these.

---

## 4 · The three days

| Day | Do |
|---|---|
| **Wed 3 Sep** | Push public. Re-run evaluate, paste fresh numbers into README. Record the video in one take, twice, keep the second. |
| **Thu 4 Sep** | Resume to PDF. Submit the form. |
| **Fri 5 Sep** | Buffer only. Do not plan to use it. |

---

## Related
`docs/razorpay/PLAN.md` (the original 13-day plan, now mostly executed) · `BREAKAGE.md` in the
nostro repo (the real log) · `docs/razorpay/resume.md` · `docs/lightspeed/OFFICE_HOURS.md`
