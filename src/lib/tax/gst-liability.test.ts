import { describe, expect, test } from "vitest";
import { estimateGstLiability } from "./gst-liability";

describe("estimateGstLiability", () => {
  test("18% on domestic income and on at-risk foreign income, separately", () => {
    const result = estimateGstLiability({
      domesticIncomeInr: 1_000_000,
      atRiskForeignInr: 500_000,
    });
    expect(result.domesticGst).toBe(180_000);
    expect(result.atRiskGst).toBe(90_000);
    expect(result.total).toBe(270_000);
  });

  test("fully covered foreign income contributes nothing", () => {
    const result = estimateGstLiability({
      domesticIncomeInr: 800_000,
      atRiskForeignInr: 0,
    });
    expect(result.atRiskGst).toBe(0);
    expect(result.total).toBe(144_000);
  });

  test("zero everywhere", () => {
    const result = estimateGstLiability({ domesticIncomeInr: 0, atRiskForeignInr: 0 });
    expect(result.total).toBe(0);
  });

  test("rounds to 2 decimals", () => {
    const result = estimateGstLiability({
      domesticIncomeInr: 1000.55,
      atRiskForeignInr: 0,
    });
    expect(result.domesticGst).toBe(180.1);
  });
});
