import { describe, expect, test } from "vitest";
import {
  computeAnnualTax,
  estimateAdvancePosition,
  fyMonthsElapsed,
} from "./advance";

describe("computeAnnualTax — FY 2026-27 new-regime slabs + 4% cess", () => {
  test("income within the 87A rebate band pays zero", () => {
    expect(computeAnnualTax(1_000_000).total).toBe(0);
    expect(computeAnnualTax(1_200_000).total).toBe(0);
  });

  test("₹30L pays slab tax + cess (no rebate)", () => {
    const result = computeAnnualTax(3_000_000);
    // 4-8L:20k + 8-12L:40k + 12-16L:60k + 16-20L:80k + 20-24L:1L + 24-30L:1.8L = 4.8L
    expect(result.tax).toBe(480_000);
    expect(result.cess).toBe(19_200);
    expect(result.total).toBe(499_200);
  });

  test("just above the rebate cliff is taxed on full slabs (conservative, no marginal relief)", () => {
    const result = computeAnnualTax(1_250_000);
    expect(result.tax).toBe(67_500);
    expect(result.total).toBe(70_200);
  });

  test("zero income → zero tax", () => {
    expect(computeAnnualTax(0).total).toBe(0);
  });
});

describe("fyMonthsElapsed", () => {
  test("counts months since April inclusive", () => {
    expect(fyMonthsElapsed("2026-04-10")).toBe(1);
    expect(fyMonthsElapsed("2026-07-19")).toBe(4);
    expect(fyMonthsElapsed("2027-03-31")).toBe(12);
    expect(fyMonthsElapsed("2027-01-05")).toBe(10);
  });
});

describe("estimateAdvancePosition", () => {
  test("annualizes YTD income and applies the next installment percentage", () => {
    // ₹14L over Apr–Jul (4 months) → annualized ₹42L
    const position = estimateAdvancePosition({
      ytdNetIncomeInr: 1_400_000,
      tdsPaidInr: 0,
      asOfDate: "2026-07-19",
    });
    expect(position.annualizedIncome).toBe(4_200_000);
    expect(position.nextDue.date).toBe("2026-09-15");
    expect(position.nextDue.cumulativePct).toBe(45);
    // annual tax on 42L: 4.8L + 30% of 12L = 8.4L, cess 4% → 873,600; 45% → 393,120
    expect(position.estimatedAnnualTax).toBe(873_600);
    expect(position.nextDue.amountDue).toBe(393_120);
  });

  test("TDS already deducted reduces the amount due, floored at zero", () => {
    const position = estimateAdvancePosition({
      ytdNetIncomeInr: 1_400_000,
      tdsPaidInr: 500_000,
      asOfDate: "2026-07-19",
    });
    expect(position.nextDue.amountDue).toBe(0);
  });

  test("March dates roll to the final installment of the same FY", () => {
    const position = estimateAdvancePosition({
      ytdNetIncomeInr: 3_600_000,
      tdsPaidInr: 0,
      asOfDate: "2027-01-20",
    });
    expect(position.nextDue.date).toBe("2027-03-15");
    expect(position.nextDue.cumulativePct).toBe(100);
  });

  test("after March 15 the remaining liability is still shown as due", () => {
    const position = estimateAdvancePosition({
      ytdNetIncomeInr: 3_600_000,
      tdsPaidInr: 0,
      asOfDate: "2027-03-20",
    });
    expect(position.nextDue.date).toBe("2027-03-31");
    expect(position.nextDue.cumulativePct).toBe(100);
  });

  test("zero income produces a zero position", () => {
    const position = estimateAdvancePosition({
      ytdNetIncomeInr: 0,
      tdsPaidInr: 0,
      asOfDate: "2026-07-19",
    });
    expect(position.estimatedAnnualTax).toBe(0);
    expect(position.nextDue.amountDue).toBe(0);
  });
});
