# LinkedIn drafts — Aleti Dhanush

**Written 2026-09-02. Nothing here has been applied to LinkedIn. Every line is a draft for you to
change.** Profile: `linkedin.com/in/dhanushaleti` · GitHub: `github.com/DhanushAleti`

> **Paste-ready.** Every fenced block below is one continuous paste. Paragraphs are single long lines
> on purpose — LinkedIn preserves line breaks, so a hard-wrapped paste comes out looking broken.
> Character counts are measured, not estimated.

> **Access note:** the live profile could not be read. LinkedIn served an auth wall to the headless
> browser and the Chrome cookie import is stuck on a macOS Keychain prompt (see §12). So these are
> written from your own context — the vault (`identity.md`, `user.md`, `soul.md`), the Raha repo, and
> your public GitHub — not from a diff against what is currently on the profile.

---

## 0 · The decision behind every draft

Your own record says you avoid personal LinkedIn because it carries the IITM tag and your friends are
there (`docs/RECOVERED_CONTEXT.md` §3, 23 Jul). That is a real reason, and it points at a real answer:

**Do not treat this profile as a lead-gen channel. Treat it as the page that loads when someone
already evaluating you types your name.** That is a different job with a different bar.

Who actually types your name right now:

| Who | When | What they need to see |
|---|---|---|
| Nirmaan / Pratham reviewers | now, application submitted 29 Aug | a founder with a real problem and shipped code, not a student with a deck |
| Razorpay buildathon reviewers | before 5 Sep | someone who builds measurable systems |
| NSRCEL, other incubators | Oct onward | consistency with what the application said |
| The 20–30 accepted IITM connections | already connected | that connecting was correct |

None of those need a post. All of them need a profile that does not contradict the applications.
So: **fix the static profile now, post later or never.** Posting is §9 and it is optional.

**The rule you already set, unchanged:** the 20–30 IITM connections are banked, not spent. Do not
DM them for customer intros before the cohort decision. `docs/nirmaan/APPLICATION.md` p.245.

**Three things that must never appear on this profile**, because they are false, premature, or a
licensing boundary:

1. Any customer, revenue, or traction claim. Raha is at **₹0, zero customers, zero paid asks**.
2. Any suggestion you file returns or give tax advice. You are not a CA. Every figure Raha computes
   is an estimate to confirm with a qualified CA. This is a licensing line, not a style preference.
3. CGPA, backlogs, or academic standing. Nobody asks for these on LinkedIn. Never volunteer them.

---

## 1 · Headline, and whether to say "Founder" at all

### The Founder question, answered

**Keep "Founder". Take it out of the headline. Never write "CEO".**

Zero revenue is not what makes a founder title cringe. **Title without artifact is what makes it
cringe.** The pattern everyone recognises is "Founder & CEO | Serial Entrepreneur | Building the
future of X" attached to a landing page and nothing else.

Your page would carry a live product, 68 unit tests over money math, a working paper on a transition
nobody else has documented, and a reconciliation engine measured at 96.52% precision with ₹0
under-declared. That is more artifact than most funded seed founders put on a profile. Against that,
"Founder" is the least interesting word on the page — which is exactly where you want it.

| Field | Verdict | Why |
|---|---|---|
| Experience title | Say `Founder` | It is a form field, not a boast. Everyone who has shipped a thing uses it. Nobody has ever cringed at a job-title field. |
| Headline | Do **not** open with "Founder" | A headline that opens with a title claims status. One that opens with what you build reports activity. Same facts, opposite read. |
| "Founder & CEO" | Never | CEO implies people to be chief of. This is the actual tell, and the one people mock. |
| Team size | Never mention it | Nobody asks. Do not volunteer "solo" and do not apologise for it. Your GitHub's "I run a one-person company" is fine there and wrong here. |
| Revenue | Never mention it, either direction | Revenue is not a LinkedIn field. The awkwardness comes from you knowing the number, not from any reader seeing it. |

**The risk you actually have** is not looking like a fake founder. It is looking like a second-year
student who is not one, when you have a live product, a paper, and a measured engine. Underclaiming
is the bigger error. The fix is to move the evidence up, not the title down.

### Short headlines

You were right that the old one was too long. It was also credential-stacking: your Education entry
already puts **IIT Madras on the profile card**, so repeating it in the headline buys nothing and
costs you the confident read. All three below drop it.

**A · The one to use (recommended)** — 53 characters

```
Building Raha — foreign income, proved as a 0% export
```

Names the thing, states what it does, ends. No title, no credential, no pipe-separated list.
"Proved" is the verb that carries the whole company.

**B · The confident one** — 13 characters

```
Building Raha
```

This is what the founders you are pattern-matching to actually write. The honest tradeoff: it works
because *their* company name carries meaning. Raha's does not yet, so this only holds if the banner
and About do the explaining — which, with the §8 banner, they would. Highest ceiling, highest risk.

**C · The teaching one** — 53 characters

```
Foreign income is a 0% GST export. I build the proof.
```

Best if a freelancer or a CA is more likely to land here than an investor. Teaches in one line and
still never says "founder".

**Cut from the earlier drafts:** the 168-character version, and "Founder, Raha — GST evidence
infrastructure for…". Both were correct and neither was elite — they explained instead of asserting,
and stacked IIT Madras on the end.

---

## 2 · About

Limit 2,600 characters. Two options. Both open with the problem, not with you — the standard
"passionate about building" opener is the thing that makes a profile skippable.

### Option 1 — full (recommended) · 2,293 characters

```
An Indian who bills a foreign client is, in law, an exporter. That income is zero-rated under §2(6) of the IGST Act: 0% GST, not 18%.

Two documents make it real. A FIRA from the bank, proving the money arrived in convertible foreign exchange. And an LUT, filed before that financial year's first export invoice. Miss either and the same income can be assessed as a domestic supply at 18% IGST, plus interest, plus penalty — on money already earned and spent. On ₹40L of foreign income that is roughly ₹7L of avoidable exposure.

Most people miss it for a boring reason. Physical FIRCs stopped being issued for export remittances in 2016. Banks raise an IRM in EDPMS and issue a FIRA instead. Nine years on, "FIRC" is still the word used by advisors, platform help pages, and GST officers at LUT renewal — so people ask their bank for a document that no longer exists, get turned away, and blame the bank.

I build Raha to close that gap. It reconciles every foreign credit in a period against the document behind it, says which credits stand up as zero-rated exports, and prices the exposure on the ones that do not.

The part most people get wrong is that the payment rail decides the answer. Skydo, Karbon, Winvesta and Payoneer already issue a FIRA automatically, and those users need nothing from me — I tell them so. Wise, PayPal and Stripe structurally cannot issue one, because the money lands as a domestic transfer. Direct bank transfers, and anyone with two years to backfill, are where the real gap is.

What I actually do: define the product, write the code, do the research, and talk to the people with the problem. Next.js, TypeScript, Supabase, Postgres with row-level security on every table. The money math is pure functions with unit tests — no model gets to decide a rupee.

Raha does not file returns and I am not a Chartered Accountant. Every figure it produces is an estimate to confirm with a qualified CA. That boundary is deliberate.

Second-year B.Tech Chemical Engineering at IIT Madras. Chemical engineering is mass balances and process control, which turns out to be reasonable training for reconciliation: things in, things out, find the leak.

I build in public and write up what I learn, including the parts that broke.

raha.software · github.com/DhanushAleti
```

### Option 2 — short · 840 characters

Use this if Option 1 reads as too much. Keeps the sentence that matters and drops the rail detail.

```
An Indian who bills a foreign client is, in law, an exporter. That income is zero-rated: 0% GST, not 18% — but only with a FIRA from the bank and an LUT filed before that year's first export invoice. Miss either and the same money can be assessed at 18%, plus interest, plus penalty.

Physical FIRCs stopped being issued in 2016; banks issue a FIRA now. Almost nobody knows, including people who advise on this for a living.

I build Raha, which reconciles foreign credits against the evidence behind them and prices what is exposed. I define the product, write the code, do the research, and talk to the people with the problem.

Raha does not file returns and I am not a CA — every figure is an estimate to confirm with one.

Second-year B.Tech Chemical Engineering, IIT Madras. I build in public.

raha.software · github.com/DhanushAleti
```

**Swap in if you prefer it:** the last line of Option 1 can become *"I run a one-person company —
models, tools and agents do the volume work and I decide how the pieces fit."* That is your GitHub
README line and it is a good one. It is left out above only because on LinkedIn it invites
"AI founder" pattern-matching that the FIRA detail otherwise saves you from.

---

## 3 · Experience

### Raha — Founder

- **Title:** `Founder`
- **Company:** `Raha` (create the Company Page first if you want the logo; otherwise LinkedIn will
  attach a stranger's page — check what it autocompletes to before saving)
- **Dates:** `Jul 2026 – Present`
- **Location:** `Hyderabad, Telangana, India` · Remote
- **Description** · 1,477 characters, limit 2,000:

```
Raha proves that money Indians earn from foreign clients is a zero-rated GST export — the FIRA and LUT paperwork that makes it 0% instead of 18%, on whatever payment route it arrived by, including the routes that cannot produce that paperwork at all.

Built and shipped solo, live at raha.software:

• Free 9-question evidence audit, no signup, scored server-side to a red/amber/green verdict
• Income tracking with CSV import and FX conversion, every INR figure auditable back to the rate and the source it used
• FIRA/FIRC matching — suggest-then-confirm reconciliation of remittances against income, with partial allocations and an unmatched-exposure estimate
• GST-compliant invoicing: domestic CGST/SGST vs IGST by state, or zero-rated export with the LUT note, per-FY sequential numbering, PDF export
• Live liability estimate — GST plus the next advance-tax installment, minus TDS
• Document vault on private storage, isolated per user

Next.js 15, TypeScript, Supabase Postgres with row-level security on all 10 tables, Vercel. 68 unit tests over the tax, FX, GST and matching logic — every rupee-affecting decision is a pure function with a test against it. No AI in the product.

Also wrote the research behind it: a working paper on the 2016 FIRC-to-FIRA transition and how the compliance burden falls unevenly across payment rails.

Raha does not file returns. Every computed figure is presented as an estimate to confirm with a qualified Chartered Accountant.
```

**Deliberately absent:** customers, revenue, users, waitlist size, "traction". Add them the day they
are true and not before. One paid ₹2,000 is a fact worth adding; "early traction" is not.

### IIT Madras — the VentureArch line

Only if you want it, and only as written. This is documented and defensible: you were shortlisted and
pitched. It is **not** a claim of selection into Nirmaan or Pratham.

- **Title:** `Founder, Team A38 — VentureArch Idea Sprint`
- **Company:** `IIT Madras`
- **Dates:** `Aug 2026`
- **Description** · 463 characters:

```
Shortlisted for the VentureArch idea sprint at IIT Madras and pitched Raha (Team A38) — the first external evaluation of the idea. The monetization question came up three times and I did not have a clean answer on the day. The answer I found afterwards became the spine of the model: the LUT is re-filed every financial year before the first export invoice and a FIRA is needed per payment, so the statute makes the work repeat. It is not a subscription mechanic.
```

**Do not add** a Nirmaan or Pratham entry until you have an acceptance in writing. The application
went in 29 Aug; that is not an affiliation.

---

## 4 · Projects section

Better home for Nostro than Experience — it is a buildathon entry, not a job. Numbers are from the
real run (seed 20260905), so they are quotable.

**Nostro — AI finance controller for cross-border reconciliation** · Sep 2026 · 1,085 characters

```
Built for the Razorpay AI Buildathon, Track 04. Reconciles export invoices against foreign remittances at batch scale and prices what is exposed.

Three layers, deliberately separated. A deterministic core that cannot import the LLM layer — matching, FX, GST and tax math as pure functions. A narrow, Zod-validated model layer used only where determinism structurally cannot work: bank-narration parsing, entity resolution, FIRA PDF extraction, ambiguous ranking. And an exception queue where anything uncertain lands with a reason code and a rupee cost attached.

Measured on 250 invoices across 12 noise classes:

• 96.52% allocation precision, 81.62% recall
• ₹0.00 under-declared — nothing wrongly called zero-rated
• 151 exceptions raised across 7 reason codes, each priced
• ~44,800 records/sec
• 110 tests, strict typecheck clean, no API key needed to run the suite

Reproducible with one command. BREAKAGE.md in the repo logs five real failures as they happened, including a fix that shipped and made the metric worse — 39.1% to 29.7% — on a premise that turned out to be false.
```

**Also worth listing, one line each** (all already on your GitHub):

| Project | One-liner |
|---|---|
| Exoplanet Hunter (TESS) | Transit-search pipeline over real NASA TESS light curves — MAST queries, stitching, flattening, BLS periodogram, candidate catalog. Python, Lightkurve. |
| GPT From Scratch | Character-level GPT built up from tokenizer to bigram baseline to self-attention to a small transformer, step by step rather than through a high-level library. PyTorch. |
| RAG Pipeline | Retrieval-augmented generation over a document corpus: chunking, embeddings, vector retrieval, grounded synthesis. |
| Code Debugger Agent | Agent that reads code, diagnoses failures, and proposes fixes. |
| OrbitalMind | Orbital-mechanics and astrodynamics workbench. Python, SciPy. |

**Sequencing note:** BREAKAGE.md is the strongest single artefact you have produced, and it only
counts if the repo is public. Two mechanical blockers on Nostro are still open — no public GitHub URL
and no video. Until the repo is public, keep the Nostro entry but drop the BREAKAGE sentence, because
it points at something a reader cannot open.

---

## 5 · Publications

- **Title:** `FIRC to FIRA: Documentary Evidence Infrastructure and the Uneven Compliance Burden on India's Independent Digital Exporters`
- **Publisher:** `Self-published working paper`
- **Date:** `Aug 2026`
- **Description:**

```
Traces the 2016 discontinuation of physical FIRCs for export remittances (RBI A.P. (DIR Series) Circular 74) and the shift to EDPMS/IRM-based FIRA issuance, then stratifies India's independent exporters by payment rail — rails that issue a FIRA automatically, rails that structurally cannot, and direct bank transfers where the burden falls entirely on the earner. The rail stratification does not appear to be documented elsewhere.
```

Label it a **working paper**. It is self-published and not peer-reviewed; saying so costs nothing and
protects you if someone checks.

---

## 6 · Education

```
IIT Madras — B.Tech, Chemical Engineering · 2024 – 2028
```

Leave the description empty, or one line only:

```
Coursework in transport phenomena, thermodynamics, process control, and numerical methods.
```

No grades, no activities inventory. If you want one non-academic line, use the VentureArch pitch — but
it is already an Experience entry in §3, so do not repeat it here.

---

## 7 · Skills, Featured, Open To

**Skills — order matters, LinkedIn shows the top 3 on the profile.** Put the unusual ones first;
"Python" is not what makes you interesting.

| # | Skill | # | Skill |
|---|---|---|---|
| 1 | GST Compliance | 6 | Supabase / PostgreSQL |
| 2 | Cross-Border Payments | 7 | Product Management |
| 3 | Next.js | 8 | Financial Reconciliation |
| 4 | TypeScript | 9 | Technical Writing |
| 5 | Python | 10 | Startup Founding |

**Featured section — pin four things, in this order:**

1. `raha.software/audit` — the free audit, not the homepage. It is the thing a stranger can use in
   90 seconds without talking to you.
2. The FIRC-to-FIRA working paper PDF.
3. `github.com/DhanushAleti`.
4. Nostro's repo — **only once it is public.**

**Open To:** turn on `Collaboration`. Leave `Job seeking` off — it contradicts "Founder" three lines
above it, and the Razorpay route you chose is a buildathon, not a job application.

**Custom button:** set it to `Visit website` → `https://raha.software`.

---

## 8 · Banner and photo

**Banner (1584 × 396).** No stock imagery, no gradient with a motivational line. One sentence in a
plain typeface on a flat background:

- **A:** `Foreign income is a 0% GST export. Most Indians earning it pay 18% for want of a document.`
- **B:** `FIRC → FIRA, 2016. Nine years later, almost nobody knows.`
- **C:** `raha.software` and nothing else.

A is best. It is the only banner in anyone's feed that teaches something.

**Photo.** Plain, well-lit, neutral background, no sunglasses, no crop from a group photo. This is the
one element where "unremarkable and correct" beats anything creative.

---

## 9 · Posts — optional, and honestly optional

Your own plan lists LinkedIn and X content under **"Cut / never in scope"** for Raha's distribution
(`PROJECT_MASTER_DOCUMENT.md`, feature inventory). That decision is still right: posting is not what
gets you the first paid ₹2,000, and the 30-day window says stop making content.

So treat these as reserve. If you want the profile to look alive when a reviewer lands on it, **one
post is enough.** Post #1 only.

**Post 1 — the correction.** Teaches something true, sells nothing, needs no traction to be worth
reading. 1,439 characters.

```
Physical FIRCs stopped being issued for export remittances in 2016.

RBI A.P. (DIR Series) Circular 74. Banks stopped issuing the certificate and started raising an IRM in EDPMS, then issuing a FIRA instead.

Nine years later, "FIRC" is still the word used by advisors, by platform help pages, and by GST officers at LUT renewal. So a freelancer walks into a bank, asks for a FIRC, gets told it doesn't exist, and concludes the bank is wrong.

It matters because of what the document is for. If you bill a foreign client, you are an exporter, and that supply is zero-rated — 0% GST instead of 18%. But only if you can evidence it: a FIRA per remittance, and an LUT filed before that financial year's first export invoice.

Without them, the same income can be assessed as a domestic supply at 18%, plus interest, plus penalty. On ₹40L of foreign income that is around ₹7L, on money you already spent.

The part almost nobody checks: your payment rail decides whether you can get one at all. Skydo, Karbon, Winvesta and Payoneer issue a FIRA automatically. Wise, PayPal and Stripe structurally cannot — the money reaches you as a domestic transfer. Direct bank transfer, you are on your own.

If you earn in foreign currency, the question worth asking your bank this week is "can you issue me a FIRA for these remittances", not "can you issue me a FIRC".

Not tax advice, and I'm not a CA — confirm anything here with yours before you file.
```

**Post 2 — the negative result.** Hold this one. It is a better post than #1 but it reads as
positioning when there are no customers yet; it lands properly once there are. 666 characters.

```
I shipped a fix that made the metric worse. 39.1% to 29.7%.

I was building a reconciliation engine for cross-border payments, matching foreign remittances to export invoices. Recall was low. I had a theory about why, wrote the fix, ran the batch, and watched the number fall by nine points.

The premise was false. The fix was correct code for a problem that wasn't there.

I log these in a file called BREAKAGE.md, with timestamps, as they happen. Five entries so far. The temptation is to log only the ones with clean endings, which is exactly what makes the file useless.

An evaluation harness you only run when you expect good news isn't an evaluation harness.
```

**Comment policy, if you post at all:** answer every reply that asks a real question, and when
someone's rail already issues a FIRA, say so and send them away. Disqualifying people in public is why
the ones who stay believe you.

---

## 10 · Connection notes — for October, not now

Per your own rule, the IITM connections stay banked until the cohort decision. These are for **after**
that, and for new connections in the meantime.

**To someone who bills foreign clients** (the only one that can lead anywhere commercially):

```
Hi [NAME] — saw you bill international clients. I work on the GST side of that: the FIRA and LUT paperwork that makes foreign income a 0% export instead of 18%. Not pitching, happy to answer anything if it's ever come up for you.
```

**To a CA who handles cross-border work:**

```
Hi [NAME] — I build tooling for foreign-income reconciliation (FIRA matching, LUT position, export invoicing) for people who earn abroad. Everything ships as an estimate for a CA to confirm; I'm not one and don't file. Would value your read on where it's wrong.
```

**To a programme or incubator contact, after a decision:**

```
Thanks for [the sprint / the call], [NAME]. Raha is live at raha.software — the free audit is the quickest way to see what it does. I'll keep you posted on what the next 30 days show.
```

Never send a first message with a link in it. That rule is already in `WARM_15_DRAFTS.md` and it
applies here too.

---

## 11 · Your GitHub is out of date — fix it while you're at it

You gave me the GitHub URL, so: the profile README contradicts your current positioning in four
places. Anyone who reads both will notice.

| Line on GitHub now | Problem | Change to |
|---|---|---|
| "Tax and GST compliance built for **Indian creators**" | You committed to Layer 2 on 28 Jul — all foreign-income earners, not creators. The whole audit was rescored for it. | "for Indians earning in foreign currency — freelancers, consultants, indie-SaaS founders, agencies and creators" |
| "earning **₹20L–₹2Cr**" | That band is off the front door. The live offer is a ₹2,000 evidence check with no band attached. | Drop the band entirely |
| "**raha-iota.vercel.app** · live in production" | Dead. One hostname now, and it is `raha.software`. | `raha.software` |
| "**FIRC** tracking for foreign-income receipts" | FIRC is the word you correct people on. | "FIRA tracking, and the FIRC→FIRA correction most people are missing" |

Also: the bio field still reads *"Building AI products. Learning in public. Contributing to open
source."* Raha ships **no AI** by design — that is a decision you made and defend. Suggested
replacement:

```
Building compliance infrastructure for cross-border income. Learning in public.
```

---

## 12 · To let me read the live profile

Everything above is written from your context, not from a diff against the current profile. LinkedIn
returns HTTP 999 and an auth wall to the headless browser on every request, including for a public
profile. Five routes tried, all blocked:

| Route | Result |
|---|---|
| Direct headless fetch | Auth wall, HTTP 999 |
| Chrome cookie import ×2 | Stalls on the macOS Keychain prompt for "Chrome Safe Storage"; exits 0 without importing |
| Comet cookie import | Same stall, "Comet Safe Storage" |
| Headed handoff | No headed Chromium installed — needs `npx playwright install chromium` |
| Search-engine snippet | CAPTCHA. Not bypassed. |

**Three ways forward, cheapest first:**

1. **Find and approve the Keychain dialog.** It is a macOS system prompt asking to allow access to
   "Chrome Safe Storage" and may be sitting behind other windows — check Mission Control. Approve it,
   say go, and I re-run the import.
2. **Paste the text.** Copy your current headline, About, and Experience into the chat. No cookies. I
   lose visibility of Featured, Skills order and Open To, but the diff on the writing is the part
   that matters.
3. **Sign in to the open window.** Chromium is now installed and a visible browser is open at
   LinkedIn's sign-in page. Sign in there yourself — I will not touch credentials — then say go and I
   read the profile.

---

## 13 · Scorecard

### I cannot rate your LinkedIn yet

You asked for a precise score out of 10. I have not been able to see the profile. Putting a number on
a page I have not read would be making it up, and a fabricated score is worse than no score. The
rubric is below; a signed-in window is waiting on your screen.

### GitHub: 6 / 10

Scored on evidence — this one I read in full.

| Parameter | Score | Evidence |
|---|---|---|
| README writing | 8 / 10 | Genuinely good. "I'm a founder and an AI orchestrator" is a real opener. "Source is private — happy to walk through the code or architecture" is the right honest note. Get In Touch names exactly who you want to hear from. Better than most funded founders' profiles. |
| Accuracy and freshness | 3 / 10 | The killer. `raha-iota.vercel.app` is dead and it is the flagship's "live in production" link. "Indian creators / ₹20L–₹2Cr" contradicts your Layer-2 commit from 28 Jul. "FIRC tracking" uses the word your wedge exists to correct. Bio says "Building AI products" while Raha ships zero AI by design. |
| Repo presentation | 4 / 10 | 16 repos, exactly **one** pinned. The README advertises seven projects; a visitor who scrolls past it finds a single pin. Six pin slots, one used. Repos surface as `Dhanush9999279` and `NEXUS` with no description. |
| Evidence of work | 7 / 10 | 476 contributions in the last year with real bursts. Range is genuine: astrodynamics, ML from scratch, agents, full-stack. Burst-then-silence is visible but normal under a course load. |
| Claim hygiene | 5 / 10 | "Contributing to open source" sits in the bio unevidenced. Everything else is backed by something real. |

**Why 6 and not higher.** The writing is above average and it is what most visitors read. What holds
it at 6 is that a reviewer checking you out *this week* — Nirmaan, Razorpay — clicks your flagship
link and lands nowhere, then reads a positioning you abandoned five weeks ago. Each is a five-minute
fix, which is what makes leaving them expensive.

### The rubric I will score LinkedIn against

| Parameter | Weight | Full marks |
|---|---|---|
| Headline | 2.0 | Specific in under ~60 characters. No title-first opening, no credential stack, no pipes. |
| About, first two lines | 2.0 | Everything above the "see more" fold. Leads with the problem, not with you. |
| Evidence density | 2.0 | Shipped things, real numbers, links a stranger can open. |
| Claim hygiene | 1.5 | Nothing unfalsifiable. No traction inflation. No implication that you file or advise. |
| Featured and Projects | 1.5 | Something to click. An empty Featured section on a builder's profile is a wasted slot. |
| Consistency | 1.0 | Same positioning as GitHub and as the applications already submitted. |

### The human parameters

How it reads socially, which is a different question from whether it is accurate. Five failure modes,
in the order they usually show up:

| Failure mode | What it looks like |
|---|---|
| Status-claiming | Headline opens with a title. "Founder & CEO". Anything asserting rank before it shows work. |
| Credential stacking | IIT Madras appended to a headline that already has a job to do. Institution used as the argument. |
| Over-explaining | Long headline. Qualifiers. Sentences that justify rather than state. **This is the one your old headline had.** |
| Apologising | "Aspiring", "learning", "trying to build", team size disclosed unprompted, hedges on your own work. |
| Unbacked ambition | Vision language with nothing shipped under it. You are the rare case where the opposite is true — you have shipped more than the profile says. |

**Either way, nothing has been changed on LinkedIn, and nothing will be without you asking.**
