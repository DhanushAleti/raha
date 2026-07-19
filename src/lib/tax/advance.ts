/**
 * Advance-tax estimation — pure, conservative, CA-reviewable.
 *
 * Assumptions (all deliberately conservative — estimates skew high, never low):
 * - New-regime slabs for FY 2026-27, 4% health & education cess.
 * - Section 87A rebate applied only when taxable income ≤ ₹12,00,000.
 * - NO marginal relief, NO standard deduction, NO 44ADA presumptive election —
 *   those need a CA's judgement and would lower the bill, not raise it.
 * - YTD income is annualized linearly over months elapsed since April.
 *
 * Every number this module produces is an estimate to verify with a CA.
 */
import { roundInr } from "@/lib/fx/convert";

/** (upper bound, marginal rate) — new regime FY 2026-27. */
const SLABS: Array<[number, number]> = [
  [400_000, 0],
  [800_000, 0.05],
  [1_200_000, 0.1],
  [1_600_000, 0.15],
  [2_000_000, 0.2],
  [2_400_000, 0.25],
  [Infinity, 0.3],
];

const REBATE_LIMIT = 1_200_000;
const CESS_RATE = 0.04;

export interface AnnualTax {
  tax: number;
  cess: number;
  total: number;
}

export function computeAnnualTax(taxableIncome: number): AnnualTax {
  if (taxableIncome <= REBATE_LIMIT) return { tax: 0, cess: 0, total: 0 };

  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of SLABS) {
    if (taxableIncome > lower) {
      tax += (Math.min(taxableIncome, upper) - lower) * rate;
      lower = upper;
    } else {
      break;
    }
  }

  tax = roundInr(tax);
  const cess = roundInr(tax * CESS_RATE);
  return { tax, cess, total: roundInr(tax + cess) };
}

/** Months since April, inclusive of the current month (Apr → 1, Mar → 12). */
export function fyMonthsElapsed(isoDate: string): number {
  const month = Number(isoDate.slice(5, 7));
  return month >= 4 ? month - 3 : month + 9;
}

/** FY start year for a date (2026 for anything in Apr 2026 – Mar 2027). */
function fyStartYear(isoDate: string): number {
  const year = Number(isoDate.slice(0, 4));
  const month = Number(isoDate.slice(5, 7));
  return month >= 4 ? year : year - 1;
}

interface Installment {
  date: string;
  cumulativePct: number;
}

/** Statutory advance-tax installments for the FY containing asOfDate. */
export function advanceTaxSchedule(asOfDate: string): Installment[] {
  const start = fyStartYear(asOfDate);
  return [
    { date: `${start}-06-15`, cumulativePct: 15 },
    { date: `${start}-09-15`, cumulativePct: 45 },
    { date: `${start}-12-15`, cumulativePct: 75 },
    { date: `${start + 1}-03-15`, cumulativePct: 100 },
  ];
}

export interface AdvancePosition {
  annualizedIncome: number;
  estimatedAnnualTax: number;
  tdsPaidInr: number;
  nextDue: { date: string; cumulativePct: number; amountDue: number };
  schedule: Array<Installment & { amountDue: number }>;
}

export function estimateAdvancePosition(input: {
  ytdNetIncomeInr: number;
  tdsPaidInr: number;
  asOfDate: string;
}): AdvancePosition {
  const months = fyMonthsElapsed(input.asOfDate);
  const annualizedIncome = roundInr((input.ytdNetIncomeInr * 12) / months);
  const annualTax = computeAnnualTax(annualizedIncome).total;

  const schedule = advanceTaxSchedule(input.asOfDate).map((inst) => ({
    ...inst,
    amountDue: Math.max(
      0,
      roundInr((annualTax * inst.cumulativePct) / 100 - input.tdsPaidInr),
    ),
  }));

  // Next unpassed installment; after Mar 15 the balance is payable with the
  // return, shown against Mar 31 so the number never silently disappears.
  const next =
    schedule.find((inst) => inst.date >= input.asOfDate) ??
    {
      date: `${fyStartYear(input.asOfDate) + 1}-03-31`,
      cumulativePct: 100,
      amountDue: Math.max(0, roundInr(annualTax - input.tdsPaidInr)),
    };

  return {
    annualizedIncome,
    estimatedAnnualTax: annualTax,
    tdsPaidInr: input.tdsPaidInr,
    nextDue: next,
    schedule,
  };
}
