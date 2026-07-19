import { describe, expect, test } from "vitest";
import { fyForDate, formatInvoiceNumber } from "./number";

describe("fyForDate — Indian financial year (Apr–Mar)", () => {
  test("April onwards belongs to the FY starting that year", () => {
    expect(fyForDate("2026-04-01")).toBe("2026-27");
    expect(fyForDate("2026-07-19")).toBe("2026-27");
    expect(fyForDate("2026-12-31")).toBe("2026-27");
  });

  test("January–March belongs to the FY that started the previous year", () => {
    expect(fyForDate("2027-01-15")).toBe("2026-27");
    expect(fyForDate("2027-03-31")).toBe("2026-27");
    expect(fyForDate("2026-03-31")).toBe("2025-26");
  });

  test("century boundary formats correctly", () => {
    expect(fyForDate("2099-05-01")).toBe("2099-00");
  });
});

describe("formatInvoiceNumber", () => {
  test("pads to 3 digits", () => {
    expect(formatInvoiceNumber("DEMO", "2026-27", 1)).toBe("DEMO/2026-27/001");
    expect(formatInvoiceNumber("DEMO", "2026-27", 42)).toBe("DEMO/2026-27/042");
  });

  test("grows past 999 without truncation", () => {
    expect(formatInvoiceNumber("INV", "2026-27", 1234)).toBe("INV/2026-27/1234");
  });
});
