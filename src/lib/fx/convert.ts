/**
 * INR conversion at entry-date reference rates — pure logic, no I/O.
 *
 * The bundled table holds INDICATIVE month-level reference rates (₹ per unit)
 * for FY 2026-27 to date. They approximate RBI reference levels but are not a
 * live feed: the UI always shows the applied rate and lets the creator
 * override it (stored as rate_source = 'manual'). Update this table monthly.
 */

export type ForeignCurrency = "USD" | "EUR" | "GBP";
export type Currency = "INR" | ForeignCurrency;
export type RateSource = "rbi_table" | "manual" | "native";

export interface RateLookup {
  rate: number;
  source: RateSource;
  /** Table month the rate came from, e.g. "2026-07" (undefined for INR). */
  asOf?: string;
}

/** First month covered by the bundled table (FY 2026-27 start). */
export const RATE_TABLE_START = "2026-04";

/** ₹ per unit, by month. Keys must stay sorted ascending. */
const MONTHLY_RATES: Record<string, Record<ForeignCurrency, number>> = {
  "2026-04": { USD: 84.1, EUR: 91.2, GBP: 106.4 },
  "2026-05": { USD: 84.35, EUR: 91.6, GBP: 106.9 },
  "2026-06": { USD: 84.6, EUR: 92.05, GBP: 107.3 },
  "2026-07": { USD: 84.75, EUR: 92.3, GBP: 107.55 },
};

const MONTHS = Object.keys(MONTHLY_RATES).sort();

function monthOf(isoDate: string): string {
  if (!/^\d{4}-\d{2}(-\d{2})?$/.test(isoDate)) {
    throw new Error(`Invalid date: ${isoDate} (expected YYYY-MM-DD)`);
  }
  return isoDate.slice(0, 7);
}

/**
 * Rate for a currency on a date. Missing months fall back to the latest
 * earlier month in the table; dates before the table start are an error the
 * caller must surface (the user then enters a manual rate).
 */
export function getRateForDate(currency: Currency, isoDate: string): RateLookup {
  if (currency === "INR") return { rate: 1, source: "native" };

  const month = monthOf(isoDate);
  if (month < RATE_TABLE_START) {
    throw new Error(
      `No bundled reference rate before ${RATE_TABLE_START}; enter the rate manually for ${isoDate}.`,
    );
  }

  let applicable = MONTHS[0];
  for (const m of MONTHS) {
    if (m <= month) applicable = m;
    else break;
  }

  return {
    rate: MONTHLY_RATES[applicable][currency],
    source: "rbi_table",
    asOf: applicable,
  };
}

/** Round half-up to 2 decimals, avoiding float-representation misrounds. */
export function roundInr(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function convertToInr(amount: number, rate: number): number {
  if (!(amount > 0)) throw new Error("Amount must be positive");
  if (!(rate > 0)) throw new Error("Rate must be positive");
  return roundInr(amount * rate);
}
