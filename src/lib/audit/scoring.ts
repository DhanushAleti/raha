/**
 * Audit Check risk scoring — pure logic, no I/O.
 * Rubric: each answer contributes 0–2 risk points (max 18).
 * Verdict bands: 0–4 green · 5–9 amber · ≥10 red.
 * Floor rule: foreign income + no FIRA habit + no GST registration is an
 * automatic red regardless of total score.
 *
 * paymentRail carries the most weight per point: since RBI A.P. (DIR) circular
 * 74 of 2016 there is no physical FIRC for export remittances, and whether a
 * FIRA can be produced at all depends entirely on how the money arrives.
 */

export type IncomeRange =
  | "under_20l"
  | "20l_50l"
  | "50l_1cr"
  | "1cr_2cr"
  | "over_2cr";

export type Platform =
  // Layer-2 sources — freelancers, consultants, indie SaaS, agencies.
  | "freelance_clients"
  | "own_product"
  | "marketplace"
  // Layer-1 creator sources, kept: they are still in scope and still stored.
  | "youtube"
  | "patreon"
  | "twitch"
  | "substack"
  | "instagram"
  | "brand_deals"
  | "other";

export type YesNo = "yes" | "no";
export type PaymentRail = "bank" | "aggregator" | "rail" | "not_sure";
export type GstRegistered = "yes" | "no" | "not_sure";
export type LutFiled = "yes" | "no" | "whats_that";
export type FircCollection = "always" | "sometimes" | "never" | "whats_that";
export type InvoicePractice = "gst_sequence" | "adhoc" | "none";
export type SetAsideAwareness = "exact" | "rough" | "no";

export interface AuditAnswers {
  incomeRange: IncomeRange;
  platforms: Platform[];
  foreignIncome: YesNo;
  paymentRail: PaymentRail;
  gstRegistered: GstRegistered;
  lutFiled: LutFiled;
  fircCollection: FircCollection;
  invoicePractice: InvoicePractice;
  setAsideAwareness: SetAsideAwareness;
}

export type Verdict = "green" | "amber" | "red";
export type FlagSeverity = "high" | "medium" | "low";

export interface AuditFlag {
  id: string;
  severity: FlagSeverity;
  title: string;
  body: string;
  action: string;
}

export interface AuditResult {
  score: number;
  verdict: Verdict;
  flags: AuditFlag[];
}

/** Platforms that typically pay from abroad (FIRC-relevant). */
/**
 * Sources that pay in foreign currency by default. Membership drives
 * `platformPoints`, so anything missing here scores a Layer-2 earner *softer*
 * than a creator with identical exposure — which is exactly what happened
 * between the Layer-2 repositioning and 2026-08-27: a freelancer billing a US
 * client had to answer "Other", scored 0 platform points, and was pushed
 * toward amber while a Twitch streamer with the same gaps read red.
 *
 * `instagram` and `brand_deals` stay out on purpose: both are ordinarily INR
 * at the source, so they carry no export-evidence exposure of their own.
 */
const FOREIGN_PLATFORMS: ReadonlySet<Platform> = new Set([
  "freelance_clients",
  "own_product",
  "marketplace",
  "youtube",
  "patreon",
  "twitch",
  "substack",
]);

const INCOME_POINTS: Record<IncomeRange, number> = {
  under_20l: 0,
  "20l_50l": 1,
  "50l_1cr": 1,
  "1cr_2cr": 2,
  over_2cr: 2,
};

/**
 * Wise, PayPal and Stripe convert offshore, so the credit lands in the Indian
 * account as an ordinary domestic transfer. The receiving bank legally cannot
 * issue a FIRA against it — as far as it can see, no foreign remittance
 * happened. That is the worst position and the least served.
 * Skydo/Karbon/Payoneer/Winvesta issue FIRA automatically, so forward
 * paperwork is already handled (history before switching is not).
 */
const RAIL_POINTS: Record<PaymentRail, number> = {
  aggregator: 2,
  bank: 1,
  not_sure: 1,
  rail: 0,
};

const GST_POINTS: Record<GstRegistered, number> = {
  yes: 0,
  not_sure: 1,
  no: 2,
};

const LUT_POINTS: Record<LutFiled, number> = {
  yes: 0,
  no: 1,
  whats_that: 2,
};

const FIRC_POINTS: Record<FircCollection, number> = {
  always: 0,
  sometimes: 1,
  never: 2,
  whats_that: 2,
};

const INVOICE_POINTS: Record<InvoicePractice, number> = {
  gst_sequence: 0,
  adhoc: 1,
  none: 2,
};

const SET_ASIDE_POINTS: Record<SetAsideAwareness, number> = {
  exact: 0,
  rough: 1,
  no: 2,
};

function platformPoints(platforms: Platform[]): number {
  const foreignCount = platforms.filter((p) => FOREIGN_PLATFORMS.has(p)).length;
  if (foreignCount >= 3) return 2;
  if (foreignCount >= 1) return 1;
  return 0;
}

function scoreAnswers(answers: AuditAnswers): number {
  const hasForeignIncome = answers.foreignIncome === "yes";
  return (
    INCOME_POINTS[answers.incomeRange] +
    platformPoints(answers.platforms) +
    (hasForeignIncome ? 2 : 0) +
    GST_POINTS[answers.gstRegistered] +
    // LUT and FIRC hygiene only matter when foreign money actually flows in.
    (hasForeignIncome ? LUT_POINTS[answers.lutFiled] : 0) +
    (hasForeignIncome ? FIRC_POINTS[answers.fircCollection] : 0) +
    (hasForeignIncome ? (RAIL_POINTS[answers.paymentRail] ?? 1) : 0) +
    INVOICE_POINTS[answers.invoicePractice] +
    SET_ASIDE_POINTS[answers.setAsideAwareness]
  );
}

function hitsRedFloor(answers: AuditAnswers): boolean {
  return (
    answers.foreignIncome === "yes" &&
    (answers.fircCollection === "never" ||
      answers.fircCollection === "whats_that") &&
    (answers.gstRegistered === "no" || answers.gstRegistered === "not_sure")
  );
}

function deriveVerdict(score: number, answers: AuditAnswers): Verdict {
  if (hitsRedFloor(answers)) return "red";
  if (score >= 10) return "red";
  if (score >= 5) return "amber";
  return "green";
}

const SEVERITY_RANK: Record<FlagSeverity, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function deriveFlags(answers: AuditAnswers): AuditFlag[] {
  const flags: AuditFlag[] = [];
  const hasForeignIncome = answers.foreignIncome === "yes";

  if (
    hasForeignIncome &&
    (answers.fircCollection === "never" ||
      answers.fircCollection === "whats_that")
  ) {
    flags.push({
      id: "firc_gap",
      severity: "high",
      title: "Your foreign income has no FIRA trail",
      body: "Without a Foreign Inward Remittance Advice (FIRA) from your bank, you can't prove your foreign income is a zero-rated export of service. That's up to 18% GST exposure on every foreign payment — plus notice risk.",
      action:
        "Ask your bank for FIRAs for the last 12 months of foreign credits, and start collecting one for every payment.",
    });
  }

  if (hasForeignIncome && answers.paymentRail === "aggregator") {
    flags.push({
      id: "aggregator_no_fira",
      severity: "high",
      title: "Wise, PayPal and Stripe cannot produce a FIRA at all",
      body: "These convert offshore, so the money lands in your account as an ordinary domestic transfer. Your bank legally cannot issue a FIRA against it — as far as it can see, no foreign remittance happened. Wise issues an NOC instead, which you then take to the bank. Almost nobody finds this out until they need the document.",
      action:
        "Download the NOC or remittance advice for every credit now, while the platform still has it, and ask your bank in writing what it will accept in place of a FIRA.",
    });
  }

  if (hasForeignIncome && answers.paymentRail === "rail") {
    flags.push({
      id: "rail_backfill",
      severity: "medium",
      title: "Your forward paperwork is fine — the years before it are not",
      body: "Skydo, Karbon, Payoneer and Winvesta issue a FIRA on every payment automatically, so from the day you joined you are covered. Rails only work forward: any remittance received before you switched still has nothing behind it, and that is the part no platform solves.",
      action:
        "List every foreign credit received before you moved onto the rail, and ask your bank to raise the IRM in EDPMS and issue FIRAs against them retroactively.",
    });
  }

  if (answers.gstRegistered === "no" && answers.incomeRange !== "under_20l") {
    flags.push({
      id: "gst_unregistered",
      severity: "high",
      title: "You're likely past the GST threshold without registration",
      body: "Crossing ₹20L aggregate turnover makes GST registration mandatory. Operating past it unregistered compounds penalties month by month.",
      action: "Confirm your turnover with your CA and register without delay.",
    });
  }

  if (answers.gstRegistered === "not_sure") {
    flags.push({
      id: "gst_unknown",
      severity: "medium",
      title: "You don't know your GST registration status",
      body: "Not knowing is itself a risk — obligations (returns, LUT, invoicing rules) start the day you're registered.",
      action: "Check on the GST portal with your PAN — it takes two minutes.",
    });
  }

  if (hasForeignIncome && answers.lutFiled !== "yes") {
    flags.push({
      id: "lut_missing",
      severity: "medium",
      title: "No LUT on file for your exports",
      body: "A Letter of Undertaking lets you export services without paying IGST upfront. Without it, zero-rating gets complicated fast.",
      action:
        "File the LUT on the GST portal (it's annual) — your CA can do this in a day.",
    });
  }

  if (answers.fircCollection === "sometimes" && hasForeignIncome) {
    flags.push({
      id: "firc_partial",
      severity: "medium",
      title: "Partial FIRA coverage leaves gaps",
      body: "Every unmatched foreign credit is a payment the department can question. Partial trails often fail exactly when you need them.",
      action: "Backfill missing FIRAs from your bank and track every remittance.",
    });
  }

  if (answers.invoicePractice !== "gst_sequence") {
    flags.push({
      id: "invoice_practice",
      severity:
        answers.invoicePractice === "none" ? "medium" : "low",
      title:
        answers.invoicePractice === "none"
          ? "No invoices for your work"
          : "Ad-hoc invoices won't survive scrutiny",
      body: "GST law requires sequentially numbered, compliant invoices. Ad-hoc PDFs slow down client payments and create reconciliation gaps.",
      action:
        "Move to sequential GST-compliant invoices with SAC codes for every deal.",
    });
  }

  if (answers.setAsideAwareness !== "exact") {
    flags.push({
      id: "no_set_aside",
      severity: "low",
      title: "You don't know your set-aside number",
      body: "Without a running liability estimate, the year-end bill arrives as a lump-sum shock — the single most common cash-flow crisis for people earning abroad.",
      action:
        "Track income as it lands and keep a live GST + advance-tax estimate.",
    });
  }

  if (flags.length === 0) {
    flags.push({
      id: "all_clear",
      severity: "low",
      title: "Your basics look solid",
      body: "Registration, FIRAs, and invoicing hygiene are in place. The remaining risk is drift — the LUT resets every April, and manual trails decay.",
      action:
        "Keep the trail current, and have a CA who handles cross-border income review your setup once a year.",
    });
  }

  return flags
    .sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity])
    .slice(0, 3);
}

export function computeAuditResult(answers: AuditAnswers): AuditResult {
  const score = scoreAnswers(answers);
  return {
    score,
    verdict: deriveVerdict(score, answers),
    flags: deriveFlags(answers),
  };
}
