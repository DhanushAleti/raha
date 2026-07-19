"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { confirmMatch, removeMatch } from "@/app/actions/firc";
import { formatInr } from "@/lib/format/inr";

export interface MatchSuggestionView {
  fircId: string;
  referenceNo: string;
  bank: string;
  receivedDate: string;
  fircAmountInr: number;
  amountDeltaPct: number;
}

export interface UnmatchedEntryView {
  entryId: string;
  entryDate: string;
  platform: string;
  currency: string;
  amountInr: number;
  suggestions: MatchSuggestionView[];
}

export interface ConfirmedMatchView {
  fircId: string;
  entryId: string;
  referenceNo: string;
  platform: string;
  entryDate: string;
  allocatedInr: number;
}

export function MatchPanel({
  unmatched,
  confirmed,
}: {
  unmatched: UnmatchedEntryView[];
  confirmed: ConfirmedMatchView[];
}) {
  const [pending, startTransition] = useTransition();

  function handleConfirm(fircId: string, incomeEntryId: string) {
    startTransition(async () => {
      const result = await confirmMatch({ fircId, incomeEntryId });
      if (result.status === "ok") toast.success("Match confirmed — entry is zero-rated");
      else toast.error(result.message);
    });
  }

  function handleRemove(fircId: string, incomeEntryId: string) {
    startTransition(async () => {
      const result = await removeMatch({ fircId, incomeEntryId });
      if (result.status === "ok") toast.success("Match removed");
      else toast.error(result.message);
    });
  }

  return (
    <div className="space-y-6">
      <section aria-labelledby="unmatched-heading">
        <h2 id="unmatched-heading" className="text-sm font-semibold uppercase tracking-widest text-raha-ink/50">
          Needs matching ({unmatched.length})
        </h2>
        {unmatched.length === 0 ? (
          <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
            Every foreign entry is FIRC-covered. That&apos;s exactly how an
            export file should look.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {unmatched.map((entry) => (
              <li key={entry.entryId} className="rounded-2xl border border-red-200/70 bg-white p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-medium text-raha-ink">{entry.platform}</p>
                    <p className="text-xs text-raha-ink/50">
                      {entry.entryDate} · {entry.currency}
                    </p>
                  </div>
                  <p className="font-display text-xl text-raha-ink">{formatInr(entry.amountInr)}</p>
                </div>
                {entry.suggestions.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {entry.suggestions.map((s) => (
                      <div
                        key={s.fircId}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-raha-cream px-4 py-3"
                      >
                        <div className="text-sm">
                          <p className="font-medium text-raha-ink">
                            {s.referenceNo}{" "}
                            <span className="font-normal text-raha-ink/50">· {s.bank}</span>
                          </p>
                          <p className="text-xs text-raha-ink/55">
                            {s.receivedDate} · {formatInr(s.fircAmountInr)} ·{" "}
                            {s.amountDeltaPct < 0.1
                              ? "exact amount"
                              : `within ${s.amountDeltaPct.toFixed(1)}%`}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          disabled={pending}
                          onClick={() => handleConfirm(s.fircId, entry.entryId)}
                        >
                          Confirm match
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-raha-ink/55">
                    No candidate FIRC found — log the FIRC for this payout (same
                    currency, credited within a few weeks of{" "}
                    {entry.entryDate}).
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="confirmed-heading">
        <h2 id="confirmed-heading" className="text-sm font-semibold uppercase tracking-widest text-raha-ink/50">
          Confirmed matches ({confirmed.length})
        </h2>
        {confirmed.length === 0 ? (
          <p className="mt-3 text-sm text-raha-ink/50">
            Confirmed matches appear here with their allocation.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-raha-ink/5 rounded-2xl border border-raha-ink/8 bg-white">
            {confirmed.map((m) => (
              <li
                key={`${m.fircId}-${m.entryId}`}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
              >
                <div className="text-sm">
                  <p className="font-medium text-raha-ink">
                    {m.referenceNo} → {m.platform}
                  </p>
                  <p className="text-xs text-raha-ink/50">
                    {m.entryDate} · {formatInr(m.allocatedInr)} allocated
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-raha-ink/40 hover:text-raha-red"
                  disabled={pending}
                  onClick={() => handleRemove(m.fircId, m.entryId)}
                >
                  Unmatch
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
