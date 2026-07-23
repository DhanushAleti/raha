# Send log — what actually went out

Ground truth, verified against the Gmail Sent folder rather than written from plan documents.
Every other doc in this folder describes intent. This one describes what happened.

---

## Day 1 — 2026-07-23

**12 emails sent, 09:45:18–09:46:04 IST.** Zero bounces (inbox checked twice, no `mailer-daemon`).

| # | To | Company | Subject |
|---|---|---|---|
| 1 | `viraj@monk-e.in` | Monk-E | a GST gap under Monk-E's roster |
| 2 | `raj@theqyou.com` | QYOU / Chtrbox Represent | a compliance gap across Represent's roster |
| 3 | `prerna@whizco.in` | Whizco | do Whizco's creators collect FIRCs? |
| 4 | `neel@iplix.in` | IPLIX | the 18% that hits careful creators |
| 5 | `danish@boomlet.co` | Boomlet | the gap under most creator rosters |
| 6 | `vishal.sharijay@hobo.video` | Hobo Video | the FIRC nobody asks for |
| 7 | `praanesh@qoruz.com` | Qoruz | worth telling Qoruz's creators? |
| 8 | `vikas@socialbeat.in` | Social Beat | a creator-compliance question |
| 9 | `shivam@cloutflow.com` | Cloutflow | creator-side risk in your programmes |
| 10 | `abhinav@viralpitch.co` | ViralPitch | worth flagging to ViralPitch's creators? |
| 11 | `shahir@divo.in` | Divo | Divo's creators and foreign-income GST |
| 12 | `sahil@icubeswire.com` | iCubesWire | a question about iCubesWire's creators |

### Deviations from SEND_TODAY.md

- **Ranveer Allahbadia (BeerBiceps) replaced by Sahil (iCubesWire).** Correct call: Ranveer
  co-founded Monk Entertainment with Viraj Sheth (#1 above). Emailing both would have put
  near-identical cold pitches in front of two co-founders of one company on the same morning.
  Do not "correct" this later by adding him — he is covered by the Viraj thread.
- **No audit link in any email.** `SEND_TODAY.md` instructed pasting
  `rahatax.vercel.app/audit` into each. Dropped deliberately: links are among the strongest
  first-contact spam signals, and Gmail rewrote pasted URLs into `google.com/url?q=` redirects
  that read as phishing. Send the link in the *reply*, once they engage.
- **Sent in one 46-second burst, not spaced 8 minutes apart** as planned. Low risk at 12 messages
  across 12 domains with unique bodies, but space them out on Day 2 — the risk compounds with volume.

### What we cannot measure

**Open tracking does not work on these.** Superhuman's read receipts need a tracking pixel at send
time; these went as plain Gmail drafts with no images at all (deliberate, for deliverability).
The Recent Opens feed will stay empty regardless of who reads them. Silence is not evidence of
non-delivery. The only real signals available are bounces (none) and replies.

### Follow-up schedule

- **2026-07-26** — day-3 nudge, as a reply in the same thread.
- **2026-07-31** — day-8 close-the-loop, same thread.

Most replies to cold sequences arrive on touches 2 and 3, not touch 1. Threading also helps
deliverability. Keep follow-ups link-free too.

---

## Still at zero

**Creator DMs.** The ClickUp block ("Daily: 15–20 creator DMs") has been overdue since 2026-07-22.
Scripts are written and ready in `creator-dm-scripts.md`; targets are in `CREATOR_LEADS.md` Tier A.
Nothing is blocking this except sending it by hand — no tooling in this session can send an
Instagram or X DM. Agencies are the slow channel; creators are the fast one, and it is untouched.
