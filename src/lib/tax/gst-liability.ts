/**
 * GST liability estimate — pure, conservative.
 * Domestic services carry 18% GST. Foreign income WITH a matched FIRA
 * is a zero-rated export (0%); foreign income WITHOUT one is counted at the
 * full 18% as worst-case exposure. ITC is ignored (it can only lower the
 * bill — a CA applies it at filing time).
 */
import { roundInr } from "@/lib/fx/convert";

const GST_RATE = 0.18;

export interface GstLiability {
  domesticGst: number;
  atRiskGst: number;
  total: number;
}

export function estimateGstLiability(input: {
  domesticIncomeInr: number;
  atRiskForeignInr: number;
}): GstLiability {
  const domesticGst = roundInr(input.domesticIncomeInr * GST_RATE);
  const atRiskGst = roundInr(input.atRiskForeignInr * GST_RATE);
  return {
    domesticGst,
    atRiskGst,
    total: roundInr(domesticGst + atRiskGst),
  };
}

/** Upcoming GST return dates (monthly filer) after asOfDate, next `count`. */
export function upcomingGstDates(asOfDate: string, count: number): Array<{ date: string; label: string }> {
  const results: Array<{ date: string; label: string }> = [];
  const year = Number(asOfDate.slice(0, 4));
  const month = Number(asOfDate.slice(5, 7));

  // Returns filed in month M cover period M-1.
  for (let offset = 0; results.length < count && offset < 14; offset++) {
    const m = ((month - 1 + offset) % 12) + 1;
    const y = year + Math.floor((month - 1 + offset) / 12);
    const mm = String(m).padStart(2, "0");
    const periodDate = new Date(Date.UTC(y, m - 1, 1));
    periodDate.setUTCMonth(periodDate.getUTCMonth() - 1);
    const period = periodDate.toLocaleString("en-IN", { month: "short", timeZone: "UTC" });

    for (const [day, form] of [
      ["11", "GSTR-1"],
      ["20", "GSTR-3B"],
    ] as const) {
      const date = `${y}-${mm}-${day}`;
      if (date >= asOfDate && results.length < count) {
        results.push({ date, label: `${form} (${period})` });
      }
    }
  }
  return results;
}
