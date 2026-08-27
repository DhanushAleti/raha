# Painkiller audit — the operational half

**Written 2026-08-27.** Full reasoning lives in the report artifact; this file is only the
things you execute. If you find yourself reading rather than sending, close it.

`research/decision.md` says "new positioning or strategy documents — this is the last one."
This file is deliberately not one: no positioning, no analysis, no new plan. Scripts and dates only.

---

## The three verdicts, one line each

| Question | Verdict | The finding |
|---|---|---|
| Is it a painkiller? | **Amber** | The market is real and already paying ₹20,000/yr. But 4 of your 5 shipped features are vitamins, and they serve the pains that are getting *better*. |
| Is there an unfair edge? | **Amber** | Not "fast builder." It is 90 minutes of manual evidence forensics at a price no CA will match and no payment rail will touch. |
| Has it been validated? | **Red** | Never attempted. There is currently no way for any human to give Raha money. |

**The consequence: price is the positioning.** At ₹20,000 the comparison set is a licensed CA who
does more and carries liability. At ₹2,000 there is no comparison set — no CA sells a ₹2,000
forensic evidence check, because it is uneconomic at their hourly rate. Take the ₹20,000 seat and
the seat counter off the landing page. It becomes something a happy ₹2,000 customer asks for.

---

## The correction to `research/decision.md`

The riskiest assumption is not "does the pain exist" (proven) or "will people pay for this"
(proven — they pay CAs). It is: **will someone with this pain pay a stranger with no credential
and no referral?** A warm intro deletes the word *stranger*, which is the untested variable.

- Reddit has **pain without trust** — and `ACUTE_PAIN_TARGETS.md` requires 2–3 weeks of public
  answers before the Tier-1 DMs can land. It structurally cannot produce a payment in 7 days.
- The network has **trust without pain** — nobody in a 2028 IITM batch has ₹20L foreign income,
  but their second degree does.

**So the 15 warm asks are the primary 7-day test, not a 30-minute box-tick on day 2.** Reddit runs
in parallel as the long game it actually is. Everything else in the 30-day plan stands unchanged.

---

## The 7-day sprint

| Day | Do |
|---|---|
| **Thu 27 Aug** | UPI collect link saved to phone. Offer as PDF. Ship the ₹2,000 button on `/audit` red/amber result (replacing the email gate as primary action) + rail question in `questions.ts`. **Last product work for 30 days.** |
| **Fri 28 Aug** | **15 warm intro asks. All of them. Forward pre-written.** Not sent by Sat → delete the warm network from every plan. |
| **Sat 29 Aug** | One full diagnostic, free, in public, as a teardown (AdSense+Patreon thread). 90 min. Your only proof and only ad. |
| **Sun 30 Aug** | 3 public answers opening with the FIRC→FIRA correction. DM Tier-1 #1 and #2 (script C). |
| **Mon 31 Aug** | DM Tier-1 #3–#5. Then the two **already-burned** threads (scripts A and B) — most likely first payment in the whole list. |
| **Tue 1 Sep** | Work every warm reply. Any intro goes to the front and gets the full process — same rail question, same ₹2,000 ask. |
| **Wed 2 Sep** | Follow-up #1 on every silent thread (<40 words, asks for money not a call). `python3 scripts/pipeline.py stats`. |
| **Thu 3 Sep** | **GATE: one paid ₹2,000, or Razorpay takes September.** Money received and UPI reference logged. Not "promising conversations." |

---

## The one-page offer

> ### The Foreign Income Evidence Check
>
> **Promise.** Every foreign credit you received in the period, matched line by line to the document
> behind it — FIRA, NOC, bank advice, or nothing — and a written statement of which ones stand up as
> zero-rated exports and which do not, with the rupee exposure on the ones that do not. Plus whether
> your LUT is where it needs to be.
>
> **Timeline.** 48 hours from payment.
>
> **Price.** ₹2,000 by UPI. Money back if it does not tell you something your CA has not.
>
> **Not this.** Not a filing. Not a CA opinion. Not tax advice. A written reconciliation you hand to
> whoever files for you.
>
> *Every figure is an estimate — verify with your CA before filing. Raha does not file returns on
> your behalf and does not provide licensed tax advice.*

No logo. No deck. No brand story. One page.

---

## The ten, in payment-likelihood order

Not tier order — the already-burned outrank the shoppers. All ten are in `research/pipeline.db`
and none has been contacted.

| # | Thread | Why first | Script |
|---|---|---|---|
| 1 | I filed GST as Exempt instead of Export | Already burning, dated problem, wrong filing on record | A |
| 2 | eFIRA/FIRC for payments since 2022 | Pure backfill — no rail solves backwards | B |
| 3 | Handle international payments via 44ADA — FIRC, LUT, GST | Your scope, requested verbatim | C |
| 4 | Freelancer IT income ~₹40L from US client | Dead centre of the band | C |
| 5 | AdSense + Patreon, SBI, no FIRA | Direct rail, max exposure; already commented once | C |
| 6 | Second opinion on 44ADA, GST & CA advice | 42 comments questioning their own CA | C |
| 7 | Dodo Payments founders — getting FIRAs? | One answer reaches a whole thread | A |
| 8 | Expert CA for LLP, software export to US | Actively shopping, needs LUT | C |
| 9 | CA rec: freelancer, USD income, 44ADA | Shopping, 32 comments — lead with the correction | C |
| 10 | CA rec: first-time filer, foreign client | Highest confusion, lowest budget | C |

---

## Scripts

**Every one of these ends in an ask for money.** Not a call, not a chat, not "happy to help."
The day-21 kill criterion counts asks because the likeliest way this fails is the ask never gets made.

### A · the already-burned

> You filed exempt instead of export. The recoverable part depends on one thing nobody in the thread
> asked you: do you hold a FIRA for each of those remittances, and was the LUT filed before your first
> export invoice that year? Exempt-instead-of-export is fixable on paper. Export with nothing
> underneath it is the expensive one.
>
> I'm not a CA and I don't file. What I do is the reconciliation — every foreign credit matched to the
> document behind it, in writing, and the rupee exposure on the ones with nothing. ₹2,000 by UPI,
> 48 hours, money back if it tells you nothing new.
>
> Want me to start on it? And if you'd rather just have the answer for free, ask here and I'll answer here.

### B · backfill

> Since 2022 means backfill, and no rail solves backwards — Skydo and Karbon only work forward from
> the day you joined, so switching doesn't touch the old credits.
>
> For those, your bank has to raise the IRM in EDPMS and issue the FIRA against it retroactively, and
> what they'll ask you for depends entirely on how each payment arrived. If any of it came via Wise or
> PayPal, that's a different and worse conversation — the money landed as a domestic transfer and the
> bank legally can't issue a FIRA at all.
>
> I write this up per remittance: what exists, what doesn't, what to ask the branch for, and the
> exposure on the gaps. ₹2,000, UPI, 48 hours, money back if it's useless to you. Want me to start?

### C · they asked to hire

> Saw your post — you're looking for someone on FIRC/LUT for foreign payments.
>
> One thing first, because it's why the branch keeps bouncing you: banks stopped issuing FIRCs for
> export remittances in 2016 (RBI A.P. DIR circular 74). What you want is a FIRA, raised against the
> IRM your bank files in EDPMS. Same evidentiary job under GST, different name, different process.
>
> I'm not a CA and I don't file. I do the reconciliation: every foreign credit matched to what's
> actually behind it, and a written statement of which ones survive as zero-rated exports and which
> don't, with the rupee number on the ones that don't. ₹2,000, UPI, 48 hours, money back if it tells
> you nothing your CA hasn't.
>
> Want me to start on it? One thing that changes the answer completely — how does the money reach you:
> bank transfer, Wise/PayPal/Stripe, or Skydo/Karbon/Payoneer?

*These run over the 75-word rule in `research/outreach-sequences.md`. Deliberate: the 74-word version
has no ask in it, and a message with no ask cannot produce a payment. Never send C from an account
with no answer history — a DM from an empty account gets reported and a ban costs the whole channel.*

### Follow-up · touch 2, day 3

> One more thing on this: if any of it arrived through Wise, PayPal or Stripe, your bank can't issue a
> FIRA against it at all — it lands as a domestic transfer. Catches most people.
>
> ₹2,000 and 48 hours and you'll know exactly where you stand. Say go and I'll send the UPI request.

### The warm ask · 15 messages, Fri 28 Aug

> Hey — building something and I need one intro, not a favour-favour.
>
> I work on GST for people earning in foreign currency. Specifically the paperwork that proves it's a
> zero-rated export — FIRA and LUT. Most people find out it's missing when it's expensive.
>
> Do you know anyone billing foreign clients? Freelancer, indie SaaS, consultant, agency, YouTube.
> Anyone over roughly ₹20L a year.
>
> If yes, I'll write the forward for you so it's one paste.

Then send the pre-written forward immediately (`research/outreach-sequences.md` §4). This ask fails
when they have to compose it themselves.

---

## The holes — why they say yes and never pay

| Hole | Counter |
|---|---|
| **"Let me ask my CA first"** — CA says "I've got it," free, deal dies silently | Give away the four questions to put to the CA. The **non-answer is the conversion event.** Follow up in 3 days: "what did they say?" This sequence does not exist yet — build it. |
| **No deadline** — nobody buys an undated fear | Only sell to people with a date: LUT renewal before the FY's first export invoice, a GSTR deadline, a notice in hand, a filing already made wrong |
| **Trust with financial records** | Minimum intake, say why each item is needed, let the public teardown vouch. Never ask for credentials, PAN images, or full statements |
| **₹2,000 is awkward** | Keep it. The payment is the signal, not the margin. Never discount — change the terms instead: two intros and it's free |
| **The report ends in more work for them** | Line up the revenue-share CA. Open gate since July; cheapest conversion increase available |
| **Reddit selects for non-payers** | Exactly why the ask goes in message one. One message tells you which kind of person you have |

---

## The decision this forces — before Fri 5 Sep

Raha and Nostro cannot both be primary in September. Buildathon acceptance means Bangalore, in
person, six months from September — that ends Raha as a solo motion whether or not you decide it does.

- **One paid ₹2,000 by Wed 3 Sep** → Raha earned September. Apply to the buildathon anyway (cheap,
  no resume screening), but Raha is primary and the 30-day plan runs to 26 Sep as written.
- **No payment by Wed 3 Sep** → after five weeks plus one week of genuine ask-carrying outbound, the
  honest read is this doesn't sell in your hands at this price this quarter. Nostro gets September.
  The site stays live, the audit keeps capturing, the queue is still there in January.

The failure case is arriving at 5 Sep having done neither properly.

---

## 72-hour checklist

- [ ] UPI collect link / static QR saved to phone — **without this nothing else can be tested**
- [ ] One-page offer exported as PDF (copy above)
- [ ] ₹2,000 button live on `/audit` red/amber result, replacing the email gate as primary action
- [ ] Rail question added to `src/components/audit/questions.ts` (same commit)
- [ ] ₹20,000 founding seat + seat counter removed from the landing page
- [ ] 15 warm intro asks sent — Fri 28 Aug
- [ ] One free public teardown posted — Sat 29 Aug
- [ ] Reddit script app registered (2 min) so `find-prospects.py --search` works — assumption 1 is untested
- [ ] Already-burned threads messaged before any Tier-1 shopper
- [ ] Every touch logged: `python3 scripts/pipeline.py log <id> <event>`
