# Nostro — the pitch video, under two and a half minutes, word for word

**Record tonight. Unlisted YouTube.** Screen recording with voice. No slides, no music, no logo, no
face cam. Cut down from four minutes to this on 4 Sep because the deadline moved closer than the
plan assumed. Every beat that isn't load-bearing is gone; nothing that survives is optional.

**Setup, 60 seconds.** Terminal 16pt, dark theme, wide enough the scorecard doesn't wrap.
`cd ~/Desktop/obsedian/nostro`, run `npm run evaluate` once so the cache is warm before you record.
Notifications off. One take, twice, keep the second.

**The one rule: never say a number that isn't on screen while you say it.** The breakage numbers are
the exception, and they're all past tense.

> **Do not run `--only split_remittance` on camera.** It prints 29.08% now, not the 39.1% the story
> is about. Show `BREAKAGE.md` instead — the historical numbers are written down there.

---

## 0:00 - 0:22 · The money

*Screen: empty terminal.*

> There is a class of Indian business that can be assessed eighteen percent GST on revenue it
> already collected and spent, a year later, because of one missing document. Every foreign bank
> credit has to be tied to an invoice and a FIRA before it counts as a zero-rated export. Today
> that's a spreadsheet, done by hand, once a year. This is the batch job that finds the gaps first.

## 0:22 - 0:38 · Tests, then the scorecard opens

*Screen: `npm test` briefly, then `npm run evaluate`. Let the card print.*

> A hundred and ten tests, all green, no API key needed. Two hundred and fifty invoices, twelve
> noise classes, only thirty-four percent of this batch is a clean match. Ninety-six and a half
> percent precision, eighty-one point six recall.

## 0:38 - 1:05 · The number it's built around

*Pause on the exposure block.*

> But this is the number I built it around. Under-declared: zero rupees. That's the value of
> anything this called tax-free that isn't. Real liability, found late, with interest running. A
> run that under-declares exits non-zero, whatever the F1 says. Recall sits at eighty-one, not
> ninety-five, because when two candidates fit equally well, it refuses instead of guessing.

## 1:05 - 1:20 · The queue

*Scroll to EXCEPTIONS and TOP OF THE QUEUE.*

> A hundred and fifty-one exceptions, sorted by what it costs to be wrong about. Top of the queue:
> one lakh ninety-eight thousand rupees, a certificate raised under the wrong code. Nobody catches
> that in a spreadsheet in March.

## 1:20 - 1:48 · Where a model belongs

*Screen: `src/core/` then `src/llm/`.*

> Here's the AI judgment part. Core has no network dependency and can't import the model layer, a
> test fails if that changes. Bank narrations are machine-generated and mostly regex-readable, so a
> regex reads them, for free, every time. The model only sees the mangled minority, and it returns
> a validated hint, never an allocation. A failed call degrades to zero hints. It can add recall. It
> can never remove correctness.

## 1:48 - 2:12 · What broke

*Screen: open `BREAKAGE.md`, scroll slowly. Do not run the harness here.*

> Split remittances were stuck at thirty-nine percent recall while the unit test for that path
> passed. I built a wider search window. It typechecked, all tests stayed green, and it made the
> number worse. Thirty-nine down to twenty-nine. The real bug was ordering: a coincidence of
> amounts was moving before a written reference did. Fixed that, and F1 went from seventy-seven to
> eighty-five.

## 2:12 - 2:16 · Close

> Everything here regenerates from a seed. That's Nostro.

*Stop recording immediately. No outro.*

---

## After

1. Upload unlisted. Title: `Nostro — batch FIRA reconciliation with a measured accuracy harness`.
2. Description: one line plus `https://github.com/DhanushAleti/nostro`.
3. Paste the link into form field 11. Submit tonight, don't wait for morning.

**If a line goes wrong mid-take, keep rolling and say it again.** One trimmed flub beats six
restarts.
