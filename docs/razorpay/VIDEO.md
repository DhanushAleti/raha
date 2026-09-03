# Nostro — the 5-minute video, word for word

**Record Wed 3 Sep. Unlisted YouTube. Screen recording with voice, no slides, no intro music, no
logo, no face cam needed.** Razorpay says they read the repo and watch the video. A terminal demo
from someone who knows the domain beats a produced pitch, and it is faster to make.

**Before you hit record**
- Terminal at ~16pt, dark theme, window wide enough that the scorecard does not wrap.
- `cd ~/Desktop/obsedian/nostro`, run `npm run evaluate` once first so the tsx cache is warm and the
  timing is representative.
- Close Slack, WhatsApp, notifications.
- One take, twice. Keep the second. Do not edit beyond trimming the ends.

**Rule for the whole recording:** never say a number that is not on screen while you say it.

---

## 0:00 - 0:35 · The money, not the introduction

*Screen: empty terminal.*

> There is a class of Indian business that can be assessed eighteen percent GST on revenue it
> already collected and spent, a year later, because of one missing document. Not a late filing. A
> missing piece of paper.
>
> Every foreign bank credit has to be tied to an invoice, and to a FIRA, before it counts as a
> zero-rated export. Today that reconciliation is a spreadsheet, done by hand, once a year, under
> deadline.
>
> This is the batch job that finds the gaps before the department does.

**Do not** open with your name, your college, or the track number. They know. Open with the money:
that is the only thing borrowed from a sales system anywhere in this recording.

## 0:35 - 1:05 · The tests

*Screen: `npm test`, let it run to the 110 pass line.*

> A hundred and ten tests. Every rupee-affecting decision in this system is a pure function with a
> unit test, because money math does not get to be probabilistic.
>
> None of these tests need an API key. The model layer is exercised through a stub, so the suite
> still runs on a laptop with no credentials, which is the difference between a suite that runs and
> one that quietly stops being run.

## 1:05 - 2:20 · The scorecard, and the number that matters

*Screen: `npm run evaluate`. Let the whole card print. Do not scroll while talking.*

> Two hundred and fifty invoices, twelve noise classes. Split remittances, merged wires, FX drift
> across a rate month, bank charges that shave the amount, missing certificates, wrong purpose
> codes. Barely a third of this batch is a clean one-to-one match.
>
> Ninety-six and a half percent allocation precision. Eighty-one point six recall.
>
> *(pause, point at the exposure block)*
>
> But this is the number I built the system around. Under-declared: zero rupees, zero invoices.
> That is the rupee value of anything Nostro called zero-rated that is not. It is real liability,
> found late, with interest running. A run that under-declares anything exits non-zero, whatever the
> F1 says.
>
> And recall is eighty-one, not ninety-five, on purpose. The engine refuses ambiguous cases instead
> of guessing them. A confident wrong allocation costs more than an honest unresolved one.

## 2:20 - 3:00 · The exception queue

*Screen: scroll to EXCEPTIONS and TOP OF THE QUEUE.*

> A hundred and fifty-one exceptions, across seven reason codes. Each one carries the exposure it
> represents, so the queue sorts by what it costs to be wrong about rather than by arrival order.
>
> Top of the queue: one lakh ninety-eight thousand rupees, purpose code mismatch. The FIRA exists,
> but it was raised under P1403, and zero-rating needs an P08 series code. Nobody is finding that in
> a spreadsheet in March.

## 3:00 - 3:50 · Where a model belongs, and where it does not

*Screen: split or switch between `src/core/` and `src/llm/`.*

> The track asks about AI judgment, so here is the boundary and it is enforced, not documented.
>
> Core has no network dependency and cannot import the model layer. There is a test that fails if
> anyone changes that. No language model touches a number that becomes a tax figure.
>
> Bank narrations are machine-generated and mostly regex-readable, so a regex reads them. For free,
> in microseconds, identically on every run. Reaching for a model there would be the exact mistake
> this track is probing for.
>
> What the model does get is the mangled minority the parser flags for review. It returns a
> validated hint, never an allocation. Four guards on that hint: schema, exact reference format so a
> mangled reference is refused instead of repaired, provenance against the queue we actually sent,
> and a confidence floor. A failed call degrades to zero hints. Layer two can add recall. It can
> never remove correctness.
>
> A clean ten-thousand-record batch makes zero API calls. Cost scales with difficulty, not volume.

## 3:50 - 4:35 · What broke

*Screen: `npm run evaluate -- --only split_remittance`, then open BREAKAGE.md.*

> Split remittances sat at thirty-nine percent recall while the unit test for that path passed.
>
> I assumed the later legs were falling outside the forty-five day window and built a wider search.
> It typechecked, all eighty-three tests stayed green, and it made the number worse. Thirty-nine
> down to twenty-nine.
>
> What found it was dumping a batch and reading the raw records instead of reasoning about my own
> generator's parameters. Every leg was inside the original window. The premise of my fix was false.
>
> The real cause was pass ordering: a coincidence of amounts was allowed to move before a written
> invoice reference did. I added a pass zero that commits reference-named matches first. F1 went
> from seventy-seven to eighty-five.
>
> That log is in the repo, with timestamps, written as it happened.

## 4:35 - 5:00 · Reproduce it

*Screen: `npm run evaluate -- --count 1000 --seed 42`.*

> Everything you just saw regenerates from a seed. Change the count, change the seed, isolate one
> noise class, print the markdown table. If you cannot reproduce the numbers in my README from this
> command, the numbers are decoration.
>
> That is Nostro.

*Stop recording. Do not add an outro.*

---

## After recording

1. Upload unlisted. Title: `Nostro — batch FIRA reconciliation with a measured accuracy harness`.
2. Description: one line plus the repo URL.
3. Paste the URL into form field 11.
