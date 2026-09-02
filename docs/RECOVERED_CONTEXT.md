# Recovered context — session and vault sweep

**Run 2026-09-02.** Sources: every Claude Code session transcript under
`~/.claude/projects/` for `obsedian`, `obsedian/raha` and its worktree (370 distinct founder turns,
22 Jul to 2 Sep), the Dhanush OS vault, the Raha repo, and the Nostro repo.

This page records **only what the repo did not already say**. Everything already in
`PROJECT_MASTER_DOCUMENT.md` is left there.

---

## 1 · The big one: Nostro is built

`docs/razorpay/PLAN.md` reads as a 13-day plan and the master document describes the design in the
future tense. **The build is finished and it is good.**

`~/Desktop/obsedian/nostro`, 5 commits, no GitHub remote yet.

| | |
|---|---|
| Tests | **110 passing**, strict typecheck clean, none need an API key |
| Allocation precision / recall / F1 | **96.52% / 81.62% / 88.45%** |
| Status accuracy | 85.2% (213/250) |
| Under-declared (wrongly called zero-rated) | **₹0.00, 0 invoices** |
| Over-provisioned | ₹0.00 |
| Exposure in batch / correctly flagged | ₹42,93,601 / ₹40,95,655 |
| Exceptions | 151, over 7 reason codes, each priced in ₹ |
| Throughput | 717 records in 13-16ms (~51,000 rec/s) |
| Batch | 250 invoices, 12 noise classes, seed 20260905 |

**One thing the sweep got wrong on first pass, and it matters.** `src/llm/` and `src/exceptions/`
were **empty directories**, and `npm run generate` pointed at a file that did not exist, while the
README described Layer 2 as working. The first draft of the Razorpay answers repeated that claim.
Caught by checking the repo against its own README rather than trusting either. **Layer 2 is now
built** (commit `c213d82`): the review queue, Zod-validated hints, four guards on the model's
output, cost accounting, 9 tests through a stub client so the suite still needs no API key.

`BREAKAGE.md` in that repo is the strongest single artefact the founder has produced: five real
failures logged with timestamps as they happened, including a fix that was shipped and made the
metric worse (39.1% to 29.7%) on a premise that turned out to be false.

**What is missing is mechanical:** a public GitHub URL and a 5-minute video. Both in
`docs/razorpay/APPLICATION.md`.

## 2 · Founder facts the repo never recorded

From the vault (`identity.md`, `user.md`, `soul.md`) and the session record:

- **Second-year B.Tech Chemical Engineering, IIT Madras.** Graduating 2028. The repo says "IIT
  Madras" and nothing else, and the discipline matters: it is the honest answer to "how do you think"
  and it is unusual for a fintech founder.
- 5.12 CGPA, 5 backlogs, Sem 5 in progress with 63 credits, CH2014 and EE1100 due for
  re-registration in Sem 6. **Never volunteer these.** They are the reason the Razorpay buildathon
  door was chosen (no resume screening) and they are not asked for anywhere else.
- The Bangalore internship needs a semester deferral or leave. Still unhandled with the institute.
- **Stated operating contract** (vault `soul.md`): lead with the answer, no filler, bold only for
  true emphasis, show trade-offs explicitly, give the strongest recommendation rather than a menu,
  "truth over politeness when choosing between the two." Documents in this repo should be written to
  that standard.
- **Self-named failure patterns** (vault `user.md`): over-expands scope faster than execution
  capacity, gets pulled toward complexity, needs forced prioritisation rather than more options.
  This is visible in the record: seven `chore: cadence commit` commits on 31 Aug and zero public
  answers against a floor of twelve.

## 3 · Patterns from 370 founder turns worth keeping

- **The delegation contract is explicit and old.** 22 Jul: *"You are my co-founder, or whatever term
  you say. You should do all the work on my behalf."* Repeated on 27 Jul and 28 Aug. The founder
  wants decisions and finished artefacts, not options.
- **He calls out low-value work.** 27 Jul: *"you are doing a bloody very low-level job... you should
  be doing even more things."* The correct response to that is scope, not apology.
- **He asks for the honest read repeatedly**, and has since day two: *"is Raha really having market
  fit"*, *"is it worth working on this idea, or is it a waste of time"*, *"just be genuine, if I
  blindly follow you, how much money will I make in approx 30 days."* Answer these plainly every
  time. Softening them is the failure mode.
- **The ambition is explicitly Zepto-scale**, and he has already rejected an ₹8,000/month framing as
  not worth the time. Any plan that tops out small has to say so up front rather than be discovered.
- **The warm network is blocked by a real reason, not laziness.** 23 Jul: he avoids his personal
  LinkedIn and Instagram because they carry the IITM tag and his friends are there. Still the second
  largest untapped channel.
- **A long tail of parallel builds:** NEXUS, InboxPilot, graphify, a personal site, Fibonacci,
  project-phi, plus the vault's own AI Operating System and AI Company Blueprint. Evidence of range,
  and also of the scope-expansion pattern above.

## 4 · The vault holds a second knowledge base the repo never references

`Dhanush OS/Raha/` has 24 numbered folders. Two clusters matter and neither is linked from any repo
document:

- **`24 GTM OS/`** — 15 documents: GTM operating system, market and ICP, pain map and triggers,
  customer journey, messaging, pricing and packaging, acquisition channels, sales playbook, content
  engine, AI automation strategy, metrics dashboard, execution roadmap, risk and experiments,
  immediate action plan, **red team review**, knowledge coverage report.
- **`23 GTM Research/`** — six numbered intelligence missions: Reddit, LinkedIn, competitors,
  community, pain signals, immediate buyers, plus an executive summary.

**Treat these as a research corpus, not as a plan of record.** `research/decision.md` and
`docs/NOW.md` still win on tactics. But the buyer intelligence and pain-signal work is real input the
30-day outreach queue has not been checked against.

## 5 · What this changes

1. `PROJECT_MASTER_DOCUMENT.md` said the Nostro build was ahead. It is behind us. Patched.
2. The Razorpay submission is three days of mechanical work, not a build sprint.
3. The Lightspeed answers can cite measured engineering numbers instead of adjectives, which is the
   difference between a memorable slot and a forgettable one.
