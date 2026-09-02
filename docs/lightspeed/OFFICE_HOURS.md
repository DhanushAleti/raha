# Lightspeed Office Hours, IIT Madras — 5-6 Sep 2026

**Rewritten 2026-09-02** against the full record: every past Claude Code session on Raha, the Dhanush
OS vault, the Raha repo, and the Nostro build. Register now; the form is the filter for who gets a
slot.

**What this is.** Twenty minutes, 1:1, with an investor from a fund that backed Anthropic, Razorpay
and Sarvam, on your own campus, gated by a Google Form. It is the cheapest access to a top-tier fund
that will exist this year.

**What it is not.** A funding conversation. Pre-revenue, solo, unincorporated, ₹2,000 price point.
Optimising the slot for a cheque wastes it. Optimise it for one category answer only they can give,
and for being the student they remember in 2027.

---

## 1 · The form, field by field

### Full Name
> Aleti Dhanush

### Email Address
> aletidhanush9999@gmail.com

### Phone Number / IITM Roll Number
> [yours]

### What stage is your project or research at?
Tick **Other**, and write:

> Live in production with a paid offer open. First customer not closed yet.

Half the room will tick "idea or concept". "Prototype" undersells a deployed product taking real
money. This sentence is differentiating and still true.

### What are you currently working on?

> **Raha (raha.software).** An Indian who bills a foreign client is legally an exporter, and export
> of services is zero-rated under the IGST Act: 0% GST instead of 18%. But only with two documents,
> a FIRA from the bank proving the money came from abroad, and an LUT filed before that financial
> year's first export invoice. Miss either and the same income is assessed at 18% plus interest plus
> penalty, years later, on money already spent.
>
> The finding that made me build it: whether you have this problem is not a property of the person,
> it is a property of the payment rail. Skydo and Payoneer issue a FIRA automatically and free.
> **Wise, PayPal and Stripe convert offshore, so the money lands as a domestic transfer and the
> Indian bank legally cannot issue one.** Almost none of those users have been told. And no rail
> solves the backfill, because every one works forward from the day you joined, so the affected
> population grows each year instead of shrinking.
>
> Live today: a free 9-question audit returning a scored verdict, and a ₹2,000 Evidence Check that
> reconciles every foreign credit against the document behind it. The finding is published under my
> name as *FIRC to FIRA: Documentary Evidence Infrastructure and the Uneven Compliance Burden on
> India's Independent Digital Exporters*. Separately I built **Nostro**, the batch engine underneath it: 250-invoice reconciliation
> with a measured accuracy harness, 96.5% allocation precision and ₹0.00 wrongly called zero-rated,
> reproducible with one command.
>
> Revenue is ₹0. Distribution is the whole problem and I am in the middle of a 30-day test on it.

### LinkedIn Link
> [yours]

### Anything specific you'd like to get out of this conversation?

> Two questions I cannot get honest answers to from outside the industry.
>
> **1.** Compliance evidence sits under every cross-border payment rail and no rail owns it. Does
> that layer get absorbed as the rails mature, or does it stay separate? Lightspeed backed Razorpay,
> so you have watched this from inside a payments company. My entire long-term thesis is that
> evidence infrastructure stays separate because rails only ever solve forward and never backwards,
> and I would like that argued against by someone who has seen it play out.
>
> **2.** I am solo, pre-revenue, and running a 30-day test to close the first paying customer. If it
> works, what would you want to see six months later for this to be a venture rather than a good
> services business? I would rather know the bar than guess at it for a year.

### Tell us a little more about yourself

> I am a second-year Chemical Engineering student at IIT Madras who builds systems that measure
> their own error.
>
> **Shipping.** I built and deployed the entire Raha product in four days, working end to end with
> AI agents: landing page, audit funnel, income and remittance tracking, GST invoicing with PDF
> output, document vault, auth, a ten-table Postgres schema with row-level security on every table,
> 68 unit tests and Playwright E2E, live in production. Then I built Nostro, a reconciliation engine
> that ties foreign bank credits to invoices and export certificates across 250 records and twelve
> deliberately hard noise classes: split remittances, merged wires, FX drift, bank charges that
> shave the amount, missing certificates. 101 tests. 96.52% allocation precision, 81.62% recall,
> 44,813 records per second, and the number I actually built it around, **₹0.00 under-declared**,
> the rupee value of anything it wrongly called tax-free.
>
> The design decision I am proudest of is a refusal. No language model touches a number that becomes
> a tax figure; the deterministic core cannot even import the model layer. Recall is 81.6% instead
> of higher because the engine refuses ambiguous cases and hands them back as a priced exception
> queue. A confident wrong answer costs more than an honest unresolved one.
>
> **Research.** I wrote *FIRC to FIRA: Documentary Evidence Infrastructure and the Uneven Compliance
> Burden on India's Independent Digital Exporters*. Physical FIRCs stopped existing in 2016 under an
> RBI circular and nine years later tax advisors, platform help pages and GST officers still ask for
> them. The three-tier split by payment rail is, as far as I can find, documented nowhere else.
>
> **Talking to people.** 28 conversations with Indian creators and freelancers over three months.
> That is where the rail finding came from, not from desk research, and it changed the product
> twice. My opening move in every sales conversation is to ask which rail they use and then tell one
> entire group they already have what they need, for free. Disqualifying them is why the rest
> believe me.
>
> **How I work.** I keep a log of every failure as it happens rather than reconstructing it later.
> The most useful one: a fix I was confident in made the metric worse, 39.1% to 29.7%, and the
> premise turned out to be false the moment I read the raw data instead of reasoning about my own
> parameters. Chemical engineering is where I learned to distrust a model that has not been checked
> against the thing it describes.

### Is there anything else you'd like us to know before we meet?

> Two honest things.
>
> Revenue is ₹0 and zero customers. Product live since July, paid offer live since 27 August. I am
> running a 30-day test that ends 26 September with a single criterion: one person pays ₹2,000. I
> will know the answer before most people would have finished a deck, and I will tell you the result
> either way.
>
> And I am about to spend six months as an engineer in Bangalore, on a build that is the batch
> engine Raha needs next. I am not going to pretend that is the same as being full time on the
> company. It buys runway and it compounds into the product, and I would rather say that than
> perform an all-in I am not currently doing.
>
> If it is useful, take the free audit at raha.software/audit before we meet. Ninety seconds, and it
> will tell you more about how I think than this form can.

---

## 2 · The twenty minutes

**Open with the money, not the company.** "An Indian billing a foreign client is legally an exporter,
and most of them are one document away from an 18% bill on income they already spent." Then the
Wise/PayPal/Stripe consequence. Surprise buys attention; a company description does not.

**The monetization question will come.** It came three times at the 22 Aug IVM pitch and froze you
twice. One sentence, then stop:

> The LUT is re-filed every financial year before the first export invoice, and a FIRA is needed per
> payment, so solving it once does not solve it. ₹2,000 buys the evidence check, and April is when
> the annual seat becomes the obvious buy. The statute makes it repeat, not a subscription trick.

**"Are you full time on this?" will also come.** Answer it exactly as written in the last form field.
An honest no with a reason beats a rehearsed yes, and they can smell the difference.

**Ask your two questions with ten minutes left, not two.**

**What not to do:**

- **Do not ask for money**, or for an intro to money.
- **Do not ask for a Razorpay introduction**, even though they backed Razorpay and your buildathon
  submission is due the same day. Ask a VC for a referral and you stop being a founder in that room
  and become a candidate. It does not reverse. If they raise it, follow it.
- **Do not lead with the ₹1,000-3,000 crore market number.** It is fine on an application form and
  weak in front of someone who does this daily. If asked: 2 to 3 million foreign-currency earners,
  ₹2,000 entry, ₹20,000 renewal, and say which part is measured and which is assumed.
- **Do not hide the zero.** Pre-revenue is expected at office hours. A founder who rounds up is the
  one they remember badly.

**The follow-up is the asset.** One email within 24 hours: their answer to question 1, what you
changed because of it, nothing else, no ask. Then send the 26 September result on 26 September, win
or lose. **Reporting an honest failed test on the date you promised is something almost nobody
does**, and it is the version of you worth remembering when there is revenue to talk about.

---

## 3 · What to hold back, and why the rest is safe

The question behind the question: am I handing over the idea for free? No, and the reason is
specific rather than reassuring.

**What is already public, so withholding it costs you the slot and protects nothing:**

| Thing | Where anyone can already get it |
|---|---|
| The rail stratification (Wise/PayPal/Stripe cannot produce a FIRA) | The free audit at `raha.software/audit`, in 90 seconds, no signup |
| The FIRC-to-FIRA correction | Published paper, under your name |
| The LUT and FIRA cadence | The IGST Act and an RBI circular. It is statute, not insight |
| Nostro's engine and its numbers | About to be a public GitHub repo, by your own choice |
| ₹0 revenue | Not a secret, and saying it is what makes the rest credible |

**What stays out of a form and belongs in the room, or nowhere yet:**

- **Which rails you would approach for the embedded-evidence layer, and on what commercial terms.**
  The thesis is fine to state. The deal shape is the part with option value and the part you cannot
  defend if it moves.
- **Named prospects.** The 15-thread queue is yours. It goes in no application, ever.
- **Pricing you have not tested.** Quoting an untested ladder as if it were validated is the one
  thing in this document that could actually be checked and found false.
- **Anything about the Razorpay engagement that is not signed.**

If they push on the third layer, give the shape and stop: *"Rails move the money and do not own the
compliance record. I think that layer stays separate because rails only ever solve forward, and the
backfill population grows every year. The specifics of how you'd sit under one is what I'm testing,
and I'm not going to design it in public before I have ten customers."* That reads as disciplined.
Vagueness about the problem reads as having nothing.

**Provenance is the real defense, and you already have it.** The paper is published under your name
and the repo will be timestamped. An insight with a date attached to it is not stealable in any way
that matters.

### The risk that is bigger than this form

You are about to spend six months inside Razorpay. **Razorpay is a rail.** Nostro is a FIRA
reconciliation engine built on Raha's code, and question 1 above is, stripped down, *will a rail
absorb this layer.*

Indian employment and internship agreements commonly assign IP created during the engagement to the
employer, sometimes worded broadly enough to reach same-field work done on your own time. That is
where the company could actually be lost, and it will not feel like a moment when it happens.

Three protections, all free:

1. **Push Nostro public before signing anything**, so the repo carries commits dated before the
   engagement begins.
2. **Keep Raha's code, accounts and customer data on your own hardware and logins.** No Raha work on
   a company machine.
3. **Read the IP assignment and moonlighting clauses before you sign**, and get the exact wording
   looked at. A clause limited to work using company time, equipment or confidential information is
   normal. One that claims everything you create in the field during the term is not, and it is
   usually negotiable for an intern because nobody expects an intern to ask.

---

## 4 · The week

| Date | What lands |
|---|---|
| **Wed 3 Sep** | Allocation gate: ₹0 paid, so it fails on money. Also: push Nostro public, record the video. |
| **Thu 4 Sep** | Submit Razorpay. |
| **Fri 5 Sep** | Razorpay closes. Lightspeed office hours begin. |
| **Sat 6 Sep** | Office hours day 2. |
| **Fri 26 Sep** | 30-day gate: one paid ₹2,000. |

Office hours are twenty minutes on campus and do not compete with the Razorpay submission. Register
today; slots at these things fill by return order, not by merit.

---

## Related
`docs/RECOVERED_CONTEXT.md` (what the session and vault sweep found) · `docs/razorpay/APPLICATION.md`
· `docs/incubators/PLAN.md` · `PROJECT_MASTER_DOCUMENT.md`
