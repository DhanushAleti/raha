"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { convertToInr, getRateForDate } from "@/lib/fx/convert";
import { parseIncomeCsv, type CsvMapping } from "@/lib/income/csv";

const CATEGORY = ["ads", "memberships", "brand_deal", "digital_products", "other"] as const;
const CURRENCY = ["INR", "USD", "EUR", "GBP"] as const;

const entrySchema = z.object({
  entryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
  platform: z.string().trim().min(1, "Platform is required").max(60),
  description: z.string().trim().max(500).default(""),
  category: z.enum(CATEGORY),
  currency: z.enum(CURRENCY),
  amount: z.coerce.number().positive("Amount must be positive").max(1e10),
  /** Rate the user saw/edited. Ignored for INR. */
  rate: z.coerce.number().positive().max(1e6).optional(),
  tdsInr: z.coerce.number().min(0).max(1e10).default(0),
});

export type ActionResult =
  | { status: "ok" }
  | { status: "error"; message: string };

function resolveRate(currency: (typeof CURRENCY)[number], entryDate: string, userRate?: number) {
  if (currency === "INR") return { rate: 1, source: "native" as const };
  let tableRate: number | null = null;
  try {
    tableRate = getRateForDate(currency, entryDate).rate;
  } catch {
    tableRate = null; // date outside table — manual rate required
  }
  if (userRate !== undefined && userRate !== tableRate) {
    return { rate: userRate, source: "manual" as const };
  }
  if (tableRate !== null) return { rate: tableRate, source: "rbi_table" as const };
  throw new Error("No reference rate for that date — enter the rate manually.");
}

export async function addIncomeEntry(input: unknown): Promise<ActionResult> {
  const parsed = entrySchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Check the form" };
  }
  const { entryDate, platform, description, category, currency, amount, rate, tdsInr } = parsed.data;

  try {
    const resolved = resolveRate(currency, entryDate, rate);
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { status: "error", message: "Not signed in." };

    const { error } = await supabase.from("income_entries").insert({
      user_id: user.id,
      entry_date: entryDate,
      platform,
      description,
      category,
      currency,
      amount_original: amount,
      rate_used: resolved.rate,
      rate_source: resolved.source,
      amount_inr: convertToInr(amount, resolved.rate),
      tds_inr: tdsInr,
      source: "manual",
    });
    if (error) {
      console.error("income insert failed", { code: error.code, message: error.message });
      return { status: "error", message: "Couldn't save the entry — try again." };
    }
    revalidatePath("/app/income");
    revalidatePath("/app");
    return { status: "ok" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Couldn't save the entry.";
    return { status: "error", message };
  }
}

const csvImportSchema = z.object({
  content: z.string().min(1, "The file is empty").max(2_000_000, "File too large"),
  preset: z.enum(["adsense", "patreon", "generic"]),
  mapping: z
    .object({
      dateColumn: z.string().min(1).max(120),
      amountColumn: z.string().min(1).max(120),
      currencyColumn: z.string().max(120).optional(),
      currency: z.enum(CURRENCY).optional(),
      platformColumn: z.string().max(120).optional(),
      platform: z.string().max(60).optional(),
      descriptionColumn: z.string().max(120).optional(),
    })
    .optional(),
});

export type CsvImportResult =
  | {
      status: "ok";
      imported: number;
      failed: { row: number; message: string }[];
    }
  | { status: "error"; message: string };

const PRESETS: Record<string, CsvMapping> = {
  adsense: {
    dateColumn: "Date",
    amountColumn: "Earnings",
    currency: "USD",
    platform: "YouTube / AdSense",
    category: "ads",
  },
  patreon: {
    dateColumn: "Date",
    amountColumn: "Amount",
    currencyColumn: "Currency",
    platform: "Patreon",
    category: "memberships",
  },
};

export async function importIncomeCsv(input: unknown): Promise<CsvImportResult> {
  const parsed = csvImportSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid upload" };
  }
  const { content, preset, mapping } = parsed.data;

  const effectiveMapping: CsvMapping | undefined =
    preset === "generic" ? (mapping as CsvMapping | undefined) : PRESETS[preset];
  if (!effectiveMapping) {
    return { status: "error", message: "Column mapping is required for a generic import." };
  }

  const result = parseIncomeCsv(content, effectiveMapping);
  if (result.fileError) return { status: "error", message: result.fileError };
  if (result.rows.length === 0) {
    return {
      status: "error",
      message:
        result.errors.length > 0
          ? `No valid rows. First problem — row ${result.errors[0].row}: ${result.errors[0].message}`
          : "No valid rows found.",
    };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { status: "error", message: "Not signed in." };

    const failed = [...result.errors];
    const inserts = [];
    for (const row of result.rows) {
      try {
        const resolved = resolveRate(row.currency, row.entryDate);
        inserts.push({
          user_id: user.id,
          entry_date: row.entryDate,
          platform: row.platform,
          description: row.description,
          category: row.category,
          currency: row.currency,
          amount_original: row.amount,
          rate_used: resolved.rate,
          rate_source: resolved.source,
          amount_inr: convertToInr(row.amount, resolved.rate),
          tds_inr: 0,
          source: "csv" as const,
        });
      } catch (err) {
        failed.push({
          row: -1,
          message: `${row.entryDate} (${row.currency}): ${err instanceof Error ? err.message : "no rate"}`,
        });
      }
    }

    if (inserts.length > 0) {
      const { error } = await supabase.from("income_entries").insert(inserts);
      if (error) {
        console.error("csv import insert failed", { code: error.code, message: error.message });
        return { status: "error", message: "Import failed while saving — nothing was imported." };
      }
    }

    revalidatePath("/app/income");
    revalidatePath("/app");
    return { status: "ok", imported: inserts.length, failed };
  } catch (err) {
    console.error("csv import crashed", err);
    return { status: "error", message: "Import failed — nothing was imported." };
  }
}

export async function deleteIncomeEntry(id: string): Promise<ActionResult> {
  const parsed = z.string().uuid().safeParse(id);
  if (!parsed.success) return { status: "error", message: "Invalid entry." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("income_entries")
    .delete()
    .eq("id", parsed.data)
    .select("id");
  if (error) {
    console.error("income delete failed", { code: error.code, message: error.message });
    return { status: "error", message: "Couldn't delete the entry." };
  }
  if (!data || data.length === 0) {
    return { status: "error", message: "That entry was already deleted — refresh." };
  }
  revalidatePath("/app/income");
  revalidatePath("/app");
  return { status: "ok" };
}
