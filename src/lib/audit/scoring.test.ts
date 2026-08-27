import { describe, expect, test } from "vitest";
import {
  computeAuditResult,
  type AuditAnswers,
} from "./scoring";

const SAFE_BASELINE: AuditAnswers = {
  incomeRange: "under_20l",
  platforms: ["brand_deals"],
  foreignIncome: "no",
  paymentRail: "rail",
  gstRegistered: "yes",
  lutFiled: "yes",
  fircCollection: "always",
  invoicePractice: "gst_sequence",
  setAsideAwareness: "exact",
};

const WORST_CASE: AuditAnswers = {
  incomeRange: "over_2cr",
  platforms: ["youtube", "patreon", "twitch", "substack"],
  foreignIncome: "yes",
  paymentRail: "aggregator",
  gstRegistered: "no",
  lutFiled: "whats_that",
  fircCollection: "never",
  invoicePractice: "none",
  setAsideAwareness: "no",
};

describe("computeAuditResult — score", () => {
  test("fully compliant low-income creator scores 0 → green", () => {
    const result = computeAuditResult(SAFE_BASELINE);
    expect(result.score).toBe(0);
    expect(result.verdict).toBe("green");
  });

  test("worst case scores the rubric maximum of 18 → red", () => {
    const result = computeAuditResult(WORST_CASE);
    expect(result.score).toBe(18);
    expect(result.verdict).toBe("red");
  });

  test("LUT and FIRC answers add no risk when there is no foreign income", () => {
    const withScaryAnswers = computeAuditResult({
      ...SAFE_BASELINE,
      lutFiled: "whats_that",
      fircCollection: "whats_that",
    });
    expect(withScaryAnswers.score).toBe(0);
  });

  test("LUT and FIRC answers count when foreign income exists", () => {
    const result = computeAuditResult({
      ...SAFE_BASELINE,
      foreignIncome: "yes", // +2
      lutFiled: "no", // +1
      fircCollection: "sometimes", // +1
      platforms: ["youtube"], // +1 (one foreign platform)
    });
    expect(result.score).toBe(5);
  });
});

describe("computeAuditResult — verdict bands", () => {
  test("score 4 is green, score 5 is amber", () => {
    // income 20l_50l (+1), platforms youtube (+1), gst not_sure (+1), rough set-aside (+1) = 4
    const green = computeAuditResult({
      ...SAFE_BASELINE,
      incomeRange: "20l_50l",
      platforms: ["youtube"],
      gstRegistered: "not_sure",
      setAsideAwareness: "rough",
    });
    expect(green.score).toBe(4);
    expect(green.verdict).toBe("green");

    const amber = computeAuditResult({
      ...SAFE_BASELINE,
      incomeRange: "20l_50l",
      platforms: ["youtube"],
      gstRegistered: "not_sure",
      setAsideAwareness: "rough",
      invoicePractice: "adhoc", // +1 → 5
    });
    expect(amber.score).toBe(5);
    expect(amber.verdict).toBe("amber");
  });

  test("score 9 is amber, score 10 is red", () => {
    // Build exactly 9: income over_2cr(+2), platforms 3 foreign(+2), foreign yes(+2),
    // rail(0), gst yes(0), lut no(+1), firc sometimes(+1), invoices adhoc(+1), exact(0) = 9
    const amber = computeAuditResult({
      incomeRange: "over_2cr",
      platforms: ["youtube", "patreon", "twitch"],
      foreignIncome: "yes",
      paymentRail: "rail",
      gstRegistered: "yes",
      lutFiled: "no",
      fircCollection: "sometimes",
      invoicePractice: "adhoc",
      setAsideAwareness: "exact",
    });
    expect(amber.score).toBe(9);
    expect(amber.verdict).toBe("amber");

    const red = computeAuditResult({
      incomeRange: "over_2cr",
      platforms: ["youtube", "patreon", "twitch"],
      foreignIncome: "yes",
      paymentRail: "rail",
      gstRegistered: "yes",
      lutFiled: "no",
      fircCollection: "sometimes",
      invoicePractice: "adhoc",
      setAsideAwareness: "rough", // +1 → 10
    });
    expect(red.score).toBe(10);
    expect(red.verdict).toBe("red");
  });
});

describe("computeAuditResult — red floor rule", () => {
  test("foreign income + never-FIRC + unregistered GST forces red even at a low score", () => {
    // foreign yes(+2), firc never(+2), gst no(+2) = 6 → would be amber by score
    const result = computeAuditResult({
      ...SAFE_BASELINE,
      foreignIncome: "yes",
      fircCollection: "never",
      gstRegistered: "no",
    });
    expect(result.score).toBe(6);
    expect(result.verdict).toBe("red");
  });

  test("floor rule also triggers on whats_that FIRC + not_sure GST", () => {
    const result = computeAuditResult({
      ...SAFE_BASELINE,
      foreignIncome: "yes",
      fircCollection: "whats_that",
      gstRegistered: "not_sure",
    });
    expect(result.verdict).toBe("red");
  });
});

describe("computeAuditResult — flags", () => {
  test("returns at most 3 flags, highest severity first", () => {
    const result = computeAuditResult(WORST_CASE);
    expect(result.flags.length).toBe(3);
    const severities = result.flags.map((f) => f.severity);
    const rank = { high: 0, medium: 1, low: 2 } as const;
    const sorted = [...severities].sort((a, b) => rank[a] - rank[b]);
    expect(severities).toEqual(sorted);
  });

  test("unmatched-FIRC flag appears for foreign income without FIRCs", () => {
    const result = computeAuditResult({
      ...SAFE_BASELINE,
      foreignIncome: "yes",
      fircCollection: "never",
    });
    expect(result.flags.some((f) => f.id === "firc_gap")).toBe(true);
  });

  test("a fully compliant creator still gets encouraging flags (never empty)", () => {
    const result = computeAuditResult(SAFE_BASELINE);
    expect(result.flags.length).toBeGreaterThan(0);
  });
});

describe("computeAuditResult — payment rail", () => {
  const withForeign = {
    ...SAFE_BASELINE,
    foreignIncome: "yes",
    platforms: ["youtube"],
  } as AuditAnswers;

  test("aggregators score worst — the bank legally cannot issue a FIRA", () => {
    const viaWise = computeAuditResult({
      ...withForeign,
      paymentRail: "aggregator",
    });
    const viaRail = computeAuditResult({ ...withForeign, paymentRail: "rail" });
    expect(viaWise.score).toBeGreaterThan(viaRail.score);
  });

  test("aggregators raise a high-severity flag naming the NOC workaround", () => {
    const result = computeAuditResult({
      ...withForeign,
      paymentRail: "aggregator",
    });
    const flag = result.flags.find((f) => f.id === "aggregator_no_fira");
    expect(flag?.severity).toBe("high");
    expect(flag?.body).toContain("NOC");
  });

  test("a FIRA-issuing rail flags backfill, not a forward gap", () => {
    const result = computeAuditResult({ ...withForeign, paymentRail: "rail" });
    expect(result.flags.map((f) => f.id)).toContain("rail_backfill");
    expect(result.flags.map((f) => f.id)).not.toContain("aggregator_no_fira");
  });

  test("rail adds no risk when no foreign money flows in", () => {
    const domestic = computeAuditResult({
      ...SAFE_BASELINE,
      paymentRail: "aggregator",
    });
    expect(domestic.score).toBe(computeAuditResult(SAFE_BASELINE).score);
    expect(domestic.flags.map((f) => f.id)).not.toContain("aggregator_no_fira");
  });
});
