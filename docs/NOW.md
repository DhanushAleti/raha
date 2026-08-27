# NOW — the reconciled page

**Written 2026-08-27, late. Verified against live systems, not against other documents.**

Six threads (transcript/tactics extraction · first-paying-customer strategy · outreach · painkiller
and edge audit · work summary · continuity audit) collapse into this one page. It is not a strategy
document — `research/decision.md` closed that door and this respects it. It is *what is true* and
*what to do*, in that order.

Two files in this repo now contradict reality. Section 3 says which, and they carry banners
pointing here. **When any doc disagrees with this page, this page wins until the next one is written.**

---

## 1 · What is actually true right now

Verified 2026-08-27 by curl against production, `vercel ls/env ls`, `git log`, and
`python3 scripts/pipeline.py stats`. Not copied from any doc.

| | Status |
|---|---|
| Live site | `raha.software`, production deploy **20 min old** |
| Landing page | **₹2,000 Evidence Check + UPI live.** ₹20,000 seat and seat counter gone |
| `/audit` | Rail question **live** (`Wise/PayPal/Stripe` · `Skydo/Karbon/Payoneer` · direct bank) and Evidence Check offer **live** on the result — both confirmed in the deployed JS bundle |
| `NEXT_PUBLIC_UPI_ID` | Set in Vercel **Production** |
| Payments | UPI only. No gateway. Correct for now |
| Revenue | **₹0.** Customers **0**. Asks ever made **0** |
| Pipeline | 15 threads seeded, **0 answered, 0 DMs, 0 asks, 0 paid** — day 0 of 30 |
| Tests | 68 unit + audit scoring, green at last run |

**Closed since this page was written (all deployed and verified live):**

- **GitHub drift — fixed.** `main` was 4 commits behind production because the ₹2,000 offer was
  deployed from the working tree with the Vercel CLI. Pushed. A git-triggered rebuild can no longer
  revert the paid offer.
- **The Layer-2 correction was never finished — now it is.** The repositioning commits fixed the
  copy and stopped there. `Where does your money come from?` still offered only YouTube, Patreon,
  Twitch, Substack, Instagram and brand deals, so **every freelancer, consultant, indie-SaaS founder
  and agency — the exact audience tomorrow's 15 asks point at — had to answer "Other."** "Other" is
  not in `FOREIGN_PLATFORMS`, so they scored **0 platform points where an identical creator scored
  1–2**: the audience being pitched read one to two points *softer* than the audience being dropped,
  which moves borderline cases from red to amber. Fixed, with three regression tests.
- **UPI note encoding — fixed.** `URLSearchParams` writes a space as `+`, an HTML-form convention
  rather than a URI one, and several UPI apps render it literally. The payer was going to see
  `Foreign+Income+Evidence+Check`.
- **Funnel verified end to end**, desktop and 375px: 9 questions → red verdict, score 14 → the
  Tier-2 finding ("Wise, PayPal and Stripe cannot produce a FIRA at all") → ₹2,000 offer → a UPI
  deep link that now reads `tn=Foreign%20Income%20Evidence%20Check`.

**The one gap still open, and it is yours:**

**The live WhatsApp CTA and the UPI VPA are both the personal number** — `919666641799` and
`9666641799@ybl`. Flagged in `FINAL.md` on 21 Jul as "swap before real traffic arrives." Traffic
arrives tomorrow, and it is now the contact *and* payment identity on a paid offer. Receiving ₹2,000
personally is fine and not worth blocking on; the WhatsApp line is the one that follows you forever.

Also unresolved: **no Reddit script app is registered** (`REDDIT_CLIENT_ID` unset), so
`find-prospects.py --search` cannot run and **assumption 1 in `research/decision.md` — "is the room
deep enough for weeks 2–4" — is still untested.** The 15 seeded threads cover week 1 regardless.

---

## 2 · The week, with the collision named

`research/decision.md` and `docs/PAINKILLER_AUDIT.md` schedule Raha work on Sat 29 Aug. Two other
deadlines land in the same window and neither plan accounts for them.

| Date | Raha | Also due |
|---|---|---|
| **Thu 27 Aug** | ✅ offer shipped, UPI set, rail question live | — |
| **Fri 28 Aug** | **15 warm intro asks — the primary test** | — |
| **Sat 29 Aug** | 90-min public teardown | **IVM/Nirmaan preincubation application + Part-5 pitch video, EOD, no extension** |
| Sun 30 Aug | 3 public answers · DM burned threads #1–2 | — |
| Mon 31 Aug | DM Tier-1 #1–3 | — |
| Tue 1 Sep | DM Tier-1 #4–5 · work warm replies | — |
| Wed 2 Sep | Follow-up #1 on every silent thread | — |
| **Wed 3 Sep** | **GATE: one paid ₹2,000, or Nostro takes September** | — |
| **Fri 5 Sep** | standing 15-min block only | **Razorpay buildathon closes (Nostro, Track 04)** |

**The resolution: Saturday is the IVM day, not the teardown day.** The application is dated,
external, unrepeatable, and already has a deck behind it. The teardown is self-imposed and moves
without penalty. **Move the teardown to Sun 30 Aug** and merge it with that day's public answers —
it was always going to be the day's main artefact anyway.

What does *not* move: **Friday's 15 asks.** Both plans set a hard rule — not sent by Sat 29 Aug and
the warm network gets deleted from every plan in this repo, including the day-14 fallback. Keep the
rule. It is the only thing standing between "untested channel" and "channel avoided for a third
month."

**The monetization answer, for the pitch video, in one sentence** (from
`research/tactics-filter-addendum.md` M1/M2, and it is a legal fact, not a subscription trick):

> The LUT is re-filed every financial year before the first export invoice, and a FIRA is needed per
> payment — so solving it once does not solve it. ₹2,000 buys the evidence check; April is when the
> annual seat becomes the obvious thing to buy.

That is the answer that was missing on 22 Aug when the question was asked three times.

---

## 3 · Continuity audit — where the record contradicts itself

Seven contradictions, all live in the repo. Ranked by how likely each is to misdirect an actual
action. `FINAL.md` and `docs/STATE.md` now carry banners pointing here.

| # | Contradiction | Which is right |
|---|---|---|
| 1 | **`FINAL.md` (21 Jul) sets the gate at "close 3 founding customers at ₹20,000."** `research/decision.md` sets it at **one paid ₹2,000 by 3 Sep**, and the ₹20,000 seat is off the front door. | decision.md. The 3-customer gate closed unmet on 27 Aug. |
| 2 | **`FINAL.md` says start at `SEND_TODAY.md` and send 50 agency drafts.** `research/decision.md` explicitly **stops** cold email to agencies and all new agency sourcing — 28 sent, 1 irrelevant reply. | decision.md. Those drafts are dead; do not send them. |
| 3 | **`STATE.md` (28 Jul): "Phase 0 is manual… gated behind 3 paying customers before Phase 1 build starts."** Phase 1's five P0 features shipped in **July** and are live. | The gate framing is dead — Phase 1 already exists. Delivery for a ₹2,000 check is still manual, which is correct and separate. |
| 4 | **Three live statuses for ₹20,000** across three documents written inside one month: current price (`STATE.md`), removed (`PAINKILLER_AUDIT.md`), reinstated as an April renewal (`tactics-filter-addendum.md` M2). | Removed from the front door **now**; reappears in April at LUT-renewal time. Never quoted as an opener. |
| 5 | **`STATE.md`'s 5-item priority order** vs `decision.md`'s 7-day queue — different lists, both undated as superseded. | decision.md's queue. |
| 6 | **Two "ground truths" for sends.** `SEND_LOG.md` calls itself ground truth and stopped in July; `research/pipeline.db` is now the tracked system and `decision.md` measures the kill criteria from it. | `pipeline.db`. `SEND_LOG.md` is a July archive. |
| 7 | **`FINAL.md`'s hostname table lists `raha.software` twice** (a find/replace ate the second host) while the warning below it still discusses repointing at `rahatax`. | One host: `raha.software`. Fixed in place. |

**The pattern, stated once:** every one of these is a *plan document outliving the decision that
replaced it*. Nothing here was wrong when written. The cost is that the two files most likely to be
opened first — `FINAL.md` at repo root, `STATE.md` as the Project-knowledge upload — are the two
most out of date, so a cold read of this repo produces July's plan.

---

## 4 · The final list

Ordered by consequence. Everything above the line happens before the first warm ask lands tomorrow.

### Tonight — 20 minutes, non-negotiable

1. ~~`git push origin main`~~ — **done.** GitHub and production are in sync.
2. **Swap `NEXT_PUBLIC_WHATSAPP_NUMBER` to a business line in Vercel → redeploy.** Open since 21 Jul.
   Tomorrow it becomes the contact number on a paid offer.
3. **Fill the 15 names** into `docs/outreach/WARM_15.md`. The drafts in `WARM_15_DRAFTS.md` are
   written; every one is blocked on a `[NAME]`. Do not rewrite the messages.
4. **Send the ₹2,000 UPI request to yourself once.** Confirm the link opens a real collect request
   on the phone you will be holding tomorrow. Untested payment rails fail at the worst moment.

### Fri 28 Aug — the primary test

5. **All 15 asks, one sitting.** Send order is already set in `WARM_15_DRAFTS.md`
   (11 → 15 → 13 → 14 → 9 → 10 → 1 → 2 → 3 → 6 → 7 → 8 → 12 → 4). 1-to-1 only, never in a cohort
   group. Send the pre-written forward the instant anyone says "sure, who?"
6. `python3 scripts/pipeline.py log <id> dm_sent` on every one. The day-14 gate fails on paperwork
   otherwise.
7. **2 public answers**, opening with the FIRC→FIRA correction. No mention of Raha.

### Sat 29 Aug — IVM only

8. **Preincubation application + Part-5 pitch video, submitted before EOD.** Use the monetization
   sentence in §2. Teardown moves to Sunday.

### Sun 30 Aug → Wed 2 Sep

9. Teardown (moved) + 3 public answers · **DM the two already-burned threads first** — a dated
   problem already on record outranks every Tier-1 shopper.
10. Tier-1 DMs #1–5, scripts in `PAINKILLER_AUDIT.md`. **Every one ends in the ₹2,000 ask.**
11. **Register the Reddit script app** (2 min, free) and run `find-prospects.py --search`. Under 40
    distinct threads and the room is too thin for weeks 2–4 — widen to r/developersIndia,
    r/IndianFreelancers, Indie Hackers **before day 3**, not at day 14.
12. **Dry-run the deliverable once against a synthetic case.** One number matters: how long it
    actually takes. Over 3 hours and the price is wrong — better to know before someone pays.
13. Follow-up #1 on every silent thread. Under 40 words, asks for money, not a call.

### Wed 3 Sep — the gate

14. **Paid ₹2,000 with a UPI reference logged, or Nostro takes September.**
    `python3 scripts/pipeline.py log <id> paid_2k --note "<upi ref>"`.
    Apply to the Razorpay buildathon either way — it is cheap and has no resume screening.
    **The failure case is arriving at 5 Sep having done neither properly.**

### The one hole with no script yet

**Written — `docs/outreach/CA_OBJECTION.md`.** `PAINKILLER_AUDIT.md` named "let me ask my CA first"
as the likeliest silent death and listed no counter. The counter is not to argue with the CA: send
four checkable questions and let the answer do the work. A CA who has it covered answers all four in
a paragraph and you have lost nothing; one who has not will hedge, and **the hedge is the conversion
event.** The file carries the four questions, the day-3 and day-7 follow-ups, and the four answers
you actually get — including the clean disqualification, said honestly, which is the cheapest
referral available.

**And the thing that had no template at all:** if someone pays tomorrow, the 48-hour clock starts
against a blank page. `docs/delivery/EVIDENCE_CHECK_SOP.md` makes every decision once instead of per
customer — intake list, the three-tier rail matrix from the FIRA research, the LUT check, and how to
state an exposure number without pretending it is a ruling. `REPORT_TEMPLATE.md` is the deliverable.
Budget **90–110 minutes**, which answers D6b's "how long does it actually take?" *before* someone
pays rather than after.

---

## Related
`research/decision.md` (the 30 days) · `docs/PAINKILLER_AUDIT.md` (scripts, offer, holes) ·
`research/tactics-filter.md` + `-addendum.md` (what the corpus survives to) ·
`docs/outreach/WARM_15_DRAFTS.md` (tomorrow) · `docs/outreach/CA_OBJECTION.md` (the objection) ·
`docs/delivery/` (how to actually deliver) · `scripts/pipeline.py` (the only scoreboard)
