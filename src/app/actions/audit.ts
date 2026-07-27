"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { computeAuditResult, type AuditAnswers } from "@/lib/audit/scoring";

const answersSchema = z.object({
  incomeRange: z.enum(["under_20l", "20l_50l", "50l_1cr", "1cr_2cr", "over_2cr"]),
  platforms: z
    .array(
      z.enum([
        "youtube",
        "patreon",
        "twitch",
        "substack",
        "instagram",
        "brand_deals",
        "other",
      ]),
    )
    .max(7),
  foreignIncome: z.enum(["yes", "no"]),
  gstRegistered: z.enum(["yes", "no", "not_sure"]),
  lutFiled: z.enum(["yes", "no", "whats_that"]),
  fircCollection: z.enum(["always", "sometimes", "never", "whats_that"]),
  invoicePractice: z.enum(["gst_sequence", "adhoc", "none"]),
  setAsideAwareness: z.enum(["exact", "rough", "no"]),
});

const leadSchema = z
  .object({
    name: z.string().trim().min(1, "Please tell us your name").max(120),
    email: z.string().trim().email("That email doesn't look right").max(320),
    handle: z.string().trim().max(120).optional(),
    answers: answersSchema,
    // Honeypot
    company: z.string().max(0).optional(),
  })
  .transform((data) => ({ ...data, email: data.email.toLowerCase() }));

export type AuditLeadResult =
  | { status: "ok" }
  | { status: "error"; message: string };

/**
 * Records an anonymous audit completion.
 *
 * The report is shown before the email ask, so most completions never become a
 * lead. Without this the top of the funnel is invisible — no way to tell how
 * many people finished the audit versus how many handed over an email. Stores
 * no PII: answers and verdict only.
 *
 * Fire-and-forget: a measurement failure must never disrupt the report.
 */
export async function recordAuditCompletion(input: unknown): Promise<void> {
  const parsed = answersSchema.safeParse(input);
  if (!parsed.success) return;

  const result = computeAuditResult(parsed.data as AuditAnswers);

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("audit_completions").insert({
      answers: parsed.data,
      score: result.score,
      verdict: result.verdict,
    });
    if (error) {
      console.error("audit completion insert failed", {
        code: error.code,
        message: error.message,
      });
    }
  } catch (err) {
    console.error("audit completion action crashed", err);
  }
}

export async function saveAuditLead(input: unknown): Promise<AuditLeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again",
    };
  }

  const { name, email, handle, answers } = parsed.data;
  // Score server-side — the stored verdict never trusts the client.
  const result = computeAuditResult(answers as AuditAnswers);

  const row = {
    name,
    email,
    handle: handle || null,
    answers,
    score: result.score,
    verdict: result.verdict,
    updated_at: new Date().toISOString(),
  };

  try {
    const admin = createAdminClient();
    if (admin) {
      // Service role can upsert: repeat submissions keep the latest answers.
      const { error } = await admin
        .from("audit_leads")
        .upsert(row, { onConflict: "email" });
      if (error) {
        console.error("audit lead upsert failed", { code: error.code, message: error.message });
        return { status: "error", message: "Couldn't save that just now — please try again." };
      }
      return { status: "ok" };
    }

    // Anon fallback: insert-only; a duplicate email keeps the earlier lead.
    const supabase = await createClient();
    const { error } = await supabase.from("audit_leads").insert(row);
    if (error && error.code !== "23505") {
      console.error("audit lead insert failed", { code: error.code, message: error.message });
      return { status: "error", message: "Couldn't save that just now — please try again." };
    }
    return { status: "ok" };
  } catch (err) {
    console.error("audit lead action crashed", err);
    return { status: "error", message: "Couldn't save that just now — please try again." };
  }
}
