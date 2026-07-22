# Send today — the Day-1 list, click by click

You open Gmail drafts and send these 12, one at a time, between 9:30 and 11:30 IST on a weekday.
Nothing here sends itself. Everything below is verified against your actual drafts folder as of 2026-07-22.

---

## Read this first — 3 things about the drafts

**1. Your drafts folder has decoys in it.** Alongside the 50 real drafts there are ~15 older ones
addressed to `partnerships@monk-e.example`, `partnerships@chtrbox.example`, and similar.
`.example` is a reserved TLD — it can never deliver. They were the first-pass templates.
**Only send drafts whose address appears in the table below.** If you see `.example`, skip it.

**2. None of the 50 drafts contain a link to the site.** They were written 2026-07-20; the site
went live 2026-07-21. Every draft promises "a free red/amber/green compliance snapshot" but gives
the reader no way to see one. You now have a live tool that does exactly that in 2 minutes.
**Paste one line into each draft before sending** (see below). This is the single highest-value
edit — it turns a cold ask into something they can act on immediately.

**3. The original Day-1 list clustered by company.** It had 3 people at Whizco, 2 at IPLIX, 2 at
Boomlet, plus both Raj (QYOU) and Afsheen (Chtrbox) — and QYOU owns Chtrbox, so those two are the
same group getting near-identical pitches the same morning. That reads as a blast.
The list below is re-cut to **12 different companies**. Deferred names move to Day 2/3.

---

## The line to paste

Put this immediately after the paragraph that offers the free snapshot, as its own line:

> If it's easier to look first: https://raha-iota.vercel.app/audit — 8 questions, about 2 minutes,
> same red/amber/green, no signup.

---

## Day 1 — send these 12, in this order

| # | Person | Address | Company |
|---|---|---|---|
| 1 | Viraj | `viraj@monk-e.in` | Monk-E |
| 2 | Ranveer | `ranveer.allahbadia@beerbiceps.com` | BeerBiceps |
| 3 | Raj | `raj@theqyou.com` | QYOU / Chtrbox group |
| 4 | Prerna | `prerna@whizco.in` | Whizco |
| 5 | Neel | `neel@iplix.in` | IPLIX |
| 6 | Danish | `danish@boomlet.co` | Boomlet |
| 7 | Vishal | `vishal.sharijay@hobo.video` | Hobo Video |
| 8 | Praanesh | `praanesh@qoruz.com` | Qoruz |
| 9 | Vikas | `vikas@socialbeat.in` | Social Beat |
| 10 | Shivam A | `shivam@cloutflow.com` | Cloutflow |
| 11 | Abhinav | `abhinav@viralpitch.co` | ViralPitch |
| 12 | Shahir | `shahir@divo.in` | Divo |

Deferred out of Day 1 to avoid same-company collisions — send on Day 2 or later:
Afsheen (Chtrbox, same group as Raj), Keshav + Aastha (Whizco), Jag (IPLIX), Preety (Boomlet).

## Do not send

- **Shivam Sharma** — the address on file (`shivam@rasayanam.in`) belongs to a different company.
  No draft exists. Leave it that way.
- **Rahul Mahato** — the draft is addressed to `rahul@barcodent.com`; the real domain is
  **`barcodeent.com`** (double 'e'). Fix the address in the draft before it goes out, or it bounces.
  Bounces damage sender reputation for every later wave.
- **Rahul Khanna** — the draft uses `r_khanna@cover-communications.com`, a third-party PR domain.
  Low odds of reaching him. Try the `barcodeent.com` pattern or LinkedIn instead.

## After each send

- Mark the lead's row `Status` in `raha-leads-2026-07-20.xlsx`.
- Move the Notion pipeline card to **contacted**, with the date.
- Reply comes in → book the call that day, run `discovery-call-script.md`, send
  `founding-customer-closing-doc.md` within 2 hours of any yes or maybe.

---

## One judgement call that is yours

The link in the paste-line is `raha-iota.vercel.app`. That is a Vercel preview-style hostname, and
it reads as a side project to the agency founders you're pitching for ₹20,000/yr. A real domain
(`raha.in` / `raha.co.in`, roughly ₹1,000/yr) costs about an hour end to end: buy it, add it in
Vercel → Domains, update `NEXT_PUBLIC_SITE_URL`, redeploy.

You get one first impression with each of these 50 people. My recommendation is to buy the domain
before Day 1 rather than spend the list on a `vercel.app` URL. If you'd rather move today, the
vercel.app link still works — the tool behind it is fully functional.
