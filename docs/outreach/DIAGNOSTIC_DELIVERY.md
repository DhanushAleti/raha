# The ₹2,000 diagnostic — intake, process, deliverable

The playbook sells this on six lines. This file is the thing itself: what you collect, how you
produce it, what you send, and how you get paid.

**Scope, stated honestly:** a written risk report. Not a filing, not signed advice, not a
CA opinion. That framing is deliberate — it's what lets you sell this week without a partnered CA,
and it's what keeps you on the right side of selling regulated advice you aren't licensed to give.
Every number is an estimate the customer verifies with their CA before acting.

---

## 1. Payment — before any work starts

**UPI. Nothing else.** No Razorpay account, no Stripe, no invoicing platform. Every Indian creator
already has UPI, it settles instantly, and it costs you nothing.

On the call: *"I'll send you a UPI request for ₹2,000. Once that's through I'll send the intake
list, and you'll have the report within 48 hours."*

Collect first, always. A verbal yes is not a customer, and the discipline of asking for money on
the call is the entire point of this exercise.

Log every payment: date, name, amount, UPI reference. That list is your traction.

---

## 2. Intake — keep it small

The longer this list, the more people stall. Ask for exactly this:

**Required**
1. **Foreign payments received in the financial year** — date, amount, currency, source (AdSense,
   Patreon, brand, client). A platform payout report or a bank statement filtered to foreign
   credits. A spreadsheet they type themselves is fine.
2. **GST status** — registered or not. If registered: GSTIN and registration date.
3. **LUT status** — filed for this FY? If yes, the ARN. "What's an LUT" is a valid and common answer.
4. **FIRC status** — do they hold FIRCs/FIRAs for those credits? Usually: no, or "what's that".

**Optional, improves the report**
5. Which bank receives the foreign money
6. Any brand invoices they've issued
7. Whether a CA currently files for them, and what they pay

**Never ask for** bank login credentials, full unredacted statements when a filtered list will do,
PAN card images, or anything you don't need to answer the question. You are asking a stranger to
trust you with financial data. Ask for the minimum and say why.

---

## 3. Process — how you actually produce it

Roughly 60–90 minutes per report, by hand. That's correct for Phase 0. Do not automate this until
you've done ten and know what repeats.

1. **Total the foreign income** for the FY.
2. **Determine the GST position.** Foreign income is an export of services, zero-rated at 0% — but
   conditional on proof the money came from abroad (FIRC/FIRA) and, for the no-IGST-upfront route,
   an LUT filed before the first export invoice of the year.
3. **Compute the exposure spread.** The gap between 0% and 18% on the foreign total, plus the
   penalty and interest position if they were unregistered while above the threshold. **Present as
   a range, never a single confident number.**
4. **Check the threshold question.** Below ₹20L turnover (₹10L in special-category states),
   registration is generally not mandatory for services. This is the single most common point of
   confusion and where you add the most value — see the note in CONTENT_LAUNCH.md.
5. **Assign the verdict** — red / amber / green, using the same logic as the audit tool at
   `src/lib/audit/scoring.ts` so the paid report and the free tool never contradict each other.
6. **Write the actions** in priority order, each one specific enough to do on Monday.

---

## 4. The deliverable — template

Send as PDF. Two to three pages. Plain language.

---

> # Raha — Foreign Income Compliance Diagnostic
>
> **Prepared for:** [Name] · [Channel / business]
> **Financial year:** [FY]
> **Prepared:** [Date]
>
> **What this is:** a written review of how your foreign income sits against GST rules, based on
> the information you provided. **What this is not:** a tax filing, a CA opinion, or formal advice.
> Every figure below is an estimate. Verify with your CA before acting on any of it.
>
> ---
>
> ## Verdict: [RED / AMBER / GREEN]
>
> [One sentence. e.g. "Your foreign income has been treated as domestic supply for two financial
> years, and no FIRCs exist to prove otherwise."]
>
> ---
>
> ## What we found
>
> **1. Foreign income identified**
> [₹X] across [N] payments from [sources], [FY].
> All of it is paid from outside India — AdSense specifically is contracted with Google Asia Pacific
> Pte. Ltd., Singapore, and paid in foreign currency. That makes it an export of services.
>
> **2. FIRC coverage: [X of N payments]**
> [What exists, what doesn't, and what that means.]
>
> **3. LUT status: [filed / not filed / not applicable]**
> [If not filed: what it is, that it's free, that it's filed once a year on the GST portal, and the
> consequence of not having one.]
>
> **4. Registration position**
> [Whether they're above or below threshold, and whether their current position matches.]
>
> ---
>
> ## Estimated exposure
>
> | | Amount |
> |---|---|
> | Foreign income, [FY] | ₹[X] |
> | GST if treated as export (0%) | ₹0 |
> | GST if treated as domestic (18%) | ₹[Y] |
> | **Difference at risk** | **₹[Y]** |
> | Penalty exposure, if unregistered | up to ₹[Y] |
> | Interest, ~18%/yr on unpaid | ₹[Z] |
>
> **These are estimates based on what you gave me, not a computed liability.** The actual position
> depends on records I haven't seen and on how the department assesses your specific case. Take this
> to your CA before acting.
>
> ---
>
> ## What to do, in order
>
> **1. [Most urgent action]** — [specific, doable this week]
> **2. [Next]** — [specific]
> **3. [Next]** — [specific]
>
> ---
>
> ## Questions to put to your CA
>
> Ask these directly. If the answers aren't immediate, that itself is information.
>
> 1. "How was my foreign income treated for GST in [FY] — export or domestic supply?"
> 2. "Do we hold FIRCs or FIRAs for those remittances? Can I see them?"
> 3. "Was an LUT filed for this financial year? What's the ARN?"
> 4. "If we're treating this as zero-rated, what proof of export are we relying on?"
>
> ---
>
> *Prepared by Dhanush, Raha. Estimates only — verify with your CA before filing. Raha does not
> file returns on your behalf and does not provide licensed tax advice.*

---

## 5. After you send it

- **Ask for one sentence of feedback.** "Was this useful, and what did you expect that wasn't in
  here?" Ten of those answers is your Phase 1 spec.
- **Do not immediately upsell.** Let the report do the work. If it found something real, they'll ask
  what fixing it looks like — that's when ₹20,000 comes up, and it comes up from them.
- **If it comes back clean:** say so plainly and refund nothing. They paid to stop worrying and
  that's what they got. A clean report honestly delivered is how referrals start.

## 6. What this cannot do yet

Be honest about the boundary when asked:

- You cannot file anything. Say so.
- You cannot sign off a return. That needs a CA, and recruiting one is a parallel track.
- You cannot obtain FIRCs on their behalf. The bank issues those to the account holder — you can
  tell them exactly what to ask for and in what form.

Saying "I can't do that yet, here's who can" builds more trust than pretending. The people buying
this are already surrounded by professionals who overpromised.
