import { describe, expect, test } from "vitest";
import { computeInvoiceTotals } from "./calc";

const items = [
  { qty: 1, unitPrice: 250000 },
  { qty: 2, unitPrice: 15000.505 }, // line = 30001.01
];

describe("computeInvoiceTotals — domestic intra-state (CGST+SGST)", () => {
  test("splits 18% into 9% + 9% when creator and client share a state", () => {
    const totals = computeInvoiceTotals(items, "domestic", "Karnataka", "Karnataka");
    expect(totals.lineAmounts).toEqual([250000, 30001.01]);
    expect(totals.subtotal).toBe(280001.01);
    expect(totals.cgst).toBe(25200.09);
    expect(totals.sgst).toBe(25200.09);
    expect(totals.igst).toBe(0);
    expect(totals.total).toBe(330401.19);
  });
});

describe("computeInvoiceTotals — domestic inter-state (IGST)", () => {
  test("charges 18% IGST across states", () => {
    const totals = computeInvoiceTotals(items, "domestic", "Karnataka", "Maharashtra");
    expect(totals.cgst).toBe(0);
    expect(totals.sgst).toBe(0);
    expect(totals.igst).toBe(50400.18);
    expect(totals.total).toBe(330401.19);
  });

  test("unknown client state defaults to IGST (safe assumption)", () => {
    const totals = computeInvoiceTotals(items, "domestic", "Karnataka", "");
    expect(totals.igst).toBeGreaterThan(0);
    expect(totals.cgst).toBe(0);
  });
});

describe("computeInvoiceTotals — export (zero-rated)", () => {
  test("no GST on exports under LUT", () => {
    const totals = computeInvoiceTotals(items, "export", "Karnataka", "");
    expect(totals.cgst).toBe(0);
    expect(totals.sgst).toBe(0);
    expect(totals.igst).toBe(0);
    expect(totals.total).toBe(totals.subtotal);
  });
});

describe("computeInvoiceTotals — validation", () => {
  test("rejects empty items and non-positive quantities", () => {
    expect(() => computeInvoiceTotals([], "domestic", "KA", "KA")).toThrow();
    expect(() =>
      computeInvoiceTotals([{ qty: 0, unitPrice: 100 }], "domestic", "KA", "KA"),
    ).toThrow();
    expect(() =>
      computeInvoiceTotals([{ qty: 1, unitPrice: -5 }], "domestic", "KA", "KA"),
    ).toThrow();
  });

  test("state comparison is case- and whitespace-insensitive", () => {
    const totals = computeInvoiceTotals(items, "domestic", " karnataka ", "KARNATAKA");
    expect(totals.cgst).toBeGreaterThan(0);
    expect(totals.igst).toBe(0);
  });
});
