import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { InvoiceList, type InvoiceView } from "@/components/invoices/invoice-list";

export const metadata: Metadata = { title: "Invoices — Raha" };

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data: invoices, error } = await supabase
    .from("invoices")
    .select("id, invoice_number, issue_date, client_name, supply_type, status, total")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h1 className="font-display text-2xl text-raha-ink">Invoices</h1>
        <p className="mt-2 text-sm text-red-700">
          Couldn&apos;t load your invoices. Refresh to try again.
        </p>
      </div>
    );
  }

  const views: InvoiceView[] = (invoices ?? []).map((inv) => ({
    id: inv.id as string,
    invoiceNumber: inv.invoice_number as string,
    issueDate: inv.issue_date as string,
    clientName: inv.client_name as string,
    supplyType: inv.supply_type as string,
    status: inv.status as string,
    total: Number(inv.total),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-raha-ink">Invoices</h1>
          <p className="text-sm text-raha-ink/55">
            Sequential, GST-compliant, and ready before the brand asks twice.
          </p>
        </div>
        <Button asChild>
          <Link href="/app/invoices/new">New invoice</Link>
        </Button>
      </div>

      {views.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-raha-ink/20 bg-white p-10 text-center">
          <p className="font-display text-xl text-raha-ink">No invoices yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-raha-ink/55">
            Create your first GST-compliant invoice — 18% domestic or
            zero-rated export with the LUT note, numbered automatically.
          </p>
          <Button asChild className="mt-5">
            <Link href="/app/invoices/new">New invoice</Link>
          </Button>
        </div>
      ) : (
        <InvoiceList invoices={views} />
      )}
    </div>
  );
}
