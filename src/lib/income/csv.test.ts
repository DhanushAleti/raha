import { describe, expect, test } from "vitest";
import { parseIncomeCsv, ADSENSE_PRESET, PATREON_PRESET } from "./csv";

const ADSENSE_CSV = `Date,Earnings
2026-06-21,3180.50
2026-07-21,"3,610.25"
`;

const PATREON_CSV = `Date,Amount,Currency
15/06/2026,1420,EUR
05/07/2026,1465.75,EUR
`;

const GENERIC_CSV = `when,how much,ccy,site
2026-07-01,50000,INR,Brand deal
2026-07-02,not-a-number,USD,AdSense
2026-13-45,100,USD,AdSense
2026-07-03,100,XYZ,AdSense
`;

describe("parseIncomeCsv — AdSense preset", () => {
  test("parses rows with commas and quotes in amounts", () => {
    const result = parseIncomeCsv(ADSENSE_CSV, ADSENSE_PRESET);
    expect(result.errors).toHaveLength(0);
    expect(result.rows).toHaveLength(2);
    expect(result.rows[0]).toMatchObject({
      entryDate: "2026-06-21",
      amount: 3180.5,
      currency: "USD",
      platform: "YouTube / AdSense",
      category: "ads",
    });
    expect(result.rows[1].amount).toBe(3610.25);
  });
});

describe("parseIncomeCsv — Patreon preset", () => {
  test("parses DD/MM/YYYY dates and currency column", () => {
    const result = parseIncomeCsv(PATREON_CSV, PATREON_PRESET);
    expect(result.errors).toHaveLength(0);
    expect(result.rows[0]).toMatchObject({
      entryDate: "2026-06-15",
      amount: 1420,
      currency: "EUR",
      category: "memberships",
    });
  });
});

describe("parseIncomeCsv — generic mapping + row errors", () => {
  test("collects per-row errors with 1-based row numbers, keeps good rows", () => {
    const result = parseIncomeCsv(GENERIC_CSV, {
      dateColumn: "when",
      amountColumn: "how much",
      currencyColumn: "ccy",
      platformColumn: "site",
    });
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0]).toMatchObject({
      currency: "INR",
      platform: "Brand deal",
      category: "brand_deal",
    });
    expect(result.errors).toHaveLength(3);
    expect(result.errors.map((e) => e.row)).toEqual([3, 4, 5]);
    expect(result.errors[0].message).toMatch(/amount/i);
    expect(result.errors[1].message).toMatch(/date/i);
    expect(result.errors[2].message).toMatch(/currency/i);
  });

  test("missing required column fails fast with a file-level error", () => {
    const result = parseIncomeCsv("a,b\n1,2\n", {
      dateColumn: "when",
      amountColumn: "how much",
      currency: "INR",
      platform: "X",
    });
    expect(result.rows).toHaveLength(0);
    expect(result.fileError).toMatch(/when/);
  });

  test("empty file yields a file-level error", () => {
    const result = parseIncomeCsv("", ADSENSE_PRESET);
    expect(result.fileError).toBeTruthy();
  });

  test("row cap: more than 1000 rows is rejected", () => {
    const rows = Array.from({ length: 1001 }, (_, i) => `2026-07-01,${i + 1}`).join("\n");
    const result = parseIncomeCsv(`Date,Earnings\n${rows}\n`, ADSENSE_PRESET);
    expect(result.fileError).toMatch(/1000/);
  });
});
