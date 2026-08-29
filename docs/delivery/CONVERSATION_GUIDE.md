# The conversation guide

Dhanraj Sundaram's Customer Discovery Questionnaire, adapted to Raha. His method is sound and
mostly unchanged; what is added is the rail question, the CA-cost anchor, and the disqualification
script, because those three are specific to this product and no generic guide contains them.

**Use it for the twenty diagnostic conversations** promised in the Nirmaan seed-fund answer, and for
the first call with anyone who replies to a DM. Log every one:
`python3 scripts/pipeline.py log <id> <event>`.

**One rule above all the others, and it is already the house rule in `docs/STATE.md`:** ask about
their past, never their hypothetical future. "What did you pay your CA last year" is evidence.
"Would you pay ₹2,000 for this" is a lie they tell to be nice.

---

## Open — say this, then stop talking

> Thanks for the time. I'm trying to understand how people who bill foreign clients actually handle
> the GST side. **I'm not selling you anything on this call.** Be blunt with me, you won't hurt my
> feelings, and if it turns out you don't have this problem I'll tell you that and we can both get
> our time back.
>
> Can I start with how the money reaches you?

The last line is deliberate. It opens on the qualifier rather than warming up to it.

---

## 1 · The rail question — always first, and it decides the whole call

> **How does the money actually reach you? Direct bank transfer, Wise, PayPal or Stripe, or something
> like Skydo, Karbon or Payoneer?**

| Answer | What it means | What to do |
|---|---|---|
| **Skydo, Karbon, Payoneer, Winvesta, PayGlocal** | FIRA is issued automatically and free. **No problem to sell.** | Disqualify them, out loud, now. Script below. |
| **Wise, PayPal, Stripe** | The bank legally cannot issue a FIRA. Structural, not their fault. | Highest-value conversation on the list. Keep going. |
| **Direct bank transfer** (AdSense into SBI, a client wiring you) | Nothing exists unless requested, per remittance. | Second best. Keep going. |
| **"Not sure"** | Genuinely common. | Ask which app or bank the money lands in, and work it out from there. |

**Also ask, because no rail solves it:** *"How many years back does your foreign income go?"*
Two or more years of history is the part every platform leaves unsolved by construction.

### The disqualification script — say it, do not skip it

> Honestly? You're already covered. Skydo issues the FIRA automatically on every payment and it costs
> you nothing. Download them from the dashboard and you're done. **I'd be selling you something you
> already have.**
>
> One thing though, if it's useful: that only works forward from the day you joined. Anything before
> that has nothing behind it.
>
> And since I've got you, who else do you know who bills foreign clients?

Telling someone they don't need you is the most credible thing you will say all week, and it is the
cheapest referral you will ever get.

---

## 2 · What they do today, and what it costs

Past behaviour only. If they drift into "usually" or "we plan to", pull them back: *"Sorry, just so
I follow, what happened the last time?"*

1. Walk me through what happened the last time you filed. Who did what?
2. **What did you pay your CA last year, all in?** ← *the price anchor. Their number, not yours.*
3. Have you ever asked your bank for a FIRC or FIRA? What happened?
4. Has your CA ever asked you for one?
5. When did you last file your LUT, and was it before or after your first foreign invoice that year?
6. Has a GST officer ever asked you for anything on your foreign income?

**Question 3 is the one that opens people up.** Most have a story about being turned away at a branch
and concluding the bank was being difficult. That is where you give the 2016 correction, free, and it
is the moment they start treating you as someone who knows the subject.

---

## 3 · What it costs them when it goes wrong

Looking for lost money or a live deadline. "It's a bit annoying" means they will never pay.

1. What happens if the export treatment on those payments isn't accepted?
2. Has anything already gone wrong? A notice, a scrutiny, a filing you'd redo?
3. How much of last year's foreign income has no document behind it, roughly?
4. Who else gets pulled in when this comes up? Your CA, your bank, anyone else?
5. If you never sorted this out, is it a problem or just noise?

**Listen for a date.** LUT renewal, a GSTR deadline, a notice in hand, a filing already made wrong.
`docs/PAINKILLER_AUDIT.md` is blunt about this: **nobody buys an undated fear.** Someone with a date
is a customer; someone without one is a conversation.

---

## 4 · What they have already tried

Their search history is the truth. Someone who has never spent five minutes on this does not have
the problem badly enough to pay.

1. What have you already tried to fix this?
2. Have you searched for it online? What did you find?
3. Did you ask your CA to handle it? What did they say?
4. Have you switched payment platform, or thought about it?
5. What are you doing right now instead, if anything?

---

## 5 · The ask

Never ask what they would pay. Ask for the money.

> So here's where I am. **For ₹2,000 I go through every foreign payment you received in the period
> and match it to the document behind it** — FIRA, NOC, bank advice, or nothing — and give you a
> written statement of which ones stand up as zero-rated exports and which don't, with the rupee
> exposure on the ones that don't. Plus where your LUT actually sits. Forty-eight hours.
> **Money back if it tells you nothing your CA hasn't.**
>
> Want me to start on it? I'll send the UPI request now.

**Then stop talking.** The silence after an ask belongs to them.

### When they say "let me ask my CA first"

Do not argue. Send them with the four questions and let the answer do the work.
Full sequence, including the day-3 and day-7 follow-ups and the four replies you actually get:
`docs/outreach/CA_OBJECTION.md`.

### Never discount

₹2,000 is the floor. The only move below it is terms: two introductions and it's free.

---

## 6 · Close, and hand them the microphone

1. What should I have asked you that I didn't?
2. You know this better than I do. What am I getting wrong?
3. Who else do you know who bills foreign clients?

Question 3 goes in **every** conversation, including the disqualifications and the no's.

---

## What to record afterwards, in two minutes

| Field | Why |
|---|---|
| Rail | The whole point of the twenty conversations is the rail mix |
| Years of history | Backfill is the part no competitor solves |
| What they pay their CA | Builds the real price ladder from real numbers |
| LUT status and date | The only recurring deadline in the product |
| Was the ask made? Y/N | **The likeliest way this fails is the ask never gets made** |
| Outcome | paid · thinking · CA-blocked · disqualified · dead |

```bash
python3 scripts/pipeline.py log <id> asked_2k
python3 scripts/pipeline.py log <id> paid_2k --note "<upi ref>"
```

---

## Three notes from Dhanraj's original, kept because they are right

**"Opinions are worthless because people want to be nice to you."** Never ask whether this is a good
idea. Nobody says no to your face.

**"Anything involving the future is an over-optimistic lie."** They will invent a number to be kind.
Look at what they already spend.

**"Talk is cheap; a credit card is the only true validation."** Which is the entire argument for
₹2,000 over ₹20,000, and the reason the ask goes in the first conversation rather than the third.

Source: Dhanraj Sundaram, CEO and co-founder at Afleq — shared with the IdeaSprint cohort,
29 August 2026.

## Related
`docs/delivery/EVIDENCE_CHECK_SOP.md` (what happens after they pay) ·
`docs/outreach/CA_OBJECTION.md` · `docs/PAINKILLER_AUDIT.md` · `research/decision.md`
