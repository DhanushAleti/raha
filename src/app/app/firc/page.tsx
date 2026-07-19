import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AddFircDialog } from "@/components/firc/add-firc-dialog";
import { FircList, type FircView } from "@/components/firc/firc-list";
import {
  MatchPanel,
  type ConfirmedMatchView,
  type UnmatchedEntryView,
} from "@/components/firc/match-panel";
import {
  entryExportStatus,
  entryMatchedInr,
  fircRemainingInr,
  suggestFircsForEntry,
  type FircAllocation,
  type FircRecordLite,
} from "@/lib/firc/match";
import { formatInr } from "@/lib/format/inr";
import { roundInr } from "@/lib/fx/convert";

export const metadata: Metadata = { title: "FIRC tracker — Raha" };

export default async function FircPage() {
  const supabase = await createClient();

  const [
    { data: fircs, error: fircsError },
    { data: entries, error: entriesError },
    { data: matches, error: matchesError },
  ] = await Promise.all([
    supabase
      .from("firc_records")
      .select("id, received_date, bank, reference_no, currency, amount_foreign, amount_inr")
      .order("received_date", { ascending: false })
      .limit(500),
    supabase
      .from("income_entries")
      .select("id, entry_date, platform, currency, amount_inr")
      .neq("currency", "INR")
      .order("entry_date", { ascending: false })
      .limit(500),
    supabase.from("firc_matches").select("firc_id, income_entry_id, allocated_inr"),
  ]);

  if (fircsError || entriesError || matchesError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h1 className="font-display text-2xl text-raha-ink">FIRC tracker</h1>
        <p className="mt-2 text-sm text-red-700">
          Couldn&apos;t load your FIRC data right now. Refresh to try again.
        </p>
      </div>
    );
  }

  const allocations: FircAllocation[] = (matches ?? []).map((m) => ({
    fircId: m.firc_id as string,
    incomeEntryId: m.income_entry_id as string,
    allocatedInr: Number(m.allocated_inr),
  }));

  const fircLites: FircRecordLite[] = (fircs ?? []).map((f) => ({
    id: f.id as string,
    receivedDate: f.received_date as string,
    currency: f.currency as string,
    amountInr: Number(f.amount_inr),
  }));

  const fircViews: FircView[] = (fircs ?? []).map((f) => ({
    id: f.id as string,
    receivedDate: f.received_date as string,
    bank: f.bank as string,
    referenceNo: f.reference_no as string,
    currency: f.currency as string,
    amountForeign: Number(f.amount_foreign),
    amountInr: Number(f.amount_inr),
    remainingInr: roundInr(
      fircRemainingInr(
        {
          id: f.id as string,
          receivedDate: f.received_date as string,
          currency: f.currency as string,
          amountInr: Number(f.amount_inr),
        },
        allocations,
      ),
    ),
  }));

  const entryLites = (entries ?? []).map((e) => ({
    id: e.id as string,
    entryDate: e.entry_date as string,
    currency: e.currency as string,
    amountInr: Number(e.amount_inr),
    platform: e.platform as string,
  }));

  const unmatched: UnmatchedEntryView[] = entryLites
    .filter(
      (e) => entryExportStatus(e, entryMatchedInr(e.id, allocations)) === "at_risk",
    )
    .map((e) => ({
      entryId: e.id,
      entryDate: e.entryDate,
      platform: e.platform,
      currency: e.currency,
      amountInr: e.amountInr,
      suggestions: suggestFircsForEntry(e, fircLites, allocations)
        .slice(0, 3)
        .map((s) => {
          const view = fircViews.find((f) => f.id === s.firc.id)!;
          return {
            fircId: s.firc.id,
            referenceNo: view.referenceNo,
            bank: view.bank,
            receivedDate: view.receivedDate,
            fircAmountInr: s.firc.amountInr,
            amountDeltaPct: s.amountDelta * 100,
          };
        }),
    }));

  const fircById = new Map(fircViews.map((f) => [f.id, f]));
  const entryById = new Map(entryLites.map((e) => [e.id, e]));
  const confirmed: ConfirmedMatchView[] = allocations
    .filter((a) => fircById.has(a.fircId) && entryById.has(a.incomeEntryId))
    .map((a) => ({
      fircId: a.fircId,
      entryId: a.incomeEntryId,
      referenceNo: fircById.get(a.fircId)!.referenceNo,
      platform: entryById.get(a.incomeEntryId)!.platform,
      entryDate: entryById.get(a.incomeEntryId)!.entryDate,
      allocatedInr: a.allocatedInr,
    }));

  const totalForeign = entryLites.reduce((sum, e) => sum + e.amountInr, 0);
  const atRisk = unmatched.reduce((sum, e) => sum + e.amountInr, 0);
  const coveredPct = totalForeign > 0 ? Math.round(((totalForeign - atRisk) / totalForeign) * 100) : 100;
  const exposure = roundInr(atRisk * 0.18);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-raha-ink">FIRC tracker</h1>
          <p className="text-sm text-raha-ink/55">
            Match every foreign payout to its bank certificate — that&apos;s
            your proof of export.
          </p>
        </div>
        <AddFircDialog />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            Foreign income
          </p>
          <p className="font-display mt-1 text-2xl text-raha-ink">{formatInr(totalForeign)}</p>
        </div>
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            FIRC coverage
          </p>
          <p className={`font-display mt-1 text-2xl ${coveredPct >= 98 ? "text-emerald-700" : "text-raha-ink"}`}>
            {coveredPct}%
          </p>
        </div>
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            GST exposure if unmatched
          </p>
          <p className={`font-display mt-1 text-2xl ${exposure > 0 ? "text-raha-red" : "text-raha-ink"}`}>
            {formatInr(exposure)}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-raha-ink/45">
            18% of at-risk income. Estimate — verify with your CA before filing.
          </p>
        </div>
      </div>

      {entryLites.length === 0 && fircViews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-raha-ink/20 bg-white p-10 text-center">
          <p className="font-display text-xl text-raha-ink">No foreign income tracked yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-raha-ink/55">
            Add your AdSense or Patreon payouts on the Income page first — then
            log the FIRCs your bank issued and match them here.
          </p>
        </div>
      ) : (
        <>
          <MatchPanel unmatched={unmatched} confirmed={confirmed} />
          <section aria-labelledby="firc-list-heading" className="space-y-3">
            <h2
              id="firc-list-heading"
              className="text-sm font-semibold uppercase tracking-widest text-raha-ink/50"
            >
              Logged FIRCs ({fircViews.length})
            </h2>
            <FircList fircs={fircViews} />
          </section>
        </>
      )}
    </div>
  );
}
