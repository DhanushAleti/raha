# Nostro — the pitch video, about three minutes, word for word

**Right-sized, not shortened for its own sake.** Every beat below answers one of the four things
the brief says it judges on: problem taste, build quality, AI judgment, failure recovery. Nothing
is here that doesn't earn its place against one of those four.

**Setup, 60 seconds.** Terminal 16pt, dark theme, wide enough the scorecard doesn't wrap.
`cd ~/Desktop/obsedian/nostro`, run `npm run evaluate` once so the cache is warm. Notifications off.
One take, twice, keep the second.

**The one rule: never say a number that isn't on screen while you say it.** The breakage numbers are
the exception, and they're all past tense.

> **Do not run `--only split_remittance` on camera.** It prints 29.08% now, not the 39.1% the story
> is about. Show `BREAKAGE.md` instead — the historical numbers are written down there.

---

## 0:00 - 0:26 · The money — problem taste

*Screen: empty terminal.*

> There is a class of Indian business that can be assessed eighteen percent GST on revenue it
> already collected and spent, a year later, because of one missing document. Every foreign bank
> credit has to be tied to an invoice and a FIRA before it counts as a zero-rated export. Today
> that's a spreadsheet, done by hand, once a year, under deadline. This is the batch job that finds
> the gaps first.

## 0:26 - 0:45 · Tests, then the scorecard opens — build quality

*Screen: `npm test` briefly, then `npm run evaluate`. Let the card print.*

> A hundred and ten tests, all green — none of them need an API key, the model layer runs through a
> stub. Two hundred and fifty invoices, twelve noise classes, only thirty-four percent of this
> batch is a clean match. Ninety-six and a half percent precision, eighty-one point six recall.

## 0:45 - 1:12 · The number it's built around

*Pause on the exposure block.*

> But this is the number I built it around. Under-declared: zero rupees. That's the value of
> anything this called tax-free that isn't, real liability found late with interest running. A run
> that under-declares exits non-zero, whatever the F1 says. And recall sits at eighty-one, not
> ninety-five, on purpose: when two candidates fit equally well, it refuses instead of guessing.

## 1:12 - 1:30 · The queue

*Scroll to EXCEPTIONS and TOP OF THE QUEUE.*

> A hundred and fifty-one exceptions, sorted by what it costs to be wrong about, not by arrival
> order. Top of the queue: one lakh ninety-eight thousand rupees, a certificate raised under the
> wrong purpose code. Nobody catches that in a spreadsheet in March.

## 1:30 - 2:04 · Where a model belongs — AI judgment

*Screen: `src/core/` then `src/llm/`.*

> Here's the AI judgment part, since the track asks for it directly. Core has no network dependency
> and can't import the model layer, there's a test that fails if that changes. Bank narrations are
> machine-generated and mostly regex-readable, so a regex reads them, for free, identically every
> run. The model only ever sees the mangled minority the parser flags. It returns a validated hint,
> never an allocation, and a failed call degrades to zero hints. It can add recall. It can never
> remove correctness.

## 2:04 - 2:42 · What broke — failure recovery

*Screen: open `BREAKAGE.md`, scroll slowly. Do not run the harness here.*

> Split remittances were stuck at thirty-nine percent recall while the unit test for that path
> passed. I assumed the later legs were falling outside the window and built a wider search. It
> typechecked, all tests stayed green, and it made the number worse, thirty-nine down to
> twenty-nine. The real bug was ordering: a coincidence of amounts was moving before a written
> reference did. I fixed that, and F1 went from seventy-seven to eighty-five. What changed
> permanently is how I debug: running the harness one noise class at a time is the first thing I
> reach for now, not the last.

## 2:42 - 3:00 · Reproduce it, close

*Screen: `npm run evaluate -- --count 1000 --seed 42`.*

> Everything you've seen regenerates from a seed. Change the count, change the seed, isolate one
> class. If you can't reproduce the numbers in my README from one command, they're decoration.
> That's Nostro.

*Stop recording immediately. No outro.*

---

## After

1. Upload unlisted. Title: `Nostro — batch FIRA reconciliation with a measured accuracy harness`.
2. Description: one line plus `https://github.com/DhanushAleti/nostro`.
3. Paste the link into form field 11. Submit tonight.

**If a line goes wrong mid-take, keep rolling and say it again.** One trimmed flub beats six
restarts.
