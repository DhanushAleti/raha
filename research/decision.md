# Decision — the next 30 days

**Written 2026-08-27. Window: Thu 27 Aug → Fri 26 Sep 2026.**
Reasoning and the full tactic filter: `research/tactics-filter.md`. Raw source: `research/tactics-raw.md`.

**Two assumptions I made rather than blocking on.** Correct them here if wrong; nothing below
changes unless they're wildly off, because every item costs ₹0 and fits a single-digit hour budget.

- **10 hours/week.** At 6, run the queue at 0.6× volume and push the kill dates out by a week. At
  20, run it at 2× and halve them.
- **₹0–2,000/month.** Every tactic requiring spend is already dead in the filter.

**Three facts from the repo, not assumptions:** paying customers **0**; price **₹2,000 diagnostic**
(entry) and ₹20,000/year (founding seat); prior result **28 cold emails → 1 reply, out of scope**.

**One scheduling conflict, stated up front.** The Razorpay buildathon application (Nostro, Track 04)
closes **Fri 5 Sep** — inside this window — and acceptance means Bangalore in person for six months
from September. That is a different bet and I'm not touching it. It is carved out below: **Wed 3 –
Fri 5 Sep, the sales queue drops to the 15-minute standing block only.** Everything else in the
30 days is scheduled around it.

---

## The one channel

> **Answer live threads on r/IndiaTax and adjacent Indian freelancer/indie-hacker forums in public,
> then DM the people who already asked to hire someone for this exact scope.**

Sources: `YC — How to Get Your First 10 Customers` ("show up where customers complain in public";
"give bespoke value before asking"; "the first 10 customers won't come from a tool — they come from
you, manually"), reinforced by `HORMOZI — 1 Hour of Alex Hormozi on Getting Customers` (Hotline
segment: a hand-built list worked 1-to-1) and `HORMOZI — Watch this to get your first 10 customers`
(teardown value-posts in the room the buyer is already in).

Why this room and not another: `docs/outreach/ACUTE_PAIN_TARGETS.md` already holds **five threads
where a person asked, in public, to hire someone for FIRC/FIRA + LUT + GST on foreign income** —
Raha's scope, requested verbatim, before they had heard of Raha. Twenty-plus more are actively
confused about it. That is not a lead list, it is a queue.

**The motion, in order, every time:**

1. **Answer in public. Completely. No mention of Raha.** This is `YC`'s advice-not-pitch reframe with
   its caveat honoured — a fake advice frame gets the account banned and costs the whole channel.
   It also doubles as the "have a pulse" profile (`HORMOZI`): people click your history before
   they reply to a DM. There is no separate content channel; this *is* it.
2. **Lead with the FIRC→FIRA correction.** Physical FIRCs stopped in 2016 for export remittances
   (RBI A.P. DIR Circular 74). When someone says "my bank won't give me a FIRC," the answer is
   *"they can't — those ended in 2016 for exports; what you want is a FIRA."* Per
   `WEDGE_REALITY_CHECK.md`: that one correction is more impressive than anything in the current
   pitch. It is also free, verifiable, and immediately establishes the thing being sold.
3. **Qualify on the rail before spending a DM.** "How does the money reach you — direct bank
   transfer, Wise/PayPal/Stripe, or Skydo/Karbon/Payoneer?" Skydo/Karbon/Payoneer users already get
   FIRA free and automatically; pitching them is pitching a free feature. Wise/PayPal/Stripe users
   *structurally cannot* get one. That question decides whether there is anything to sell.
   `HORMOZI`'s own redirect on the fishing-guide call applies: stop targeting people with no problem
   and no money.
4. **Give bespoke value before asking** (`YC`, highest-converting outreach in the survey): the free
   audit link plus two specific sentences about *their* stated situation. "20 minutes of work before
   asking for 30 minutes of someone's time."
5. **Open with the damaging admission** (`HORMOZI`): not a CA, cannot file, no customers yet — *but*
   this is the only thing being worked on, and here is the written diagnostic. Bad, bad, bad, BUT
   good. His three real liabilities become the reason to believe him.
6. **Ask for ₹2,000.** Every conversation. Money-back if the diagnostic doesn't tell them something
   their CA hasn't. `SALES_PLAYBOOK.md`: "if nobody will pay ₹2,000, nobody was ever going to pay
   ₹20,000" — and that test has still never been run on one human.
7. **Follow up 3–4 times over two weeks** (`YC`), then leave it.

**One bounded exception, not a second channel.** `YC`'s single strongest finding is that customers
1–3 come from the personal network, with "basically no counter-examples." `GTM_REVIEW.md` §4 names
avoiding that channel as the clearest strategic error here. So: **one 30-minute block, Fri 28 Aug,
15 messages asking for introductions — once.** Not a daily motion, not a share of the 30 days. If it
produces an intro, that intro goes to the front of the pipeline and gets the full process
(`HORMOZI`: "sell warm like cold" — run the whole thing even for a friend, or you get neither the
sale nor the friendship).

### What stops, explicitly

| Stop | Why |
|---|---|
| **Cold email to agencies, and sourcing any new agency contacts** | 28 sent, 1 irrelevant reply. `GTM_REVIEW.md` §4: slowest and most indirect channel, asking BD staff to vouch for an unproven product. The existing 28 stay on their follow-up schedule — that's 10 minutes, not a motion. |
| **Building lead lists and research documents** | `CREATOR_LEADS_RESEARCHED.md` holds 30 sourced names and zero contacted. `YC`: prospecting tools only matter after 10–20 customers. Research is not the constraint; sending is. |
| **Content — X threads, video scripts, landing-page copy, SEO** | `GTM_REVIEW.md` §4: deprioritise until there is one paying customer to reference. The public answers already cover the "have a pulse" function. |
| **Product feature work on Raha** | Not the constraint. **One exception**, item D3a below: the audit still asks about "FIRCs" and never asks how the money arrives — a ~30-minute fix sitting directly in the conversion path. |
| **New positioning or strategy documents** | This is the last one. |
| **Anything costing money** | Budget is ₹0. |

---

## Kill criteria

Measured from `research/pipeline.db` — run `python3 scripts/pipeline.py stats` and it prints these
lines with a PASS/FAIL against each date. No judgement calls.

**Weekly volume floor — 12 substantive public answers + 5 DMs per week.**
Missing the floor two weeks running does not mean the channel failed; it means it was never run.
In that case do not switch channel — cut scope somewhere else and hit the floor.

| Date | Test | If it fails |
|---|---|---|
| **Wed 10 Sep (day 14)** | ≥24 public answers **and** ≥10 DMs sent, producing **≥3 two-way conversations** (a reply that goes past one message) | **Channel is wrong.** Switch primary to the warm network for days 15–30 — the `YC` 1–3 finding becomes the fallback rather than the exception. |
| **Wed 17 Sep (day 21)** | Of those conversations, **≥3 people have been explicitly asked for ₹2,000** | **The ask is missing, not the channel. Do not switch.** Ask on the next 5 conversations without exception. This is the most likely way this plan fails. |
| **Fri 26 Sep (day 30)** | **≥5 ₹2,000 asks made and ≥1 paid** | **Price and offer are wrong, not the channel.** The ₹20,000 founding seat is dead, and Phase 0 as currently sold is dead. That is the pivot signal the 3-customers-or-pivot gate has been waiting for since July — and it's an answer, which is more than the last 30 days produced. |

**The stop-planning rule: one paid ₹2,000 before day 30 validates the channel.** Keep running it.
Do not re-plan, do not write another strategy document, do not rebuild the product. Go get the
second one, and start asking "who else do you know who's dealing with this?" (`HORMOZI`).

---

## The 7-day queue

Every item is ≤90 minutes. Tick them in `docs/outreach/SEND_LOG.md` as they happen, not from plan.

**Standing block — 15 min, every day including the Razorpay days.** Check Reddit inbox, Gmail,
site email captures. Reply to anything live within 2 hours of seeing it. Log every touch:
`python3 scripts/pipeline.py log <id> <event>`.

### Thu 27 Aug — day 1

- **D1a · 30 min** — `python3 scripts/find-prospects.py --seed`. Loads all 15 researched threads
  from `ACUTE_PAIN_TARGETS.md` into `research/pipeline.db` (already done — run
  `python3 scripts/pipeline.py next` to see the queue). Then **either** spend 2 minutes creating a
  Reddit script app at reddit.com/prefs/apps and `export REDDIT_CLIENT_ID/SECRET` so `--search`
  works, **or** skip it and run the manual searches the script prints. Anonymous Reddit JSON search
  has been blocked since 2024 — verified today, `www` returns 403 and `old` redirects to a login
  wall — so this is a real 2-minute step, not an optional one. Either path is the day-1 test of
  assumption 1 below.
- **D1b · 60 min** — Post **2 substantive public answers** on Tier-3 FIRA-process threads
  ("why does requesting FIRC feel like pulling teeth", "struggling to get FIRC issued"). Lead with
  the 2016/FIRA correction. Zero mention of Raha. Log both.

### Fri 28 Aug — day 2

- **D2a · 30 min** — **The warm ask. 15 messages. Once.** Not "do you need this" — an intro ask, per
  `YC`: name who you want to meet, why they specifically would care, and what to put in the
  forwarded message. Template in `research/outreach-sequences.md` §4. This has been avoided for a
  month; 30 minutes closes it either way.
- **D2b · 60 min** — 3 more public answers, one of them a **teardown** (`HORMOZI`): take one
  person's stated setup and lay out exactly what their paperwork has to prove and where it breaks.

### Sat 29 Aug — day 3

- **D3a · 30 min** — Fix `src/components/audit/questions.ts`: change "FIRC" → "FIRC/FIRA", and add
  the rail question — *"How does the money reach you?"* → direct bank transfer / Wise-PayPal-Stripe
  / Skydo-Karbon-Payoneer / not sure. Ship it. This is the only product work in the 30 days, and it
  is the question that decides whether a lead is worth anything.
- **D3b · 60 min** — **DM Tier-1 threads #1 and #2** — the two people who asked to hire this scope
  verbatim. Sequence in `research/outreach-sequences.md` §1. No link in the first message.

### Sun 30 Aug — day 4

- **D4a · 60 min** — 3 public answers, working down the Tier-2 list (₹40L freelancer thread,
  AdSense+Patreon thread, Dodo Payments FIRA thread).
- **D4b · 30 min** — **DM Tier-1 #3 and #4.**

### Mon 31 Aug — day 5

- **D5a · 45 min** — **DM Tier-1 #5**, plus the 3 highest-scoring new threads the finder surfaced.
- **D5b · 45 min** — Dry-run the ₹2,000 deliverable once, timeboxed, against a synthetic case built
  from the AdSense+Patreon thread. Purpose is one number: **how long does the diagnostic actually
  take?** If it's over 3 hours, the price is wrong and you need to know that before someone pays.

### Tue 1 Sep — day 6

- **D6a · 60 min** — 3 public answers + clear every open reply.
- **D6b · 20 min** — `python3 scripts/pipeline.py stats`. Read the floor line. If behind, the
  shortfall carries into day 7 rather than being forgiven.

### Wed 2 Sep — day 7

- **D7a · 60 min** — **Follow-up #1** on every DM with no reply (`YC`: 3–4 touches over two weeks).
  Same thread, under 75 words, one CTA, nothing new to justify itself.
- **D7b · 30 min** — 2 public answers to hit the weekly floor. Then stop and check `stats`.

### Wed 3 – Fri 5 Sep — Razorpay carve-out

Standing 15-minute block only. Do not schedule sales work against the buildathon deadline; a
half-done application and a half-done week is the worst of both. Week 2's queue restarts Sat 6 Sep
and repeats the day-1–day-7 shape against the next tier of threads.

---

## The five assumptions this rests on

| # | Assumption | Cheapest test | Cost | By when |
|---|---|---|---|---|
| 1 | **There are enough live high-intent threads** to sustain 12 answers + 5 DMs/week for four weeks | `find-prospects.py --search` (needs a free Reddit script app, 2 min) or the manual search URLs it prints. Count distinct threads from the last 90 days not yet answered; the script prints the number. **Under 40 and the room is too thin** — widen to r/developersIndia, r/IndianFreelancers, r/IndiaInvestments and Indie Hackers before day 3, don't wait for day 14. The 15 seeded threads cover week 1 either way, so this tests week 2–4, not day 1's work. | 20 min | **Day 1** |
| 2 | **A DM from an account with real answer history gets a reply** from someone who publicly asked to hire for this | The 5 Tier-1 DMs are the test. Measure replies, not opens. `ACUTE_PAIN_TARGETS.md` predicts 1–3 real conversations from 5 DMs plus a week of answers — that is the number to beat. | ₹0 | **Day 7** |
| 3 | **Someone will pay ₹2,000 to a non-CA for a written diagnostic** | Ask. Five times. This is the one test that has never been run on a single human, and everything else — leads, positioning, competitive analysis — is downstream of it and cannot be resolved by more analysis. | ₹0 | **Day 21** |
| 4 | **The people reachable in this room actually have the problem** — i.e. they're on Wise/PayPal/Stripe or direct bank transfer, not already on a FIRA-issuing rail | The rail question, in every first reply. After 10 answers, count. **If most are already on Skydo/Karbon/Payoneer, the wedge is commoditised for this audience** and the target shifts to backfill (2+ years of history, which no rail solves) rather than forward paperwork. | one sentence | **Day 10** |
| 5 | **He will actually send the warm asks** — the honest one. This channel has sat unused for a month by choice, not absence | Binary. 15 messages on Fri 28 Aug, or not. If not sent by Sat 29 Aug, **stop counting the warm network as available** and remove it from the day-14 fallback — a fallback you won't execute is worse than no fallback, because it hides the real position. | 30 min | **Day 3** |

---

## Two corrections to the brief

**1. "FIRC per remittance" is wrong, and it's the credibility being sold.** Physical FIRCs were
discontinued for export remittances in 2016; banks issue a **FIRA**. `WEDGE_REALITY_CHECK.md` is
direct about the cost: to a CA or a GST officer, "FIRC" reads as someone who half-learned the topic.
Say "FIRC/FIRA" or "FIRA" everywhere, and use the correction as the opening move.

**2. "Most creators don't know this and are quietly non-compliant" is now only half true.** Skydo,
Karbon, Winvesta, Payoneer and PayGlocal issue FIRA automatically and free. The live wedge is
narrower and better: **Wise/PayPal/Stripe users who structurally cannot get a FIRA** (the money
lands as a domestic transfer, so the bank legally cannot issue one), **direct-bank-transfer earners**
(AdSense into SBI), and **anyone with 2+ years of history to backfill** — which no rail solves by
definition, because rails only work forward.

The pitch is not "we'll get you the FIRCs your CA never collected." It is:

> **"We prove your foreign income is a zero-rated export — whatever rail you used, including the
> ones that give you nothing, and including the years before you switched."**

---

## Where this research is thin — say it plainly

- **The single closest analogue in 25 hours of Hormozi is one Hotline call** (700 fishing-guide
  numbers → ~8% replied → ~15% converted). Those are an advisee's self-reported numbers, said aloud
  on a call, unverified. It is the only datapoint in the corpus from a solo operator with no budget
  working a hand-built list — which is exactly the situation here. Treat 8% as a shape, not a rate.
- **Nothing in the file is about India, GST, or a compliance sale.** Every number is US consumer
  services, gyms, agencies, or US B2B SaaS. Reply rates, price ladders and close rates do not
  transfer; the *mechanics* (ask in public, give before asking, follow up 3–4 times) plausibly do.
- **`YC` carries the whole weight of the top of the ranking and gives almost no verbatim scripts** —
  it says so itself: "no long verbatim scripts — it's a survey compilation." The wording in
  `research/outreach-sequences.md` is therefore built from `HORMOZI`'s script sections and Raha's own
  `ACUTE_PAIN_TARGETS.md` DM, constrained by `YC`'s rules (<75 words, one CTA, no AI-sounding lines).
  The structure is evidenced; the sentences are not.
- **No source in the file has ever sold to someone who already has a CA doing the job.** The
  CA-parity problem in `GTM_REVIEW.md` §1 — a Reddit commenter's CA doing this exact scope for this
  exact ₹20,000 — is the largest obstacle to a sale here, and the corpus offers exactly one relevant
  move against it: proof beats promise, so charge less until you have proof. That is thin, and it is
  why the plan is built to produce one paid customer rather than three.
