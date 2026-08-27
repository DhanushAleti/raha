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

**Two gaps that are live right now, not planned work:**

1. **4 commits are ahead of `origin/main`.** Production was deployed from the working tree with the
   Vercel CLI, so the site is correct but GitHub is not. Push-to-`main` is the auto-deploy trigger:
   **any git-triggered rebuild from GitHub's current HEAD reverts production to the ₹20,000 landing
   page and drops the rail question.** This is the single highest-consequence item in the repo and
   it takes one command.
2. **The live WhatsApp CTA is still the personal number `919666641799`.** Flagged in `FINAL.md` on
   21 Jul as "swap before real traffic arrives." Traffic arrives tomorrow, and this number is now
   the contact channel on a *paid* offer, not a waitlist.

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

1. **`git push origin main`.** Local tree already equals production, so the redeploy is a no-op —
   it just stops GitHub from being able to revert the paid offer. *(Not done for you: it is an
   outward-facing deploy trigger. Say the word and it goes.)*
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

`PAINKILLER_AUDIT.md` names it and does not solve it: **"let me ask my CA first"** → the CA says
"I've got it," free → the deal dies silently. The counter is to hand over the four questions to put
to the CA, then follow up in three days with *"what did they say?"* — **the non-answer is the
conversion event.** That sequence still does not exist. Write it the first time someone says it,
not before.

---

## Related
`research/decision.md` (the 30 days) · `docs/PAINKILLER_AUDIT.md` (scripts, offer, holes) ·
`research/tactics-filter.md` + `-addendum.md` (what the corpus survives to) ·
`docs/outreach/WARM_15_DRAFTS.md` (tomorrow) · `scripts/pipeline.py` (the only scoreboard)
