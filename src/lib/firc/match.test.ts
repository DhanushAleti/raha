import { describe, expect, test } from "vitest";
import {
  entryExportStatus,
  entryMatchedInr,
  fircRemainingInr,
  suggestFircsForEntry,
  type FircAllocation,
  type FircRecordLite,
  type IncomeEntryLite,
} from "./match";

const usdEntry: IncomeEntryLite = {
  id: "e1",
  entryDate: "2026-06-21",
  currency: "USD",
  amountInr: 249606, // ~2950 USD
};

const inrEntry: IncomeEntryLite = {
  id: "e2",
  entryDate: "2026-06-18",
  currency: "INR",
  amountInr: 175000,
};

function firc(overrides: Partial<FircRecordLite>): FircRecordLite {
  return {
    id: "f1",
    receivedDate: "2026-06-27",
    currency: "USD",
    amountInr: 249606,
    ...overrides,
  };
}

describe("suggestFircsForEntry", () => {
  test("suggests a FIRC within the date window and amount tolerance", () => {
    const suggestions = suggestFircsForEntry(usdEntry, [firc({})], []);
    expect(suggestions.map((s) => s.firc.id)).toEqual(["f1"]);
  });

  test("respects the ±2% amount tolerance", () => {
    const close = firc({ id: "f-close", amountInr: 249606 * 1.019 });
    const far = firc({ id: "f-far", amountInr: 249606 * 1.03 });
    const suggestions = suggestFircsForEntry(usdEntry, [close, far], []);
    expect(suggestions.map((s) => s.firc.id)).toEqual(["f-close"]);
  });

  test("date window is +45 days after / 7 days before the entry", () => {
    const inWindowLate = firc({ id: "f-late", receivedDate: "2026-08-04" }); // +44d
    const outLate = firc({ id: "f-out-late", receivedDate: "2026-08-06" }); // +46d
    const inWindowEarly = firc({ id: "f-early", receivedDate: "2026-06-15" }); // −6d
    const outEarly = firc({ id: "f-out-early", receivedDate: "2026-06-12" }); // −9d
    const suggestions = suggestFircsForEntry(
      usdEntry,
      [inWindowLate, outLate, inWindowEarly, outEarly],
      [],
    );
    expect(suggestions.map((s) => s.firc.id).sort()).toEqual(["f-early", "f-late"]);
  });

  test("currency must match and INR entries never get suggestions", () => {
    const eur = firc({ id: "f-eur", currency: "EUR" });
    expect(suggestFircsForEntry(usdEntry, [eur], [])).toHaveLength(0);
    expect(suggestFircsForEntry(inrEntry, [firc({})], [])).toHaveLength(0);
  });

  test("fully allocated FIRCs and already-matched entries drop out", () => {
    const allocations: FircAllocation[] = [
      { fircId: "f1", incomeEntryId: "other", allocatedInr: 249606 },
    ];
    expect(suggestFircsForEntry(usdEntry, [firc({})], allocations)).toHaveLength(0);

    const entryAllocated: FircAllocation[] = [
      { fircId: "fX", incomeEntryId: "e1", allocatedInr: 249606 },
    ];
    expect(suggestFircsForEntry(usdEntry, [firc({})], entryAllocated)).toHaveLength(0);
  });

  test("closest amount ranks first", () => {
    const exact = firc({ id: "f-exact" });
    const near = firc({ id: "f-near", amountInr: 249606 * 1.015 });
    const suggestions = suggestFircsForEntry(usdEntry, [near, exact], []);
    expect(suggestions[0].firc.id).toBe("f-exact");
  });
});

describe("allocation math + status", () => {
  const allocations: FircAllocation[] = [
    { fircId: "f1", incomeEntryId: "e1", allocatedInr: 100000 },
    { fircId: "f1", incomeEntryId: "e9", allocatedInr: 50000 },
  ];

  test("fircRemainingInr subtracts all allocations", () => {
    expect(fircRemainingInr(firc({}), allocations)).toBe(249606 - 150000);
  });

  test("entryMatchedInr sums allocations for the entry", () => {
    expect(entryMatchedInr("e1", allocations)).toBe(100000);
  });

  test("status: domestic for INR, zero_rated at ≥98% matched, at_risk otherwise", () => {
    expect(entryExportStatus(inrEntry, 0)).toBe("domestic");
    expect(entryExportStatus(usdEntry, usdEntry.amountInr)).toBe("zero_rated");
    expect(entryExportStatus(usdEntry, usdEntry.amountInr * 0.985)).toBe("zero_rated");
    expect(entryExportStatus(usdEntry, usdEntry.amountInr * 0.5)).toBe("at_risk");
    expect(entryExportStatus(usdEntry, 0)).toBe("at_risk");
  });
});
