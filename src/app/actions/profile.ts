"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type ActionResult =
  | { status: "ok" }
  | { status: "error"; message: string };

const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z][A-Z][0-9A-Z]$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const profileSchema = z.object({
  displayName: z.string().trim().min(1, "Display name is required").max(120),
  state: z.string().trim().max(60),
  address: z.string().trim().max(500),
  pan: z
    .string()
    .trim()
    .toUpperCase()
    .refine((v) => v === "" || PAN_RE.test(v), "PAN looks wrong (format: ABCPD1234E)"),
  gstin: z
    .string()
    .trim()
    .toUpperCase()
    .refine((v) => v === "" || GSTIN_RE.test(v), "GSTIN looks wrong (15 characters)"),
  lutArn: z.string().trim().max(30),
  invoicePrefix: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, "Prefix is required")
    .max(12)
    .regex(/^[A-Z0-9-]+$/, "Letters, numbers and dashes only"),
});

export async function updateProfile(input: unknown): Promise<ActionResult> {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Check the form" };
  }
  const { displayName, state, address, pan, gstin, lutArn, invoicePrefix } = parsed.data;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Not signed in." };

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName,
      state,
      address,
      pan,
      gstin,
      lut_arn: lutArn,
      invoice_prefix: invoicePrefix,
    })
    .eq("id", user.id);

  if (error) {
    console.error("profile update failed", { code: error.code, message: error.message });
    return { status: "error", message: "Couldn't save your profile — try again." };
  }
  revalidatePath("/app/settings");
  revalidatePath("/app/invoices");
  return { status: "ok" };
}
