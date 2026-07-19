"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  entryMatchedInr,
  fircRemainingInr,
  type FircAllocation,
} from "@/lib/firc/match";

export type ActionResult =
  | { status: "ok" }
  | { status: "error"; message: string };

const fircSchema = z.object({
  receivedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
  bank: z.string().trim().min(1, "Bank is required").max(120),
  referenceNo: z.string().trim().min(1, "Reference number is required").max(120),
  currency: z.enum(["USD", "EUR", "GBP"]),
  amountForeign: z.coerce.number().positive("Foreign amount must be positive").max(1e10),
  amountInr: z.coerce.number().positive("INR amount must be positive").max(1e12),
});

export async function addFirc(input: unknown): Promise<ActionResult> {
  const parsed = fircSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Check the form" };
  }
  const { receivedDate, bank, referenceNo, currency, amountForeign, amountInr } = parsed.data;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Not signed in." };

  const { error } = await supabase.from("firc_records").insert({
    user_id: user.id,
    received_date: receivedDate,
    bank,
    reference_no: referenceNo,
    currency,
    amount_foreign: amountForeign,
    amount_inr: amountInr,
  });
  if (error) {
    if (error.code === "23505") {
      return { status: "error", message: "A FIRC with that reference number already exists." };
    }
    console.error("firc insert failed", { code: error.code, message: error.message });
    return { status: "error", message: "Couldn't save the FIRC — try again." };
  }
  revalidatePath("/app/firc");
  revalidatePath("/app/income");
  revalidatePath("/app");
  return { status: "ok" };
}

export async function deleteFirc(id: string): Promise<ActionResult> {
  const parsed = z.string().uuid().safeParse(id);
  if (!parsed.success) return { status: "error", message: "Invalid FIRC." };

  const supabase = await createClient();
  const { error } = await supabase.from("firc_records").delete().eq("id", parsed.data);
  if (error) {
    console.error("firc delete failed", { code: error.code, message: error.message });
    return { status: "error", message: "Couldn't delete the FIRC." };
  }
  revalidatePath("/app/firc");
  revalidatePath("/app/income");
  revalidatePath("/app");
  return { status: "ok" };
}

const matchSchema = z.object({
  fircId: z.string().uuid(),
  incomeEntryId: z.string().uuid(),
});

/**
 * Confirm a match. The allocation amount is derived SERVER-SIDE as
 * min(firc remaining, entry uncovered) — the client only proposes the pair.
 */
export async function confirmMatch(input: unknown): Promise<ActionResult> {
  const parsed = matchSchema.safeParse(input);
  if (!parsed.success) return { status: "error", message: "Invalid match." };
  const { fircId, incomeEntryId } = parsed.data;

  const supabase = await createClient();

  const [{ data: firc }, { data: entry }, { data: matches }] = await Promise.all([
    supabase
      .from("firc_records")
      .select("id, currency, amount_inr")
      .eq("id", fircId)
      .single(),
    supabase
      .from("income_entries")
      .select("id, currency, amount_inr")
      .eq("id", incomeEntryId)
      .single(),
    supabase.from("firc_matches").select("firc_id, income_entry_id, allocated_inr"),
  ]);

  if (!firc || !entry) return { status: "error", message: "FIRC or entry not found." };
  if (firc.currency !== entry.currency) {
    return { status: "error", message: "Currency mismatch between FIRC and entry." };
  }

  const allocations: FircAllocation[] = (matches ?? []).map((m) => ({
    fircId: m.firc_id as string,
    incomeEntryId: m.income_entry_id as string,
    allocatedInr: Number(m.allocated_inr),
  }));

  const fircRemaining = fircRemainingInr(
    { id: firc.id as string, receivedDate: "", currency: firc.currency as string, amountInr: Number(firc.amount_inr) },
    allocations,
  );
  const entryUncovered =
    Number(entry.amount_inr) - entryMatchedInr(entry.id as string, allocations);

  const allocated = Math.min(fircRemaining, entryUncovered);
  if (allocated <= 0) {
    return { status: "error", message: "Nothing left to allocate on that pair." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Not signed in." };

  const { error } = await supabase.from("firc_matches").insert({
    user_id: user.id,
    firc_id: fircId,
    income_entry_id: incomeEntryId,
    allocated_inr: Math.round((allocated + Number.EPSILON) * 100) / 100,
  });
  if (error) {
    if (error.code === "23505") {
      return { status: "error", message: "That FIRC is already matched to this entry." };
    }
    console.error("match insert failed", { code: error.code, message: error.message });
    return { status: "error", message: "Couldn't confirm the match — try again." };
  }
  revalidatePath("/app/firc");
  revalidatePath("/app/income");
  revalidatePath("/app");
  return { status: "ok" };
}

export async function removeMatch(input: unknown): Promise<ActionResult> {
  const parsed = matchSchema.safeParse(input);
  if (!parsed.success) return { status: "error", message: "Invalid match." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("firc_matches")
    .delete()
    .eq("firc_id", parsed.data.fircId)
    .eq("income_entry_id", parsed.data.incomeEntryId);
  if (error) {
    console.error("match delete failed", { code: error.code, message: error.message });
    return { status: "error", message: "Couldn't remove the match." };
  }
  revalidatePath("/app/firc");
  revalidatePath("/app/income");
  revalidatePath("/app");
  return { status: "ok" };
}
