# GTM review — 2026-07-26

Hard review run against the PRD, sales playbook, competitive brief, send log, and demand evidence.
Written to be uncomfortable. Findings ranked by how much they should change behaviour.

---

## 1. The pricing-parity problem — read this before anything else

A Reddit commenter on r/IndiaTax, unprompted:

> "My CA does all this including FIRC management, etc. for 20,000 per year including itr, gst, lut, FIRC"

That is **Raha's exact scope at Raha's exact price**, delivered by a licensed human with an existing
relationship, and it is discoverable by any prospect in a five-minute search.

Worse: PRD Phase 0 is explicitly "no product build — delivery via spreadsheets + AI + a partnered
CA." So what's being sold for ₹20,000 today *is* a human CA, filtered through an unproven middleman.
A rational buyer comparing the two takes strictly less risk with the CA at the same price. That is
not weak differentiation, it is **negative** differentiation.

**What would actually make software better than that CA** — none of which exists yet:
- Continuous month-round FIRC matching and a live set-aside number, versus one annual sit-down. A
  solo CA will not proactively message a client every month; a dashboard can.
- A document vault the client owns, that survives their CA retiring, leaving, or drowning every
  April–July.
- Auto-import from AdSense/Stripe/Patreon, which no manual CA relationship can replicate without
  becoming a software company.

All three are Phase 1/2, gated behind three paying customers. Today, unsellable.

**The strategic move:** stop selling against people whose CA is doing the job well — that fight is
lost before you speak. Target people whose CA has **already failed them on this specific point**.
The discovery question "has your CA ever asked you for a FIRC?" is the qualifier, and the answer is
almost always no. Route around the satisfied; sell to the already-burned.

**And lean on the ₹2,000 diagnostic as the real entry point**, not ₹20,000. Undercutting an
established CA while the product is unproven is the honest position.

## 2. The 28 emails did not test the funnel

The sales playbook states the audit link *is* the strategy: "The audit is the whole strategy… never
send the pricing page before the audit."

**No audit link was included in any of the 28 sent emails.** That was a deliberate deliverability
call — links hurt first-contact placement, and Gmail was rewriting them into `google.com/url?q=`
redirects that read as phishing.

The deliverability reasoning was sound. The consequence was not thought through: the batch tested a
linkless curiosity email to intermediaries, not the funnel. **0/28 tells us almost nothing about
message-market fit**, because the converting mechanism was never present.

Three tests that would actually distinguish the failure mode:
- Same list, audit link included → tests **message**
- Creator DMs to 15–20 individuals → tests **targeting** (agencies vs. the people with the problem)
- Answering live r/IndiaTax threads → tests **channel** (self-selected high-intent vs. cold strangers)

## 3. ICP: narrow within, do not broaden

The tempting conclusion from the AdSense/Singapore finding is "the buyer is anyone earning foreign
income." **Don't.** That is verbatim TaxTap's positioning — "creators, freelancers & entrepreneurs,
30+ professions, 10,000+ users." Walking into that head-on with zero brand contradicts the one thing
the competitive brief got right: dominate a tiny market first.

Also note the reasoning trap: the Singapore finding proves *more creators* carry exposure. It says
nothing about freelancers being better buyers. Two unrelated pieces of evidence were being merged
into one pivot argument.

**Revised ICP:** solo Indian operator with recurring foreign-currency revenue and no finance
function.

**Change the hunting ground, not the brand.** Shift from YouTube creators (dispersed,
agency-mediated, pain inferred) to the Segment 2 cohort already researched and *not yet contacted* —
indie SaaS founders, paid-newsletter writers, Gumroad/Stripe/AppSumo sellers who self-disclose MRR
and already discuss this problem publicly. Keep the creator brand; a rebrand before three customers
is a distraction.

Evidence gap worth naming: creator-side demand is inferred from business models. Segment 2 has
**Abhinav Upadhyay publishing "Substack has failed Indian creators"** — a direct quote about this
exact problem. A quote beats an inference.

## 4. Stop doing

- **Agency outreach as the main motion.** Slowest, most indirect channel; asks BD staff to
  reputationally vouch for an unproven product to creators whose revenue they manage. Keep the
  existing 28 on their follow-up schedule; stop sourcing new agency contacts.
- **Building more lead lists.** `CREATOR_LEADS_RESEARCHED.md` now holds 30 sourced names and zero
  contacted. Research is not the constraint. Sending is.
- **Counting third-party guide density as demand.** `DEMAND_EVIDENCE.md` admits it: category demand
  ≠ product demand. Nobody has paid anything.
- **Moat language** (data gravity, API lock-in) for a product that is currently a spreadsheet and a
  partnered CA.
- **Avoiding the warm channel.** The clearest strategic error: three days of cold email to people
  who don't have the problem, while the network channel sits unused by choice.

## 5. The only test that matters, never run

The playbook says it plainly: **"if nobody will pay ₹2,000, nobody was ever going to pay ₹20,000."**

That test has not been run on a single human, in any segment. Everything else — leads, positioning,
content, competitive analysis — is downstream of it and cannot be resolved by more analysis.

## Ranked next moves

1. **Warm introductions.** Highest-converting channel available, untapped by avoidance not absence.
   A referral skips the "how do I know you're legitimate" objection entirely — which is the exact
   objection the CA-parity problem creates.
2. **Answer live r/IndiaTax threads.** Warmest cold audience available: people mid-problem, already
   typing "FIRC" in public. Tests the message against real objections instead of silence.
3. **The written creator DMs and the Segment 2 list.** Pure execution debt — scripts and targets
   both already exist.
4. **Follow up the 28 on schedule.** Slow-burn, not a main motion.
5. **Content.** Deprioritise until there is one paying customer to reference.
