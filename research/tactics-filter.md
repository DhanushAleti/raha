# Step 1 + 2 — filter and rank

Input: `research/tactics-raw.md` (31 videos, 6 marked UNUSABLE and ignored).

**Source weighting applied.** All 25 usable Hormozi videos are treated as **one source** (call it
`HORMOZI`). Repetition across them is one man repeating himself, not corroboration. The Y Combinator
survey (`YC`) is weighted equal to all of `HORMOZI` combined: it is a compilation of dozens of
founders answering the same question, and it is the only source in the file whose stated situation
matches — solo, pre-first-customer, B2B, no budget, no audience. One further source, the
"Alex Hormozi's Lead Generation Strategy for 2026" video by an unidentified YouTuber, is
`THIRD-PARTY` — it is an affiliate-driven repackaging of Hormozi that pushes Instantly.ai. It is
weighted near zero and nothing survives from it that isn't independently in `YC` or `HORMOZI`.

## Situation as scored (assumptions marked)

Five fields were left `[FILL IN]`. Four are answerable from the repo and are not assumptions:

| Field | Value | Source |
|---|---|---|
| Paying customers | **0** | `docs/STATE.md` — "Revenue: ₹0. Customers: 0. Calls booked: 0." |
| Price | **₹2,000 diagnostic** (entry) / ₹20,000 annual founding seat | `docs/STATE.md`, `SALES_PLAYBOOK.md` |
| Audience | **None public.** A real warm network exists (IIT Madras, 2028) and is **deliberately unused** | `GTM_REVIEW.md` §4: "Avoiding the warm channel. The clearest strategic error." |
| Prior result | **28 cold emails, 0 bounces, 1 reply** (a UAE resident, out of scope). No audit link in any of them | `SEND_LOG.md`, `GTM_REVIEW.md` §2 |

Two are genuine unknowns. **I assumed rather than blocked, because no plausible value changes the
answer** — every surviving tactic below costs ₹0 and fits inside a single-digit weekly hour budget:

- **Hours/week: 10.** Full-time IITM student. If it's 6, the plan still runs at reduced volume; if
  it's 20, run the queue at 2× and the kill dates halve.
- **Budget: ₹0–2,000/month.** Every tactic requiring spend is killed below regardless.

Correct these two at the top of `research/decision.md` if they're materially off.

---

## Step 1 — Filter

Aggressive, as instructed. The full corpus is roughly 180 distinct tactics. What follows is the
~20% that survives, then the specific preconditions that killed the rest.

### APPLICABLE — run as written

| # | Tactic | Source video | Why it survives here |
|---|---|---|---|
| A1 | **Work your warm network in order (customers 1–3)** — personal network → 2nd-degree LinkedIn intros, with a specific ask (who, why they'd care, what to put in the forwarded email) | `YC` — *How to Get Your First 10 Customers* | Survey found "basically no counter-examples." Directly attacks the one blocker his own GTM review names as the clearest strategic error. |
| A2 | **Show up where customers complain in public** — find old threads about the exact problem and DM every commenter one by one | `YC` — *How to Get Your First 10 Customers* | `ACUTE_PAIN_TARGETS.md` already holds 5 threads where people **asked to hire this exact scope, verbatim**. One YC founder said Reddit was the source of his first 10. Cost ₹0. |
| A3 | **Give bespoke value before asking** — "20 minutes of work before asking for 30 minutes of someone's time"; the cited examples are a vulnerability scan, an app walkthrough, a short audit note | `YC` — *How to Get Your First 10 Customers* | This *is* Raha's free audit plus a written FIRA-coverage read. The asset already exists and is live. YC calls it the highest-converting outreach. |
| A4 | **Outreach copy rules** — under 75 words, one unambiguous CTA, read it aloud and cut anything you wouldn't say, follow up 3–4× over two weeks | `YC` — *How to Get Your First 10 Customers* | Free. The 28 sent emails were never tested against this. |
| A5 | **Answer "where does my buyer actually spend their time?" before picking a channel** | `YC` — *How to Get Your First 10 Customers* | Already answered by evidence: 28 agency inbox emails → 1 irrelevant reply; r/IndiaTax → dozens of people typing the problem unprompted. |
| A6 | **The 1–3 / 4–10 / 10–50 staged frame**, incl. "prospecting tools only start to matter once you have 10–20 quality customers" | `YC` — *How to Get Your First 10 Customers* | Kills the standing instinct to build a sixth lead list. `GTM_REVIEW.md` §4 independently: "Research is not the constraint. Sending is." |
| A7 | **ACA warm-up (Acknowledge, Compliment, Ask) + invite-their-friends as a favour, not a pitch** | `HORMOZI` — *Watch this to get your first 5 customers* | The social mechanics that make A1 executable by someone who finds the ask uncomfortable. Asking a favour is a different act from pitching. ₹0. |
| A8 | **Reveal-a-problem lead magnet; never solve the CORE problem with the free thing; sell at the point of greatest deprivation** | `HORMOZI` — *Watch This To Generate 1000s of Leads* | The audit reveals exposure and does not fix it. Already correctly built. |
| A9 | **Damaging admission — "bad, bad, bad, BUT good"** | `HORMOZI` — *Sell Anything To Anyone With This Unusual Method*; *How To Get Customers So Fast* | Unusually well-fitted. His three real weaknesses (not a CA, cannot file, no customers yet) become the trust device instead of the thing to hide. |
| A10 | **"Your promise is not unique — your proof is"** | `HORMOZI` — *Learn Paid Ads in 30 Minutes* | Operates as a constraint, not a tactic: with zero proof, ₹20,000 is unsellable against a CA charging ₹20,000 for the same scope. Forces ₹2,000 first. |
| A11 | **Sell warm like cold** — run the full process even for friends and referrals; never treat a friend as a warm lead | `HORMOZI` — *1 Hour of Alex Hormozi on Getting Customers* | The specific failure mode that wastes warm intros. Pairs with A1. |
| A12 | **"Who else do you know who might also want this?"** (never "do you know anybody?") | `HORMOZI` — *7 Ways To Get Customers for Free* | Costs one sentence. Applies from customer #1 onward, and from every *conversation*, not just every sale. |
| A13 | **Never discount the core — change the terms instead** ("refer me three friends and I'll give you that discount") | `HORMOZI` — *How to Start a Business From Nothing*; *7 Ways To Get Customers for Free* | ₹2,000 is already the floor. The only move below it is terms. |
| A14 | **Guarantee formula: "if you don't achieve X by Y, I will Z"** | `HORMOZI` — *How to Start a Business From Nothing* | A ₹2,000 money-back diagnostic guarantee costs nothing to offer and directly answers "who are you." |
| A15 | **Start charging the moment people refer you** — referral is the signal you're good enough | `HORMOZI` — *Watch this to get your first 5 customers* | The trigger for moving ₹2,000 → ₹20,000. Prevents indefinite free work. |

### ADAPTABLE — with the exact modification

| # | Tactic | Source video | Exact modification |
|---|---|---|---|
| B1 | **Rule of 100** — 100 manual reach-outs/day for 90 days | `HORMOZI` — *Easiest Way To Get Your First 5 Clients [if you have no budget]* | The `$100/day ads` half is dead (₹0 budget). The reach-out half is written for a full-time operator; 100/day is ~4 hrs/day. **Modify to a weekly floor, not a daily one: 12 substantive public answers + 5 DMs per week**, which is ~5 hrs and fits 10 hrs/week with the sell time. Keep the underlying claim — insufficient volume presents as volatility — and keep the diagnostic ("am I hitting the floor, yes or no") as a binary weekly self-check. |
| B2 | **Manual list from public search → 1-to-1 message offering a free guide** (700 fishing-guide numbers found by hand on Google → ~8% replied "sure" → ~15% converted on the page) | `HORMOZI` — *1 Hour of Alex Hormozi on Getting Customers* (Hotline segment) | Closest analogue in the whole corpus to this exact situation, and it carries self-reported numbers. **Modify the sourcing**: not Google-scraped phone numbers, but Reddit thread authors who already typed the problem — strictly higher intent. **Apply Hormozi's own redirect from that same segment**: stop targeting people with no money; qualify on ₹20L+ foreign income before spending a DM. |
| B3 | **Reframe outreach as advice/mentorship/review, not a pitch** | `YC` — *How to Get Your First 10 Customers* | YC's caveat is load-bearing here: only if genuine. On Reddit the fake version isn't just tacky, it gets the account banned and costs the channel permanently. **Modify to: answer the question in public, completely, with no mention of Raha; the offer only ever appears in a DM, after the public answer exists.** This is what `ACUTE_PAIN_TARGETS.md` already prescribes. |
| B4 | **Content = "having a pulse"; post every 3 days on the same platform you outreach on, because prospects click your profile before replying** | `HORMOZI` — *1 Hour of Alex Hormozi on Getting Customers* | **Do not run this as a content channel** (X threads and video scripts are killed below). On Reddit, comment history *is* the profile. **Modify to: the public answers in B3 double as the pulse.** Zero extra hours. |
| B5 | **Speed to lead — respond in under a minute; >5 min drops close rate 80%** | `HORMOZI` — *The Ultimate Sales Training for 2026* | A full-time student cannot be always-on, and the underlying numbers are unsourced. **Modify to a 2-hour reply SLA during waking hours, and same-day or next-day call slots.** The directionally-true part (be fast, offer specific times) is free; the sub-minute version isn't achievable. |
| B6 | **Teardown value-posts in local business groups** | `HORMOZI` — *Watch this to get your first 10 customers* (Hotline) | **Modify the venue**: not local Meta groups, but the FIRA/LUT threads themselves — a public teardown of what a specific person's paperwork actually has to prove. Same mechanic, correct room. |
| B7 | **Three-letter method — interview target buyers like a sales call to get their exact words** | `HORMOZI` — *"I'm Broke, What Business Do I Start?"* | **Modify: fold it into the first call rather than running separate research calls.** Separate interview calls are a research activity, and research is not the constraint. The first 10 minutes of every diagnostic call is the interview. |
| B8 | **Pre-sell: sell fast, delay delivery** | `HORMOZI` — *How to Start a Business From Nothing* | **Modify to a 72-hour delivery promise on the ₹2,000 diagnostic.** The full version (pre-sell 3/6/12 months) requires a trusted brand he doesn't have. |
| B9 | **Naming: advertise the result, not the vehicle; be specific enough to pass banner-blindness** | `HORMOZI` — *Watch This To Generate 1000s of Leads*; *"I'm Broke…"* | **Modify the vocabulary, not the mechanic** — see the FIRC/FIRA correction below. "FIRC reconciliation" names a vehicle *and* uses a word that's been wrong since 2016. |

### DEAD — and the specific precondition missing

Grouped by the precondition, because the same missing thing kills whole blocks.

**Missing: ad budget.** Everything in `Learn Paid Ads in 30 Minutes` (lookalike audiences, global
retargeting / the "shadow funnel", 70/20/10 creative allocation, slicing the first 3 seconds onto
100+ ads, compliance-audit firms, awareness-stage layering to break a spend plateau, the CAC
diagnosis tree, absolute-return-over-ROAS); the `$100/day` half of the Rule of 100; pre-selling to
test markets with $500–1,000 across 5–10 markets; the weekly 50-hook ad-creation session; the
kaleidoscope remix process; ethical monopoly by out-bidding on LTV; "be able to spend more."

**Missing: a team.** The entire sales-team turnaround (show/offer/close/cash/units and their fixes);
scaling 0→40 reps; the 6 C's; feed the killers; hire-a-director; daily huddles and game tape; the
off-call SOP; the full-time lead-nurture "maniac" who calls in 60 seconds; profit-share operators;
the Platinum Rule; friends-with-employees; "fewer, better" marketing headcount; doing≠teaching;
vagueness-scales-with-skill; the management diamond.

**Missing: an existing customer base or list.** The gift-card play; discount-for-3-referrals;
the appreciation event; the 3-way selfie intro at the success moment; the spouse request; quarterly
internal plays; the proactive downsell; **all 13 retention tactics** in *How to Get Your Customers to
Stay FOREVER*; **the entire email-marketing masterclass** (segmentation, preview text, cadence,
annual renewal fee, A/B tested subjects) — there is no list; lookalikes needing 1,000+ emails;
Skool/group funnels; "steal from yourself 70/20/10" (no proven winner exists to steal from).

**Missing: capital, scale, or an existing business to analyse.** Client-financed acquisition and the
15 money-model mechanisms; rebates to force activation; the waved-fee illusion of choice; ACQ-AI /
consultant-at-scale; data-first-before-AI-first; the Vista data-room 20/80 exercise; the five ways to
expand a market; "what would it take to be number one"; ranked split tests and third-party
integration swaps (no traffic to test on); multi-agent SDR; buy-tactics-via-a-mastermind; barter
(nothing to barter — the service is the thing being sold).

**Missing: travel budget, geography, and hours.** Fly-outs (four weeks in a row; the Hawaii
8-minutes story); conference mini-playbooks with back-to-back Calendly slots; micro-dinners at
$50–100/head for 6–10 people. `YC` rates these highest of anything for customers 4–10 and I am still
killing them — a student in Chennai on ₹0 cannot fly to a buyer, and dinner for eight is a month of
budget. The one salvageable residue is folded into A1: if a warm intro is physically nearby, meet in
person rather than on a call.

**Missing: an audience, and disqualified by his own review.** The 35,000-pieces-a-year volume
argument; SPCL; go-live-and-interactive; "the content is the targeting"; the give:ask 3.5:1 ratio;
X threads and video scripts. `GTM_REVIEW.md` §4 already ruled: "Content. Deprioritise until there is
one paying customer to reference." Nothing in the corpus overturns that for a 30-day window — and
`HORMOZI`'s own framing of content is as a *nurture* layer, not a demand source.

**Disqualified on the evidence rather than a precondition.** The `THIRD-PARTY` lead-gen video's
whole apparatus — Instantly.ai leadfinder, AI-personalised first lines, "you're grossly
underestimating the volume," 11,000-name lists. It is affiliate content, its numbers are tool
outputs rather than results, and its core prescription is the exact motion that has already produced
1 irrelevant reply from 28 sends here.

### One correction to the brief, before anything is ranked

The brief describes the wedge as "an FIRC per remittance." **Raha's own research says that is
wrong, and says so at length.** Physical FIRCs were discontinued for export remittances by RBI
A.P. (DIR Series) Circular No. 74 in 2016; what banks issue now is a **FIRA**. `WEDGE_REALITY_CHECK.md`
is blunt about the cost: to a CA or a GST officer, saying "FIRC" reads as someone who half-learned
the topic — which is precisely the credibility being sold.

Two knock-ons for the filter, both of which change what gets ranked:

1. **"Most creators don't know this and are quietly non-compliant" is now only half true.** Skydo,
   Karbon, Winvesta, Payoneer and PayGlocal all issue FIRA automatically and free. Pitching
   FIRA collection to someone on a modern rail is pitching a free feature they already have.
2. **The live wedge is narrower and better**: people on Wise / PayPal / Stripe, who *structurally
   cannot* get a FIRA because the money lands as a domestic transfer; people paid by direct bank
   transfer (AdSense into SBI); and anyone with 2+ years of history to backfill, which no rail
   solves by definition.

This is why B9 exists and why the qualifying question below is load-bearing rather than cosmetic.

**Flagged, not fixed:** `src/components/audit/questions.ts` still asks *"Do you collect **FIRCs**
for your foreign payouts?"* and still has **no question about how the money arrives** — the one
variable that decides whether this person has a problem worth paying for. `WEDGE_REALITY_CHECK.md`
lists that question as an immediate correction; commit `ac14f26` fixed the *report copy* only. Left
alone here because it is outside what Step 4 was asked to build, but it is a ~30-minute fix sitting
in front of the conversion mechanism, and it is item D3 in the decision's queue.

---

## Step 2 — Rank

Scored 1–5, higher is better. **Signal** = days to a readable yes/no. **Hours** = fit inside
10 hrs/week. **Cost** = fit inside ₹0. **Wedge** = fit with the FIRA/LUT wedge *specifically*, not
with selling in general. **Evidence** = stated numbers beat bare assertion; a survey of dozens beats
one man's anecdote.

| Rank | Tactic | Signal | Hours | Cost | Wedge | Evidence | Total | Evidence note |
|---|---|---|---|---|---|---|---|---|
| **1** | **A2** — show up where they complain in public (r/IndiaTax) | 5 | 4 | 5 | 5 | 5 | **24** | `YC` survey; one founder's first 10 came from Reddit; another did 2–5 posts/day for months and got customers despite shadowbans. Locally corroborated: 5 threads already exist where people asked to hire this exact scope. |
| **2** | **A3** — bespoke value before asking (the audit + a written FIRA read) | 5 | 4 | 5 | 5 | 4 | **23** | `YC` calls it the highest-converting outreach; "20 minutes of work before asking for 30 minutes." The named examples (vulnerability scan, audit note) are structurally identical to a FIRA-coverage read. |
| **3** | **A1** — warm network, customers 1–3 | 3 | 5 | 5 | 3 | 5 | **21** | Strongest single finding in the file: "basically no counter-examples." One founder sourced ~half her batch's customers via LinkedIn intros. Wedge fit only 3/5 — an IITM 2028 cohort mostly doesn't have ₹20L+ foreign income; the value is in the *second* degree. |
| **4** | **A9** — damaging admission | 5 | 5 | 5 | 4 | 2 | **21** | Bare assertion, no numbers, one source. Ranks high anyway because it costs one paragraph, applies today, and is the only tactic in the corpus that turns "student, not a CA, zero customers" from a liability into the reason to believe him. |
| **5** | **B2** — manual list → 1-to-1 DM to people who already named the problem | 4 | 3 | 5 | 5 | 4 | **21** | Self-reported: 700 messages → ~8% "sure, send it" → ~15% converted. Weak provenance (an advisee's own numbers on a call), but it is the only datapoint in the file from a solo operator with no budget working a hand-built list. |
| **6** | **A4** — copy rules (<75 words, one CTA, read aloud, 3–4 follow-ups) | 4 | 5 | 5 | 3 | 4 | **21** | `YC`, with specifics. Cheap and immediately testable against the 28 sends that ignored all of it. |
| **7** | **A10 + A14** — proof beats promise, so lead with ₹2,000 and a money-back guarantee | 4 | 5 | 5 | 5 | 3 | **22** | "Your promise is not unique, your proof is" is asserted, not measured. But it is the only thing in the corpus that resolves the CA-parity problem in `GTM_REVIEW.md` §1, which is the single largest obstacle to a sale here. |
| **8** | **A7** — ACA + invite-friends-as-a-favour | 3 | 5 | 5 | 3 | 2 | **18** | No numbers. Ranked for its function: it is the mechanism that makes A1 actually happen rather than being avoided for another month. |
| **9** | **B1** — Rule of 100, adapted to a weekly floor | 4 | 2 | 5 | 3 | 3 | **17** | "~1% respond" and "30:1 returns" are unsupported, and the "I guarantee you'll have customers in 90 days" line is exactly the kind of claim the file itself flags. The transferable part is the binary weekly self-check. |
| **10** | **A11** — sell warm like cold | 3 | 5 | 5 | 3 | 2 | **18** | Asserted. Cheap insurance on the A1 intros: the documented failure is treating a friend as a warm lead, skipping the process, and getting neither the sale nor the friendship. |
| **11** | **A12 / A13 / A15** — "who else", terms-not-price, charge once they refer | 2 | 5 | 5 | 3 | 3 | **18** | "1 in 3 send one or two others" and "30–50% more sales" are unsupported. Ranked low on signal only because they need a conversation to exist first. |
| **12** | **B5 / B8** — 2-hour reply SLA, 72-hour delivery | 3 | 4 | 5 | 3 | 2 | **17** | The "391% / <1 minute" numbers are unsourced and unachievable here; the directional version costs nothing. |
| **13** | **B6 / B4** — public teardowns doubling as the pulse | 3 | 3 | 5 | 5 | 2 | **18** | No numbers. Folded into #1 rather than run separately, so its real cost is zero. |
| **14** | **A8 / B9** — reveal-a-problem magnet, named by result | 3 | 4 | 5 | 5 | 3 | **20** | "3–5× more of the same traffic" is unsupported. The asset already exists; what's ranked is the naming and qualifying fix, not building anything. |

### Where two survivors contradict — one pick, with the reason

**Contradiction 1 — `HORMOZI` says work free and cap it at 5; the ₹2,000 test says charge.**

`Watch this to get your first 5 customers` is explicit: give it away free in exchange for use,
feedback, and a review, cap at five, and you're getting the better end of the trade. `YC` says
something adjacent but not identical — give a *small bespoke artifact* free, then ask for the
meeting. And Raha's own `SALES_PLAYBOOK.md` says: "if nobody will pay ₹2,000, nobody was ever going
to pay ₹20,000," a test that has never been run on a single human.

**Pick: charge ₹2,000. Free work stops at the audit and one 20-minute call.**

Hormozi's free-work prescription solves a problem Dhanush does not have — it exists to prove you can
*deliver* and to manufacture testimonials when you've never done the work. The binding constraint
here is not delivery confidence, it is **proof that anyone will pay anything**, and free work cannot
generate that signal by construction. It also spends the scarcest resource in the plan: hours. Ten
hours a week does not survive five free full diagnostics. One narrow exception, and it must be
deliberate: if a warm intro will give a named, public testimonial, that first one can be free —
but the ₹2,000 gets asked for first, every time, and free is the fallback, never the opener.

**Contradiction 2 — `HORMOZI` says cold outreach is the correct beginner play; `YC` says cold email
is the default trap.**

`1 Hour of Alex Hormozi on Getting Customers`: ads are skill-gated, so outbound is where a beginner
starts. `YC` opens with the opposite warning — don't default to cold email/LinkedIn because it's easy
and feels like work; many buyers don't live in their inbox; one founder closed more in 3 days at a
trade show than in 3 months of cold email.

**Pick: `YC`.**

Three reasons, in order of weight. First, the experiment has already been run *here*: 28 emails,
zero bounces, one reply from someone out of scope — and `GTM_REVIEW.md` §2 correctly notes it tested
almost nothing, because the converting mechanism (the audit link) was deliberately left out of every
message. Re-running a barely-tested motion is not the same as testing it, and it is not worth 30 days.
Second, `YC`'s question — where does the buyer actually spend their time? — has a documented answer
in this repo: not in agency inboxes, but in public threads typing the word "FIRC" unprompted.
Third, source weighting. This is exactly the axis on which one operator's assertion should lose to a
survey of dozens, and on which `HORMOZI`'s premise (a full-time operator who can absorb 100
reach-outs a day) diverges most from the situation being scored.

**Contradiction 3 — `HORMOZI` says pick ONE Core Four method and go all in; `YC` says network for
1–3, then unscalable things for 4–10.**

These conflict less than they appear: both describe founder-led 1-to-1 conversation, differing only
on sourcing. Resolved in `research/decision.md` by naming one channel and giving the warm network a
single bounded action rather than a share of the 30 days.

---

Continued in **`research/decision.md`**.
