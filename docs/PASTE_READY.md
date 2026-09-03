# Paste-ready answers, plain text

**Rewritten 2026-09-03 against the AI-tells catalog.** Everything below is inside a code fence so
what you copy is exactly what goes in the form. No asterisks, no markdown, no em dashes. Google
Forms renders plain text, so a `**bold**` would paste as literal asterisks.

Facts, figures and claims are unchanged from `docs/lightspeed/OFFICE_HOURS.md` and
`docs/razorpay/APPLICATION.md`. Only the prose changed.

---

# LIGHTSPEED OFFICE HOURS

### Stage
```
Other: live in production with a paid offer open. No customer yet.
```

### What are you currently working on?
```
Raha, at raha.software.

If you bill a foreign client from India, the law already calls you an exporter. Export of services
is zero-rated under the IGST Act, so 0% GST instead of 18%. The catch is two documents: a FIRA from
your bank proving the money came from abroad, and an LUT filed before your first export invoice
that year. Miss either one and the same income gets assessed as a domestic supply. 18%, plus
interest, plus penalty, on money you earned and spent two years ago.

Here is the thing that made me build it. The payment rail decides whether you have this problem at
all. Skydo, Karbon and Payoneer issue a FIRA automatically and for free, so those users are already
fine and I tell them so. Wise, PayPal and Stripe convert the money offshore, so it lands in your
account as a domestic transfer and your bank cannot legally issue a FIRA against it. Nothing on its
books came from abroad. Almost nobody using those three has been told this.

And no rail fixes the years before you joined it. They all work forward from signup, so the
affected population grows every year instead of shrinking.

What is live: a free 9-question audit that scores where you stand, and a 2,000 rupee Evidence Check
where I reconcile every foreign credit against the document behind it and write up the exposure. I
published the research it came out of, "FIRC to FIRA: Documentary Evidence Infrastructure and the
Uneven Compliance Burden on India's Independent Digital Exporters." I also built Nostro, the batch
engine underneath it, which reconciles 250 invoices against credits and certificates at 96.5%
precision with zero rupees wrongly claimed as tax-free.

Revenue is zero. Distribution is the whole problem, and I am seven days into a 30-day test on it.
```

### Anything specific you'd like to get out of this conversation?
```
Two questions I cannot get a straight answer to from outside the industry.

First. Compliance evidence sits under every cross-border payment rail and no rail owns it. Does
that layer get absorbed as the rails mature, or does it stay separate? You backed Razorpay, so you
have watched this from inside a payments company. My bet is that it stays separate, because rails
only ever solve forward and the backlog grows every year. I would like to hear that argued against
by someone who has seen it play out.

Second. I am solo and pre-revenue, running a 30-day test to get the first paying customer. If it
works, what would you want to see six months later before this is a venture rather than a decent
services business? I would rather know the bar than guess at it for a year.
```

### Tell us a little more about yourself
```
Second-year Chemical Engineering at IIT Madras. I build things that measure their own error.

Raha went from nothing to live in four days. I work with AI agents the way you would work with a
team: landing page, audit funnel, income and remittance tracking, GST invoicing with PDF output, a
document vault, auth, a ten-table Postgres schema with row-level security on every table, 68 unit
tests and end-to-end tests in Playwright. In production, taking payments.

Then I built Nostro, which is the harder problem. It ties foreign bank credits to invoices and
export certificates across 250 records and twelve kinds of mess: one invoice paid in three wires,
four invoices paid in one, exchange rates drifting across a rate month, bank charges shaving the
amount until it stops matching, certificates that never arrived. 110 tests. 96.52% precision,
81.62% recall, about 51,000 records a second.

The number I actually care about is a different one. Zero rupees under-declared. That is the value
of anything the engine called tax-free that is not, and a run that under-declares exits with an
error code no matter how good the F1 looks.

The design decision I am proudest of is a refusal. No language model touches a number that becomes
a tax figure, and the core cannot even import the model layer. There is a test that fails if
someone changes that. Recall sits at 81% instead of 95% because the engine refuses cases it cannot
separate and hands them back as a queue sorted by what it costs to be wrong about. A confident
wrong answer costs more than an honest unresolved one.

I wrote the research paper behind all of it too. Banks stopped issuing FIRCs for export remittances
in 2016 under an RBI circular. Nine years later tax advisors, platform help pages and GST officers
still ask for them, so people get turned away at the branch and conclude their bank is being
difficult. The split by payment rail is not documented anywhere else I can find.

And I have had 28 conversations with freelancers and creators since June. That is where the rail
finding came from, not from reading. It changed the product twice. My first question in any sales
conversation is which rail they use, and if the answer is Skydo or Payoneer I tell them they
already have what they need and walk away. Disqualifying that group is why the rest believe me.

One more thing about how I work. I log failures as they happen instead of reconstructing them
afterwards. The most useful one was a fix I was certain about that made recall worse, 39.1% down to
29.7%. The premise turned out to be false the moment I read the raw records instead of reasoning
about my own generator settings. That is a chemical engineering habit. You check the model against
the plant.
```

### Is there anything else you'd like us to know before we meet?
```
Two honest things.

Zero revenue, zero customers. The product has been live since July and the paid offer since 27
August. I am running a 30-day test that ends on 26 September with one criterion: somebody pays
2,000 rupees. I will know before most people would have finished a deck, and I will send you the
result either way.

Second, I am about to spend six months as an engineer in Bangalore, building the batch engine Raha
needs next. I am not going to pretend that is the same as being full time on the company. It buys
runway and it compounds into the product, and I would rather say that than perform an all-in I am
not currently doing.

If it is useful, take the audit at raha.software/audit before we meet. Ninety seconds, and it will
tell you more about how I think than this form does.
```

---

# RAZORPAY BUILDATHON

### What it solves
```
An Indian business that exports services has to prove it. Every foreign bank credit has to be tied
to an invoice and to a FIRA before that revenue counts as a zero-rated export. Break the chain and
it gets reclassified as a domestic supply: 18% GST on money you collected and spent a year ago,
plus interest. Right now this reconciliation is a spreadsheet, done by hand, once a year, in a
panic.

Nostro runs it as a batch job. It reports what it matched, and it reports what it could not
resolve, with a reason code and a rupee figure attached to each one.

250 invoices, twelve noise classes. 96.52% allocation precision, 81.62% recall, zero rupees
under-declared, 151 exceptions, about 51,000 records a second. One command regenerates every
number from a seed.

Under-declared is the metric I designed around. It is the rupee value of invoices the engine called
zero-rated that are not, which is real liability found late with interest running. A run that
under-declares anything exits non-zero no matter what the F1 says. Recall sits at 81.6% because I
would rather hand back an honest exception than a confident wrong allocation, and the gap is
visible in the queue instead of buried in the score.

On where a model belongs. No LLM touches a number that becomes a tax figure. The core has no
network dependency and cannot import the model layer, and a test fails if anyone changes that.
Bank narrations are machine-generated and mostly readable with a regex, so a regex reads them, for
free and identically on every run. The model only ever sees the mangled minority the parser flags.
It returns a schema-validated hint, never an allocation, and that hint still has to clear the same
amount tolerance and date window as every other candidate. Four guards on it: schema, exact
RH-YYYY-NNNN format so a mangled reference is refused instead of repaired, provenance against the
queue I actually sent, and a confidence floor. A failed call degrades to zero hints, so Layer 2 can
add recall and cannot remove correctness. A clean 10,000-record batch makes zero API calls.
```

### What broke, and how you got out
```
Split remittances were stuck at 39.1% recall while the unit test for that exact path passed.

I assumed the later legs were landing outside the 45-day window, since a three-leg split can reach
day 64 in my generator. So I built an anchored wide window: search out to 120 days as long as one
leg sits inside the normal one. It typechecked. All 83 tests stayed green. And it made the number
worse, 39.1% down to 29.7%.

A wider window multiplies the candidate pool. Subset-sum then finds more combinations that happen
to total the invoice, the ambiguity guard sees several near-equal fits, and it refuses all of them.
Precision dropped too, and one noise class went from refusing everything to confidently allocating
wrong.

What found it was dumping a batch and reading the actual records instead of reasoning about my
generator's parameter ranges. The lags on the first three split invoices were 24 and 29 days, then
26, 31 and 38, then 4 and 9. Every leg was inside the original window. The premise of the whole fix
was false.

The real cause was pass ordering. Pass 1 matches unique one-to-one pairs across a global candidate
pool before the split pass ever runs. Over 250 records, some unrelated credit lands within 2% of
some invoice by coincidence, gets consumed there, and leaves the right invoice permanently short.
The split logic was never broken. A coincidence of amounts was allowed to move before a written
invoice reference did.

I added a pass 0 that commits reference-named matches first, strongest evidence before any amount
heuristic, and reverted pass 3 to the conservative window. F1 went from 77.2% to 85.1%. Split
recall went from 39.1% to 70.3%.

What changed permanently: the wrong fix survived a typecheck and 83 green tests because every test
checked one pass in isolation, and the failure lived between passes. Running the harness one noise
class at a time is the first thing I reach for now, not the last. The whole log is in BREAKAGE.md
with timestamps, written as it happened rather than reconstructed at the end.
```

### Short fields
```
Full name          Aleti Dhanush
College            Indian Institute of Technology Madras
Graduation year    2028
In person from Sep Yes
Duration           6 months
Track              04, AI Finance Controller
Project name       Nostro
Resume             docs/razorpay/Aleti_Dhanush_Resume.pdf
```

---

## What changed in the rewrite

| Tell | Where it was | Fix |
|---|---|---|
| Negative parallelism | "not a property of the person, it is a property of the payment rail" | Led with the mechanism instead. "The payment rail decides whether you have this problem at all." |
| Boldface overload | Every draft, roughly 20 bolded phrases | All removed. Google Forms would have pasted them as literal asterisks anyway. |
| Metronome rhythm | Uniform 3-line paragraphs throughout | Short blunt sentences mixed in. "In production, taking payments." "It typechecked." |
| No contractions | Every sentence written out in full | Kept mostly formal, but the stiffest constructions relaxed. |
| Announcing significance | "the design decision I am proudest of" kept, but "the number that matters" cut | Replaced with the fact that makes the reader conclude it. |
| Aphoristic closer | "Chemical engineering is where I learned to distrust a model that has not been checked against the thing it describes" | "That is a chemical engineering habit. You check the model against the plant." |
| Rupee sign | ₹ throughout | Spelled out. Form fields mangle the glyph often enough to matter. |
