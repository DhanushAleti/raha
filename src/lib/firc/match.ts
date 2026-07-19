/**
 * FIRC ↔ income matching — pure logic, no I/O.
 * Suggestions are ranked hints; a match only exists once the user confirms it.
 * Window: money usually lands after it's earned, so FIRCs are considered from
 * 7 days before to 45 days after the income entry date. Amount tolerance ±2%
 * (forex spreads and bank charges shift the INR figure slightly).
 */

export type ExportStatus = "domestic" | "zero_rated" | "at_risk";

export interface IncomeEntryLite {
  id: string;
  entryDate: string; // YYYY-MM-DD
  currency: string;
  amountInr: number;
}

export interface FircRecordLite {
  id: string;
  receivedDate: string; // YYYY-MM-DD
  currency: string;
  amountInr: number;
}

export interface FircAllocation {
  fircId: string;
  incomeEntryId: string;
  allocatedInr: number;
}

export interface FircSuggestion {
  firc: FircRecordLite;
  /** |firc − entry| as a fraction of the entry amount (0 = exact). */
  amountDelta: number;
  daysApart: number;
}

const AMOUNT_TOLERANCE = 0.02;
const DAYS_AFTER = 45;
const DAYS_BEFORE = 7;
/** An entry counts as fully covered at ≥98% (rounding + bank charges). */
const COVERAGE_THRESHOLD = 0.98;

function daysBetween(fromIso: string, toIso: string): number {
  const from = Date.parse(`${fromIso}T00:00:00Z`);
  const to = Date.parse(`${toIso}T00:00:00Z`);
  return Math.round((to - from) / 86_400_000);
}

export function fircRemainingInr(
  firc: FircRecordLite,
  allocations: FircAllocation[],
): number {
  const allocated = allocations
    .filter((a) => a.fircId === firc.id)
    .reduce((sum, a) => sum + a.allocatedInr, 0);
  return Math.max(0, firc.amountInr - allocated);
}

export function entryMatchedInr(
  entryId: string,
  allocations: FircAllocation[],
): number {
  return allocations
    .filter((a) => a.incomeEntryId === entryId)
    .reduce((sum, a) => sum + a.allocatedInr, 0);
}

export function entryExportStatus(
  entry: IncomeEntryLite,
  matchedInr: number,
): ExportStatus {
  if (entry.currency === "INR") return "domestic";
  return matchedInr >= entry.amountInr * COVERAGE_THRESHOLD
    ? "zero_rated"
    : "at_risk";
}

/**
 * Ranked FIRC suggestions for one foreign income entry.
 * Filters: same currency, date window, ±2% on the entry amount, FIRC not
 * exhausted, entry not already covered. Sorted by amount closeness, then date.
 */
export function suggestFircsForEntry(
  entry: IncomeEntryLite,
  fircs: FircRecordLite[],
  allocations: FircAllocation[],
): FircSuggestion[] {
  if (entry.currency === "INR") return [];

  const remainingToCover =
    entry.amountInr - entryMatchedInr(entry.id, allocations);
  if (remainingToCover < entry.amountInr * (1 - COVERAGE_THRESHOLD)) return [];

  return fircs
    .filter((firc) => firc.currency === entry.currency)
    .filter((firc) => {
      const days = daysBetween(entry.entryDate, firc.receivedDate);
      return days >= -DAYS_BEFORE && days <= DAYS_AFTER;
    })
    .filter((firc) => fircRemainingInr(firc, allocations) > 0)
    .map((firc) => ({
      firc,
      amountDelta: Math.abs(firc.amountInr - entry.amountInr) / entry.amountInr,
      daysApart: Math.abs(daysBetween(entry.entryDate, firc.receivedDate)),
    }))
    .filter((s) => s.amountDelta <= AMOUNT_TOLERANCE)
    .sort((a, b) => a.amountDelta - b.amountDelta || a.daysApart - b.daysApart);
}
