# SEO audit — raha.software, 2026-07-28

Internal audit. Verdict up front, evidence below.

---

## Executive verdict

**Do not invest in SEO as a growth channel this year.** The technical fixes below are worth 30
minutes because they're cheap and some matter for reasons other than search. The channel itself is
not winnable on a realistic horizon.

Reason: the FIRC/foreign-income SERP is not held by tax startups. It's held by **payment companies
with content teams and real domain authority**, who publish this content as free lead-gen for their
actual product. Confirmed ranking for the target terms: Skydo, ClearTax, Razorpay, Cashfree, Wise,
Karbon, Winvesta, BriskPE, Grey, Commenda, Asanify, HiWiPay. That's twelve funded competitors on a
keyword set a three-page site with zero backlinks is trying to enter.

Their structural advantage is unbeatable head-on: they can give the education away forever because
they monetise the payment flow, not the content.

---

## Technical findings

| # | Issue | Impact | Evidence | Fix |
|---|---|---|---|---|
| 1 | **No `robots.txt`** | High | `/robots.txt` → HTTP 404 | Add one, reference the sitemap |
| 2 | **No `sitemap.xml`** | High | `/sitemap.xml` → HTTP 404 | Next.js `app/sitemap.ts`, 10 lines |
| 3 | **No canonical tags anywhere** | High | Absent on `/` and `/audit` | Add `metadataBase` + self-referencing canonicals |
| 4 | **`/audit` has no H1 and 141 words** | **Critical** | Crawled: 0 × `<h1>`, 0 × `<h2>` | See below — this one matters regardless of SEO |
| 5 | No `og:image` | Medium | Absent both pages | Every shared link renders as a bare grey box |
| 6 | No `og:url` | Low | Absent | Add via `metadataBase` |
| 7 | `twitter:card` = `summary` | Low | Should be `summary_large_image` | One-line change |
| 8 | No `/privacy`, `/terms` | Medium | Both 404 | E-E-A-T gap on a product handling financial data |
| 9 | Only 3 indexable pages | High | `/`, `/audit`, `/login` | Nothing to rank with |

**Not broken:** HTTPS clean, viewport set, `lang="en"`, TTFB ~0.58s, `/app` correctly 307s behind
auth, no images so no alt-text debt.

**Could not verify:** JSON-LD schema. `curl` strips `<script>` tags, so absence here is not proof.
Check with [Rich Results Test](https://search.google.com/test/rich-results) before assuming.

### Finding 4 deserves its own paragraph

`/audit` is the page every email, DM, and Reddit comment points at. It has **no H1 and 141 words of
crawlable text** — the questions render client-side, so search engines see an empty shell.

This matters even if you never do SEO: it means the page has no crawlable statement of what it is,
no shareable preview, and nothing for an LLM to cite when someone asks ChatGPT about FIRC. Fix it
because it's your conversion page, not because of rankings.

### Metadata contradicts the Layer 2 decision

Title and description still read *"Creator taxes, handled"* and *"built for Indian creators earning
₹20L–₹2Cr"*. As of today the target is all foreign-income earners. The site says creators; the
strategy says freelancers, consultants and indie founders. Whichever is right, they should match.

---

## Keyword reality

| Tier | Example | Who owns it | Winnable in 6mo? |
|---|---|---|---|
| Informational | "what is FIRC", "FIRA vs FIRC" | ClearTax, Skydo, Razorpay | **No** |
| Commercial | "how to get FIRC from SBI", "does Wise issue FIRC" | Wise's own blog, Skydo, HiWiPay | **No** |
| Transactional | "FIRC service India" | Thin, but near-zero volume | Maybe, worth little |
| Gap long-tail | "FIRC backfill previous years", "reconcile FIRA across platforms" | **Genuinely uncontested** | Yes — but volume is likely near zero |

The gap hypothesis from WEDGE_REALITY_CHECK holds *linguistically* — nobody writes about backfill or
multi-rail reconciliation. But uncontested and valuable are different things. Those phrases are
uncontested largely because almost nobody searches them.

---

## What to actually do

**30 minutes, worth doing regardless of channel strategy:**

1. Add `robots.txt` and `sitemap.ts`
2. Add `metadataBase` to `src/app/layout.tsx` — fixes canonical, `og:url`, and relative OG images together
3. Give `/audit` a real H1 and 2–3 paragraphs of server-rendered copy explaining what the check does
4. Add an OG image
5. Reconcile the metadata with the Layer 2 positioning

**Do not do:** a content calendar, a blog, keyword-targeted landing pages, or link building. Twelve
funded competitors, zero domain authority, a solo founder, and three weeks to a validation gate that
needs three paying humans. The arithmetic doesn't work.

**Revisit when:** there's revenue to fund it, or the AEO angle looks better than classic SEO — LLM
citation is a different and much younger race than the one Skydo already won. That's the `ai-seo`
skill's territory, and honestly a better bet for this product than fighting for blue links.

---

## The uncomfortable strategic read

The same twelve companies that dominate this SERP also, per WEDGE_REALITY_CHECK, largely solved the
forward-looking FIRA problem. They own the education *and* half the product surface.

That is not a reason to quit — the unsolved half (offshore-converted rails, direct bank transfers,
historical backfill, cross-rail reconciliation) is real and unserved. But it does mean **content is
their moat, not yours.** Compete on the thing they can't do, sold directly to people already in
pain, rather than trying to out-publish payment companies.
