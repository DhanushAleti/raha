# Raha — Product Requirements Document (PRD)

**Tagline:** Creator taxes, handled.
**Version:** 1.0 · July 2026 · Owner: Sunny (Founder)
**Status:** Pre-launch / validation phase

---

## 0. One-line summary
Raha is a done-for-you tax and GST compliance service — evolving into a software platform — built exclusively for Indian digital creators earning ₹20L–₹2Cr, who are underserved by generic Chartered Accountants that don't understand foreign platform income.

---

## 1. Problem

Indian creators earning over ₹20L are legally required to manage GST, foreign-income conversions, FIRC documentation, and multi-platform invoicing. The people they hire to do it — traditional CAs — were trained for shopkeepers and salaried professionals, not for someone earning in USD from AdSense, EUR from Patreon, and INR from three brand deals in the same month.

Concretely, this produces four recurring failures:

1. **Misclassified income** — creator revenue filed under the wrong SAC/business code, triggering notices and lost deductions.
2. **Mishandled foreign income** — foreign platform earnings are usually a *zero-rated export of service* (no GST) **if** FIRCs are tracked and matched. Most CAs don't, so creators overpay or get flagged.
3. **Invoicing panic** — brands demand GST-compliant invoices at 18%; creators improvise and look unprofessional or get paid late.
4. **Zero visibility** — income scattered across 5–6 platforms means creators have no idea what to set aside, then face a terrifying lump sum at year-end.

Creators currently pay ₹20K–₹50K/year for this and are actively unhappy with it.

---

## 2. Why now (market timing)

- **Regulatory tailwind:** India's **National Creator Economy Bill** (passed Rajya Sabha, April 2026) mandates official registration for high-earning creators and standardizes brand contracts — compliance is no longer optional, it's law with deadlines.
- **Enforcement pressure:** The government is aggressively pursuing untaxed foreign remittances and influencer income.
- **Market maturity:** The creator economy has crossed the point where a meaningful cohort earns ₹20L+ and can afford a premium service.
- **Competitive vacuum:** The space is served by generic filing portals (Vakilsearch, ClearTax-style) and individual CAs. **No dominant creator-specific compliance brand exists in India.**
- **Seasonality:** July is ITR season — the pain is acute *right now*.

---

## 3. Target market & personas

**Primary ICP:** Indian YouTubers, streamers, and digital artists earning ₹20L–₹2Cr/year. They have money to pay for premium service but lack the corporate finance function of a large media house.

**Persona 1 — The Professional Creator (end user)**
- Needs: to know exactly what they owe, automated brand invoicing, a dashboard in plain language.
- Pain: dreads tax season; constantly explaining "Superchats" and "Patreon tiers" to a confused CA.

**Persona 2 — The Talent Agency (wedge buyer)**
- Needs: consolidated compliance across a roster of 50–120 creators so the agency isn't exposed.
- Pain: roster-wide compliance risk with no single system of record. *This is the fastest path to volume — one agency = 50–100 creators.*

**Persona 3 — The Creator's existing CA (channel, not competitor)**
- Raha can hand them perfectly reconciled files (Tally/Zoho format), positioning Raha as the layer *above* the CA rather than replacing them.

---

## 4. Positioning & moat

**Positioning:** Not "more tax software." Raha sells *relief* — the emotional and practical removal of financial anxiety for creators.

**Moat, built in layers:**
1. **Creator-specific tax logic** — pre-built rules for zero-rated service exports, platform-by-platform income treatment, and creator deductions.
2. **API integrations** (Phase 2+) — direct pulls from YouTube/AdSense, Patreon, Stripe, Razorpay that generic CAs can't replicate.
3. **Data gravity** — once a creator's income history, FIRCs, and documents live in Raha, switching cost is high.
4. **Agency distribution lock-in** — embedding as an agency's default compliance layer creates a durable channel.
5. **Brand** — owning "creator taxes" in India before anyone else does.

---

## 5. Product strategy — three phases

Raha deliberately starts as a **service**, then productizes what proves repeatable. Do not build software before customers pay.

### Phase 0 — Concierge (Weeks 1–8, validation)
- **No product build.** Delivery via spreadsheets + AI + a partnered CA.
- Landing page (`raha_landing.html`) + waitlist + manual onboarding.
- Goal: 3 paying founding creators. Document every repeated step — that becomes the Phase 1 spec.

### Phase 1 — MVP dashboard (post 3 paying customers)
P0 features:
- **Income tracker** — manual + CSV upload of platform earnings, categorized by source and currency.
- **FIRC tracker** — log and match foreign inward remittances against invoices to prove export of services.
- **Invoice generator** — 1-click GST-compliant invoices for brand deals and digital goods.
- **Live tax-liability dashboard** — real-time "set aside this much" counter for GST + income tax.
- **Document vault** — secure storage of FIRCs, contracts, PAN/GST certs.

### Phase 2 — Automation & scale
P1 features:
- **Income auto-import** — direct API integrations (AdSense, Patreon, Stripe, Razorpay).
- **CA portal** — secure login for the creator's CA to export reconciled Tally/Zoho files.
- **AI expense categorization** — auto-classify gear, software, travel to maximize legal deductions.
- **Automated filing** — direct GSTR-1 / GSTR-3B submission.
- **Agency dashboard** — consolidated roster-wide compliance view.

---

## 6. Success metrics & KPIs

**Validation gate (Phase 0):** ≥3 paying creators within 30 days, or pivot. No sunk-cost.

**Ongoing:**
- **GMV reconciled** — total creator income managed through Raha.
- **CAC** — target < ₹2,000/creator via agency partnerships.
- **Time saved / creator** — target 10–15 hrs/month (survey-tracked).
- **Compliance record** — zero IT/GST notices for active users ("Zero-Penalty" promise).
- **Net revenue retention** — target > 110% via agency seat expansion.
- **Logo retention** — target > 90% annual (taxes are a recurring, sticky need).

---

## 7. Pricing & unit economics (illustrative)

- **Founding Creator plan:** ₹20,000/yr (50% off ₹40,000, first 10 only, price locked for life).
- **Standard Creator plan (post-launch):** ₹30,000–₹40,000/yr.
- **Agency plan:** per-seat pricing at volume discount + consolidated dashboard.

**Why it works (concierge phase):** 10 creators × ₹20K ≈ ₹2L revenue against near-zero fixed cost (your time + CA revenue-share). The math scales: 100 creators at ₹30K = ₹30L ARR before software leverage.

---

## 8. Go-to-market

1. **Agency wedge (primary):** partner with talent agencies (Monk-E, Chtrbox, One Impression, WhizCo, CreatorsMela) — one signs, 50–100 creators arrive. *Outreach drafts already prepared.*
2. **Fear + education content:** short videos / X threads on penalties for incorrect GST filing on foreign income under the Creator Bill. Funnels to the free audit tool.
3. **Free "Audit Check" lead magnet:** a 5-minute scan that flags a creator's likely compliance red flags — captures email, creates urgency.
4. **Creator-CA channel:** position Raha as the reconciliation layer above CAs, not their replacement.

---

## 9. Key risks & mitigations

| Risk | Mitigation |
|------|------------|
| Founder is not a CA | Partner one creator-fluent CA on revenue share; they sign filings, Raha owns product + funnel. |
| Trademark — "Raha" | Raha Fintech Pvt Ltd (insurance) and RAHA Financials exist. Fine for validation; run a formal TM search + pick a distinct handle (e.g. rahatax / getraha) before incorporating. |
| Regulatory change | The Creator Bill is a *tailwind*, but rules will shift — keep tax logic modular and CA-reviewed. |
| Trust with financial data | Bank-grade encryption (AES-256), data localization compliance, and human CA sign-off from day one. |
| Seasonality of demand | Sell annual plans (not per-filing) to smooth revenue and lock retention. |
| Platform API access (Phase 2) | Start with CSV/manual import; treat APIs as an enhancement, not a dependency. |

---

## 10. Compliance & data constraints
- AES-256 encryption for all financial data; strict adherence to Indian data-localization law.
- FIRC handling and GST logic reviewed by the partnered CA before any automated filing.
- Clear disclaimer that Raha is a service platform; filings are executed by qualified Chartered Accountants.

---

## 11. Immediate next actions (owner: Sunny + Raha AI cofounder)
1. Deploy `raha_landing.html` to Vercel (free subdomain, no domain purchase yet).
2. Send the 5 agency outreach emails (swap in real contact addresses first).
3. Run 15–20 creator DMs/day using the outreach kit.
4. Book 10 discovery calls → convert 3 to founding customers.
5. On 3 paying customers: green-light Phase 1 MVP build (income tracker + FIRC + invoice generator first).

---

*Raha — creator taxes, handled. This document describes an upcoming service; nothing here is tax or legal advice.*
