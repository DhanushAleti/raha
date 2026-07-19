"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { computeInvoiceTotals } from "@/lib/gst/calc";
import { fyForDate, formatInvoiceNumber } from "@/lib/invoice/number";

export type ActionResult =
  | { status: "ok"; invoiceId?: string }
  | { status: "error"; message: string };

const itemSchema = z.object({
  description: z.string().trim().min(1, "Item description is required").max(300),
  sacCode: z.string().trim().regex(/^\d{4,8}$/, "SAC code must be 4–8 digits"),
  qty: z.coerce.number().positive("Quantity must be positive").max(1e6),
  unitPrice: z.coerce.number().positive("Unit price must be positive").max(1e10),
});

const invoiceSchema = z.object({
  issueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick an issue date"),
  supplyType: z.enum(["domestic", "export"]),
  clientName: z.string().trim().min(1, "Client name is required").max(200),
  clientGstin: z
    .string()
    .trim()
    .toUpperCase()
    .refine(
      (v) => v === "" || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z][A-Z][0-9A-Z]$/.test(v),
      "Client GSTIN looks wrong",
    ),
  clientAddress: z.string().trim().max(500),
  clientState: z.string().trim().max(60),
  notes: z.string().trim().max(1000),
  items: z.array(itemSchema).min(1, "Add at least one line item").max(20),
});

const MAX_SEQ_RETRIES = 3;

export async function createInvoice(input: unknown): Promise<ActionResult> {
  const parsed = invoiceSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Check the form" };
  }
  const data = parsed.data;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Not signed in." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("state, invoice_prefix, lut_arn")
    .eq("id", user.id)
    .single();
  if (!profile) return { status: "error", message: "Complete your profile first (Settings)." };

  // Totals are recomputed server-side from raw items — client math is preview only.
  let totals;
  try {
    totals = computeInvoiceTotals(
      data.items.map((i) => ({ qty: i.qty, unitPrice: i.unitPrice })),
      data.supplyType,
      profile.state ?? "",
      data.clientState,
    );
  } catch (err) {
    return { status: "error", message: err instanceof Error ? err.message : "Invalid items" };
  }

  const fy = fyForDate(data.issueDate);

  // Sequential per-user-per-FY numbering; the unique constraint is the true
  // guarantee — on a rare concurrent clash we retry with the next number.
  for (let attempt = 0; attempt < MAX_SEQ_RETRIES; attempt++) {
    const { data: maxRow } = await supabase
      .from("invoices")
      .select("seq")
      .eq("user_id", user.id)
      .eq("fy", fy)
      .order("seq", { ascending: false })
      .limit(1)
      .maybeSingle();

    const seq = (maxRow?.seq ?? 0) + 1;

    const { data: inserted, error } = await supabase
      .from("invoices")
      .insert({
        user_id: user.id,
        status: "draft",
        fy,
        seq,
        invoice_number: formatInvoiceNumber(profile.invoice_prefix ?? "INV", fy, seq),
        issue_date: data.issueDate,
        supply_type: data.supplyType,
        client_name: data.clientName,
        client_gstin: data.clientGstin,
        client_address: data.clientAddress,
        client_state: data.clientState,
        subtotal: totals.subtotal,
        cgst: totals.cgst,
        sgst: totals.sgst,
        igst: totals.igst,
        total: totals.total,
        notes: data.notes,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") continue; // number raced — retry with next seq
      console.error("invoice insert failed", { code: error.code, message: error.message });
      return { status: "error", message: "Couldn't create the invoice — try again." };
    }

    const items = data.items.map((item, index) => ({
      user_id: user.id,
      invoice_id: inserted.id,
      description: item.description,
      sac_code: item.sacCode,
      qty: item.qty,
      unit_price: item.unitPrice,
      amount: totals.lineAmounts[index],
    }));
    const { error: itemsError } = await supabase.from("invoice_items").insert(items);
    if (itemsError) {
      // Roll back the header so no invoice exists without its lines.
      await supabase.from("invoices").delete().eq("id", inserted.id);
      console.error("invoice items insert failed", { code: itemsError.code, message: itemsError.message });
      return { status: "error", message: "Couldn't save the line items — nothing was created." };
    }

    revalidatePath("/app/invoices");
    return { status: "ok", invoiceId: inserted.id };
  }

  return { status: "error", message: "Couldn't allocate an invoice number — try again." };
}

export async function finalizeInvoice(id: string): Promise<ActionResult> {
  const parsed = z.string().uuid().safeParse(id);
  if (!parsed.success) return { status: "error", message: "Invalid invoice." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("invoices")
    .update({ status: "final", finalized_at: new Date().toISOString() })
    .eq("id", parsed.data)
    .eq("status", "draft");
  if (error) {
    console.error("invoice finalize failed", { code: error.code, message: error.message });
    return { status: "error", message: "Couldn't finalise the invoice." };
  }
  revalidatePath("/app/invoices");
  return { status: "ok" };
}

export async function deleteDraftInvoice(id: string): Promise<ActionResult> {
  const parsed = z.string().uuid().safeParse(id);
  if (!parsed.success) return { status: "error", message: "Invalid invoice." };

  const supabase = await createClient();
  // Only drafts are deletable — finalised numbers must never be reused, so
  // final invoices stay on the record permanently.
  const { data, error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", parsed.data)
    .eq("status", "draft")
    .select("id");
  if (error) {
    console.error("invoice delete failed", { code: error.code, message: error.message });
    return { status: "error", message: "Couldn't delete the invoice." };
  }
  if (!data || data.length === 0) {
    return { status: "error", message: "Final invoices can't be deleted." };
  }
  revalidatePath("/app/invoices");
  return { status: "ok" };
}
