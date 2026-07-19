/** Invoice numbering — Indian FY + per-user sequential numbers. Pure. */

/** "2026-27" for any date in Apr 2026 – Mar 2027. */
export function fyForDate(isoDate: string): string {
  const match = isoDate.match(/^(\d{4})-(\d{2})-\d{2}$/);
  if (!match) throw new Error(`Invalid date: ${isoDate}`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const startYear = month >= 4 ? year : year - 1;
  const endYear = (startYear + 1) % 100;
  return `${startYear}-${String(endYear).padStart(2, "0")}`;
}

/** "PREFIX/2026-27/001" — 3-digit padding, growing naturally past 999. */
export function formatInvoiceNumber(prefix: string, fy: string, seq: number): string {
  return `${prefix}/${fy}/${String(seq).padStart(3, "0")}`;
}
