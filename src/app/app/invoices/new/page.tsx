import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { InvoiceForm } from "@/components/invoices/invoice-form";

export const metadata: Metadata = { title: "New invoice — Raha" };

export default async function NewInvoicePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("state, lut_arn, gstin, display_name")
    .eq("id", user!.id)
    .single();

  const profileIncomplete = !profile?.display_name || !profile?.state;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-raha-ink">New invoice</h1>
        <p className="text-sm text-raha-ink/55">
          GST-compliant, sequentially numbered, ready for the brand&apos;s
          finance team.
        </p>
      </div>
      {profileIncomplete ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          Your name or GST state is missing —{" "}
          <Link href="/app/settings" className="font-medium underline underline-offset-2">
            complete your profile
          </Link>{" "}
          so invoices carry the right details and tax split.
        </p>
      ) : null}
      <InvoiceForm creatorState={profile?.state ?? ""} lutArn={profile?.lut_arn ?? ""} />
    </div>
  );
}
