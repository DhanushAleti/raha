"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteIncomeEntry } from "@/app/actions/income";
import { formatInr } from "@/lib/format/inr";
import { StatusChip } from "./status-chip";
import type { ExportStatus } from "@/lib/firc/match";

export interface IncomeRow {
  id: string;
  entryDate: string;
  platform: string;
  description: string;
  category: string;
  currency: string;
  amountOriginal: number;
  rateUsed: number;
  rateSource: string;
  amountInr: number;
  status: ExportStatus;
}

const CATEGORY_LABEL: Record<string, string> = {
  ads: "Ads",
  memberships: "Memberships",
  brand_deal: "Brand deal",
  digital_products: "Digital products",
  other: "Other",
};

interface IncomeListProps {
  rows: IncomeRow[];
}

export function IncomeList({ rows }: IncomeListProps) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState<IncomeRow | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (categoryFilter === "all" || r.category === categoryFilter) &&
          (currencyFilter === "all" || r.currency === currencyFilter),
      ),
    [rows, categoryFilter, currencyFilter],
  );

  function handleDelete(row: IncomeRow) {
    startTransition(async () => {
      const result = await deleteIncomeEntry(row.id);
      if (result.status === "ok") {
        toast.success("Entry deleted");
        setConfirmDelete(null);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-44" aria-label="Filter by category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
          <SelectTrigger className="w-36" aria-label="Filter by currency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All currencies</SelectItem>
            {["INR", "USD", "EUR", "GBP"].map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-raha-ink/20 bg-white px-6 py-10 text-center text-sm text-raha-ink/55">
          Nothing matches these filters.
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-raha-ink/8 bg-white sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-raha-ink/8 text-left text-xs uppercase tracking-wide text-raha-ink/45">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Platform</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium text-right">₹ value</th>
                  <th className="px-4 py-3 font-medium">Export status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-raha-ink/5 last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap text-raha-ink/70">
                      {row.entryDate}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-raha-ink">{row.platform}</span>
                      {row.description ? (
                        <span className="block text-xs text-raha-ink/45">{row.description}</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-raha-ink/70">
                      {CATEGORY_LABEL[row.category] ?? row.category}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap text-raha-ink/70">
                      {row.currency === "INR"
                        ? formatInr(row.amountOriginal)
                        : `${row.amountOriginal.toLocaleString()} ${row.currency}`}
                      {row.currency !== "INR" ? (
                        <span className="block text-xs text-raha-ink/40">
                          @ ₹{row.rateUsed}
                          {row.rateSource === "manual" ? " (manual)" : ""}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-right font-medium whitespace-nowrap text-raha-ink">
                      {formatInr(row.amountInr)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusChip status={row.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-raha-ink/40 hover:text-raha-red"
                        onClick={() => setConfirmDelete(row)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="space-y-3 sm:hidden">
            {filtered.map((row) => (
              <li key={row.id} className="rounded-2xl border border-raha-ink/8 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-raha-ink">{row.platform}</p>
                    <p className="text-xs text-raha-ink/50">
                      {row.entryDate} · {CATEGORY_LABEL[row.category] ?? row.category}
                    </p>
                  </div>
                  <StatusChip status={row.status} />
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="font-display text-xl text-raha-ink">
                      {formatInr(row.amountInr)}
                    </p>
                    {row.currency !== "INR" ? (
                      <p className="text-xs text-raha-ink/45">
                        {row.amountOriginal.toLocaleString()} {row.currency} @ ₹{row.rateUsed}
                      </p>
                    ) : null}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-raha-ink/40"
                    onClick={() => setConfirmDelete(row)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <Dialog open={confirmDelete !== null} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this entry?</DialogTitle>
            <DialogDescription>
              {confirmDelete
                ? `${confirmDelete.platform} · ${formatInr(confirmDelete.amountInr)} on ${confirmDelete.entryDate}. Any FIRC matches on it are removed too.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={pending}
              onClick={() => confirmDelete && handleDelete(confirmDelete)}
            >
              {pending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
