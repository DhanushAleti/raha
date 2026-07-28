# Wedge reality check — 2026-07-28

Research into whether payment rails already solve the FIRC problem. **They partly do.** This
narrows the wedge, corrects our terminology, and sharpens the positioning. Read before sending
anything else.

---

## Finding 1 — "FIRC" is the wrong word, and using it flags us as amateurs

Physical FIRCs were **discontinued for export remittances in 2016**. Banks now issue a **FIRA**
(Foreign Inward Remittance Advice), or FIRS depending on the bank. FIRC survives only for **FDI and
FII** transactions.

Sources: [ClearTax](https://cleartax.in/s/foreign-inward-remittance-certificate) ·
[Skydo](https://www.skydo.com/blog/efirc-firc-brc-essentials-differences) ·
[BriskPE](https://www.briskpe.com/why-is-firc-fira-essential-for-handling-foreign-inward-remittances/)

**What this costs us:** all 28 sent emails, the audit copy, and the Reddit drafts say "ask your bank
for a FIRC." To a freelancer that's roughly right in spirit. To a **CA or a GST officer it reads as
someone who half-learned the topic** — exactly the credibility we're selling.

**Fix:** say "FIRC/FIRA" or just "FIRA" going forward. When someone says "my bank won't give me a
FIRC", the high-value answer is now: *"They can't — those stopped in 2016 for exports. What you
want is a FIRA."* That single correction is more impressive than anything in the current pitch.

## Finding 2 — modern rails already issue FIRA, free and automatic

| Rail | FIRA provision |
|---|---|
| Skydo | Digital FIRA on **every** payment, instant, free ([source](https://www.skydo.com/blog/importance-of-fira-for-freelancers)) |
| Karbon | Auto-generated e-FIRA within 24h ([source](https://www.karboncard.com/blog/firc-request-indian-freelancers)) |
| Winvesta | FIRA provided ([source](https://www.winvesta.in/blog/businesses/understanding-firc-for-international-money-transfers)) |
| Payoneer | Downloadable FIRC/FIRA per transaction ([source](https://www.payoneer.com/resources/news-events/decoding-firc-a-guide-for-indian-exporters-of-goods-services/)) |
| PayGlocal | "Instant FIRA/FIRC" |

**Say it plainly: for anyone already on a modern rail, this part is solved and costs nothing.**
Pitching "we'll get you FIRCs" to a Skydo user is pitching a free feature they already have. That
is a real hit to the original thesis.

Note the second-order problem too: these companies publish the best FIRC/FIRA content on the Indian
internet. Skydo alone owns most of the search results. They are content-marketing the exact
education we planned to lead with.

## Finding 3 — the gap that is genuinely unsolved

This is where Raha still has something real.

**a) Aggregated rails produce no FIRA at all.** Wise, Stripe and PayPal convert offshore, so the
money lands in the Indian account as an ordinary **domestic IMPS transfer**. The bank legally cannot
issue a FIRA against it, because as far as the bank can see no foreign remittance occurred. Wise
issues an NOC instead, which you then take to the bank. This affects a very large number of
freelancers and is not solved by anyone.

**b) Direct bank transfers.** AdSense paying straight into SBI, Patreon into HDFC. No rail, no
automation, chase the branch manually. This is exactly the creator in the r/IndiaTax thread.

**c) Historical backfill.** Anyone who switched to Skydo last year still has two or three years of
prior remittances with no paperwork. Rails only solve forward, never backward.

**d) Multi-rail reconciliation.** Someone on Upwork + a direct client + AdSense has three sources,
three document formats, and no single view. No rail solves across rails, because each only sees its
own flow.

**e) The LUT renewal collision.** GST field officers still ask for physical FIRCs — documents that
have not existed since 2016 — at LUT renewal. Knowing how to answer that is worth money.

## What this does to the strategy

**The wedge survives, but it must be restated.**

- ~~"We get you the FIRCs your CA never collected"~~ — wrong, and obsolete for rail users
- **"We prove your foreign income is a zero-rated export — whatever rail you used, including the
  ones that give you nothing, and including the years before you switched."**

That version is true, is not commoditised, and gets sharper as more rails appear — every new rail
adds another format to reconcile.

**Targeting shifts accordingly.** Highest value first:

1. **Wise / PayPal / Stripe users** — structurally cannot get a FIRA. Hardest problem, least served.
2. **Direct-bank-transfer earners** — AdSense, Patreon, direct clients. Manual chase, no automation.
3. **Anyone with 2+ years of history** — backfill is unsolved by definition.
4. **Multi-source earners** — reconciliation across formats.
5. ~~Skydo/Karbon/Payoneer users on a single rail~~ — **deprioritise. Their forward paperwork is done.**

**Do not compete with the rails. Sit above them.** They move money and issue their own paperwork.
Nobody reconciles across all of them, backfills history, or tells you whether what you hold actually
satisfies an officer. That is the layer.

## Immediate corrections

- [ ] Stop writing "FIRC" alone. Use "FIRC/FIRA" or "FIRA".
- [ ] Add a qualifying question to the diagnostic intake: **"How do you receive the money — bank
      transfer, Wise/PayPal/Stripe, or a rail like Skydo/Karbon/Payoneer?"** The answer decides
      whether there's a problem worth paying for at all.
- [ ] Rewrite the five Reddit DMs to lead with the rail question rather than assuming a gap exists.
- [ ] Update the audit tool copy (`src/components/audit/questions.ts`) to ask how they get paid.

## Honest verdict

This does not kill Raha, but it does shrink the original claim. "Most creators have no FIRC" was
true when we wrote it, and is now only true for people **off** the modern rails. The good news is
that the remaining group is still large, is harder to serve, and is being actively ignored by the
companies that solved the easy half.

Better to learn this from a search today than from a prospect on a call.
