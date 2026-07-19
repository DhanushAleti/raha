/**
 * CSV → income rows. Pure parsing/validation, no I/O.
 * Presets cover AdSense and Patreon exports; the generic mapping lets the
 * user point at arbitrary columns. Bad rows are reported individually and
 * never block good rows (the caller decides whether to import partially).
 */
import Papa from "papaparse";
import { defaultCategoryFor, type IncomeCategory } from "./categorize";

export const MAX_CSV_ROWS = 1000;

const CURRENCIES = ["INR", "USD", "EUR", "GBP"] as const;
export type CsvCurrency = (typeof CURRENCIES)[number];

export interface CsvMapping {
  dateColumn: string;
  amountColumn: string;
  /** Fixed currency, or read per-row from currencyColumn. */
  currency?: CsvCurrency;
  currencyColumn?: string;
  /** Fixed platform, or read per-row from platformColumn. */
  platform?: string;
  platformColumn?: string;
  descriptionColumn?: string;
  /** Fixed category; defaults to defaultCategoryFor(platform). */
  category?: IncomeCategory;
}

export const ADSENSE_PRESET: CsvMapping = {
  dateColumn: "Date",
  amountColumn: "Earnings",
  currency: "USD",
  platform: "YouTube / AdSense",
  category: "ads",
};

export const PATREON_PRESET: CsvMapping = {
  dateColumn: "Date",
  amountColumn: "Amount",
  currencyColumn: "Currency",
  platform: "Patreon",
  category: "memberships",
};

export interface ParsedIncomeRow {
  entryDate: string; // YYYY-MM-DD
  amount: number;
  currency: CsvCurrency;
  platform: string;
  description: string;
  category: IncomeCategory;
}

export interface CsvRowError {
  /** 1-based row number in the file (header = row 1). */
  row: number;
  message: string;
}

export interface CsvParseResult {
  rows: ParsedIncomeRow[];
  errors: CsvRowError[];
  fileError?: string;
}

/** Accepts YYYY-MM-DD and DD/MM/YYYY; returns YYYY-MM-DD or null. */
function normalizeDate(raw: string): string | null {
  const trimmed = raw.trim();

  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const dmy = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  let year: number, month: number, day: number;
  if (iso) {
    [year, month, day] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  } else if (dmy) {
    [day, month, year] = [Number(dmy[1]), Number(dmy[2]), Number(dmy[3])];
  } else {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  const valid =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;
  if (!valid) return null;

  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseAmount(raw: string): number | null {
  const cleaned = raw.trim().replace(/[₹$€£,\s]/g, "");
  if (!cleaned || !/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  const value = Number(cleaned);
  return value > 0 ? Math.round((value + Number.EPSILON) * 100) / 100 : null;
}

export function parseIncomeCsv(content: string, mapping: CsvMapping): CsvParseResult {
  const parsed = Papa.parse<Record<string, string>>(content.trim(), {
    header: true,
    skipEmptyLines: true,
  });

  const data = parsed.data;
  if (data.length === 0) {
    return { rows: [], errors: [], fileError: "The file has no data rows." };
  }
  if (data.length > MAX_CSV_ROWS) {
    return {
      rows: [],
      errors: [],
      fileError: `Too many rows (${data.length}). The limit is ${MAX_CSV_ROWS} per upload.`,
    };
  }

  const headers = parsed.meta.fields ?? [];
  const required = [mapping.dateColumn, mapping.amountColumn];
  if (mapping.currencyColumn) required.push(mapping.currencyColumn);
  if (mapping.platformColumn) required.push(mapping.platformColumn);
  const missing = required.filter((col) => !headers.includes(col));
  if (missing.length > 0) {
    return {
      rows: [],
      errors: [],
      fileError: `Missing column(s): ${missing.join(", ")}. Found: ${headers.join(", ")}.`,
    };
  }

  const rows: ParsedIncomeRow[] = [];
  const errors: CsvRowError[] = [];

  data.forEach((record, index) => {
    const rowNumber = index + 2; // +1 for header, +1 for 1-basing

    const amount = parseAmount(record[mapping.amountColumn] ?? "");
    if (amount === null) {
      errors.push({ row: rowNumber, message: `Invalid amount: "${record[mapping.amountColumn] ?? ""}"` });
      return;
    }

    const entryDate = normalizeDate(record[mapping.dateColumn] ?? "");
    if (!entryDate) {
      errors.push({ row: rowNumber, message: `Invalid date: "${record[mapping.dateColumn] ?? ""}" (use YYYY-MM-DD or DD/MM/YYYY)` });
      return;
    }

    const rawCurrency = mapping.currency ?? (record[mapping.currencyColumn ?? ""] ?? "").trim().toUpperCase();
    if (!CURRENCIES.includes(rawCurrency as CsvCurrency)) {
      errors.push({ row: rowNumber, message: `Unsupported currency: "${rawCurrency}" (INR, USD, EUR, GBP)` });
      return;
    }

    const platform = (mapping.platform ?? record[mapping.platformColumn ?? ""] ?? "").trim() || "Unknown";
    const description = mapping.descriptionColumn ? (record[mapping.descriptionColumn] ?? "").trim() : "";

    rows.push({
      entryDate,
      amount,
      currency: rawCurrency as CsvCurrency,
      platform,
      description,
      category: mapping.category ?? defaultCategoryFor(platform),
    });
  });

  return { rows, errors };
}
