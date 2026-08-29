# FIRC to FIRA: Documentary Evidence Infrastructure and the Uneven Compliance Burden on India's Independent Digital Exporters

Dhanush Aleti · Raha Research · August 2026

---

## Abstract

Since 2016 the Reserve Bank of India has not issued a Foreign Inward Remittance Certificate (FIRC) against any ordinary export remittance. The certificate that exists today is a Foreign Inward Remittance Advice, or FIRA, generated through the bank-level Export Data Processing and Monitoring System (EDPMS). It performs the same evidentiary function under GST law, but it is produced by a materially different, and materially less uniform, mechanism. This paper traces that mechanism from the regulatory circular that discontinued the physical certificate through its present role as the load-bearing evidence for zero-rated export-of-services treatment under Section 2(6) of the IGST Act. Drawing on a synthesis of regulatory guidance, tax-advisory literature, and primary field data collected from twenty-eight outreach conversations with Indian creators and freelancers between June and August 2026, the paper argues that FIRA issuance is not a uniform administrative fact but a stratified outcome of *which payment rail a given remittance travels through*. Purpose-built export-payment platforms now issue FIRA automatically; a materially large population routed through currency-conversion aggregators structurally cannot receive one, because the receiving bank sees only a domestic transfer; and a further population paid by direct international bank transfer has no automated path at all. The persistence of "FIRC" as the operative term in tax advisory, GST-officer practice, and platform documentation (nine years after the certificate it names stopped being issued) is presented as both a symptom of this fragmentation and an independent source of compliance risk. The paper concludes with implications for creators, for compliance-infrastructure design, and for the limits of rail-level solutions to a reconciliation problem that exists *between* rails.

**Keywords:** FIRC, FIRA, FEMA, EDPMS, GST export of services, LUT, creator economy, foreign remittance evidence, India fintech compliance

---

## 1. Introduction

India's independent creator and freelance economy is now large enough, and formalized enough, to have its own profession code. The Income Tax Act 2025 introduced code 16021, a dedicated classification for social-media creators and digital content professionals, taxing their earnings as Profits and Gains from Business or Profession rather than as an ambiguous residual category [1], [2]. Estimates place the active creator population at 4.0–4.4 million professionals as of 2026, of whom the majority (an estimated 56.6%) operate as independent individuals rather than under a formal business entity [3]. A meaningful share of this population earns in foreign currency: AdSense payouts from YouTube, Patreon subscriptions, Upwork and Fiverr contracts, and direct client invoices routed through PayPal, Wise, or Stripe are now standard income sources for creators and freelancers who never think of themselves as "exporters."

Under Indian law, they are exactly that. A supply of services qualifies as an export under Section 2(6) of the Integrated Goods and Services Tax Act, 2017 when the supplier is located in India, the recipient is located outside India, the place of supply is outside India, payment is received in convertible foreign exchange (or in Indian rupees where the RBI permits, such as through a Special Rupee Vostro arrangement), and supplier and recipient are not merely establishments of the same legal person [4], [5]. Export of services is zero-rated: no GST is chargeable on the supply, and the exporter may either pay integrated tax and claim a refund or, more commonly, file a Letter of Undertaking (Form GST RFD-11) and supply without paying tax at all [5], [6].

Every element of that treatment rests on one evidentiary fact: that the money in the exporter's account did, in fact, arrive from outside India, in foreign exchange, against that specific supply. The document that proves it has, for nine years, not been the document most Indian creators, most tax advisors writing for a lay audience, and (per the field data collected for this paper) a nontrivial share of GST field officers still ask for by name.

That mismatch is the subject of this paper. Section 2 reconstructs the regulatory transition from FIRC to FIRA. Section 3 sets out the evidentiary role the resulting document plays inside GST law. Section 4 treats the survival of "FIRC" as terminology, not merely a rounding error, but a signal that shapes how seriously an advisor or officer treats the person using it. Section 5 describes the paper's method. Section 6 presents the paper's central empirical claim: that FIRA issuance today is stratified by payment rail into three functionally distinct tiers, one of which is structurally incapable of producing the document at all. Section 7 discusses why this stratification persists as a market failure rather than resolving itself, and Section 8 draws out implications before Section 9 states the paper's limitations.

---

## 2. Regulatory Background: From FIRC to FIRA

### 2.1 The FEMA / Authorised Dealer framework

Cross-border remittances into India are governed by the Foreign Exchange Management Act, 1999 (FEMA) and executed exclusively through Authorised Dealer Category-I (AD Category-I) banks, the RBI-licensed institutions permitted to deal in foreign exchange [7], [8]. When a foreign payment lands in an Indian account, the receiving AD-I bank is required to classify it against a "purpose code" describing the nature of the transaction (export of goods, export of software, professional/consultancy services, and so on) and to report it into the RBI's transaction-monitoring infrastructure. Historically, the bank would then issue the beneficiary a Foreign Inward Remittance Certificate (a physical document confirming the transfer, its purpose, and its INR-equivalent value) on request.

### 2.2 RBI Circular No. 74 and the Export Data Processing and Monitoring System

Physical FIRCs for ordinary trade remittances were discontinued in 2016. The operative instrument was RBI's A.P. (DIR Series) Circular No. 74, dated 26 May 2016, which brought the enhanced Export Data Processing and Monitoring System (EDPMS) into effect from 15 June 2016 and required AD Category-I banks to report every inward remittance against exports into EDPMS rather than issue a standalone paper certificate [9], [8]. Under the resulting workflow, the beneficiary submits an FIRC request to their bank; the bank generates an *Inward Remittance Message* (IRM) inside EDPMS; and the IRM number functions, in practice, as the certificate number a creator would previously have quoted [8]. The physical certificate itself no longer exists for this category of transaction.

*One category is explicitly excluded from this change.* Physical FIRCs continue to be issued for Foreign Direct Investment (FDI) and Foreign Institutional Investment (FII) inflows, capital-account transactions, not trade remittances [10], [8]. This carve-out is a material source of the confusion documented in Section 4: FIRC is not obsolete, it simply no longer applies to the category of transaction (export remittance) that describes nearly every creator and freelancer payment.

### 2.3 Definitional drift: FIRC, e-FIRC, FIRA, FIRS

What replaced the physical FIRC for trade remittances is not one document with a new name but a small family of bank-issued instruments, used inconsistently across institutions:

- **e-FIRC** is a electronic version of the same underlying certificate, generated inside EDPMS once the IRM is created, and still the term most advisory literature defaults to [8], [10].
- **FIRA (Foreign Inward Remittance Advice)** is a bank-letterhead advice confirming the remittance, functionally interchangeable with e-FIRC for GST evidentiary purposes and the term used by most modern export-payment platforms [11], [10].
- **FIRS (Foreign Inward Remittance Statement)** is a periodic statement format some banks issue in place of a per-transaction advice.

For a creator or their advisor, the distinction between these three rarely matters in substance. What matters is that none of them is a "FIRC" in the pre-2016 sense, that only AD Category-I banks (or platforms operating through one) can issue them, and that (as Section 6 shows) issuance is not automatic across every payment method a creator might use.

---

## 3. The Evidentiary Function in GST Law

### 3.1 Export of services and the foreign-exchange condition

Section 2(6) of the IGST Act sets five conjunctive conditions for a supply of services to qualify as an export; the fourth (receipt of payment in convertible foreign exchange) is the one that gives FIRA its legal weight [4], [5]. The other four conditions (India-located supplier, offshore-located recipient, offshore place of supply, distinct legal persons) can typically be established from the contract or invoice itself. Condition four cannot: it is a fact about money movement that only the receiving bank can attest to, and the FIRA/e-FIRC is the artefact of that attestation.

### 3.2 Zero-rating, LUT, and the refund interface

Because export of services is a zero-rated supply, the exporter's practical options are to pay IGST and claim a refund, or (the overwhelmingly more common path for individual creators) to file a Letter of Undertaking (Form GST RFD-11) and supply without charging tax at all [5], [6]. The LUT route defers the evidentiary question rather than eliminating it: the exporter is not required to attach a FIRA at the moment of supply, but is required to be able to produce one if the LUT is scrutinised at renewal, if an ITC refund claim is filed, or if a notice is issued. Tax-advisory literature aimed directly at this population states the requirement plainly: *"Foreign client income… needs an eFIRA or FIRC on file to support your return… required if any ITC refund claim is ever scrutinised"* [12]. A separate advisory aimed at the same audience frames the failure mode explicitly as something creators discover too late: *"If you are GST registered, export services, invoice without charging IGST, but then discover LUT was never filed, this is not a situation you want to discover during a year-end review"* [13].

### 3.3 Why the certificate, not the money, is what gets contested

This structure has a specific consequence: the compliance risk facing a creator is not primarily about whether the income was earned or reported (it typically was, since platforms like YouTube and Upwork report payouts and TDS is frequently withheld at source) but about whether documentary proof of *how* that income crossed the border can be produced on demand, sometimes years after the fact. That is a fundamentally different failure mode from tax evasion, and it explains why enforcement in this space has increasingly taken the shape of scrutiny and notices rather than assessment disputes: GST advisories now document notices issued through FY2025-26 to creators who crossed multi-lakh AdSense thresholds without registering or without maintaining the underlying export documentation, with scrutiny "intensifying" into FY2026-27 [14].

---

## 4. Terminology as a Credibility Signal

The persistence of "FIRC" as the term of art (nine years after the RBI circular that ended physical issuance for trade remittances) is not merely an imprecision. Field data collected for this paper (Section 5) found the term embedded, unprompted, in tax-advisory content, in platform support documentation, and, per creator self-report, in requests made by GST field officers at LUT renewal, despite the fact that a physical FIRC has not existed for this transaction category since 2016 [8], [9].

This matters for two distinct reasons. First, as a matter of substance, a creator who is told "ask your bank for a FIRC" and takes that instruction literally will be turned away, because no bank issues one for a trade remittance; the correct request is for an e-FIRC/FIRA against the relevant IRM. Second, and less obviously, the term functions as a fluency signal in exactly the professional contexts where fluency is being evaluated, conversations with a chartered accountant, or an interaction with a GST officer during LUT renewal or scrutiny. Advisors and officers who work in this area routinely enough to know the terminology shifted in 2016 tend to treat its use, or misuse, as a proxy for how carefully a filer's broader position has been prepared. In practice, the single highest-use correction available to anyone working through this system is not a document at all: it is the sentence *"they can't issue a FIRC, those stopped for exports in 2016; what you want is an e-FIRC or FIRA."*

---

## 5. Method

This paper combines two sources of evidence. The first is a synthesis of primary regulatory material (RBI circular guidance as reported by tax-advisory intermediaries) and secondary tax-advisory literature, the corpus of guidance that Indian creators, freelancers, and the accountants serving them actually consult, including ClearTax, Skydo, Karbon, Winvesta, Payoneer, Wise, FilingPro, Decompiled.tax, and Tax Garden [7]–[22]. This literature was treated not only as a source of regulatory fact but as data in its own right: the volume and specificity of guides written around a single failure mode (missing FIRC/FIRA, un-filed LUT) is itself evidence that the failure mode is common enough to sustain a content and tooling market around it [12], [13], [17].

The second source is primary qualitative data: twenty-eight direct outreach conversations conducted with Indian creators and freelancers earning foreign income between June and August 2026, together with a structured review of one creator-forum thread (r/IndiaTax) describing a direct-bank-transfer FIRA failure in detail. This corpus is small, self-selected toward creators who responded to outreach in the first place, and was not designed as a random sample, its role in this paper is illustrative and hypothesis-generating, not statistically representative, and is treated accordingly in Section 9.

---

## 6. Stratification of the Payment-Rail Landscape

The central finding of this paper is that "does this creator have a FIRC/FIRA problem" is not a property of the creator, it is a property of the rail their income travels through. Three tiers emerged from the evidence base, with materially different implications for compliance risk.

### 6.1 Tier 1, Purpose-built export-payment platforms: solved, automatic, free

A cluster of fintech platforms exists specifically to serve Indian exporters and freelancers, and each has built automatic FIRA/e-FIRC issuance into its core product:

| Platform | FIRA/e-FIRC provision |
|---|---|
| Skydo | Digital FIRA issued on every payment, instant, no charge [11] |
| Karbon | Auto-generated e-FIRA within 24 hours of receipt [23] |
| Winvesta | FIRA provided as standard [24] |
| Payoneer | Downloadable FIRC/FIRA per transaction [25] |
| PayGlocal | "Instant FIRA/FIRC" marketed as a product feature |

For a creator who receives 100% of their foreign income through one of these rails, the evidentiary problem this paper describes is, in the ordinary case, already solved, and solved for free. This is a significant finding in its own right: it means any compliance product or advisory pitch that leads with "we will get you your FIRCs" is, for this population, offering a feature the creator already has. It also means these platforms are, without necessarily intending to, the dominant source of correct public information on the topic, Skydo alone holds a substantial share of the organic search results for FIRC- and FIRA-related queries [11], [16], meaning the population least in need of help is also the population most exposed to accurate guidance, while the population in the tiers below is comparatively underserved by content as well as by tooling.

### 6.2 Tier 2, Offshore-conversion aggregators: structurally unable to issue

A second, and materially larger, population is paid through aggregator platforms (Wise, PayPal, and Stripe are the dominant examples) that convert currency *before* the funds reach India. Structurally, these platforms give the Indian recipient local account details (an INR account number, or a domestic-equivalent payout), so that from the perspective of the client's own bank the payment never crosses a border at all, and from the perspective of the Indian receiving bank, the incoming transfer arrives as an ordinary domestic transaction (commonly settled by IMPS) rather than as a foreign inward remittance [26].

This is not a documentation gap the platform has simply failed to close; it is a structural consequence of how the rail is built. The Indian bank cannot issue a FIRA against a transaction it has no record of as foreign, because no foreign remittance occurred *at the bank's layer*, the conversion happened upstream, inside the aggregator. The workaround these platforms have converged on is a **Non-Objection Certificate (NOC)**: Wise, for instance, issues an NOC that the recipient must then present to their own bank, which may (depending on the bank's internal process) use it to generate a FIRC/FIRA after the fact [26]. This is materially different from Tier 1's automatic issuance in three respects: it requires the recipient to know to ask; it requires a second institution (the recipient's own bank) to act on a document from a third party; and, per platform documentation, it may carry an additional fee (Wise's own guidance cites per-transaction charges in the range of GBP 1.91–USD 2.50 depending on currency for digital FIRA issuance where available at all) [26]. A creator on this tier does not lack documentation because they were careless; they lack it because the rail they are using was not built to produce it without an extra, non-obvious, and partly manual step.

### 6.3 Tier 3, Direct bank transfers: no rail, no automation

A third population receives foreign income with no intermediary platform at all: AdSense paying directly into a State Bank of India account, Patreon settling into HDFC, a direct client wiring a freelance invoice straight to a personal account. Here there is no product managing the documentation question in either direction, the creator must proactively request an e-FIRC/FIRA from their own bank against each individual remittance, a process advisory literature and the r/IndiaTax thread reviewed for this paper both describe as manual, branch-dependent, and easy to defer until it becomes urgent (typically at LUT renewal or under scrutiny) [12], [13].

### 6.4 Cross-cutting frictions

Three further problems cut across all three tiers and were not solved by any rail encountered in this research:

- **Historical backfill.** A creator who switched from a direct-transfer arrangement to a Tier 1 platform last year still has two or three prior years of remittances with no corresponding paperwork. Every rail examined solves the problem prospectively; none solves it retrospectively.
- **Multi-rail reconciliation.** A creator earning through Upwork, a direct client, and AdSense simultaneously has three separate documentation formats and no single view across them. Each Tier 1 platform sees only its own flow; none reconciles across rails it does not operate.
- **Field-level terminology lag.** Per the outreach corpus, GST field officers reviewing LUT renewals in some cases still request a "physical FIRC", a document that, per Section 2.2, has not existed for this transaction category since 2016. A creator (or their advisor) unfamiliar with the FIRC-to-FIRA transition has no ready answer to a request for a document that cannot legally be produced; one who understands the transition can substitute the correct instrument immediately.

---

## 7. Discussion: Why the Gap Persists

The stratification in Section 6 is not a temporary state that market competition will erode. Tier 1 platforms have a direct commercial incentive to make FIRA issuance uninterrupted for their own users (it is a retention feature) but no incentive to solve the problem for a creator who is not, and may never become, their customer. Tier 2 aggregators are optimized for low-cost, low-friction currency conversion for a global user base; building AD Category-I-grade remittance reporting into that flow would work against the very design choice (settling as a domestic-equivalent transfer) that makes them cheap. And no rail, by construction, has visibility into a creator's *other* rails, which means the reconciliation and backfill problems in Section 6.4 are not addressable at the rail level at all, they are only visible, and only solvable, from a position that sits above every individual payment method a creator uses.

This produces a market structure in which the easiest version of the problem is the most solved, and the hardest version is the least served, and where the population least likely to have a functioning solution (Tier 2 and Tier 3, plus anyone with multi-year history or multiple income sources) is simultaneously the population least likely to encounter accurate information about their situation, because the content ecosystem is dominated by platforms answering the easier question for their own users [11], [16]. A compliance product or advisory practice that wants to serve the underserved population, in other words, cannot compete with Tier 1 rails on the problem those rails have already solved; it has to sit above all of them.

---

## 8. Implications

**For creators and their advisors.** The single most consequential question in a creator-tax intake conversation is not "how much did you earn" but "how did the money arrive", the answer determines, before any tax figure is calculated, whether a documentation problem exists at all, and which of three structurally different remedies applies.

**For advisory and platform content.** Terminology correction is cheap and disproportionately valuable. Replacing "FIRC" with "FIRC/FIRA" or "FIRA" throughout advisory material, and being able to explain *why* on request, converts a minor imprecision into a demonstrable signal of domain fluency, the exact signal a creator or officer is implicitly evaluating for in these interactions (Section 4).

**For compliance-infrastructure design.** The evidence in Section 6 argues against building a product that re-solves the Tier 1 problem (automatic FIRA on a single rail) and toward one that operates at the reconciliation layer: normalizing evidence across rails, backfilling historical gaps, and translating between what a creator holds and what an LUT renewal or refund claim actually requires, regardless of which rail, or how many rails, produced the underlying income.

**For policy.** The FDI/FII carve-out in Section 2.2, combined with the definitional drift across e-FIRC/FIRA/FIRS, is a plausible contributor to the terminology lag documented in Section 4. A single, unambiguous, RBI-endorsed term for the trade-remittance instrument (communicated as forcefully to GST field officers as it evidently has not been in the nine years since 2016) would remove a source of friction that costs the state nothing to fix and currently falls almost entirely on the exporter.

---

## 9. Limitations

This paper's primary empirical contribution (the three-tier stratification in Section 6) rests on a synthesis of platform-published claims, third-party tax-advisory literature, and a non-random outreach sample of twenty-eight conversations. It was not possible, within this study, to independently verify FIRA-issuance behavior against each platform's live production system, and platform-published claims about automatic issuance (Section 6.1) should be read as claims, not as independently audited fact. The primary-research component (Section 5) is illustrative rather than representative: it was not designed as a probability sample, skews toward creators who responded to direct outreach, and is too small to support population-level estimates of how many Indian creators fall into each tier. Regulatory detail on the 2016 transition (Section 2.2) is drawn from tax-advisory intermediaries' reporting of RBI Circular No. 74 rather than from the primary circular text itself, and readers relying on this paper for a specific compliance position should verify current requirements directly with an AD Category-I bank or a qualified chartered accountant. Finally, the authors note a direct commercial interest: this research was conducted in the course of building a compliance product aimed at the population described in Tiers 2 and 3, which motivated the inquiry and should be weighed accordingly by the reader.

---

## 10. Conclusion

The FIRC did not survive 2016 for the transaction type that matters to nearly every Indian creator and freelancer earning foreign income, but the word did, in advisory content, in platform documentation, and in the questions GST officers still ask at LUT renewal. Underneath that terminology lag sits a real and unevenly distributed compliance burden: automatic and free for creators on purpose-built export rails, manual and fee-bearing for those on offshore-conversion aggregators, and entirely unautomated for those paid by direct bank transfer, with historical backfill and multi-rail reconciliation left unsolved regardless of which tier a creator sits in. The rails that have solved their own slice of this problem have no reason to solve anyone else's. What remains is a reconciliation layer that, by definition, no single rail can build.

---

## References

1. Patron Accounting. "Influencer ITR 2026: Code 16021 & Forms." https://www.patronaccounting.com/blog/itr-influencers-recommended-approach
2. Tax Garden. "Income Tax for YouTubers/Influencers India 2026." https://taxgarden.in/blog/income-tax-for-youtubers-influencers-india-2026
3. Coherent Market Insights. "India Creator Economy Market Forecast, 2026–2033." https://www.coherentmarketinsights.com/industry-reports/india-creator-economy-market
4. Razorpay. "Export of Services Under GST: Conditions and Compliance Guide." https://razorpay.com/blog/export-services-gst-conditions-guide/
5. CAclubindia. "LUT under GST for Export of Services, Complete Guide to Zero-Rated Supply Compliance, Rule 96A Conditions & RFD-11 Filing." https://www.caclubindia.com/articles/lut-under-gst-for-export-of-services-complete-guide-to-zerorated-supply-compliance-rule-96a-conditions-rfd11-filing-53653.asp
6. Vakilsearch. "LUT in GST: Export of Services Without IGST 2026." https://vakilsearch.com/article/lut-under-gst-export-of-services-india/
7. Salt. "RBI Guidelines For Foreign Inward Remittance Certificate (FIRC)." https://www.salt.pe/blog/rbi-guideline-for-firc
8. ClearTax. "Foreign Inward Remittance Certificate (FIRC): Meaning, Full Form, How To Download." https://cleartax.in/s/foreign-inward-remittance-certificate
9. Commenda. "Understanding the Foreign Inward Remittance Certificate Process." https://www.commenda.io/compliance/firc-global-transactions
10. Skydo. "FIRC Full Form, Certificate, Format & Number [2026 Guide]." https://www.skydo.com/blog/all-you-need-to-know-about-firc-a-complete-guide
11. Skydo. "Importance of FIRA for Freelancers." https://www.skydo.com/blog/importance-of-fira-for-freelancers
12. FilingPro. "Tax Guide for Social Media Influencer in India." https://filingpro.io/tax-guide-for-social-media-influencer-in-india/
13. Decompiled.tax. "Survival Guide." https://decompiled.tax/survival-guide
14. ClearTax. "GST on YouTube Income." https://cleartax.in/s/gst-on-youtube-income
15. Legal Suvidha. "GST on YouTube Content Creator 2026." https://legalsuvidha.com/blog/gst-on-youtube-content-creator
16. Skydo. "Tax on Foreign Income for Indian Freelancers." https://www.skydo.com/blog/tax-on-foreign-income-indian-freelancers
17. Karbon. "LUT for Zero-Rated Services." https://www.karbncard.com/blog/lut-for-zero-rated-services
18. BriskPE. "Why Is FIRC/FIRA Essential for Handling Foreign Inward Remittances?" https://www.briskpe.com/why-is-firc-fira-essential-for-handling-foreign-inward-remittances/
19. XFlow. "FIRA, Full Form, Meaning & Importance in International Payments." https://www.xflowpay.com/international-payments/fira
20. Winvesta. "Understanding FIRC for International Money Transfers." https://www.winvesta.in/blog/businesses/understanding-firc-for-international-money-transfers
21. Payoneer. "Decoding FIRC: A Guide for Indian Exporters of Goods & Services." https://www.payoneer.com/resources/news-events/decoding-firc-a-guide-for-indian-exporters-of-goods-services/
22. Wise. "How to Get Your FIRC Certificate from PayPal in India: 2025 Guide." https://wise.com/in/blog/firc-from-paypal
23. Karbon. "FIRC Request for Indian Freelancers." https://www.karboncard.com/blog/firc-request-indian-freelancers
24. Winvesta. Product documentation, cited via [20].
25. Payoneer. Product documentation, cited via [21].
26. Wise. "Guide to FIRC Certificate and How to Get It for Incoming Transfers [2025]." https://wise.com/in/blog/firc-certificate

---

*Primary field data (twenty-eight outreach conversations, June–August 2026) is held internally by Raha and is not independently published; it is referenced in Sections 5 and 6 as unpublished primary research.*
