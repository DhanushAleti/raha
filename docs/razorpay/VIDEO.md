# Nostro — the pitch video, four minutes, word for word

**Record 3 Sep. Unlisted YouTube. Screen recording with voice.** No slides, no music, no logo, no
face cam. Razorpay reads the repo and watches the video; a terminal demo from someone who knows the
domain beats a produced pitch and takes a tenth of the time to make.

**Cut from five minutes to four.** The exception queue now shares a beat with the scorecard, since
both are on the same screen output, and the closing beat is shorter. Nothing of substance was lost.

**Before you hit record**
- Terminal at 16pt, dark theme, wide enough that the scorecard does not wrap.
- `cd ~/Desktop/obsedian/nostro`, run `npm run evaluate` once so the tsx cache is warm.
- Close Slack and notifications.
- One take, twice. Keep the second. Trim only the ends.

**The one rule: never say a number that is not on screen while you say it.** Historical figures from
the breakage story are the exception, and they are all in the past tense so nothing on screen
contradicts your voice.

> **Do not run `--only split_remittance` on camera.** It prints 29.08% recall on a single-class
> batch of 250, and the story you are telling is about 39.1% at the time it happened. Show
> `BREAKAGE.md` instead, where the historical numbers are written down.

---

## 0:00 - 0:30 · The money

*Screen: empty terminal.*

> There is a class of Indian business that can be assessed eighteen percent GST on revenue it
> already collected and spent, a year later, because of one missing document. Not a late filing. A
> missing piece of paper.
>
> Every foreign bank credit has to be tied to an invoice, and to a FIRA, before it counts as a
> zero-rated export. Today that reconciliation is a spreadsheet, done by hand, once a year, under
> deadline. This is the batch job that finds the gaps first.

Do not open with your name, your college, or the track number. They know.

## 0:30 - 0:50 · The tests

*Screen: `npm test`, let it reach the 110 pass line.*

> A hundred and ten tests. Every rupee-affecting decision in here is a pure function with a unit
> test, because money math does not get to be probabilistic. And none of them need an API key. The
> model layer runs through a stub, so the suite still works on a laptop with no credentials.

## 0:50 - 2:00 · The scorecard and the queue

*Screen: `npm run evaluate`. Let the whole card print. Do not scroll while talking.*

> Two hundred and fifty invoices, twelve noise classes. Only thirty-four percent of this batch is a
> clean one-to-one match. The rest is split remittances, merged wires, exchange rates drifting
> across a month, bank charges shaving the amount until it stops matching, missing certificates,
> wrong purpose codes.
>
> Ninety-six and a half percent allocation precision. Eighty-one point six recall.

*Pause. Point at the exposure block.*

> But this is the number I built it around. Under-declared: zero rupees. That is the value of
> anything this called tax-free that is not. Real liability, found late, with interest running. A
> run that under-declares anything exits non-zero, whatever the F1 says.
>
> And recall is eighty-one, not ninety-five, on purpose. When two candidates fit equally well the
> engine refuses instead of guessing, and the refusals land here.

*Scroll to EXCEPTIONS and TOP OF THE QUEUE.*

> A hundred and fifty-one exceptions across seven reason codes. Each one carries the exposure it
> represents, so the queue sorts by what it costs to be wrong about rather than by arrival order.
> Top of it: one lakh ninety-eight thousand rupees, a certificate raised under the wrong purpose
> code. Nobody finds that in a spreadsheet in March.

## 2:00 - 2:50 · Where a model belongs

*Screen: `src/core/` then `src/llm/`.*

> The track asks about AI judgment, so here is the boundary, and it is enforced rather than
> documented. Core has no network dependency and cannot import the model layer. There is a test that
> fails if anyone changes that. No model touches a number that becomes a tax figure.
>
> Bank narrations are machine-generated and mostly regex-readable, so a regex reads them. Free, in
> microseconds, identically on every run. Reaching for a model there is the exact mistake this track
> is probing for.
>
> What the model gets is the mangled minority the parser flags. It returns a validated hint, never
> an allocation, and four guards sit on it: schema, exact reference format, provenance against the
> queue I sent, and a confidence floor. A failed call degrades to zero hints. It can add recall. It
> cannot remove correctness.

## 2:50 - 3:40 · What broke

*Screen: open `BREAKAGE.md` and scroll slowly. Do not run the harness here.*

> This is the log I keep while building. Split remittances were stuck at thirty-nine percent recall
> while the unit test for that path passed. I assumed the later legs were falling outside the
> forty-five day window and built a wider search. It typechecked, eighty-three tests stayed green,
> and it made the number worse. Thirty-nine down to twenty-nine.
>
> What found it was dumping a batch and reading the raw records instead of trusting my own
> generator's parameters. Every leg was inside the original window. The premise of my fix was false.
>
> The real cause was ordering. A coincidence of amounts was allowed to move before a written invoice
> reference did. I added a pass that commits named references first, and F1 went from seventy-seven
> to eighty-five.

## 3:40 - 4:00 · Reproduce it

*Screen: `npm run evaluate -- --count 1000 --seed 42`.*

> Everything you have seen regenerates from a seed. Change the count, change the seed, isolate one
> noise class. The README also publishes where this degrades: on a batch of nothing but merged
> remittances, recall collapses and under-declared still stays at zero. It refuses rather than
> guesses. That is Nostro.

*Stop recording. No outro.*

---

## After

1. Upload unlisted. Title: `Nostro — batch FIRA reconciliation with a measured accuracy harness`.
2. Description: one line plus `https://github.com/DhanushAleti/nostro`.
3. Paste the link into form field 11 and submit.

**If a line goes wrong mid-take, keep rolling and say it again.** Trimming one flub beats six
restarts, each one flatter than the last.
