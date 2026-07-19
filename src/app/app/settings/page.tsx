import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/settings/profile-form";

export const metadata: Metadata = { title: "Settings — Raha" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name, state, address, pan, gstin, lut_arn, invoice_prefix")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h1 className="font-display text-2xl text-raha-ink">Settings</h1>
        <p className="mt-2 text-sm text-red-700">
          Couldn&apos;t load your profile. Refresh to try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-raha-ink">Settings</h1>
        <p className="text-sm text-raha-ink/55">
          These details appear on your invoices and drive the GST treatment.
        </p>
      </div>
      <div className="rounded-2xl border border-raha-ink/8 bg-white p-6">
        <ProfileForm
          initial={{
            displayName: profile.display_name ?? "",
            state: profile.state ?? "",
            address: profile.address ?? "",
            pan: profile.pan ?? "",
            gstin: profile.gstin ?? "",
            lutArn: profile.lut_arn ?? "",
            invoicePrefix: profile.invoice_prefix ?? "INV",
          }}
        />
      </div>
    </div>
  );
}
