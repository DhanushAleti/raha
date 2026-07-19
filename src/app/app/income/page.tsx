import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AddEntryDialog } from "@/components/income/add-entry-dialog";
import { CsvUploadDialog } from "@/components/income/csv-upload-dialog";
import { IncomeList, type IncomeRow } from "@/components/income/income-list";
import { entryExportStatus, entryMatchedInr } from "@/lib/firc/match";
import { formatInr } from "@/lib/format/inr";

export const metadata: Metadata = { title: "Income — Raha" };

export default async function IncomePage() {
  const supabase = await createClient();

  const [{ data: entries, error: entriesError }, { data: matches, error: matchesError }] =
    await Promise.all([
      supabase
        .from("income_entries")
        .select(
          "id, entry_date, platform, description, category, currency, amount_original, rate_used, rate_source, amount_inr",
        )
        .order("entry_date", { ascending: false })
        .limit(500),
      supabase.from("firc_matches").select("firc_id, income_entry_id, allocated_inr"),
    ]);

  if (entriesError || matchesError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h1 className="font-display text-2xl text-raha-ink">Income</h1>
        <p className="mt-2 text-sm text-red-700">
          Couldn&apos;t load your income right now. Refresh to try again.
        </p>
      </div>
    );
  }

  const allocations = (matches ?? []).map((m) => ({
    fircId: m.firc_id as string,
    incomeEntryId: m.income_entry_id as string,
    allocatedInr: Number(m.allocated_inr),
  }));

  const rows: IncomeRow[] = (entries ?? []).map((e) => {
    const amountInr = Number(e.amount_inr);
    const status = entryExportStatus(
      {
        id: e.id as string,
        entryDate: e.entry_date as string,
        currency: e.currency as string,
        amountInr,
      },
      entryMatchedInr(e.id as string, allocations),
    );
    return {
      id: e.id as string,
      entryDate: e.entry_date as string,
      platform: e.platform as string,
      description: (e.description as string) ?? "",
      category: e.category as string,
      currency: e.currency as string,
      amountOriginal: Number(e.amount_original),
      rateUsed: Number(e.rate_used),
      rateSource: e.rate_source as string,
      amountInr,
      status,
    };
  });

  const totalInr = rows.reduce((sum, r) => sum + r.amountInr, 0);
  const foreignInr = rows
    .filter((r) => r.currency !== "INR")
    .reduce((sum, r) => sum + r.amountInr, 0);
  const atRiskInr = rows
    .filter((r) => r.status === "at_risk")
    .reduce((sum, r) => sum + r.amountInr, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-raha-ink">Income</h1>
          <p className="text-sm text-raha-ink/55">
            Every payout, every currency — converted and categorised.
          </p>
        </div>
        <div className="flex gap-2">
          <CsvUploadDialog />
          <AddEntryDialog />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            Tracked income
          </p>
          <p className="font-display mt-1 text-2xl text-raha-ink">{formatInr(totalInr)}</p>
        </div>
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            Foreign income
          </p>
          <p className="font-display mt-1 text-2xl text-raha-ink">{formatInr(foreignInr)}</p>
        </div>
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            At risk (no FIRC)
          </p>
          <p className={`font-display mt-1 text-2xl ${atRiskInr > 0 ? "text-raha-red" : "text-raha-ink"}`}>
            {formatInr(atRiskInr)}
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-raha-ink/20 bg-white p-10 text-center">
          <p className="font-display text-xl text-raha-ink">No income yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-raha-ink/55">
            Add your first payout manually, or upload an AdSense/Patreon CSV —
            your set-aside number starts working immediately.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <CsvUploadDialog />
            <AddEntryDialog />
          </div>
        </div>
      ) : (
        <IncomeList rows={rows} />
      )}

      <p className="text-xs text-raha-ink/45">
        Figures are estimates — verify with your CA before filing.
      </p>
    </div>
  );
}
