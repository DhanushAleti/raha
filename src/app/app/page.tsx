import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { entryExportStatus, entryMatchedInr, type FircAllocation } from "@/lib/firc/match";
import { estimateGstLiability, upcomingGstDates } from "@/lib/tax/gst-liability";
import { estimateAdvancePosition } from "@/lib/tax/advance";
import { formatInr } from "@/lib/format/inr";
import { roundInr } from "@/lib/fx/convert";

export const metadata: Metadata = { title: "Dashboard — Raha" };

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ data: entries, error: entriesError }, { data: matches, error: matchesError }] =
    await Promise.all([
      supabase
        .from("income_entries")
        .select("id, entry_date, platform, category, currency, amount_inr, tds_inr")
        .limit(2000),
      supabase.from("firc_matches").select("firc_id, income_entry_id, allocated_inr"),
    ]);

  if (entriesError || matchesError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h1 className="font-display text-2xl text-raha-ink">Dashboard</h1>
        <p className="mt-2 text-sm text-red-700">
          Couldn&apos;t load your numbers right now. Refresh to try again.
        </p>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const allocations: FircAllocation[] = (matches ?? []).map((m) => ({
    fircId: m.firc_id as string,
    incomeEntryId: m.income_entry_id as string,
    allocatedInr: Number(m.allocated_inr),
  }));

  const rows = (entries ?? []).map((e) => {
    const amountInr = Number(e.amount_inr);
    return {
      id: e.id as string,
      platform: e.platform as string,
      currency: e.currency as string,
      amountInr,
      tdsInr: Number(e.tds_inr ?? 0),
      status: entryExportStatus(
        {
          id: e.id as string,
          entryDate: e.entry_date as string,
          currency: e.currency as string,
          amountInr,
        },
        entryMatchedInr(e.id as string, allocations),
      ),
    };
  });

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-raha-ink/20 bg-white p-10 text-center">
        <h1 className="font-display text-2xl text-raha-ink">
          Your set-aside number starts here
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-raha-ink/60">
          Add your income — manually or from an AdSense/Patreon CSV — and Raha
          keeps a running &quot;keep ₹X aside&quot; figure for GST and advance
          tax, updated with every payout.
        </p>
        <Link
          href="/app/income"
          className="mt-6 inline-flex h-11 items-center rounded-lg bg-raha-green px-6 text-sm font-semibold text-raha-cream hover:opacity-90"
        >
          Add your first income
        </Link>
      </div>
    );
  }

  const totalInr = roundInr(rows.reduce((sum, r) => sum + r.amountInr, 0));
  const tdsPaid = roundInr(rows.reduce((sum, r) => sum + r.tdsInr, 0));
  const domesticIncome = roundInr(
    rows.filter((r) => r.currency === "INR").reduce((s, r) => s + r.amountInr, 0),
  );
  const atRiskForeign = roundInr(
    rows.filter((r) => r.status === "at_risk").reduce((s, r) => s + r.amountInr, 0),
  );
  const zeroRated = roundInr(
    rows.filter((r) => r.status === "zero_rated").reduce((s, r) => s + r.amountInr, 0),
  );

  const gst = estimateGstLiability({
    domesticIncomeInr: domesticIncome,
    atRiskForeignInr: atRiskForeign,
  });
  const advance = estimateAdvancePosition({
    ytdNetIncomeInr: totalInr,
    tdsPaidInr: tdsPaid,
    asOfDate: today,
  });
  const setAside = roundInr(gst.total + advance.nextDue.amountDue);

  const dueDates = [
    {
      date: advance.nextDue.date,
      label: `Advance tax (${advance.nextDue.cumulativePct}% cumulative)`,
    },
    ...upcomingGstDates(today, 2),
  ]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  const byPlatform = Object.entries(
    rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.platform] = (acc[r.platform] ?? 0) + r.amountInr;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <section
        aria-labelledby="set-aside-heading"
        className="rounded-3xl bg-raha-ink p-8 sm:p-10"
      >
        <h1
          id="set-aside-heading"
          className="text-sm font-semibold uppercase tracking-widest text-raha-cream/60"
        >
          Set aside, as of today
        </h1>
        <p className="font-display mt-3 text-5xl tracking-tight text-raha-cream sm:text-6xl">
          {formatInr(setAside)}
        </p>
        <p className="mt-3 text-sm text-raha-cream/70">
          GST {formatInr(gst.total)} + advance tax due by{" "}
          {advance.nextDue.date} {formatInr(advance.nextDue.amountDue)}
        </p>
        <p className="mt-4 text-xs text-raha-cream/50">
          Estimate — verify with your CA before filing. Assumes new-regime
          slabs, no deductions, worst case on unmatched foreign income.
        </p>
      </section>

      {atRiskForeign > 0 ? (
        <Link
          href="/app/firc"
          className="block rounded-2xl border border-red-200 bg-red-50 px-6 py-4 transition-colors hover:border-red-300"
        >
          <p className="text-sm font-medium text-red-800">
            {formatInr(atRiskForeign)} of foreign income has no FIRC match —
            that&apos;s {formatInr(gst.atRiskGst)} of avoidable GST exposure.
          </p>
          <p className="mt-1 text-xs text-red-700/80">
            Match FIRCs to zero-rate it →
          </p>
        </Link>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            YTD income
          </p>
          <p className="font-display mt-1 text-2xl text-raha-ink">{formatInr(totalInr)}</p>
          <p className="mt-1 text-xs text-raha-ink/45">
            annualized ≈ {formatInr(advance.annualizedIncome)}
          </p>
        </div>
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            GST estimate
          </p>
          <p className="font-display mt-1 text-2xl text-raha-ink">{formatInr(gst.total)}</p>
          <p className="mt-1 text-xs text-raha-ink/45">
            {formatInr(gst.domesticGst)} domestic · {formatInr(gst.atRiskGst)} at-risk
          </p>
        </div>
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            Est. annual income tax
          </p>
          <p className="font-display mt-1 text-2xl text-raha-ink">
            {formatInr(advance.estimatedAnnualTax)}
          </p>
          <p className="mt-1 text-xs text-raha-ink/45">
            TDS already deducted: {formatInr(tdsPaid)}
          </p>
        </div>
        <div className="rounded-2xl border border-raha-ink/8 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-raha-ink/45">
            Zero-rated (FIRC-proven)
          </p>
          <p className="font-display mt-1 text-2xl text-emerald-700">{formatInr(zeroRated)}</p>
          <p className="mt-1 text-xs text-raha-ink/45">0% GST, export of services</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section
          aria-labelledby="due-dates-heading"
          className="rounded-2xl border border-raha-ink/8 bg-white p-6"
        >
          <h2
            id="due-dates-heading"
            className="text-sm font-semibold uppercase tracking-widest text-raha-ink/50"
          >
            Upcoming due dates
          </h2>
          <ul className="mt-4 space-y-3">
            {dueDates.map((d) => {
              const days = Math.max(
                0,
                Math.round((Date.parse(d.date) - Date.parse(today)) / 86_400_000),
              );
              return (
                <li key={`${d.date}-${d.label}`} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-raha-ink">{d.label}</p>
                    <p className="text-xs text-raha-ink/50">{d.date}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      days <= 7
                        ? "bg-red-100 text-red-700"
                        : days <= 30
                          ? "bg-amber-100 text-amber-800"
                          : "bg-raha-ink/8 text-raha-ink/60"
                    }`}
                  >
                    {days === 0 ? "today" : `in ${days}d`}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs text-raha-ink/45">
            Monthly-filer dates shown; QRMP filers have quarterly equivalents —
            your CA confirms which applies.
          </p>
        </section>

        <section
          aria-labelledby="platforms-heading"
          className="rounded-2xl border border-raha-ink/8 bg-white p-6"
        >
          <h2
            id="platforms-heading"
            className="text-sm font-semibold uppercase tracking-widest text-raha-ink/50"
          >
            Income by platform
          </h2>
          <ul className="mt-4 space-y-3">
            {byPlatform.map(([platform, amount]) => (
              <li key={platform}>
                <div className="flex justify-between text-sm">
                  <span className="text-raha-ink/75">{platform}</span>
                  <span className="font-medium text-raha-ink">{formatInr(amount)}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-raha-ink/8">
                  <div
                    className="h-full rounded-full bg-raha-green"
                    style={{ width: `${Math.round((amount / totalInr) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="text-xs text-raha-ink/45">
        Every figure on this page is an estimate — verify with your CA before
        filing. Raha does not file returns.
      </p>
    </div>
  );
}
