import { describe, expect, test } from "vitest";
import { convertToInr, getRateForDate, RATE_TABLE_START } from "./convert";

describe("getRateForDate", () => {
  test("INR is always rate 1 with native source", () => {
    const r = getRateForDate("INR", "2026-07-15");
    expect(r.rate).toBe(1);
    expect(r.source).toBe("native");
  });

  test("returns the table rate for a month present in the table", () => {
    const r = getRateForDate("USD", "2026-07-10");
    expect(r.rate).toBeGreaterThan(80);
    expect(r.source).toBe("rbi_table");
    expect(r.asOf).toBe("2026-07");
  });

  test("falls back to the latest earlier month when the month is missing", () => {
    // Table covers FY 2026-27 to date; a future month falls back to the latest entry.
    const r = getRateForDate("EUR", "2027-01-05");
    expect(r.source).toBe("rbi_table");
    expect(r.rate).toBeGreaterThan(85);
  });

  test("throws for dates before the table starts", () => {
    expect(() => getRateForDate("USD", "2020-01-01")).toThrow(/before/i);
  });

  test("all supported currencies resolve for the table start month", () => {
    for (const c of ["USD", "EUR", "GBP"] as const) {
      const r = getRateForDate(c, `${RATE_TABLE_START}-15`);
      expect(r.rate).toBeGreaterThan(0);
    }
  });
});

describe("convertToInr", () => {
  test("multiplies and rounds half-up to 2 decimals", () => {
    expect(convertToInr(100, 84.755)).toBe(8475.5);
    expect(convertToInr(1, 84.755)).toBe(84.76); // 84.755 → half-up
    expect(convertToInr(3, 33.335)).toBe(100.01); // 100.005 → 100.01
  });

  test("rejects non-positive amounts and rates", () => {
    expect(() => convertToInr(0, 84)).toThrow();
    expect(() => convertToInr(-5, 84)).toThrow();
    expect(() => convertToInr(100, 0)).toThrow();
  });
});
