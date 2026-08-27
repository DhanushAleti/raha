# "Let me ask my CA first"

**The hole with no script.** `docs/PAINKILLER_AUDIT.md` names this as the most likely way a yes
turns into nothing — the CA says "I've got it," free, and the deal dies without anyone saying no —
and then lists no sequence against it. This is the sequence.

**The whole idea in one line:** do not argue with the CA. **Send them to the CA with four questions,
and let the answer do the work.** A CA who has it covered answers all four in a paragraph, and you
have lost nothing but learned they were never the customer. A CA who has not will hedge — and the
hedge is the conversion event, not your pitch.

---

## Why arguing loses

Their CA is a licensed professional they already pay and already trust. You are a stranger with no
credential. In a straight contest of authority you lose, correctly, every time.

But you are not selling an opinion. You are selling **whether a specific document exists for a
specific credit** — a question of fact their CA has either checked or not. Reframe from *who is
right* to *has anyone actually looked*, and the ground stops being authority and starts being
evidence. That is ground you win on, because usually nobody has looked.

---

## Reply 1 — send the moment they say it

Under 90 words. It agrees, it does not defend, and it ends in something for them to do that costs
them nothing.

> Good — you should. They know your file and I don't.
>
> Four questions worth putting to them, so you get something concrete back instead of "it's handled":
>
> 1. For FY [____], was my LUT filed before my first export invoice that year — and what's the ARN?
> 2. For my [Wise / PayPal / AdSense] credits, what are we holding as proof of receipt in
>    convertible foreign exchange?
> 3. If those were treated as domestic supplies instead of exports, what's the exposure?
> 4. What changes from the next payment onward?
>
> If all four come back clean, you genuinely don't need me and I'll say so. Tell me what they say?

**Why these four and not others**

| Q | What it actually tests |
|---|---|
| 1 | A date, an ARN. Checkable in a minute. A CA who has it answers instantly; one who has not says "I'll look." |
| 2 | The Tier-2 trap. If the money came through Wise/PayPal/Stripe there **is** no FIRA, and a CA who has not met this says "we have the bank statement" — which is not evidence of a foreign remittance. |
| 3 | Forces a number. Numbers get remembered; reassurance does not. |
| 4 | Turns it from a past problem into a standing one. This is also the LUT-renewal hook that April is built on. |

Never send more than four. Five reads as an audit of their CA, and then you are the problem.

---

## Reply 2 — day 3, if silent

Under 40 words, and it asks for money, not a call.

> Did they come back on the four?
>
> If the answer to #2 was the bank statement, that's the one worth a second look — a statement shows
> money arriving, not that it arrived from abroad. ₹2,000 and 48 hours and you'll know.

## Reply 3 — day 7, and it is the last one

> Leaving this here. If the LUT date or the FIRA question ever comes up — at renewal, or in a
> notice — the ledger takes me two days to build and it's ₹2,000 whenever you want it.
>
> No follow-up after this one.

Then stop. Log it and move on: `python3 scripts/pipeline.py log <id> dead`.

---

## The four answers you will actually get

| What the CA says | What it means | What you send |
|---|---|---|
| **"Filed, here's the ARN"** + a real answer to #2 | They are covered. **Say so.** | *"Then you're in good shape — genuinely don't need me. If you ever add a new payment route, that's when it changes."* Then ask who else they know. A clean disqualification told honestly is the cheapest referral you will ever get. |
| **"We have the bank statements"** | The most common answer, and it is the miss. A statement evidences a credit, not that it came from abroad in convertible foreign exchange. | *"That's the one I'd push on. A statement shows money arriving — under IGST §2(6) what's needed is proof it arrived from outside India in foreign exchange, which is the FIRA. Especially if any came via Wise or PayPal, where the bank never sees a foreign remittance at all."* Then the ₹2,000 ask. |
| **"I'll check and revert"** | Nobody has looked. **This is the buying signal**, and it is why the four questions exist. | Wait 3 days, then Reply 2. Do not chase sooner — the pause is the CA discovering the gap. |
| **"FIRC isn't needed / we'll get it if asked"** | Two errors in one line: the term, and "if asked" is exactly when it cannot be produced. | *"Worth flagging: FIRCs stopped for export remittances in 2016 — RBI A.P. DIR circular 74. It's a FIRA now, raised against the IRM your bank files in EDPMS. And if it's a Wise or PayPal credit, the bank can't raise one retroactively at all, because it never saw a foreign remittance."* This is the single sentence that flips the credibility. |

---

## Two rules

**Never disparage the CA.** Not once, not lightly. The customer hears an attack on their own
judgement for hiring them, and defends the CA instead of checking. Every line above is *"worth
asking"*, never *"they missed it."*

**Take the clean disqualification.** When the CA has it covered, say so in one message and ask for
a referral. That message is the most credible thing you will send anyone all month, and it costs a
sale you were never going to make.

## Related
`docs/PAINKILLER_AUDIT.md` — where this hole is named · `research/outreach-sequences.md` §7 —
the CA-parity objection at first contact · `docs/delivery/REPORT_TEMPLATE.md` §5 — the same four
questions, delivered as part of a paid report
